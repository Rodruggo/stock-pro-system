import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { OAuth2Client } from "google-auth-library";

const app = express();



/* ======================
   MIDDLEWARE
====================== */
app.use(cors({
  origin: "*", // later you can restrict this to your Vercel domain
}));
app.use(express.json());
app.use(cors({
  origin: "*", // Or put your specific Vercel URL here
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
/* ======================
   DATABASE (ENV BASED)
====================== */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Use Number() to convert the string "12691" to a number 12691
  port: Number(process.env.DB_PORT), 
  // MANDATORY for Aiven cloud connection
  ssl: { rejectUnauthorized: false } 
});

/* ======================
   GOOGLE AUTH
====================== */
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (_req, res) => {
  res.send("API is running");
});

/* ======================
   GOOGLE LOGIN
====================== */
app.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ success: false, message: "Invalid Google Token" });
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
        message: "Google Login successful",
      });
    }

    const defaultRole = "user";
    await db.query(
      "INSERT INTO user (fullname, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, "GOOGLE_AUTH", defaultRole]
    );

    res.json({
      success: true,
      fullname: name,
      role: defaultRole,
      message: "Google account created and logged in",
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).json({ success: false, message: "Google verification failed" });
  }
});

/* ======================
   LOGIN
====================== */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows]: any = await db.query(
      "SELECT * FROM user WHERE fullname = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      return res.json({
        success: true,
        fullname: rows[0].fullname,
        role: rows[0].role,
      });
    }

    res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ======================
   USERS
====================== */
app.get("/user", async (_req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, email, fullname, role FROM user"
    );
    res.json(rows);
  } catch {
    res.status(500).json({ message: "Server error fetching users" });
  }
});

app.post("/user", async (req, res) => {
  const { fullname, email, password, role } = req.body;
  try {
    await db.query(
      "INSERT INTO user (fullname, email, password, role) VALUES (?, ?, ?, ?)",
      [fullname, email, password, role]
    );
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  if (id === "1") {
    return res.status(403).json({ success: false, message: "Cannot delete primary admin" });
  }
  try {
    await db.query("DELETE FROM user WHERE id = ?", [id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

/* ======================
   PRODUCTS
====================== */
app.get("/products", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch {
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
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock } = req.body;
  try {
    await db.query(
      "UPDATE products SET name=?, category=?, price=?, stock=? WHERE id=?",
      [name, category, price, stock, id]
    );
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

/* ======================
   START SERVER (RENDER)
====================== */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
