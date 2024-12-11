import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar component
import "../styles/Komunitas.css";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    img: "",
    whatsappLink: "",
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Fetch communities
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

  // Handle image URL selection from file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const imageUrl = `/public/images/${file.name}`;
      setForm({ ...form, img: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedForm = {
        ...form,
        img: form.img ? form.img : "/public/images/sod.png",
      };
      if (editId) {
        // Update the community
        await axios.put(`http://localhost:5000/communities/${editId}`, updatedForm);
        alert("Community updated successfully");
      } else {
        // Add a new community
        await axios.post("http://localhost:5000/communities", updatedForm);
        alert("Community added successfully");
      }
      setForm({
        title: "",
        description: "",
        content: "",
        category: "",
        img: "",
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
    setForm({ ...community, img: community.img || "/public/images/sod.png" });
    setEditId(community.id);
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
      <Sidebar /> {/* Add Sidebar */}
      <div className="container my-5" style={{ marginLeft: "300px" }}> {/* Adjust margin for Sidebar */}
        <h2>Manage Communities</h2>

        {/* Button to open modal */}
        <button
          className="btn btn-success mb-3"
          onClick={() => {
            setForm({
              title: "",
              description: "",
              content: "",
              category: "",
              img: "",
              whatsappLink: "",
            });
            setEditId(null);
            toggleModal();
          }}
        >
          Add Community
        </button>

        {/* Modal for Add/Edit Form */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{editId ? "Edit Community" : "Add Community"}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Title</label>
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
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Content</label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Image</label>
                  <input
                    type="file"
                    name="img"
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
                <button type="submit" className="btn btn-primary">
                  {editId ? "Update" : "Add"} Community
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community) => (
              <tr key={community.id}>
                <td>{community.title}</td>
                <td>{community.description}</td>
                <td>{community.category}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => {
                      handleEdit(community);
                      toggleModal();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(community.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityList;
