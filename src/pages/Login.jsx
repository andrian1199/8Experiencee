import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import FestixLogo from "../assets/FestixLogo 3.png";
import UnsplashBackground from "../assets/Unsplash.svg";

function Login() {
  const [email, setEmail] = useState(""); // Ganti username menjadi email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", { // Ganti URL ke backend yang benar
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }), // Pastikan yang dikirim adalah email
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Username atau password salah");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Menyimpan token dari backend
      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); // Arahkan ke halaman home
    } catch (error) {
      setError(error.message); // Menampilkan pesan error
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${UnsplashBackground})`, // Perbaikan di sini
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
            <label>Masukkan Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Masukkan Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="register">
          Belum punya akun? <Link to="/daftar">Daftar sekarang</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
