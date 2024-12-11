import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import FestixLogo from "../assets/FestixLogo 3.png";
import UnsplashBackground from "../assets/Unsplash.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      if (response.data.success) {
        // Simpan token, status login, dan data pengguna ke localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        // Periksa jika email berakhiran @admin.com
        if (email.endsWith("@admin.com")) {
          navigate("/admin/event-list"); // Arahkan ke halaman admin
        } else {
          navigate("/"); // Arahkan ke halaman utama untuk pengguna biasa
        }
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Email atau Password salah.");
    }
  };
  

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${UnsplashBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <img src={FestixLogo} alt="Festix Logo" className="festix-logo" />
      <div className="login-box">
        <h2 className="login-title">LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="register">
          Belum punya akun? <a href="/daftar">Daftar sekarang</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
