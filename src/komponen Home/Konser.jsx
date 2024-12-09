import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventData from "../data/EventData"; // Pastikan path sesuai
import EventCard from "../komponen Home/EventCard"; // Pastikan path sesuai

const Konser = () => {
  const [isHovered, setIsHovered] = useState(false); // State untuk hover effect

  // Filter hanya acara dengan type "konser"
  const konserEvents = EventData.filter((event) => event.type === "konser");

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
        {konserEvents.map((event) => (
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
        ))}
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
