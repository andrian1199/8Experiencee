import React from 'react';
import card1 from '../assets/Card 1.svg'; // Pastikan path gambar sudah benar

const Festival = () => {
  const handleImageClick = () => {
    alert('Image clicked');
  };

  return (
    <div className="festival">
      <div className="festival-header">
        <div className="text-festival">
          <h1>Festival</h1>
        </div>
        <a href="#" className="lihat-semua">Lihat Semua</a>
      </div>
      <div className="image">
        <button type="button" onClick={handleImageClick}>
          <img src={card1} alt="Image 1" />
        </button>
        <button type="button" onClick={handleImageClick}>
          <img src={card1} alt="Image 2" />
        </button>
        <button type="button" onClick={handleImageClick}>
          <img src={card1} alt="Image 3" />
        </button>
        <button type="button" onClick={handleImageClick}>
          <img src={card1} alt="Image 4" />
        </button>
      </div>
    </div>
  );
};

export default Festival;
