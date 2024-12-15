import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    image: "",
    whatsappLink: "",
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/communities");
      setCommunities(response.data);
    } catch (error) {
      console.error("Failed to fetch communities:", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const imageUrl = `/public/images/${file.name}`;
      setForm({ ...form, image: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedForm = {
        ...form,
        image: form.image ? form.image : "/public/images/",
      };
      if (editId) {
        await axios.put(`http://localhost:5000/communities/${editId}`, updatedForm);
        alert("Community updated successfully");
      } else {
        await axios.post("http://localhost:5000/communities", updatedForm);
        alert("Community added successfully");
      }
      setForm({
        title: "",
        description: "",
        content: "",
        category: "",
        image: "",
        whatsappLink: "",
      });
      setEditId(null);
      toggleModal();
      fetchCommunities();
    } catch (error) {
      console.error("Failed to save community:", error);
    }
  };

  const handleEdit = (community) => {
    setForm({ ...community, image: community.image || "/public/images/sod.png" });
    setEditId(community.id);
    toggleModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this community?")) {
      try {
        await axios.delete(`http://localhost:5000/communities/${id}`);
        alert("Community deleted successfully");
        fetchCommunities();
      } catch (error) {
        console.error("Failed to delete community:", error);
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5" style={{ marginLeft: "300px" }}>
        <h2>Atur Komunitas</h2>
        <button
          className="btn btn-success mb-3"
          onClick={() => {
            setForm({
              title: "",
              description: "",
              content: "",
              category: "",
              image: "",
              whatsappLink: "",
            });
            setEditId(null);
            toggleModal();
          }}
        >
          Tambah Komunitas
        </button>

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
            }}
            onClick={toggleModal}
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
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Icon */}
              <button
                onClick={toggleModal}
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
              <h2>{editId ? "Edit Community" : "Add Community"}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Judul</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Deskripsi</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Konten</label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Kategori</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Gambar</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label>WhatsApp Link</label>
                  <input
                    type="text"
                    name="whatsappLink"
                    value={form.whatsappLink}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button type="submit" className="btn btn-primary">
                    {editId ? "Update" : "Add"} Komunitas
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleModal}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table
            className="table table-striped table-hover table-bordered"
            style={{ borderRadius: "5px", overflow: "hidden" }}
          >
            <thead className="table-dark">
              <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Judul</th>
                <th style={{ textAlign: "center" }}>Deskripsi</th>
                <th style={{ textAlign: "center" }}>Konten</th>
                <th style={{ textAlign: "center" }}>Kategori</th>
                <th>Gambar</th>
                <th style={{ textAlign: "center" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {communities.map((community) => (
                <tr key={community.id}>
                  <td>{community.id}</td>
                  <td style={{ textAlign: "center" }}>{community.title}</td>
                  <td>{truncateText(community.description, 100)}</td>
                  <td>{truncateText(community.content, 100)}</td>
                  <td style={{ textAlign: "center" }}>{community.category}</td>
                  <td>
                    <img
                      src={community.image}
                      alt="Gambar"
                      className="img-thumbnail"
                      style={{ width: "80px", height: "80px" }}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
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
                          handleEdit(community);
                          toggleModal();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} /> Edit
                      </button>

                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          color: "red",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "5px",
                        }}
                        onClick={() => handleDelete(community.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
