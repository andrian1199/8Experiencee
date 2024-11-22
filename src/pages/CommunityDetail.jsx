import React from "react";
import { useParams } from "react-router-dom";
import communityData from "../data/CommunityData";
import "../styles/CommunityDetailPage.css"; // Pastikan CSS sudah diimpor

const CommunityDetail = () => {
  // Mengambil parameter 'id' dari URL
  const { id } = useParams();

  // Mencari data komunitas berdasarkan id
  const community = communityData.find((item) => item.id === id);

  // Jika komunitas tidak ditemukan, tampilkan pesan
  if (!community) {
    return <div>Community not found.</div>;
  }

  return (
    <div className="container mt-5 komunitas-content">
      {/* Menampilkan gambar komunitas */}
      <img
        src={community.img}
        alt={community.title}
        className="img-fluid komunitas-img"
      />
      
      <div className="content-wrapper">
        {/* Judul komunitas */}
        <h2 className="komunitas-title">{community.title}</h2>

        {/* Konten deskripsi komunitas */}
        <p className="komunitas-description">{community.content}</p>

        {/* Tombol untuk gabung WhatsApp */}
        <a
          href={community.whatsappLink}
          className="btn btn-warning komunitas-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gabung WhatsApp Group
        </a>
      </div>
    </div>
  );
};

export default CommunityDetail;
