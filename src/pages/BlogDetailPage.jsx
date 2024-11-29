import React from 'react';
import { useParams } from 'react-router-dom';
import blogData from '../data/BlogData'; // Import data blog
import '../styles/BlogDetailPage.css';

const BlogDetailPage = () => {
  const { id } = useParams(); // Ambil id dari URL
  const blog = blogData.find((blogItem) => blogItem.id === parseInt(id)); // Cari blog berdasarkan id

  if (!blog) {
    return <div>Blog tidak ditemukan</div>;
  }

  return (
    <div className="container blog-detail">
      <a href="/blog" className="btn btn-link text-dark mb-3">← Kembali</a>

      <div className="d-flex align-items-center mb-3">
        <span className="badge bg-warning text-dark" style={{ borderRadius: '50px', padding: '0.4em 0.8em' }}>
          {blog.category}
        </span>
        <span className="text-muted ms-3">{blog.date}</span>
      </div>

      <h1 className="mt-3">{blog.title}</h1>

      <div className="profile d-flex align-items-center mt-3 mb-4">
        <img
          className="rounded-circle me-3 profile-pic"
          src={blog.authorPic}  // Menggunakan path relatif tanpa slash di depan
          alt="Author"
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
        <div>
          <h6 className="mb-0">{blog.author}</h6>
          <small className="text-muted">{blog.authorBio}</small>
        </div>
      </div>

      {/* Konten utama blog */}
      <div className="content">
        <img
          src={blog.image}
          alt="Gambar Blog"
          className="img-fluid rounded mb-4"
          style={{ width: '100%', height: 'auto', maxWidth: '800px' }} // Menyesuaikan gambar dengan lebar maksimum
        />
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetailPage;
