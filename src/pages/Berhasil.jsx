import React from "react";
import "./Berhasil.css"; // File CSS untuk styling
import FestixLogo from "../assets/FestixLogo 3.png";
import BackgroundImage from "../assets/Unsplash.svg";
import CheckIcon from "../assets/check-icon.svg"; // Ikon centang
import { Link } from "react-router-dom";

const Berhasil = () => {
  return (
    <div
      className="success-container"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <img src={FestixLogo} alt="Festix Logo" className="logo" />
      <div className="success-content">
        <div className="success-box">
          <div className="icon-container">
            <img src={CheckIcon} alt="Check Icon" className="check-icon" />
          </div>
          <h2 className="success-title">Selamat!</h2>
          <p className="success-text">
            Kamu telah berhasil membuat akun, klik tombol di bawah untuk lanjut
          </p>
          <Link to="/login" className="success-button">Lanjutkan!</Link>
        </div>
      </div>
    </div>
  );
};

export default Berhasil;
