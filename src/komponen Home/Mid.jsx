import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from '../assets/Card 1.svg'; // Sebelum login semua pakai image1
import card4 from '../assets/card 4.svg';
import card5 from '../assets/card 5.svg';
import card6 from '../assets/card 6.svg';
import card7 from '../assets/card 7.svg';
import card8 from '../assets/card 8.svg';
import card9 from '../assets/card 9.svg';
import card10 from '../assets/card 10.svg';
import card11 from '../assets/card 11.svg';

const Mid = () => {
  const [popularImages, setPopularImages] = useState([image1, image1, image1, image1]);  // Semua gambar sebelum login
  const [newImages, setNewImages] = useState([image1, image1, image1, image1]); // Semua gambar sebelum login

  // Menggunakan useEffect untuk memeriksa status login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Jika sudah login, ubah gambar di bagian "Yang Lagi Populer Nih!" dan "Acara Baru Nih!"
    if (isLoggedIn === "true") {
      setPopularImages([card4, card5, card6, card7]); // Gambar untuk "Yang Lagi Populer Nih!" setelah login
      setNewImages([card8, card9, card10, card11]);   // Gambar untuk "Acara Baru Nih!" setelah login
    }
  }, []);

  const handleClick = () => {
    alert('Image clicked');
  };

  return (
    <div className="Mid container my-5">
      {/* Bagian "Yang Lagi Populer Nih!" */}
      <div className="row align-items-center mb-4">
        <div className="col">
          <h1 className="fw-bold mb-0 ms-3">Yang Lagi Populer Nih!</h1>
        </div>
      </div>
      <div className="row gy-4 justify-content-center">
        {popularImages.map((image, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <button
              type="button"
              className="btn p-0 border-0 w-100 shadow-none"
              style={{
                outline: "none",
                boxShadow: "none",
                backgroundColor: "transparent", // Pastikan tidak ada warna latar
              }}
              onClick={index === 0 ? () => (window.location.href = 'detail-konser.html') : handleClick}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="img-fluid rounded shadow"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Bagian "Acara Baru Nih!" */}
      <div className="row align-items-center mb-4 mt-5">
        <div className="col">
          <h1 className="fw-bold mb-0 ms-3">Acara Baru Nih!</h1>
        </div>
      </div>
      <div className="row gy-4 justify-content-center">
        {newImages.map((image, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <button
              type="button"
              className="btn p-0 border-0 w-100 shadow-none"
              style={{
                outline: "none",
                boxShadow: "none",
                backgroundColor: "transparent", // Pastikan tidak ada warna latar
              }}
              onClick={handleClick}
            >
              <img
                src={image}
                alt={`Card ${index + 8}`}
                className="img-fluid rounded shadow"
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
