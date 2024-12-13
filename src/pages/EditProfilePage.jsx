import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaLengkap: "",
    tanggalLahir: "",
    nomorHp: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.data.success) {
          const user = response.data.user;
          setFormData({
            namaLengkap: user.username || "",
            tanggalLahir: user.birth_date || "",
            nomorHp: user.phone || "",
            email: user.email || "",
          });
        }
      })
      .catch(() => {
        alert("Terjadi kesalahan saat memuat data profil.");
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios
      .put("http://localhost:5000/api/auth/profile", formData, {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.data.success) {
          alert("Profil berhasil diperbarui.");
          navigate("/profil");
        } else {
          alert("Gagal memperbarui profil: " + response.data.message);
        }
      })
      .catch(() => {
        alert("Terjadi kesalahan saat memperbarui profil.");
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            Festix
          </a>
        </div>
      </nav>

      <div className="container my-5">
        <button
          className="btn btn-outline-secondary mb-4"
          onClick={() => navigate("/profil")}
        >
          &larr; Kembali
        </button>

        <h2 className="mb-4">Edit Profil</h2>

        <form onSubmit={handleSubmit}>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Info Akun Pemilik</h5>

              <div className="mb-3">
                <label htmlFor="namaLengkap" className="form-label">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="namaLengkap"
                  className="form-control"
                  value={formData.namaLengkap}
                  onChange={handleInputChange}
                  placeholder="Masukkan namamu..."
                />
              </div>

              <div className="mb-3">
                <label htmlFor="tanggalLahir" className="form-label">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  id="tanggalLahir"
                  className="form-control"
                  value={formData.tanggalLahir}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Nomor HP dan Email</h5>

              <div className="mb-3">
                <label htmlFor="nomorHp" className="form-label">
                  Nomor HP
                </label>
                <input
                  type="text"
                  id="nomorHp"
                  className="form-control"
                  value={formData.nomorHp}
                  onChange={handleInputChange}
                />
                <small className="text-muted">
                  Jika Anda mengganti nomor HP, semua pembayaran elektronik
                  akan terputus.
                </small>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <small className="text-muted">
                  Jika Anda mengganti email, semua pembayaran elektronik akan
                  terputus.
                </small>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Simpan
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProfilePage;
