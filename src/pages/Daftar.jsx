import React from "react";
import { useNavigate } from "react-router-dom";
import "./Daftar.css";
import FestixLogo from "../assets/FestixLogo 3.png";

const Daftar = () => {
  const navigate = useNavigate();

  const handleDaftar = (e) => {
    e.preventDefault();
    // Logic registrasi akun baru (misalnya mengirim data API)
    navigate("/konfirmasi-email"); // Arahkan ke halaman konfirmasi email
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
