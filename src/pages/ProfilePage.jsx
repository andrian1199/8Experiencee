import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navigasi from '../komponen profil/Navbar';
import { Link } from "react-router-dom";
import '../styles/Profile.css'; //

function ProfilePage() {
  const [avatar, setAvatar] = useState("/assets/Bernadya 1.webp"); // Avatar default
  const [preview, setPreview] = useState(null); // Preview untuk konfirmasi
  const [isModalVisible, setModalVisible] = useState(false); // Kontrol modal
  const fileInputRef = useRef(null); // Untuk memicu input file

  // Fungsi untuk membuka file picker
  const triggerAvatarUpload = () => {
    fileInputRef.current.click();
  };

  // Fungsi untuk preview gambar dan menampilkan modal
  const previewAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result); // Set preview ke URL gambar
        setModalVisible(true); // Tampilkan modal
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi untuk mengganti avatar
  const changeAvatar = () => {
    setAvatar(preview); // Set avatar dengan preview
    setModalVisible(false); // Tutup modal
    setPreview(null); // Reset preview
  };

  return (
    <div className="container my-5">
      {/* Tombol Kembali */}
      <button className="btn btn-outline-secondary mb-4">
        <i className="bi bi-arrow-left"></i> Kembali
      </button>

      <h2 className="mb-4">Profil</h2>
      <div className="card profile-card mb-5 p-4 shadow">
        <div className="card-body">
          <div className="d-flex align-items-center">
            {/* Bagian Avatar */}
            <div
              className="custom-profile-avatar"
              onClick={triggerAvatarUpload}
              style={{
                width: "100px",
                height: "100px",
                overflow: "hidden",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <img
                src={avatar}
                alt="Avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={previewAvatar}
                style={{ display: "none" }}
              />
            </div>

            <div className="ms-4">
              <p className="small text-muted">
                Gunakan gambar persegi beresolusi tinggi maksimal 1MB
              </p>
            </div>
            <a href="/profil/edit" className="ms-auto text-warning">
              Edit
            </a>
          </div>

          <hr />
          <div>
            <p>
              <strong>Nama Lengkap:</strong> Cristiano Ronaldo El Goat
            </p>
            <p>
              <strong>Nomor Hp:</strong> +62 81234567893
            </p>
            <p>
              <strong>E-Mail:</strong> cristianogoatasli@portugal.com
            </p>
            <p>
              <strong>Tanggal Lahir:</strong> 31 Desember 1985
            </p>
            <p>
              <strong>Jenis Kelamin:</strong> Laki-laki
            </p>
          </div>
        </div>
      </div>

      <h4>Pengaturan</h4>
      <div className="list-group mb-5">
        <Link
          to="/ganti-kata-sandi"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <i className="bi bi-lock-fill me-3"></i> Ganti Kata Sandi
        </Link>
      </div>

      <button className="btn btn-outline-danger w-100">Log Out</button>

      {/* Modal Konfirmasi */}
      {isModalVisible && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Konfirmasi Penggantian Avatar</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Apakah Anda yakin ingin mengganti gambar profil?</p>
                <img
                  src={preview}
                  alt="Preview Avatar"
                  className="img-fluid rounded-circle"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalVisible(false)}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={changeAvatar}
                >
                  Ya, Ganti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
