import type { VercelRequest, VercelResponse } from "@vercel/node";
import mysql from "mysql2/promise";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fullname, email, password, role } = req.body;

  if (!fullname || !email || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      ssl: { rejectUnauthorized: true },
    });

    await db.execute(
      "INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)",
      [fullname, email, password, role]
    );

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Database error" });
  }
}
