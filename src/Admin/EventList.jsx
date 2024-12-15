import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:5000/events";

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
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    price: "",
    genre: "Pop",
    type: "Konser",
    description: "",
    image: "",
    additionalImage: "",
    tickets: [{ type: "", price: "", benefits: "", stock: "" }],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_URL);
        const eventsWithTickets = response.data.map((event) => ({
          ...event,
          tickets: Array.isArray(event.tickets) ? event.tickets : [], // Pastikan tickets array
        }));
        setEvents(eventsWithTickets);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    
    
    };
  
    fetchEvents(); // Pemanggilan fungsi fetch
  }, []); // Tambahkan [] untuk memastikan ini hanya dipanggil sekali.
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const filePath = `/images/${file.name}`;
      setFormData((prev) => ({ ...prev, image: filePath }));
    } else {
      alert('Harap pilih file gambar');
    }
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = formData.tickets.map((ticket, i) =>
      i === index ? { ...ticket, [field]: value } : ticket
    );
    setFormData((prev) => ({ ...prev, tickets: updatedTickets }));
  };

  const addTicket = () => {
    setFormData((prev) => ({
        ...prev,
        tickets: [...prev.tickets, { type: "", price: "", benefits: "", stock: "" }],
    }));
};


  const removeTicket = (index) => {
    const updatedTickets = formData.tickets.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tickets: updatedTickets }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(formData.date).toISOString().split("T")[0];

    try {
        const dataToSend = { ...formData, date: formattedDate };

        let response;
        if (isEditing) {
            response = await axios.put(`${API_URL}/${formData.id}`, dataToSend);
        } else {
            response = await axios.post(API_URL, dataToSend);
        }

        // Cek respons eventId hanya sekali
        const eventId = response.data.eventId;
        if (eventId && formData.tickets.length > 0) {
            const ticketPromises = formData.tickets.map(ticket => 
                axios.post("http://localhost:5000/tickets", {
                    event_id: eventId,
                    ...ticket,
                })
            );
            await Promise.all(ticketPromises); // Pastikan hanya satu kali loop
        }

        resetForm();
        setShowModal(false);
        alert("Event dan tiket berhasil disimpan.");
    } catch (error) {
        console.error("Error:", error.response || error.message);
        alert(`Terjadi kesalahan: ${error.response?.data?.message || error.message}`);
    }
};

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus acara ini?")) {
      try {
        console.log(`Menghapus event dengan ID: ${id}`); // Debugging log
        await axios.delete(`${API_URL}/${id}`);
        
        // Perbarui state setelah berhasil menghapus
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        console.log("Event berhasil dihapus.");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Gagal menghapus acara. Silakan coba lagi.");
      }
    }
  };

  const handleDeleteTicket = async (ticketId, eventId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tiket ini?')) {
      try {
        console.log(`Menghapus tiket dengan ID: ${ticketId}`); // Debugging log
        await axios.delete(`http://localhost:5000/tickets/${ticketId}`);
        
        // Perbarui state acara untuk menghapus tiket dari daftar
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId
              ? { ...event, tickets: event.tickets.filter((ticket) => ticket.id !== ticketId) }
              : event
          )
        );
        console.log('Tiket berhasil dihapus.');
      } catch (error) {
        console.error('Error deleting ticket:', error);
        alert('Gagal menghapus tiket. Silakan coba lagi.');
      }
    }
  };


  const resetForm = () => {
    console.log("Form Reset");
    setFormData({
      title: "",
      date: "",
      location: "",
      price: "",
      genre: "Pop",
      type: "Konser",
      description: "",
      image: "",
      additionalImage: "",
      tickets: [{ type: "", price: "", benefits: "", stock: "" }],
    });
    setIsEditing(false);
  };
  

  return (
    <div className="admin-main container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 col-lg-10 px-4">
          <header className="admin-header d-flex justify-content-between align-items-center py-3 border-bottom">
            <h4 className="m-0">Daftar Event</h4>
            <Link to="/admin/profile" className="text-decoration-none text-dark">
              <span>Admin</span>
            </Link>
          </header>
          <button
              className="btn btn-primary mb-3"
              style={{
                backgroundColor: "#FFCF00",
                color: "#212121",
                border: "none",
                borderRadius: "40px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsEditing(false);
                setShowModal(true);
              }}
            >
              Tambah Acara
          </button>

          <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered" style={{ borderRadius: "5px", overflow: "hidden" }}>
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Judul</th>
                  <th>Tanggal</th>
                  <th>Lokasi</th>
                  <th>Harga</th>
                  <th>Genre</th>
                  <th>Tipe</th>
                  <th>Deskripsi</th>
                  <th>Gambar Event</th>
                  <th>Gambar Deskripsi</th>
                  <th>Tiket</th>
                  <th>Aksi</th>
                  <th>Manajemen Tiket</th>
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
                    <td>{event.genre}</td>
                    <td>{event.type}</td>
                    <td>{truncateText(event.description, 100)}</td>
                    <td>
                      <img src={event.image} alt="Gambar" className="img-thumbnail" style={{ width: "80px", height: "80px" }} />
                    </td>
                    <td>
                      <img
                        src={event.additionalImage}
                        alt="Gambar Tambahan"
                        className="img-thumbnail"
                        style={{ width: "80px", height: "80px" }}
                      />
                    </td>
                    <td>
                      {event.tickets && event.tickets.length > 0 ? (
                        <ul className="list-unstyled">
                          {event.tickets.map((ticket, index) => (
                            <li key={index} className="mb-2">
                              {ticket.type} - {formatRupiah(ticket.price)} - Stok: {ticket.stock}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted">Tidak ada tiket</span>
                      )}
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* Tombol Edit */}
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "blue",
                            cursor: "pointer",
                            fontSize: "16px",
                            padding: "5px",
                          }}
                          onClick={() => {
                            setIsEditing(true);
                            setFormData({
                              ...event,
                              tickets: event.tickets || [], // Pastikan tickets array
                            });
                            setShowModal(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} /> Edit
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "red",
                            cursor: "pointer",
                            fontSize: "16px",
                            padding: "5px",
                          }}
                          onClick={() => handleDelete(event.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} /> Hapus
                        </button>
                      </div>
                    </td>

                    <td>
                      {event.tickets && event.tickets.length > 0 ? (
                        <ul className="list-unstyled">
                          {event.tickets.map((ticket, index) => (
                            <li key={index} className="mb-2">
                              {ticket.type} - {formatRupiah(ticket.price)} - Stok: {ticket.stock}
                              <button
                                onClick={() => handleDeleteTicket(ticket.id, event.id)}
                                className="btn btn-danger btn-sm ms-2"
                              >
                                Hapus Tiket
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted">Tidak ada tiket</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      {showModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      overflow: "auto",
    }}
    onClick={() => setShowModal(false)}
  >
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "30px",
        width: "90%",
        maxWidth: "600px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        position: "relative",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setShowModal(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        &times;
      </button>

      <h5 style={{ marginBottom: "20px" }}>
        {isEditing ? "Edit Acara" : "Tambah Acara"}
      </h5>
      <form onSubmit={handleSubmit}>
        {/* Input Field untuk Judul */}
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

        {/* Input Field untuk Tanggal */}
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

        {/* Input Field untuk Lokasi */}
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

        {/* Input Field untuk Harga */}
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

        {/* Dropdown untuk Genre */}
        <div className="mb-3">
          <label>Genre</label>
          <select
            className="form-control"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            required
          >
            <option value="">Pilih Genre</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        {/* Dropdown untuk Tipe Acara */}
        <div className="mb-3">
          <label>Tipe Acara</label>
          <select
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Pilih Tipe Acara</option>
            <option value="festival">Festival</option>
            <option value="konser">Konser</option>
          </select>
        </div>

        {/* Input Field untuk Deskripsi */}
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

        {/* Tombol Simpan dan Batal */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: "#ffcf00",
              color: "black",
              border: "none",
              padding: "10px 20px",
              borderRadius: "40px",
              cursor: "pointer",
            }}
          >
            {isEditing ? "Update" : "Add"} Event
          </button>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "40px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default EventList;