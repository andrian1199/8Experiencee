import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CommunityData from "../data/CommunityData";
import "../styles/Komunitas.css";

const CommunityCards = () => {
  const [activeCategory, setActiveCategory] = useState("Semua"); // Menyimpan kategori yang aktif
  const [searchQuery, setSearchQuery] = useState(""); // Menyimpan kata kunci pencarian
  const [visibleCount, setVisibleCount] = useState(6); // Jumlah kartu yang terlihat
  const navigate = useNavigate(); // Initialize useNavigate

  const categories = ["Semua", "Pop", "Rock", "Lainnya"]; // Daftar kategori komunitas

  // Filter data komunitas berdasarkan kategori aktif dan pencarian
  const filteredCommunities = CommunityData.filter((community) => {
    const matchesCategory =
      activeCategory === "Semua" || community.category === activeCategory;

    const matchesSearch =
      (community.title &&
        community.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (community.description &&
        community.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update kata kunci pencarian
  };

  // Fungsi untuk mengarahkan pengguna ke halaman komunitas
  const handleJoin = (communityId) => {
    navigate(`/komunitas/${communityId}`); // Navigasi ke halaman komunitas berdasarkan ID
  };

  // Fungsi untuk menampilkan lebih banyak kartu
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Tambahkan jumlah kartu yang ditampilkan
  };

  return (
    <section className="container my-5">
      {/* Pencarian Komunitas */}
      <div className="search-container mb-4">
        <input
          type="text"
          className="search-input"
          placeholder="Cari komunitas disini..."
          value={searchQuery}
          onChange={handleSearchChange} // Update kata kunci pencarian
        />
        <button className="search-button">Cari</button>
      </div>

      {/* Filter Kategori Komunitas */}
      <div className="community-filter-container mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-item ${
              activeCategory === category ? "active-filter" : ""
            }`}
            onClick={() => setActiveCategory(category)} // Set kategori aktif
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menampilkan Komunitas yang sudah difilter */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredCommunities.slice(0, visibleCount).map((community, index) => (
          <div className="col" key={index}>
            <div className="card h-100 d-flex flex-column">
              <img
                src={community.img}
                alt={community.title}
                className="card-img-top"
              />
              <div className="card-body flex-grow-1">
                <span className="badge badge-custom">{community.category}</span>{" "}
                {/* Tampilkan kategori */}
                <p className="card-title">{community.title}</p>
                <p className="card-description">{community.description}</p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button
                  className="btn join-btn w-100"
                  onClick={() => handleJoin(community.id)} // Mengarahkan ke halaman komunitas
                >
                  Ikut
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Tampilkan Lebih */}
      {visibleCount < filteredCommunities.length && (
        <div className="text-center mt-4">
          <button className="load-more" onClick={handleShowMore}>
            Tampilkan Lebih
          </button>
        </div>
      )}
    </section>
  );
};

export default CommunityCards;
