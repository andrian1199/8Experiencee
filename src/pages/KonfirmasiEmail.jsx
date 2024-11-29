import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import untuk navigasi
import "./KonfirmasiEmail.css"; // File CSS untuk styling
import FestixLogo from "../assets/FestixLogo 3.png";
import BackgroundImage from "../assets/Unsplash.svg";

const KonfirmasiEmail = () => {
  const inputRefs = useRef([]);
  const navigate = useNavigate(); // Hook navigasi

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    // Jika pengguna memasukkan sesuatu dan bukan di kotak terakhir
    if (value && index < inputRefs.current.length - 1) {
      // Pindah ke kotak berikutnya
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      // Jika input kosong dan bukan kotak pertama, pindah ke kotak sebelumnya
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      // Pindah ke kotak sebelumnya saat menekan Backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerification = () => {
    // Logika untuk memverifikasi kode
    const enteredCode = inputRefs.current.map((input) => input.value).join(""); // Gabungkan input
    const validCode = "123456"; // Contoh kode yang valid

    if (enteredCode === validCode) {
      navigate("/berhasil"); // Navigasi ke halaman berhasil
    } else {
      alert("Kode yang Anda masukkan salah, silakan coba lagi.");
    }
  };

  return (
    <div
      className="confirmation-container"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <img src={FestixLogo} alt="Festix Logo" className="logo" />
      <div className="confirmation-content">
        <div className="confirmation-box">
          <h2 className="confirmation-title">Konfirmasi Akun</h2>
          <p className="confirmation-text">
            Kami telah mengirim kode ke email <strong>@********</strong>. Masukkan untuk konfirmasi.
          </p>
          <div className="code-inputs">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="code-input"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
          </div>
          <button className="confirm-button" onClick={handleVerification}>
            Verifikasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiEmail;
