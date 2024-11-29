import React, { useState } from 'react';
import image1 from '../assets/home.jpg';
import image2 from '../assets/Variant5.svg';
import image3 from '../assets/Variant6.png';
import image4 from '../assets/Variant7.svg';
import image5 from '../assets/THE-SIGIT-2.jpg';

const Hero = () => {
  // Array yang berisi gambar-gambar yang akan ditampilkan
  const slides = [
    { id: 1, src: image1, alt: 'Home Image' },
    { id: 2, src: image2, alt: 'Variant 5' },
    { id: 3, src: image3, alt: 'Variant 6' },
    { id: 4, src: image4, alt: 'Variant 7' },
    { id: 5, src: image5, alt: 'The Sigit' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Fungsi untuk pindah ke slide berikutnya
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Fungsi untuk pindah ke slide sebelumnya
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero">
      <div className="hero-slider-wrapper">
        <button className="prev-slide" onClick={prevSlide}>❮</button>
        <div
          className="hero-image-slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className={`slide ${currentSlide === slide.id - 1 ? 'active' : ''}`} key={slide.id}>
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>

        <button className="next-slide" onClick={nextSlide}>❯</button>
      </div>

      <div className="text">
        <h3>Jumat, 27 Oktober 2024 | Jakarta Arena</h3>
        <h1 className="mid-font">Sound Of Downtown<br />Kutunggu Kau Di Surabaya</h1>
        <h3>Jakarta Dbl Arena</h3>
        <div className="button-hero">
          <a href="detail-konser.html" className="btnhero">Beli Tiket</a>
        </div>
      </div>
    </div>
  );
};

export default Hero
