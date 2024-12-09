import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import FestixLogo from "../assets/FestixLogo 3.png"; 
import UnsplashBackground from "../assets/Unsplash.svg"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulasi login: username dan password yang benar adalah "user" dan "password"
    if (username === "user" && password === "password") {
      localStorage.setItem("isLoggedIn", "true"); // Simpan status login
      navigate("/"); // Arahkan ke halaman home
    } else {
      setError("Username atau password salah");
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
            <label>Masukkan Namamu</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan namamu..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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