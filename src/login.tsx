import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    // Prevent page refresh on form submission
    if (e) e.preventDefault();

    const api = axios.create({
      baseURL: "http://localhost:4000",
      headers: { "Content-Type": "application/json" },
    });

    try {
      const { data } = await api.post("/login", { username, password });
      if (data.success) {
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("role", data.role);
        window.location.href = "/dashboard";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error");
    }
  };

  const handleregister = () => {
    window.location.href = "/Register";
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        setMessage("No Google credentials found");
        return;
      }
      const res = await axios.post("http://localhost:4000/google-login", {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem("fullname", res.data.fullname);
        window.location.href = "/dashboard";
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="745468275919-v46g3runu1kdata3f86n1tthj2rbt67g.apps.googleusercontent.com">
      <div className="login-page">
        <style>{`
          .login-page {
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f4f7fe;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
          }
          .login-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            width: 100%;
            max-width: 400px;
            text-align: center;
          }
          .login-card h2 {
            color: #111c44;
            margin-bottom: 10px;
            font-weight: 700;
          }
          .login-card p.subtitle {
            color: #a3aed0;
            margin-bottom: 30px;
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
          .login-card input {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid #e0e5f2;
            outline: none;
            transition: 0.3s;
          }
          .login-card input:focus {
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
          .btn-outline {
            width: 100%;
            padding: 10px;
            background: transparent;
            color: #4318ff;
            border: 1px solid #4318ff;
            border-radius: 12px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
          }
          .divider {
            margin: 25px 0;
            display: flex;
            align-items: center;
            color: #a3aed0;
            font-size: 12px;
          }
          .divider::before, .divider::after {
            content: "";
            flex: 1;
            height: 1px;
            background: #e0e5f2;
            margin: 0 10px;
          }
          .google-container {
            display: flex;
            justify-content: center;
          }
          .error-msg {
            color: #ee5d50;
            font-size: 13px;
            margin-top: 15px;
            font-weight: 500;
          }
        `}</style>

        <div className="login-card">
          <h2>📦 STOCK PRO</h2>
          <p className="subtitle">Enter your credentials to access the system</p>

          {/* Form wrapper handles the "Enter" key trigger */}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary">Sign In</button>
          </form>

          {/* This button is outside the form to prevent it from triggering login */}
          <button type="button" className="btn-outline" onClick={handleregister}>Create Account</button>

          <div className="divider">or continue with Google</div>

          <div className="google-container">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setMessage("Google login failed")}
              theme="outline"
              shape="pill"
            />
          </div>

          {message && <p className="error-msg">{message}</p>}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}




// import  { useState } from "react";
// import "./App.css";
// import axios from "axios";
// import VideoEncryptor from "./VideoEncryptor";
// export default function Login() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [message, setMessage] = useState("");

// //   const handleLogin = async () => {
// //     const api = axios.create({
// //       baseURL: "http://localhost:4000", // your backend server URL
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //     try {
// //       const { data } = await api.post("/login", { username, password });

// //       if (data.success) {
// //         localStorage.setItem("fullname", data.fullname);
// //         setMessage("Login successful!");
// //         window.location.href = "/dashboard";
// //       } else {
// //         setMessage(data.message);
// //       }
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       setMessage("Server error");
// //     }
// //   };

//   return (
//     // <div className="login">
//     //   <h2>Login Using React Typescript + ExpressJS + MySQL + Axios</h2>
//     //   <input
//     //     type="text"
//     //     placeholder="Username"
//     //     value={username}
//     //     onChange={(e) => setUsername(e.target.value)}
//     //   />
//     //   <br />
//     //   <input
//     //     type="password"
//     //     placeholder="Password"
//     //     value={password}
//     //     onChange={(e) => setPassword(e.target.value)}
//     //   />
//     //   <br />
//     //   <button onClick={handleLogin}>Login</button>
//     //   <p>{message}</p>
//     //    <div>
//       // <VideoEncryptor />
//     // </div>


//     // </div>
    
//   );
// }













// // import React, { useState } from "react";
// // import './App.css';

// // export default function Login() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [message, setMessage] = useState("");

// //   const handleLogin = async () => {
// //     const response = await fetch("http://localhost:4000/login&quot", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ username, password }),
// //     });
// //     const data = await response.json();
// //     setMessage(data.message);
// //   };

// //   return (
// //     <div className="login">
// //       <h2>Login Using ExpressJS and NodeJS</h2>
// //       <input
// //         type="text"
// //         placeholder="Username"
// //         value={username}
// //         onChange={(e) => setUsername(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         type="password"
// //         placeholder="Password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //       />
// //       <br />
// //       <button onClick={handleLogin}>Login</button>
// //       <p>{message}</p>
// //     </div>
// //   );
// // }
