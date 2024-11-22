import React, { useState } from "react";
import communityData from "../../data/communityData"; // Pastikan kamu mengimpor data komunitas

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk menangani perubahan input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value); // Panggil fungsi dari parent untuk filter data
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Cari komunitas disini..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className="search-button">Cari</button>
    </div>
  );
};

export default SearchBar;
