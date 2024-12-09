import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import EventData from "../data/EventData";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const generateId = (index) => E${String(index + 1).padStart(3, "0")};

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
  const [showModal, setShowModal] = useState(false); // Untuk mengontrol pop-up modal
  const [showConfirmation, setShowConfirmation] = useState(false); // Untuk konfirmasi setelah edit

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
    
    // Jika ada tiket yang belum lengkap, tampilkan alert
    if (formData.tickets.some((ticket) => !ticket.type || !ticket.price || !ticket.stock)) {
      alert("Semua detail tiket harus diisi!");
      return;
    }
  
    // Konfirmasi jika sedang mengedit event
    if (isEditing) {
      const confirmEdit = window.confirm("Apakah Anda yakin ingin mengedit acara ini?");
      if (!confirmEdit) {
        return; // Jika tidak yakin, batalkan proses edit
      }
    }
  
    const newEvent = {
      id: isEditing ? formData.id : generateId(events.length),
      ...formData,
    };
  
    // Proses menyimpan atau mengupdate event
    if (isEditing) {
      setEvents((prev) =>
        prev.map((event) => (event.id === formData.id ? newEvent : event))
      );
    } else {
      setEvents([...events, newEvent]);
    }
  
    resetForm(); // Reset form setelah submit
    setShowModal(false); // Menutup modal
  };
  

  const handleEdit = (event) => {
    setIsEditing(true);
    setFormData(event);
    setShowModal(true); // Membuka modal untuk edit
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus acara ini?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
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
            <button
              className="btn btn-primary mb-3"
              onClick={() => {
                setIsEditing(false);
                setShowModal(true); // Membuka modal untuk tambah acara
              }}
            >
              Tambah Acara
            </button>
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

      {/* Modal Form Acara */}
      <div className={modal fade ${showModal ? "show" : ""}} style={{ display: showModal ? "block" : "none" }} tabIndex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="eventModalLabel">
                {isEditing ? "Edit Acara" : "Tambah Acara"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
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
                  <label>Harga</label>
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
                  <label>Deskripsi</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label>Genre</label>
                  <select
                    className="form-control"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                  >
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Indie">Indie</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Tipe</label>
                  <select
                    className="form-control"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="Konser">Konser</option>
                    <option value="Festival">Festival</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Gambar</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Tiket Section */}
                <h5>Tiket</h5>
                {formData.tickets.map((ticket, index) => (
                  <div key={index} className="mb-3">
                    <label>Tipe Tiket {index + 1}</label>
                    <input
                      type="text"
                      className="form-control"
                      name="type"
                      value={ticket.type}
                      onChange={(e) => handleTicketChange(index, e)}
                    />
                    <label>Harga</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, e)}
                    />
                    <label>Manfaat</label>
                    <input
                      type="text"
                      className="form-control"
                      name="benefits"
                      value={ticket.benefits}
                      onChange={(e) => handleTicketChange(index, e)}
                    />
                    <label>Stok</label>
                    <input
                      type="number"
                      className="form-control"
                      name="stock"
                      value={ticket.stock}
                      onChange={(e) => handleTicketChange(index, e)}
                    />
                    <button
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={() => removeTicket(index)}
                    >
                      Hapus Tiket
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={addTicket}>
                  Tambah Tiket
                </button>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => setShowModal(false)}
                  >
                    Tutup
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? "Simpan Perubahan" : "Tambah Acara"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {showConfirmation && (
        <div className="modal fade show" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Perubahan Tersimpan</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmation(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Perubahan acara telah disimpan dengan sukses!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowConfirmation(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;