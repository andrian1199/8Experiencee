import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            Festix
          </a>
        </div>
      </nav>

      <div className="container my-5">
        {/* Tombol Kembali */}
        <button
          className="btn btn-outline-secondary mb-4"
          onClick={() => navigate("/profil")}
        >
          &larr; Kembali
        </button>

        <h2 className="mb-4">Edit Profil</h2>

        {/* Info Akun Pemilik */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Info Akun Pemilik</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="namaLengkap" className="form-label">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="namaLengkap"
                  className="form-control"
                  placeholder="Masukkan namamu..."
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tanggalLahir" className="form-label">
                  Tanggal Lahir
                </label>
                <input type="date" id="tanggalLahir" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="jenisKelamin" className="form-label">
                  Jenis Kelamin
                </label>
                <select id="jenisKelamin" className="form-select">
                  <option value="" defaultValue>
                    Pilih jenis kelamin
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* Nomor HP dan Email */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Nomor HP dan Email</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="nomorHp" className="form-label">
                  Nomor HP
                </label>
                <input
                  type="text"
                  id="nomorHp"
                  className="form-control"
                  defaultValue="+62 81234567893"
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
                  defaultValue="cristianogoat@portugal.com"
                />
                <small className="text-muted">
                  Jika Anda mengganti email, semua pembayaran elektronik akan
                  terputus.
                </small>
              </div>
            </form>
          </div>
        </div>

        {/* Tombol Simpan */}
        <button className="btn btn-warning w-100">Simpan</button>
      </div>
    </>
  );
}

export default EditProfilePage;
