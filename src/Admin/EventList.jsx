import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import EventData from "../data/EventData";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const generateId = (index) => `E${String(index + 1).padStart(3, "0")}`;

const formatRupiah = (value) => {
  if (!value || isNaN(value)) return "Rp 0";
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const EventList = () => {
  const [events, setEvents] = useState(
    EventData.map((event, index) => ({ ...event, id: generateId(index) }))
  );

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    price: "",
    image: "",
    genre: "Pop",
    type: "Konser",
    description: "",
    tickets: [{ type: "", price: "", benefits: "", stock: "" }],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTickets = [...formData.tickets];
    updatedTickets[index] = { ...updatedTickets[index], [name]: value };
    setFormData({ ...formData, tickets: updatedTickets });
  };

  const addTicket = () => {
    setFormData((prev) => ({
      ...prev,
      tickets: [...prev.tickets, { type: "", price: "", benefits: "", stock: "" }],
    }));
  };

  const removeTicket = (index) => {
    const updatedTickets = formData.tickets.filter((_, i) => i !== index);
    setFormData({ ...formData, tickets: updatedTickets });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      location: "",
      price: "",
      image: "",
      genre: "Pop",
      type: "Konser",
      description: "",
      tickets: [{ type: "", price: "", benefits: "", stock: "" }],
    });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.tickets.some((ticket) => !ticket.type || !ticket.price || !ticket.stock)) {
      alert("Semua detail tiket harus diisi!");
      return;
    }

    const newEvent = {
      id: isEditing ? formData.id : generateId(events.length),
      ...formData,
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
                <span className="me-2">Admin</span>
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
              <div className="mb-3">
                <label>Judul</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Tanggal</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Lokasi</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Harga Tiket</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Gambar</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="mb-3">
                <label>Genre</label>
                <select
                  className="form-control"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  required
                >
                  <option>Pop</option>
                  <option>Rock</option>
                  <option>Jazz</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Tipe</label>
                <select
                  className="form-control"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option>Konser</option>
                  <option>Festival</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Deskripsi</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <h5>Tiket</h5>
                {formData.tickets.map((ticket, index) => (
                  <div key={index} className="mb-3 border p-3">
                    <div className="mb-2">
                      <label>Tipe Tiket</label>
                      <input
                        type="text"
                        className="form-control"
                        name="type"
                        value={ticket.type}
                        onChange={(e) => handleTicketChange(index, e)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label>Harga</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={ticket.price}
                        onChange={(e) => handleTicketChange(index, e)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label>Manfaat</label>
                      <input
                        type="text"
                        className="form-control"
                        name="benefits"
                        value={ticket.benefits}
                        onChange={(e) => handleTicketChange(index, e)}
                      />
                    </div>
                    <div className="mb-2">
                      <label>Stok</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={ticket.stock}
                        onChange={(e) => handleTicketChange(index, e)}
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={() => removeTicket(index)}
                    >
                      Hapus Tiket
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-primary mb-3" onClick={addTicket}>
                  Tambah Tiket
                </button>
              </div>

              <button type="submit" className="btn btn-success">
                {isEditing ? "Simpan Perubahan" : "Tambah Acara"}
              </button>
              <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                Reset
              </button>
            </form>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Judul</th>
                  <th>Tanggal</th>
                  <th>Lokasi</th>
                  <th>Harga</th>
                  <th>Gambar</th>
                  <th>Genre</th>
                  <th>Tipe</th>
                  <th>Deskripsi</th>
                  <th>Detail Tiket</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.title}</td>
                    <td>{formatDate(event.date)}</td>
                    <td>{event.location}</td>
                    <td>{formatRupiah(Number(event.price))}</td>
                    <td>
                      {event.image && (
                        <img src={event.image} alt="Event" style={{ width: "100px" }} />
                      )}
                    </td>
                    <td>{event.genre}</td>
                    <td>{event.type}</td>
                    <td>{event.description}</td>
                    <td>
                      {event.tickets.map((ticket, index) => (
                        <div key={index}>
                          <p>Tipe: {ticket.type}</p>
                          <p>Harga: {formatRupiah(Number(ticket.price))}</p>
                          <p>Manfaat: {ticket.benefits}</p>
                          <p>Stok: {ticket.stock}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary mb-2"
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
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
