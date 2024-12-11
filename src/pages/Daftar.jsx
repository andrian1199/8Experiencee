import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Daftar.css";
import FestixLogo from "../assets/FestixLogo 3.png";

const Daftar = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // State to control the success message
  const navigate = useNavigate();

  const handleDaftar = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        username,
        password,
        phone,
        birth_date: birthDate,
      });

      if (response.data.success) {
        // Show success message
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false); // Hide the success message after 3 seconds
          navigate("/login"); // Redirect to login after success
        }, 3000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mendaftar. Coba lagi nanti.");
    }
  };

  return (
    <div className="daftar-container">
      <img src={FestixLogo} alt="Festix Logo" className="festix-logo" />
      <div className="daftar-box">
        <h2 className="daftar-title">Daftar</h2>
        <form onSubmit={handleDaftar}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Nama Pengguna</label>
            <input
              type="text"
              placeholder="Masukkan nama pengguna"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Masukkan kata sandi"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Nomor HP</label>
            <input
              type="text"
              placeholder="Masukkan nomor HP"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Tanggal Lahir</label>
            <input
              type="date"
              className="form-control"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="daftar-button">
            Daftar
          </button>
        </form>

        {error && (
          <div
            style={{
              color: "red",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "15px",
              borderRadius: "5px",
              marginTop: "20px",
              textAlign: "center",
              fontSize: "16px",
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <p>Anda berhasil daftar! Silakan login.</p>
          </div>
        )}

        <p className="register">
          Sudah punya akun? <a href="/login">Masuk sekarang</a>
        </p>
      </div>
    </div>
  );
};

export default Daftar;
