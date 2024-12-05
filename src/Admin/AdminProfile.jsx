import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Import Sidebar

const FormInput = ({ label, type, name, value, onChange, placeholder, error }) => (
  <div className="col-md-6">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      type={type}
      className="form-control"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <small className="text-danger">{error}</small>}
  </div>
);

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    nama: "Wisnu",
    password: "********",
    email: "wisnu@macro.com",
    phone: "081346879879",
    birthdate: "2004-08-11",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return value.includes("@") ? null : "Email tidak valid.";
      case "phone":
        return /^\d{10,13}$/.test(value) ? null : "Nomor telepon harus 10-13 digit.";
      case "nama":
        return value.trim() ? null : "Nama tidak boleh kosong.";
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Form submitted:", formData);
      alert("Data berhasil disimpan!");
      setLoading(false);
    }, 1000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 px-4">
          <h2 className="mb-4" style={{ marginTop: "20px" }}>Profil</h2> {/* Geser teks profil sedikit ke bawah */}
          <div className="profile-container p-4">
            <div className="text-center mb-4">
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-circle profile-img"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden id="photoUpload" />
              <label htmlFor="photoUpload" className="mt-2 text-warning" style={{ cursor: "pointer" }}>
                Edit Foto
              </label> {/* Pindahkan label ke bawah gambar */}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Nama */}
                <FormInput
                  label="Nama"
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama Anda"
                  error={errors.nama}
                />

                {/* Password */}
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Masukkan password Anda"
                />

                {/* Email */}
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Masukkan email Anda"
                  error={errors.email}
                />

                {/* Nomor Telepon */}
                <FormInput
                  label="Nomor Telp."
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Masukkan nomor telepon Anda"
                  error={errors.phone}
                />

                {/* Tanggal Lahir */}
                <FormInput
                  label="Tanggal Lahir"
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                />
              </div>

              {/* Tombol Simpan */}
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-warning px-4" disabled={loading}>
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
