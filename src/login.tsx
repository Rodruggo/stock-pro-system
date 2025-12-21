import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/login", {
        username,
        password,
      });

      if (data.success) {
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("role", data.role);
        window.location.href = "/dashboard";
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const handleregister = () => {
    window.location.href = "/Register";
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        setMessage("Google login failed");
        return;
      }

      const res = await axios.post("/api/google-login", {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("role", res.data.role);
        window.location.href = "/dashboard";
      } else {
        setMessage(res.data.message || "Google login failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="745468275919-v46g3runu1kdata3f86n1tthj2rbt67g.apps.googleusercontent.com">

      <div className="login-page">


        <div className="login-card">
          <h2>📦 STOCK PRO</h2>
          <p className="subtitle">Enter your credentials to access the system</p>


          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"

                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Sign In
            </button>
          </form>

          <button className="btn-outline" onClick={handleregister}>
            Create Account
          </button>

          <div className="divider">or continue with Google</div>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setMessage("Google login failed")}
          />

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
