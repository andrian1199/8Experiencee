import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import FestixLogo from "../assets/FestixLogo 3.png"; 
import UnsplashBackground from "../assets/Unsplash.svg"; 

function Login() {
  const [username, setUsername] = useState("");  // State untuk username
  const [password, setPassword] = useState("");  // State untuk password
  const [error, setError] = useState(""); // State untuk error message
  const navigate = useNavigate(); // Hook untuk menavigasi ke halaman lain

  // Fungsi untuk menangani login
  const handleLogin = (e) => {
    e.preventDefault();

    // Kirim request login ke backend (misal backend berjalan di http://localhost:5000)
    fetch("http://localhost:5000/login", {
      method: "POST", // Menggunakan POST untuk login
      headers: {
        "Content-Type": "application/json", // Mengirim data dalam format JSON
      },
      body: JSON.stringify({ username, password }), // Mengirimkan data username dan password
    })
      .then((response) => response.json()) // Mengambil response dari server dalam format JSON
      .then((data) => {
        if (data.token) {
          // Jika login berhasil, simpan token JWT di localStorage
          localStorage.setItem("token", data.token);
          // Arahkan pengguna ke halaman utama setelah login
          navigate("/"); 
        } else {
          // Jika login gagal, tampilkan pesan error
          setError(data.error || "Username atau password salah");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Terjadi kesalahan, coba lagi.");
      });
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
