import React from 'react';
import group13Image from '../assets/Group 13.png';  // Gambar low
import footerImage from '../assets/FOOTER.png';  // Gambar footer

const Low = () => {
  return (
    <div>
      <div className="low">
        <img src={group13Image} alt="Low Image" />
      </div>
      <div className="lower">
        <img src={footerImage} alt="Footer" />
      </div>
    </div>
  );
};

export default Low;
