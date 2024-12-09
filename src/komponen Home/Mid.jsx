import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import EventCard from './EventCard'; // Import EventCard
import eventData from '../data/EventData';  // Import eventData

const Mid = () => {
  const [popularEvents, setPopularEvents] = useState([]); // Data populer
  const [newEvents, setNewEvents] = useState([]); // Data baru

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Jika sudah login, tampilkan data event tertentu
    if (isLoggedIn === "true") {
      setPopularEvents(eventData.slice(0, 4)); // Data pertama untuk "Yang Lagi Populer Nih!"
      setNewEvents(eventData.slice(4));        // Ambil sisa data untuk "Acara Baru Nih!"
    } else {
      // Jika belum login, tampilkan placeholder kosong atau default
      setPopularEvents([]);
      setNewEvents([]);
    }
  }, []);

  return (
    <div className="Mid container my-5">
      {/* Bagian "Yang Lagi Populer Nih!" */}
      <div className="row align-items-center mb-4">
        <div className="col">
          <h1 className="fw-bold mb-0 ms-3">Yang Lagi Populer Nih!</h1>
        </div>
      </div>
      <div className="row gx-2 gy-3" style={styles.cardContainer}> {/* Mengurangi gap dengan gx-2 dan gy-3 */}
        {popularEvents.length > 0 ? (
          popularEvents.map((event) => (
            <div key={event.id} className="col-6 col-md-4 col-lg-3 p-0"> {/* Menggunakan p-0 untuk mengurangi padding kolom */}
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
      <div className="row gx-2 gy-3" style={styles.cardContainer}> {/* Mengurangi gap dengan gx-2 dan gy-3 */}
        {newEvents.length > 0 ? (
          newEvents.map((event) => (
            <div key={event.id} className="col-6 col-md-4 col-lg-3 p-0"> {/* Menggunakan p-0 untuk mengurangi padding kolom */}
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
