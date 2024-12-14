import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigasi from "../komponen Home/Navigasi"; // Import navigasi

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook untuk navigasi
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/communities/${id}`);
        setCommunity(response.data);
      } catch (error) {
        console.error("Error fetching community details:", error);
      }
    };
    fetchCommunity();
  }, [id]);

  if (!community) {
    return <div>Community not found.</div>;
  }

  // Objek gaya inline
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "20px auto",
      padding: "0 20px",
      marginTop: "150px", // Tambahkan margin agar tidak tertutup navbar
      position: "relative", // Menambahkan position relative pada container
    },
    backButton: {
      fontSize: "1rem",
      fontStyle: "italic",
      textDecoration: "underline",
      color: "#212121",
      cursor: "pointer",
      marginTop: "20px",
      marginBottom: "20px",
      display: "inline-block",
      position: "absolute", // Posisi absolute untuk menempatkan tombol di atas gambar
      top: "-50px", // Posisikan tombol di atas
      left: "45px", // Posisikan tombol di kiri
    },
    backButtonHover: {
      color: "#ffc107", // Warna kuning saat hover
    },
    img: {
      width: "94%",
      height: "auto",
      maxWidth: "800px",
      display: "block",
      margin: "20px auto",
    },
    contentWrapper: {
      width: "94%",
      maxWidth: "800px",
      margin: "0 auto",
      textAlign: "left",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#212121",
      marginBottom: "25px",
    },
    description: {
      fontSize: "1rem",
      color: "#212121",
      marginBottom: "20px",
    },
    whatsappButton: {
      display: "inline-block",
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "bold",
      backgroundColor: "#ffc107",
      border: "none",
      borderRadius: "40px",
      color: "#212121",
      textDecoration: "none",
      marginTop: "20px",
      textAlign: "center",
    },
  };

  return (
    <div>
      {/* Tambahkan Navigasi di bagian atas */}
      <Navigasi />

      {/* Konten detail komunitas */}
      <div style={styles.container}>
        {/* Tombol Kembali */}
        <span
          style={styles.backButton}
          onMouseEnter={(e) => (e.target.style.color = styles.backButtonHover.color)}
          onMouseLeave={(e) => (e.target.style.color = styles.backButton.color)}
          onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
        >
          Kembali
        </span>

        <img
          src={community.image}
          alt={community.title}
          style={styles.img}
        />
        <div style={styles.contentWrapper}>
          <h2 style={styles.title}>{community.title}</h2>
          <p style={styles.description}>{community.content}</p>
          <a
            href={community.whatsappLink}
            style={styles.whatsappButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Gabung WhatsApp Group
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
