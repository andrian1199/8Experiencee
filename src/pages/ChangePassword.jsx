import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Kata sandi baru dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .put(
        "http://localhost:5000/api/auth/change-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        if (response.data.success) {
          alert("Kata sandi berhasil diperbarui.");
          navigate("/profil");
        } else {
          alert("Gagal mengganti kata sandi: " + response.data.message);
        }
      })
      .catch(() => {
        alert("Terjadi kesalahan saat mengganti kata sandi.");
      });
  };

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/profil")}
      >
        &larr; Kembali
      </button>
      <h2 className="mb-4">Ganti Kata Sandi</h2>
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">
              Kata Sandi Lama
            </label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              placeholder="Masukkan kata sandi lama"
              value={formData.oldPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Kata Sandi Baru
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Masukkan kata sandi baru"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Ulangi kata sandi baru"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
