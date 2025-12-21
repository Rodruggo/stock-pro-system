import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: "", // IMPORTANT: Vercel uses relative API paths
    headers: { "Content-Type": "application/json" },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullname || !form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/user", form);
      alert("Account created successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 400,
          padding: 30,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Create Account</h2>

        <input
          name="fullname"
          placeholder="Full Name"
          onChange={handleChange}
          value={form.fullname}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
        />

        <button disabled={loading} type="submit">
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
