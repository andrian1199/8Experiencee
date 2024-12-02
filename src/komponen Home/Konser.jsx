import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventData from '../data/EventData'; // Pastikan path sesuai
import EventCard from './EventCard'; // Pastikan path sesuai

const Konser = () => {
  const [isHovered, setIsHovered] = useState(false); // State untuk hover effect
  
  // Filter hanya acara dengan type "konser"
  const konserEvents = EventData.filter(event => event.type === 'konser');

  return (
    <div className="konser container py-5">
      <div className="konser-header mb-4">
        <div className="text-konser d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
          <h1>Konser</h1>
          <Link 
            to="/event" 
            style={{
              ...styles.link, 
              ...(isHovered ? styles.linkHover : {}) // Terapkan hover style jika tombol di-hover
            }}
            onMouseEnter={() => setIsHovered(true)}  // Mengubah state saat hover
            onMouseLeave={() => setIsHovered(false)} // Mengembalikan state saat hover hilang
          >
            Lihat Semua
          </Link>
        </div>
      </div>

      {/* Grid System */}
      <div className="row g-4"> {/* g-4: Spasi antar elemen */}
        {konserEvents.map(event => (
          <div className="col-6 col-md-3" key={event.id}>
            <EventCard
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

// Styling untuk link "Lihat Semua"
const styles = {
  link: {
    textDecoration: 'underline',
    fontStyle: 'italic',
    color: '#212121', // Warna biru seperti link
    cursor: 'pointer',
    marginLeft: 'auto', // Membuat tombol pergi ke kanan
    display: 'block', // Menghindari tombol terhimpit
    transition: 'color 0.3s, transform 0.3s', // Menambahkan transisi halus untuk efek hover
  },
  linkHover: {
    color: '#ffcf00', // Warna biru gelap saat hover
    transform: 'scale(1.05)', // Memberikan efek sedikit membesar saat hover
  },
};

export default Konser;
