import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Komunitas.css";

const CommunityCards = () => {
  const [communities, setCommunities] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const categories = ["Semua", "Pop", "Rock", "Lainnya"];

  // Ambil data dari backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/communities")
      .then((response) => setCommunities(response.data))
      .catch((error) => console.error("Gagal mengambil data:", error));
  }, []);

  const filteredCommunities = communities.filter((community) => {
    const matchesCategory =
      activeCategory === "Semua" || community.category === activeCategory;

    const matchesSearch =
      community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleJoin = (communityId) => {
    navigate(`/komunitas/${communityId}`);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <section className="container my-5">
      <div className="search-container mb-4">
        <input
          type="text"
          className="search-input"
          placeholder="Cari komunitas disini..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button">Cari</button>
      </div>

      <div className="community-filter-container mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-item ${
              activeCategory === category ? "active-filter" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredCommunities.slice(0, visibleCount).map((community, index) => (
          <div className="col" key={index}>
            <div className="card h-100 d-flex flex-column">
              <img
                src={community.image}
                alt={community.title}
                className="card-img-top"
              />
              <div className="card-body flex-grow-1">
                <span className="badge badge-custom">{community.category}</span>
                <p className="card-title">{community.title}</p>
                <p className="card-description">{community.description}</p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button
                  className="btn join-btn w-100"
                  onClick={() => handleJoin(community.id)}
                >
                  Ikut
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
