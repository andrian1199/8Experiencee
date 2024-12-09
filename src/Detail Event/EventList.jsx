import React, { useState } from 'react';
import EventCard from '../komponen Home/EventCard'; // Sesuaikan dengan EventCard-mu
import EventData from '../data/EventData'; // Data dummy untuk event
import SearchBar from '../Detail Event/SearchBar'; // Pastikan jalur benar

const EventList = () => {
  const [activeCategory, setActiveCategory] = useState('Semua'); // Kategori yang dipilih
  const [searchQuery, setSearchQuery] = useState(''); // State untuk query pencarian

  const categories = ['Semua', 'Konser', 'Festival']; // Daftar kategori event

  // Filter event berdasarkan kategori dan pencarian
  const filteredEvents = EventData.filter((event) => {
    // Memastikan perbandingan kategori tidak terpengaruh oleh kapitalisasi
    const matchesCategory = activeCategory === 'Semua' || event.type.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              backgroundColor: activeCategory === category ? '#ffcf00' : '#f8f9fa',
              color: activeCategory === category ? '#fff' : '#000',
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
          filteredEvents.map((event) => <EventCard key={event.id} {...event} />)
        ) : (
          <p style={styles.noEventText}>Tidak ada event yang cocok.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  filterContainer: {
    marginBottom: '25px',
    marginTop: '50px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start', // Tetap di kiri
    marginLeft: '100px', // Jarak kiri filter sejajar dengan cardContainer
  },
  filterButton: {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '40px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'flex-start',
    marginLeft: '100px', // Sejajarkan margin kiri dengan filterContainer
  },
  noEventText: {
    fontSize: '1.2rem',
    color: '#666',
    textAlign: 'center',
    width: '100%', // Agar pesan berada di tengah dengan baik
  },
};

export default EventList;
