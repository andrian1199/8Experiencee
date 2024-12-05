import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import EventAdmin from "../data/EventAdmin";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const generateId = (index) => `E${String(index + 1).padStart(3, "0")}`;

const formatRupiah = (value) => {
  if (!value || isNaN(value)) return "Rp 0"; // Fallback untuk nilai undefined/null
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

const EventList = () => {
  const [events, setEvents] = useState(
    EventAdmin.map((event, index) => ({ ...event, id: generateId(index) }))
  );

  const [formData, setFormData] = useState({
    tanggal: "",
    nama: "",
    lokasi: "",
    totalTiket: "",
    sisaTiket: "",
    hargaTiket: "",
    totalPenghasilan: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      tanggal: "",
      nama: "",
      lokasi: "",
      totalTiket: "",
      sisaTiket: "",
      hargaTiket: "",
      totalPenghasilan: "",
    });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { totalTiket, sisaTiket, hargaTiket } = formData;

    const totalTiketNum = parseInt(totalTiket, 10);
    const sisaTiketNum = parseInt(sisaTiket, 10);
    const hargaTiketNum = parseInt(hargaTiket, 10);

    if (isNaN(totalTiketNum) || totalTiketNum <= 0) {
      alert("Total tiket harus lebih besar dari 0.");
      return;
    }

    if (isNaN(sisaTiketNum) || sisaTiketNum < 0) {
      alert("Sisa tiket tidak boleh negatif.");
      return;
    }

    if (sisaTiketNum > totalTiketNum) {
      alert("Sisa tiket tidak boleh lebih besar dari total tiket.");
      return;
    }

    if (isNaN(hargaTiketNum) || hargaTiketNum <= 0) {
      alert("Harga tiket harus lebih besar dari 0.");
      return;
    }

    const calculatedRevenue = (totalTiketNum - sisaTiketNum) * hargaTiketNum;

    const newEvent = {
      id: isEditing ? formData.id : generateId(events.length),
      ...formData,
      totalPenghasilan: calculatedRevenue,
    };

    if (isEditing) {
      setEvents((prev) =>
        prev.map((event) => (event.id === formData.id ? newEvent : event))
      );
    } else {
      setEvents([...events, newEvent]);
    }

    resetForm();
  };

  const handleEdit = (event) => {
    setIsEditing(true);
    setFormData(event);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="admin-main container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-md-9 col-lg-10 px-4">
          <header className="admin-header d-flex justify-content-between align-items-center py-3 border-bottom">
            <h4 className="m-0">Daftar Event</h4>
            <div className="d-flex align-items-center">
              <Link to="/admin/profile" className="text-decoration-none text-dark d-flex align-items-center">
                <span className="me-2">Wisnu</span>
                <img
                  src="/path/to/user-profile.png"
                  alt="Admin Profile"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>
            </div>
          </header>

          <div className="admin-container my-3">
            <h5>{isEditing ? "Edit Acara" : "Tambah Acara"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Tanggal Acara</label>
                  <input
                    type="date"
                    className="form-control"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label>Nama Acara</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label>Lokasi</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label>Total Tiket</label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalTiket"
                    value={formData.totalTiket}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label>Sisa Tiket</label>
                  <input
                    type="number"
                    className="form-control"
                    name="sisaTiket"
                    value={formData.sisaTiket}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label>Harga Tiket</label>
                  <input
                    type="number"
                    className="form-control"
                    name="hargaTiket"
                    value={formData.hargaTiket}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn admin-btn-primary">
                {isEditing ? "Simpan Perubahan" : "Tambah Acara"}
              </button>

              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={resetForm}
              >
                Reset
              </button>
            </form>
          </div>

          <div className="admin-container my-4">
            <table className="table table-bordered admin-table">
              <thead className="thead-light">
                <tr>
                  <th>ID Acara</th>
                  <th>Tanggal</th>
                  <th>Nama Acara</th>
                  <th>Lokasi</th>
                  <th>Total Tiket</th>
                  <th>Sisa Tiket</th>
                  <th>Total Penghasilan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.tanggal}</td>
                    <td>{event.nama}</td>
                    <td>{event.lokasi}</td>
                    <td>{event.totalTiket}</td>
                    <td>{event.sisaTiket}</td>
                    <td>{formatRupiah(event.totalPenghasilan)}</td>
                    <td>
                      <button
                        className="btn edit-button btn-sm me-2 "
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn delete-button btn-sm "
                        onClick={() => handleDelete(event.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
