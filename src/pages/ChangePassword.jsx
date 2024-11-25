import React from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      {/* Tombol Kembali */}
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/profil")}
      >
        &larr; Kembali
      </button>

      {/* Judul Halaman */}
      <h2 className="mb-4">Ganti Kata Sandi</h2>

      {/* Form Ganti Kata Sandi */}
      <div className="card p-4">
        <form>
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">
              Kata Sandi Lama
            </label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              placeholder="Masukkan kata sandi lama"
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
