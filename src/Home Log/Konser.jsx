import React from 'react';
import card1 from '../assets/Card 1.svg'; // Pastikan path gambar sudah benar
import { Link } from 'react-router-dom';

const Konser = () => {
  const handleImageClick = () => {
    alert('Image clicked');
  };

  return (
    <div className="konser container py-5">
      <div className="konser-header mb-4">
        <div className="text-festival d-flex justify-content-between align-items-center">
          <h1>Konser</h1>
          <Link to="/detail-konser" className="btn btn-primary">Lihat Semua</Link>
        </div>
      </div>

      {/* Grid System */}
      <div className="row g-4"> {/* g-4: Spasi antar elemen */}
        {[1, 2, 3, 4].map((_, index) => (
          <div className="col-6 col-md-3" key={index}>
            <button
              type="button"
              className="btn p-0 w-100"
              onClick={handleImageClick}
              style={{ border: 'none', background: 'transparent' }}
            >
              <img
                src={card1}
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

export default Konser;
