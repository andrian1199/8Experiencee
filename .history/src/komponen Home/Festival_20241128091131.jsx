import React from 'react';
import card4 from '../assets/card 4.svg';
import card5 from '../assets/card 5.svg';
import card6 from '../assets/card 6.svg';
import card7 from '../assets/card 7.svg';
import { Link } from 'react-router-dom';

const Festival = () => {
  const handleImageClick = () => {
    alert('Image clicked');
  };

  // Array of card images
  const cardImages = [card4, card5, card6, card7];

  return (
    <div className="konser container py-5">
      <div className="konser-header mb-4">
        <div className="text-festival d-flex justify-content-between align-items-center">
          <h1>Festival</h1>
          <Link to="/detail-konser" className="btn btn-primary">Lihat Semua</Link>
        </div>
      </div>

      {/* Grid System */}
      <div className="row g-4"> {/* g-4: Spasi antar elemen */}
        {cardImages.map((image, index) => (
          <div className="col-6 col-md-3" key={index}>
            <button
              type="button"
              className="btn p-0 w-100"
              onClick={handleImageClick}
              style={{ border: 'none', background: 'transparent' }}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="img-fluid rounded"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '500px', // Tinggi lebih besar
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Festival;
