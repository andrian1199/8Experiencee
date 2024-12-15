import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BlogDetailPage.css';
import Footer from '../components/Footer';

const BlogDetailPage = () => {
  const { id } = useParams(); // Ambil id dari URL
  const [blog, setBlog] = useState(null); // State untuk menyimpan data blog
  const [error, setError] = useState(null); // State untuk menyimpan error

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blogs/${id}`); // Endpoint backend
        if (!response.ok) {
          throw new Error('Blog tidak ditemukan');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!blog) {
    return <div>Memuat...</div>; // Loading state
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Pastikan tinggi minimal halaman adalah seluruh layar
      }}
    >
      {/* Kontainer Utama */}
      <div
        className="container blog-detail"
        style={{
          flex: 1, // Isi ruang yang tersedia di antara header dan footer
          padding: '20px',
          maxWidth: '1200px', // Batasi lebar maksimal
          margin: '0 auto', // Pusatkan konten
        }}
      >
        {/* Tombol Kembali */}
        <a
          href="/blog"
          style={{
            fontSize: '1rem',
            fontStyle: 'italic',
            textDecoration: 'underline',
            color: '#212121',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#ffc107')}
          onMouseLeave={(e) => (e.target.style.color = '#212121')}
        >
          ← Kembali
        </a>

        {/* Kategori dan Tanggal */}
        <div className="d-flex align-items-center mb-3">
          <span className="badge bg-warning text-dark" style={{ borderRadius: '50px', padding: '0.4em 0.8em' }}>
            {blog.category}
          </span>
          <span className="text-muted ms-3">{blog.date}</span>
        </div>

        <h1 className="mt-3">{blog.title}</h1>

        {/* Profil Penulis */}
        <div className="profile d-flex align-items-center mt-3 mb-4">
          <img
            className="rounded-circle me-3 profile-pic"
            src={blog.authorPic}
            alt="Author"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
          <div>
            <h6 className="mb-0">{blog.author}</h6>
            <small className="text-muted">{blog.authorBio}</small>
          </div>
        </div>

        {/* Konten Utama Blog */}
        <div className="content">
          <img
            src={blog.image}
            alt="Gambar Blog"
            className="img-fluid rounded mb-4"
            style={{ width: '100%', height: 'auto', maxWidth: '800px' }}
          />
          <p>{blog.content}</p>
        </div>
      </div>

      {/* Footer */}
      <Footer
        style={{
          width: '100%',
          backgroundColor: '#212121',
          color: 'white',
          textAlign: 'center',
          padding: '10px 0',
          marginTop: 'auto', // Pastikan footer berada di bawah konten
        }}
      />
    </div>
  );
};

export default BlogDetailPage;
