import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ fullname: "", email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);

 const api = axios.create({
  baseURL: "/api", // CHANGE TO THIS
  headers: { "Content-Type": "application/json" },
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevent page refresh on Enter key

    if (
      !form.fullname.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.role.trim()
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/user", form);
      alert("Account created successfully!");
      window.location.href = "/"; // Goes back to login
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    window.location.href = "/";
  };

  return (
    <div className="register-page">
      <style>{`
        .register-page {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4f7fe;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
        }
        .register-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 450px;
          text-align: center;
        }
        .register-card h2 {
          color: #111c44;
          margin-bottom: 10px;
          font-weight: 700;
        }
        .register-card p.subtitle {
          color: #a3aed0;
          margin-bottom: 25px;
          font-size: 14px;
        }
        .input-group {
          margin-bottom: 15px;
          text-align: left;
        }
        .input-group label {
          display: block;
          font-size: 12px;
          font-weight: bold;
          color: #111c44;
          margin-bottom: 5px;
          margin-left: 4px;
        }
        .register-card input, .register-card select {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e0e5f2;
          outline: none;
          transition: 0.3s;
          font-size: 14px;
          box-sizing: border-box;
        }
        .register-card input:focus, .register-card select:focus {
          border-color: #4318ff;
        }
        .btn-primary {
          width: 100%;
          padding: 12px;
          background: #4318ff;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s;
        }
        .btn-primary:hover {
          background: #3311db;
        }
        .btn-link {
          background: none;
          border: none;
          color: #4318ff;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
          font-size: 14px;
        }
        .btn-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="register-card">
        <h2>🚀 Join STOCK PRO</h2>
        <p className="subtitle">Create your staff account to manage inventory</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="fullname"
              type="text"
              placeholder="e.g. Rodrigo"
              value={form.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="mail@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Assign Role</label>
            <select name="role" value={form.role} onChange={handleChange} required>
              <option value="">Select a Role</option>
              <option value="user">User (View Only)</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <button type="button" className="btn-link" onClick={handleGoToLogin}>
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}