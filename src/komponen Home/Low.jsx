import React from 'react';
import group13Image from '../assets/Group 13.png'; // Gambar low

const Low = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Membuat kontainer menempati seluruh tinggi viewport
  };

  const imageStyle = {
    maxWidth: '100%', // Membuat gambar responsif
    height: 'auto',
  };

  return (
    <div>
      <div style={containerStyle}>
        <img src={group13Image} alt="Low Image" style={imageStyle} />
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Low;
