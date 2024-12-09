import React, { useState, useEffect } from "react";
import EventCard from "../komponen Home/EventCard"; // Pastikan path benar
import SearchBar from "../Detail Event/SearchBar"; // Pastikan path benar
import axios from "axios";

const API_URL = "http://localhost:5000/events"; // Endpoint API Anda

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Semua"); // Kategori yang dipilih
  const [searchQuery, setSearchQuery] = useState(""); // State untuk query pencarian
  const [loading, setLoading] = useState(true); // Menandakan status loading
  const [error, setError] = useState(null); // Menangani error saat fetch data

  const categories = ["Semua", "Konser", "Festival"]; // Daftar kategori event

  // Ambil data dari API saat komponen dimuat
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // Set loading saat data mulai diambil
        const response = await axios.get(API_URL);
        setEvents(response.data); // Simpan data dari API ke state
        setLoading(false); // Set loading selesai
      } catch (error) {
        setError("Gagal mengambil data event."); // Menangani error
        setLoading(false); // Set loading selesai meski error
      }
    };

    fetchEvents();
  }, []);

  // Filter event berdasarkan kategori dan pencarian
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      activeCategory === "Semua" ||
      event.type.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Menampilkan status loading atau error jika ada
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      {/* Search Bar */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Filter dan Kartu */}
      <div style={styles.filterContainer}>
        {categories.map((category) => (
          <button
            key={category}
            style={{
              ...styles.filterButton,
              backgroundColor: activeCategory === category ? "#ffcf00" : "#f8f9fa",
              color: activeCategory === category ? "#fff" : "#000",
            }}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menampilkan Kartu Event yang sudah difilter */}
      <div style={styles.cardContainer}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              price={event.price}
              image={event.image}
            />
          ))
        ) : (
          <p style={styles.noEventText}>Tidak ada event yang cocok.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  filterContainer: {
    marginBottom: "25px",
    marginTop: "50px",
    display: "flex",
    gap: "10px",
    justifyContent: "flex-start",
    marginLeft: "100px",
  },
  filterButton: {
    padding: "10px 20px",
    border: "1px solid #ddd",
    borderRadius: "40px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "flex-start",
    marginLeft: "100px",
  },
  noEventText: {
    fontSize: "1.2rem",
    color: "#666",
    textAlign: "center",
    width: "100%",
  },
};

export default EventList;
