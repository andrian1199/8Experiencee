import { useNavigate } from "react-router-dom";
import "./Daftar.css";
import FestixLogo from "../assets/FestixLogo 3.png";
import React, { useState } from "react";

const Daftar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk menangani proses registrasi
  const handleDaftar = async (e) => {
    e.preventDefault();

    // Mengirim data registrasi ke server
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),  // Kirim data name, email, password
      });

      const data = await response.json();

      // Menangani respons dari server
      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");  // Arahkan ke halaman login jika berhasil
      } else {
        alert(data.message);  // Tampilkan pesan error jika pendaftaran gagal
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Failed to register");  // Tampilkan alert jika terjadi kesalahan
    }
  };

  return (
    <div className="daftar-container">
      <img src={FestixLogo} alt="Festix Logo" className="festix-logo" />
      <div className="daftar-box">
        <h2 className="daftar-title">Daftar</h2>
        <form onSubmit={handleDaftar}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan email"
              className="form-control"
              value={email}  // Mengikat nilai email ke state
              onChange={(e) => setEmail(e.target.value)}  // Memperbarui state email
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Nama Pengguna</label>
            <input
              type="text"
              id="username"
              placeholder="Masukkan nama pengguna"
              className="form-control"
              value={name}  // Mengikat nilai name ke state
              onChange={(e) => setName(e.target.value)}  // Memperbarui state name
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan kata sandi"
              className="form-control"
              value={password}  // Mengikat nilai password ke state
              onChange={(e) => setPassword(e.target.value)}  // Memperbarui state password
              required
            />
          </div>
          <button type="submit" className="daftar-button">
            Daftar
          </button>
        </form>
        <p className="register">
          Sudah punya akun? <a href="/login">Masuk sekarang</a>
        </p>
        <p className="or-text">Atau</p>
        <button className="google-login-button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            alt="Google Icon"
            className="google-icon"
          />
          Lanjut Dengan Google
        </button>
      </div>
    </div>
  );
};

export default Daftar;