import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import EventCard from './EventCard'; // Import EventCard
import axios from 'axios'; // Import axios untuk HTTP request

const API_URL = "http://localhost:5000/events"; // URL endpoint API

const Mid = () => {
  const [popularEvents, setPopularEvents] = useState([]); // Data populer
  const [newEvents, setNewEvents] = useState([]); // Data baru
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Menyimpan pesan error

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL); // Mengambil data dari API
        const allEvents = response.data; // Asumsikan data berbentuk array

        // Pisahkan data menjadi populer dan baru (berdasarkan slice atau logika lain)
        setPopularEvents(allEvents.slice(0, 4)); // Data pertama untuk "Yang Lagi Populer Nih!"
        setNewEvents(allEvents.slice(4)); // Data sisanya untuk "Acara Baru Nih!"
        setLoading(false);
      } catch (err) {
        setError("Gagal mengambil data dari server.");
        setLoading(false);
      }
    };

    // Hanya fetch data jika sudah login
    if (isLoggedIn === "true") {
      fetchEvents();
    } else {
      setPopularEvents([]);
      setNewEvents([]);
      setLoading(false); // Tidak loading jika tidak login
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="Mid container my-5">
      {/* Bagian "Yang Lagi Populer Nih!" */}
      <div className="row align-items-center mb-4">
        <div className="col">
          <h1 className="fw-bold mb-0 ms-3">Yang Lagi Populer Nih!</h1>
        </div>
      </div>
      <div className="row gx-2 gy-3" style={styles.cardContainer}>
        {popularEvents.length > 0 ? (
          popularEvents.map((event) => (
            <div key={event.id} className="col-6 col-md-4 col-lg-3 p-0">
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
          <p className="text-center">Silakan login untuk melihat acara populer.</p>
        )}
      </div>

      {/* Bagian "Acara Baru Nih!" */}
      <div className="row align-items-center mb-4 mt-5">
        <div className="col">
          <h1 className="fw-bold mb-0 ms-3">Acara Baru Nih!</h1>
        </div>
      </div>
      <div className="row gx-2 gy-3" style={styles.cardContainer}>
        {newEvents.length > 0 ? (
          newEvents.map((event) => (
            <div key={event.id} className="col-6 col-md-4 col-lg-3 p-0">
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
          <p className="text-center">Yahhh belum ada nih.</p>
        )}
      </div>
    </div>
  );
};

// CSS styling yang diatur sesuai kebutuhan
const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Untuk menjaga agar kartu-kartu tetap teratur
  },
};

export default Mid;
