import React, { useState } from "react";

const LoginAdmin = () => {
  // Daftar admin sementara
  const admins = [
    { nama: "admin1", password: "password123" },
    { nama: "admin2", password: "adminpass" },
  ];

  const [formData, setFormData] = useState({ nama: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek apakah nama dan password cocok dengan salah satu admin
    const admin = admins.find(
      (admin) => admin.nama === formData.nama && admin.password === formData.password
    );

    if (admin) {
      // Login berhasil
      alert("Login Berhasil!");
      // Redirect atau tampilkan halaman admin
      window.location.href = "/admin/dashboard"; 
    } else {
      // Login gagal
      setError("Nama atau password salah!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <img
            src="/assets/FesTix 1.svg"
            alt="Festix Logo"
            className="logo"
          />
          <h2 className="login-title">Login Sebagai Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="nama"
                placeholder="Masukkan Nama"
                value={formData.nama}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Masukkan Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-warning btn-block">
              Login
            </button>
            <div className="text-center mt-2">
              <a href="#!" className="forgot-password">
                Lupa Password?
              </a>
            </div>
          </form>
        </div>
        <div className="login-right">
          <img
            src="/assets/contacts.png"
            alt="Login Illustration"
            className="illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
