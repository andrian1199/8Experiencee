import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navigasi from '../komponen Home/Navigasi'; // Pastikan path import sudah benar
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Profile.css'; //

// Fungsi untuk memformat tanggal menjadi dd-mm-yyyy
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', options); // Menggunakan locale id-ID untuk format dd-mm-yyyy
};

function ProfilePage() {
  const [avatar, setAvatar] = useState("/assets/Bernadya 1.webp"); // Avatar default
  const [preview, setPreview] = useState(null); // Preview untuk konfirmasi
  const [isModalVisible, setModalVisible] = useState(false); // Kontrol modal
  const [user, setUser] = useState(null); // Data pengguna
  const [error, setError] = useState(""); // Error message
  const fileInputRef = useRef(null); // Untuk memicu input file
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Jika tidak ada token, arahkan ke halaman login
      return;
    }

    // Ambil data pengguna dari backend
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.user); // Set data pengguna
        } else {
          setError(response.data.message); // Set error jika ada masalah
        }
      })
      .catch((err) => {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      });
  }, [navigate]);

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

   // Fungsi untuk kembali ke halaman sebelumnya
  const goBack = () => {
    navigate(-1); // -1 berarti kembali ke halaman sebelumnya
  };

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
          setUser(response.data.user); // Pastikan data pengguna diambil
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      });
  }, [navigate]);
  
  // Menambahkan data pengguna saat menavigasi ke StatusPembayaran
  const handleGoToStatusPembayaran = () => {
    navigate("/status-pembayaran", {
      state: {
        eventDetail,
        selectedTickets,
        totalPrice,
        selectedMethod,
        user: {
          username: user.username,
          email: user.email,
          birth_date: user.birth_date,
        },
      },
    });
  };
  
  

  return (
    <div>
      {/* Navigasi ditempatkan di atas */}
      <Navigasi />

      {/* Tambahkan padding-top untuk memberikan jarak antara navbar dan konten */}
      <div className="container my-5" style={{ paddingTop: '80px' }}>
        {/* Tombol Kembali */}
        <button 
        className="btn btn-outline-secondary mb-4" 
        onClick={goBack} // Panggil fungsi goBack ketika tombol diklik
      >
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
            {/* Tampilkan data pengguna */}
            {user ? (
              <div>
                <p>
                  <strong>Nama Lengkap:</strong> {user.username}
                </p>
                <p>
                  <strong>Nomor Hp:</strong> {user.phone}
                </p>
                <p>
                  <strong>E-Mail:</strong> {user.email}
                </p>
                <p>
                  <strong>Tanggal Lahir:</strong> {user.birth_date ? formatDate(user.birth_date) : 'Tanggal tidak tersedia'}
                </p>
                <p>
                  <strong>Jenis Kelamin:</strong> Laki-laki {/* Atur sesuai data gender */}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
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

        <button
          className="btn"
          style={{
            border: "2px solid red",  // Outline merah
            color: "red",  // Teks merah
            borderRadius: "40px",
            backgroundColor: "transparent",  // Latar belakang transparan
            display: "block",
            margin: "0 auto",  // Menempatkan tombol di tengah
            width: "200px",  // Lebar tombol
            padding: "10px",  // Padding tombol
          }}
        >
          Log Out
        </button>



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
    </div>
  );
}

export default ProfilePage;
