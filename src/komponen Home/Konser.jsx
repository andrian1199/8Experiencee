import React from 'react';
import card1 from '../assets/Card 1.svg'; // Pastikan path gambar sudah benar
import { Link } from 'react-router-dom';

const Konser = () => {
  const handleImageClick = () => {
    alert('Image clicked');
  };

  return (
    <div className="konser">
      <div className="konser-header">
        <div className="text-festival">
          <h1>Konser</h1>
          <Link to="/detail-konser" className="lihat-semua">Lihat Semua</Link>
        </div>
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

export default Konser;
