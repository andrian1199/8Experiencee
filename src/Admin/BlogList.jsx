import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    author: "",
    authorPic: "",
    authorBio: "",
    date: "",
    image: "",
    content: "",
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file && file.type.startsWith("image")) {
      const imageUrl = `/public/images/${file.name}`;
      setForm({ ...form, [name]: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedForm = {
        ...form,
        image: form.image || "/public/images/default.jpg",
      };
      if (editId) {
        await axios.put(`http://localhost:5000/blogs/${editId}`, updatedForm);
        alert("Blog updated successfully");
      } else {
        await axios.post("http://localhost:5000/blogs", updatedForm);
        alert("Blog added successfully");
      }
      setForm({
        title: "",
        category: "",
        author: "",
        authorPic: "",
        authorBio: "",
        date: "",
        image: "",
        content: "",
      });
      setEditId(null);
      toggleModal();
      fetchBlogs();
    } catch (error) {
      console.error("Failed to save blog:", error);
    }
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditId(blog.id);
    toggleModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/blogs/${id}`);
        alert("Blog deleted successfully");
        fetchBlogs();
      } catch (error) {
        console.error("Failed to delete blog:", error);
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5" style={{ marginLeft: "300px" }}>
        <h2>Manage Blogs</h2>
        <button
          className="btn btn-success mb-3"
          onClick={() => {
            setForm({
              title: "",
              category: "",
              author: "",
              authorPic: "",
              authorBio: "",
              date: "",
              image: "",
              content: "",
            });
            setEditId(null);
            toggleModal();
          }}
        >
          Add Blog
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
      alignItems: "flex-start",
      paddingTop: "50px",
      overflowY: "auto",
      zIndex: 1000,
    }}
    onClick={toggleModal}
  >
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "600px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        position: "relative",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Ikon X untuk menutup modal */}
      <button
        onClick={toggleModal}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#000",
        }}
      >
        &times;
      </button>

      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        {editId ? "Edit Blog" : "Add Blog"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
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
        <div style={{ marginBottom: "15px" }}>
            <label>Category</label>
            <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="form-control"
                required
            >
                <option value="" disabled>
                Select Category
                </option>
                <option value="Musik">Musik</option>
                <option value="Artis">Artis</option>
                <option value="Tips">Tips</option>
            </select>
            </div>
            
        <div style={{ marginBottom: "15px" }}>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Author Picture</label>
          <input
            type="file"
            name="authorPic"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Author Bio</label>
          <textarea
            name="authorBio"
            value={form.authorBio}
            onChange={handleInputChange}
            className="form-control"
          ></textarea>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleInputChange}
            className="form-control"
            required
          ></textarea>
        </div>

        {/* Tombol Add dan Cancel diatur dalam satu baris */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button type="submit" style={{ backgroundColor: "#ffcf00", color: "black", border: "none", padding: "10px 20px", borderRadius: "40px", cursor: "pointer" }}>
            {editId ? "Update" : "Add"} Blog
          </button>
          <button
            type="button"
            onClick={toggleModal}
            style={{ backgroundColor: "#6c757d", color: "white", border: "none", padding: "10px 20px", borderRadius: "40px", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}



        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Author Pic</th>
                <th>Author Bio</th>
                <th>Date</th>
                <th>Image</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.author}</td>
                  <td>
                    <img
                      src={blog.authorPic}
                      alt="Author"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{blog.authorBio}</td>
                  <td>{blog.date}</td>
                  <td>
                    <img
                      src={blog.image}
                      alt="Blog"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{blog.content}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          color: "blue",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "5px",
                        }}
                        onClick={() => handleEdit(blog)}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ marginRight: "5px" }}
                        />
                        Edit
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
                        onClick={() => handleDelete(blog.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ marginRight: "5px" }}
                        />
                        Delete
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

export default BlogList;
