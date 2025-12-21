import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { OAuth2Client } from "google-auth-library";

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

/* ======================
   DATABASE (AIVEN)
====================== */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false },
});

/* ======================
   GOOGLE AUTH
====================== */
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ======================
   HEALTH CHECK
====================== */
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

/* ======================
   GOOGLE LOGIN
====================== */
app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ success: false });
    }

    const { email, name } = payload;

    const [rows]: any = await db.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res.json({
        success: true,
        fullname: rows[0].fullname,
        role: rows[0].role,
      });
    }

    await db.query(
      "INSERT INTO user (fullname, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, "GOOGLE_AUTH", "user"]
    );

    res.json({
      success: true,
      fullname: name,
      role: "user",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false });
  }
});

/* ======================
   LOGIN
====================== */
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows]: any = await db.query(
      "SELECT * FROM user WHERE fullname=? AND password=?",
      [username, password]
    );

    if (rows.length > 0) {
      return res.json({
        success: true,
        fullname: rows[0].fullname,
        role: rows[0].role,
      });
    }

    res.json({ success: false });
  } catch {
    res.status(500).json({ success: false });
  }
});

/* ======================
   USERS
====================== */
app.get("/api/user", async (_req, res) => {
  const [rows] = await db.query(
    "SELECT id, fullname, email, role FROM user"
  );
  res.json(rows);
});

app.post("/api/user", async (req, res) => {
  const { fullname, email, password, role } = req.body;

  try {
    await db.query(
      "INSERT INTO user (fullname, email, password, role) VALUES (?, ?, ?, ?)",
      [fullname, email, password, role]
    );
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.delete("/api/user/:id", async (req, res) => {
  const { id } = req.params;

  if (id === "1") {
    return res.status(403).json({ success: false });
  }

  await db.query("DELETE FROM user WHERE id=?", [id]);
  res.json({ success: true });
});

/* ======================
   PRODUCTS
====================== */
app.get("/api/products", async (_req, res) => {
  const [rows] = await db.query("SELECT * FROM products");
  res.json(rows);
});

app.post("/api/products", async (req, res) => {
  const { name, category, price, stock } = req.body;

  await db.query(
    "INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)",
    [name, category, price, stock]
  );

  res.json({ success: true });
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock } = req.body;

  await db.query(
    "UPDATE products SET name=?, category=?, price=?, stock=? WHERE id=?",
    [name, category, price, stock, id]
  );

  res.json({ success: true });
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM products WHERE id=?", [id]);
  res.json({ success: true });
});

/* ======================
   EXPORT FOR VERCEL
====================== */
export default app;
