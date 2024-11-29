import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from '../assets/Card 1.svg';

const Mid = () => {
  const handleClick = () => {
    alert('Image clicked');
  };

  return (
    <div className="Mid container my-5">
      <div className="row align-items-center mb-4">
        {/* Kolom Teks di Kiri */}
        <div className="col">
          <h1 className="fw-bold">Yang Lagi Populer Nih!</h1>
        </div>
      </div>
      <div className="row gy-4 justify-content-center">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <button
              type="button"
              className="btn p-0 border-0 w-100"
              onClick={index === 0 ? () => (window.location.href = 'detail-konser.html') : handleClick}
            >
              <img
                src={image1}
                alt={`Image ${index + 1}`}
                className="img-fluid rounded"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mid;
