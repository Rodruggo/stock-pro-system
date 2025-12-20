import React, { useState } from "react";

// Crypto constants
const SALT_LEN = 16;
const IV_LEN = 12;
const PBKDF2_ITER = 250000;

interface MetaData {
  filename: string;
  type: string;
}

// --- Helpers ---
function randomBytes(len: number): Uint8Array {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return arr;
}

// ✅ Universal safe version — works in all TypeScript configs
function arrayBufferSliceFromUint8(u8: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(u8.byteLength);
  new Uint8Array(ab).set(u8);
  return ab;
}

// --- Key derivation (PBKDF2 -> AES-GCM key) ---
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const pwUtf8 = new TextEncoder().encode(password);
  const baseKey = await crypto.subtle.importKey("raw", pwUtf8, "PBKDF2", false, ["deriveKey"]);

  const saltBuffer = arrayBufferSliceFromUint8(salt);

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: PBKDF2_ITER,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// --- Pack/unpack format ---
// [4 bytes BE meta length][meta JSON bytes][salt(16)][iv(12)][ciphertext...]

function packEncrypted(metaBytes: Uint8Array, salt: Uint8Array, iv: Uint8Array, ciphertext: Uint8Array): Uint8Array {
  const header = new Uint8Array(4);
  const dv = new DataView(header.buffer);
  dv.setUint32(0, metaBytes.byteLength, false);

  const out = new Uint8Array(4 + metaBytes.byteLength + salt.byteLength + iv.byteLength + ciphertext.byteLength);
  let offset = 0;
  out.set(header, offset); offset += 4;
  out.set(metaBytes, offset); offset += metaBytes.byteLength;
  out.set(salt, offset); offset += salt.byteLength;
  out.set(iv, offset); offset += iv.byteLength;
  out.set(ciphertext, offset);
  return out;
}

function unpackEncrypted(buffer: ArrayBuffer): { meta: MetaData; salt: Uint8Array; iv: Uint8Array; ciphertext: Uint8Array } {
  const view = new Uint8Array(buffer);
  const dv = new DataView(view.buffer, view.byteOffset, 4);
  const metaLen = dv.getUint32(0, false);
  let offset = 4;

  const metaBytes = view.slice(offset, offset + metaLen); offset += metaLen;
  const salt = view.slice(offset, offset + SALT_LEN); offset += SALT_LEN;
  const iv = view.slice(offset, offset + IV_LEN); offset += IV_LEN;
  const ciphertext = view.slice(offset);

  const metaText = new TextDecoder().decode(metaBytes);
  const meta = JSON.parse(metaText) as MetaData;
  return { meta, salt, iv, ciphertext };
}

// --- Encrypt ---
async function encryptFile(file: File, password: string): Promise<Uint8Array> {
  const arrBuf = await file.arrayBuffer();
  const salt = randomBytes(SALT_LEN);
  const iv = randomBytes(IV_LEN);
  const key = await deriveKey(password, salt);
  const ivBuffer = arrayBufferSliceFromUint8(iv);

  const cipherBuf = await crypto.subtle.encrypt({ name: "AES-GCM", iv: ivBuffer }, key, arrBuf);
  const ciphertext = new Uint8Array(cipherBuf);

  const meta: MetaData = { filename: file.name, type: file.type || "application/octet-stream" };
  const metaBytes = new TextEncoder().encode(JSON.stringify(meta));

  return packEncrypted(metaBytes, salt, iv, ciphertext);
}

// --- Decrypt ---
async function decryptBuffer(buffer: ArrayBuffer, password: string): Promise<{ meta: MetaData; plain: ArrayBuffer }> {
  const { meta, salt, iv, ciphertext } = unpackEncrypted(buffer);
  const key = await deriveKey(password, salt);
  const ivBuffer = arrayBufferSliceFromUint8(iv);
  const cipherBuffer = arrayBufferSliceFromUint8(ciphertext);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBuffer }, key, cipherBuffer);
  return { meta, plain };
}

// --- Download helpers ---
function downloadUint8Arr(uint8arr: Uint8Array, filename: string, mime?: string) {
  const ab = arrayBufferSliceFromUint8(uint8arr);
  const blob = new Blob([ab], { type: mime || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

function downloadArrayBuffer(buffer: ArrayBuffer, filename: string, mime?: string) {
  const blob = new Blob([buffer], { type: mime || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// --- React Component ---
const VideoEncryptor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleEncrypt = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }
    if (!password) {
      setMessage("Please enter a password.");
      return;
    }
    setBusy(true);
    setMessage("Encrypting...");
    try {
      const encrypted = await encryptFile(file, password);
      downloadUint8Arr(encrypted, file.name + ".enc");
      setMessage("✅ File encrypted and downloaded.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Encryption failed. See console for details.");
    } finally {
      setBusy(false);
    }
  };

  const handleDecryptFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const decFile = e.target.files?.[0];
    if (!decFile) return;
    if (!password) {
      setMessage("Please enter the password used to encrypt.");
      e.target.value = "";
      return;
    }
    setBusy(true);
    setMessage("Decrypting...");
    try {
      const buffer = await decFile.arrayBuffer();
      const { meta, plain } = await decryptBuffer(buffer, password);
      const outName = meta.filename.replace(/\.enc$/i, "") || meta.filename;
      downloadArrayBuffer(plain, outName, meta.type);
      setMessage("✅ File decrypted and downloaded.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Decryption failed — wrong password or corrupted file.");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: "32px auto", padding: 20, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
      <h2 style={{ margin: 0 }}>🔐 Video Encryptor (TypeScript + React)</h2>
      <p style={{ color: "#666" }}>All processing is client-side. Use a strong password. Large files may use lots of RAM.</p>

      <div style={{ display: "grid", gap: 10 }}>
        <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} disabled={busy} />
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} />

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleEncrypt} disabled={busy} style={{ padding: "8px 12px", borderRadius: 8 }}>
            Encrypt
          </button>

          <label style={{ background: "#eee", padding: "8px 12px", borderRadius: 8, cursor: busy ? "not-allowed" : "pointer", display: "inline-block" }}>
            Decrypt (.enc)
            <input type="file" accept=".enc" onChange={handleDecryptFileInput} style={{ display: "none" }} disabled={busy} />
          </label>
        </div>

        {message && <div style={{ color: "#444" }}>{message}</div>}
      </div>
    </div>
  );
};

export default VideoEncryptor;
