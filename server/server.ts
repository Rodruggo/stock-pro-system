import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { OAuth2Client } from "google-auth-library";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "typescript2",
});

const client = new OAuth2Client("745468275919-v46g3runu1kdata3f86n1tthj2rbt67g.apps.googleusercontent.com");

// === GOOGLE LOGIN (NEW) ===
app.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    // 1. Verify the Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "745468275919-v46g3runu1kdata3f86n1tthj2rbt67g.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    if (!payload) return res.status(400).json({ success: false, message: "Invalid Google Token" });

    const { email, name } = payload;

    // 2. Check if the user exists in your 'user' table
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      // User exists -> Return their details
      return res.json({
        success: true,
        fullname: rows[0].fullname,
        role: rows[0].role,
        message: "Google Login successful",
      });
    } else {
      // User doesn't exist -> Create them (Auto-Register)
      // Note: We use a placeholder for password since Google users don't need one for your DB
      const defaultRole = "user";
      await db.query(
        "INSERT INTO user (fullname, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, "GOOGLE_AUTH", defaultRole]
      );

      return res.json({
        success: true,
        fullname: name,
        role: defaultRole,
        message: "Google account created and logged in",
      });
    }
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).json({ success: false, message: "Google verification failed" });
  }
});

// === LOGIN (REGULAR) ===
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM user WHERE fullname = ? AND password = ?",
      [username, password]
    );
    if (rows.length > 0) {
      res.json({
        success: true,
        fullname: rows[0].fullname,
        role: rows[0].role,
        message: "Login successful",
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// === USER MANAGEMENT ===
// Change (req, res) to (_req, res)
app.get("/user", async (_req, res) => { 
  try {
    const [rows] = await db.query("SELECT id, email, fullname, role FROM user");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// CREATE USER (via Register)
app.post("/user", async (req, res) => {
  const { fullname, email, password, role } = req.body;
  try {
    await db.query(
      "INSERT INTO user (fullname, email, password, role) VALUES (?, ?, ?, ?)",
      [fullname, email, password, role]
    );
    res.json({ success: true, message: "User registered successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE USER
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id === "1") {
      return res.status(403).json({ success: false, message: "Cannot delete primary admin" });
    }
    await db.query("DELETE FROM user WHERE id = ?", [id]);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// === PRODUCT CRUD ===
// Change (req, res) to (_req, res)
app.get("/products", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/products", async (req, res) => {
  const { name, category, price, stock } = req.body;
  try {
    await db.query(
      "INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)",
      [name, category, price, stock]
    );
    res.json({ success: true, message: "Product added successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock } = req.body;
  try {
    await db.query(
      "UPDATE products SET name = ?, category = ?, price = ?, stock = ? WHERE id = ?",
      [name, category, price, stock, id]
    );
    res.json({ success: true, message: "Product updated successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));