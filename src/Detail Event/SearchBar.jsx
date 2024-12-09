import React, { useState } from "react";
import communityData from "../data/EventData"; // Pastikan kamu mengimpor data komunitas

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk menangani perubahan input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value); // Panggil fungsi dari parent untuk filter data
  };

  return (
    <>
      <style>
        {`
          .search-container {
            display: flex;
            justify-content: center;
            margin-top: 70px;
            align-items: center;
          }

          .search-input {
            width: 80%;
            max-width: 600px;
            padding: 10px 20px;
            font-size: 1rem;
            color: #212121;
            background-color: #FFFFFF;
            border: none;
            border-radius: 40px;
            box-shadow:
                0px 121px 34px rgba(0, 0, 0, 0),
                0px 44px 26px rgba(0, 0, 0, 0.05),
                0px 19px 19px rgba(0, 0, 0, 0.09),
                0px 5px 11px rgba(0, 0, 0, 0.1);
            outline: none;
            transition: box-shadow 0.3s ease;
            margin-right: 50px;
          }

          .search-input:focus {
            box-shadow:
                0px 121px 34px rgba(0, 0, 0, 0.05),
                0px 78px 31px rgba(0, 0, 0, 0.281),
                0px 44px 26px rgba(0, 0, 0, 0.1),
                0px 19px 19px rgba(0, 0, 0, 0.15),
                0px 5px 11px rgba(0, 0, 0, 0.2);
          }

          .search-button {
            padding: 10px 20px;
            font-size: 1rem;
            color: #FFFFFF;
            background-color: #FFC107;
            border: none;
            border-radius: 40px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            box-shadow: 50px;
          }

          .search-button:hover {
            background-color: #e6b700;
          }
        `}
      </style>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Cari event disini..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button">Cari</button>
      </div>
    </>
  );
};

export default SearchBar;
