import React from 'react';
import image1 from '../assets/ITEM FIX (8).svg';
import image2 from '../assets/ITEM FIX (1).svg';
import image3 from '../assets/ITEM FIX (2).svg';
import image4 from '../assets/ITEM FIX (3).svg';
import image5 from '../assets/ITEM FIX (4).svg';
import image6 from '../assets/ITEM FIX (5).svg';
import image7 from '../assets/ITEM FIX (6).svg';
import image8 from '../assets/ITEM FIX (7).svg';

const Mid = () => {
  const handleClick = () => {
    alert('Image clicked');
  };

  return (
    <div className="Mid">
      <h1>Yang Lagi Populer Nih!</h1>
      <div className="image-grid-wrapper">
        <div className="image-grid">
          <button type="button" onClick={() => window.location.href = 'detail-konser.html'}>
            <img src={image1} alt="Image 1" />
          </button>
          <button type="button" onClick={handleClick}>
            <img src={image2} alt="Image 2" />
          </button>
          <button type="button" onClick={handleClick}>
            <img src={image3} alt="Image 3" />
          </button>
          <button type="button" onClick={handleClick}>
            <img src={image4} alt="Image 4" />
          </button>
          <button type="button" onClick={handleClick}>
            <img src={image5} alt="Image 5" />
          </button>
          <button type="button" onClick={handleClick}>
            <img src={image6} alt="Image 6" />
          </button>
          <button type="button" onClick={handleClick}>
            <img src={image7} alt="Image 7" />
          </button>
          <button type="button" onClick={handleClick}>
            <img src={image8} alt="Image 8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mid;
