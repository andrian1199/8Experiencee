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
  
    // Debugging: Cek apakah fungsi dijalankan
    console.log("Handle Submit Called");
  
    const formattedDate = new Date(formData.date).toISOString().split("T")[0];
  
    try {
      const dataToSend = { ...formData, date: formattedDate };
  
      console.log("Data yang akan dikirim:", dataToSend);
  
      let response;
      let eventId;
  
      if (isEditing) {
        response = await axios.put(`${API_URL}/${formData.id}`, dataToSend);
        setEvents((prev) =>
          prev.map((event) => (event.id === formData.id ? dataToSend : event))
        );
        eventId = formData.id;
      } else {
        response = await axios.post(API_URL, dataToSend);
        setEvents([...events, response.data]);
        eventId = response.data.id;
      }
  
      console.log("Response dari API:", response);
  
      // Validasi tiket sebelum dikirim
      for (const ticket of formData.tickets) {
        // Validasi tiket: pastikan harga dan stok valid
        if (!ticket.type || !ticket.price || !ticket.stock) {
          alert("Tiket tidak valid. Pastikan semua data tiket terisi dengan benar.");
          return;  // Stop pengiriman data jika ada tiket tidak valid
        }
  
        // Pastikan harga tiket valid
        if (isNaN(ticket.price) || ticket.price <= 0) {
          alert("Harga tiket harus berupa angka dan lebih besar dari 0.");
          return;
        }
  
        // Pastikan stok tiket valid
        if (isNaN(ticket.stock) || ticket.stock < 0) {
          alert("Stok tiket harus berupa angka dan lebih besar atau sama dengan 0.");
          return;
        }
  
        // Kirim data tiket ke back-end
        const ticketResponse = await axios.post("http://localhost:5000/tickets", {
          event_id: eventId,
          type: ticket.type,
          price: ticket.price,
          benefits: ticket.benefits,
          stock: ticket.stock,
        });
        console.log("Ticket berhasil disimpan:", ticketResponse);
      }
  
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving event and tickets:", error);
      alert("Terjadi kesalahan saat menyimpan event dan tiket. Periksa konsol untuk detail error.");
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
            <table className="table table-bordered">
              <thead>
                  <tr>
                    <th>ID</th>
                    <th>Judul</th>
                    <th>Tanggal</th>
                    <th>Lokasi</th>
                    <th>Harga</th>
                    <th>Genre</th>
                    <th>Tipe</th>
                    <th>Deskripsi</th>
                    <th>Gambar</th>
                    <th>Gambar Tambahan</th>
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
                        <img src={event.image} alt="Gambar" style={{ width: "50px", height: "50px" }} />
                      </td>
                      <td>
                        <img
                          src={event.additionalImage}
                          alt="Gambar Tambahan"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>
                        {event.tickets && event.tickets.length > 0 ? (
                          <ul>
                            {event.tickets.map((ticket, index) => (
                              <li key={index}>
                                {ticket.type} - {formatRupiah(ticket.price)} - Stok: {ticket.stock}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>Tidak ada tiket</span>
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
                          <ul>
                            {event.tickets.map((ticket, index) => (
                              <li key={index}>
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
                          <span>Tidak ada tiket</span>
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
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit Acara" : "Tambah Acara"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
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
                  <label>Genre</label>
                  <input
                    className="form-control"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Tipe Acara</label>
                  <input
                    className="form-control"
                    name="type"
                    value={formData.type}
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

                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="URL Gambar"
                    required
                  />
                  <input
                    type="text"
                    name="additionalImage"
                    value={formData.additionalImage}
                    onChange={handleInputChange}
                    placeholder="URL Gambar Tambahan"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary mb-3"
                    onClick={addTicket}
                  >
                    Tambah Tiket
                  </button>
                  {formData.tickets?.map((ticket, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={ticket.type}
                        onChange={(e) =>
                          handleTicketChange(index, "type", e.target.value)
                        }
                        placeholder="Tipe Tiket"
                        required
                      />
                      <input
                        type="number"
                        value={ticket.price}
                        onChange={(e) =>
                          handleTicketChange(index, "price", e.target.value)
                        }
                        placeholder="Harga Tiket"
                        required
                      />
                      <input
                        type="text"
                        value={ticket.benefits}
                        onChange={(e) =>
                          handleTicketChange(index, "benefits", e.target.value)
                        }
                        placeholder="Keuntungan"
                      />
                      <input
                        type="number"
                        value={ticket.stock}
                        onChange={(e) =>
                          handleTicketChange(index, "stock", e.target.value)
                        }
                        placeholder="Stok"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeTicket(index)}
                        className="btn btn-danger"
                      >
                        Hapus Tiket
                      </button>
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
