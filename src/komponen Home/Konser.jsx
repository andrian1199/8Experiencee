import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../komponen Home/EventCard"; // Pastikan path sesuai
import axios from "axios"; // Untuk HTTP request

const API_URL = "http://localhost:5000/events"; // URL endpoint API

const Konser = () => {
  const [isHovered, setIsHovered] = useState(false); // State untuk hover effect
  const [konserEvents, setKonserEvents] = useState([]); // State untuk event konser
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Menyimpan pesan error

  useEffect(() => {
    const fetchKonserEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL); // Mengambil data dari API
        const allEvents = response.data; // Asumsikan data berbentuk array

        // Filter event yang bertipe "konser" dan batasi hingga 4 kartu
        const filteredKonser = allEvents
          .filter((event) => event.type.toLowerCase() === "konser")
          .slice(0, 4);
        setKonserEvents(filteredKonser);
        setLoading(false);
      } catch (err) {
        setError("Gagal mengambil data dari server.");
        setLoading(false);
      }
    };

    fetchKonserEvents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="konser container py-5">
      <div className="konser-header mb-4">
        <div
          className="text-konser d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
        >
          <h1>Konser</h1>
          <Link
            to="/event"
            style={{
              ...styles.link,
              ...(isHovered ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)} // Mengubah state saat hover
            onMouseLeave={() => setIsHovered(false)} // Mengembalikan state saat hover hilang
          >
            Lihat Semua
          </Link>
        </div>
      </div>

      {/* Flexbox Container untuk kartu */}
      <div style={styles.cardContainer}>
        {konserEvents.length > 0 ? (
          konserEvents.map((event) => (
            <div key={event.id} style={styles.cardWrapper}>
              <EventCard
                id={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                price={event.price}
                image={event.image}
              />
            </div>
          ))
        ) : (
          <p className="text-center">Tidak ada konser yang tersedia.</p>
        )}
      </div>
    </div>
  );
};

// Styling untuk kartu dan container
const styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap", // Membuat elemen melipat jika lebar habis
    gap: "20px", // Jarak antar elemen
    justifyContent: "flex-start", // Agar elemen dimulai dari kiri
  },
  link: {
    textDecoration: "underline",
    fontStyle: "italic",
    color: "#212121",
    cursor: "pointer",
    marginLeft: "auto",
    display: "block",
    transition: "color 0.3s, transform 0.3s",
  },
  linkHover: {
    color: "#ffcf00",
    transform: "scale(1.05)",
  },
};

export default Konser;
