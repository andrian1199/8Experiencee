import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard"; // Pastikan path sesuai
import axios from "axios"; // Untuk HTTP request

const API_URL = "http://localhost:5000/events"; // URL endpoint API

const Festival = () => {
  const [isHovered, setIsHovered] = useState(false); // State untuk hover effect
  const [festivalEvents, setFestivalEvents] = useState([]); // State untuk event festival
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Menyimpan pesan error

  useEffect(() => {
    const fetchFestivalEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL); // Mengambil data dari API
        const allEvents = response.data; // Asumsikan data berbentuk array

        // Filter event yang bertipe "festival" dan batasi hingga 4 kartu
        const filteredFestival = allEvents
          .filter((event) => event.type.toLowerCase() === "festival")
          .slice(0, 4);
        setFestivalEvents(filteredFestival);
        setLoading(false);
      } catch (err) {
        setError("Gagal mengambil data dari server.");
        setLoading(false);
      }
    };

    fetchFestivalEvents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="festival container py-5">
      <div className="festival-header mb-4">
        <div
          className="text-festival d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
        >
          <h1 style={{ marginBottom: 0 }}>Festival</h1>
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

      {/* Flexbox untuk layout kartu */}
      <div style={styles.cardContainer}>
        {festivalEvents.length > 0 ? (
          festivalEvents.map((event) => (
            <div key={event.id} style={styles.card}>
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
          <p className="text-center">Tidak ada festival yang tersedia.</p>
        )}
      </div>
    </div>
  );
};

// Styling untuk link dan layout kartu
const styles = {
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
  cardContainer: {
    display: "flex",
    flexWrap: "wrap", // Membuat elemen melipat jika lebar habis
    gap: "20px", // Jarak antar elemen
    justifyContent: "flex-start", // Elemen dimulai dari kiri
  },
};

export default Festival;
