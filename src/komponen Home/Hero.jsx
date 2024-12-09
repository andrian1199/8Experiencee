import React, { useState, useEffect } from 'react'; 
import image1 from '../assets/home.jpg';
import image2 from '../assets/Variant5.svg';
import image3 from '../assets/Variant6.png';
import image4 from '../assets/Variant7.svg';
import image5 from '../assets/THE-SIGIT-2.jpg';

const Hero = () => {
  const slides = [
    { id: 1, src: image1, alt: 'Home Image', title: 'Sound Of Downtown', date: 'Jumat, 27 Oktober 2024 | Jakarta Arena', link: '/event/23' },
    { id: 2, src: image2, alt: 'Variant 5', title: 'Sound Of Downtown', date: 'Sabtu, 28 Oktober 2024 | Bandung Stadium', link: '/detail-konser-b' },
    { id: 3, src: image3, alt: 'Variant 6', title: 'Sound Of Downtown', date: 'Minggu, 29 Oktober 2024 | Surabaya Hall', link: '/detail-konser-c' },
    { id: 4, src: image4, alt: 'Variant 7', title: 'Sound Of Downtown', date: 'Senin, 30 Oktober 2024 | Medan Arena', link: '/detail-konser-d' },
    { id: 5, src: image5, alt: 'The Sigit', title: 'Sound Of Downtown', date: 'Selasa, 31 Oktober 2024 | Yogyakarta Stage', link: '/detail-konser-e' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => {
      // Jika slide terakhir, kembali ke slide pertama
      if (prevSlide === slides.length - 1) {
        return 0;
      } else {
        return prevSlide + 1;
      }
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const styles = {
    hero: {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: '100vh', // Menggunakan tinggi penuh viewport
    },
    sliderWrapper: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    imageSlider: {
      display: 'flex',
      transition: 'transform 0.5s ease-in-out',
      width: `${slides.length * 100}%`,
      height: '100%',
    },
    slide: {
      minWidth: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover', // Gambar memenuhi area tanpa deformasi
    },
    textOverlay: {
      position: 'absolute',
      top: '40%', // Geser teks ke atas sekitar 30% dari atas layar
      left: '10%', // Jarak dari sisi kiri
      paddingLeft: '20px',
      paddingRight: '20px',
      color: '#fff',
      zIndex: 10,
      textAlign: 'left',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    },
    title: {
      fontSize: '3rem', // Perbesar teks judul agar menonjol
      margin: '0 0 15px',
      fontWeight: 'bold',
    },
    date: {
      fontSize: '1.5rem',
      marginBottom: '20px',
    },
    btnHero: {
      display: 'inline-block',
      backgroundColor: '#ffc107',
      color: '#000',
      padding: '12px 25px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textDecoration: 'none',
      borderRadius: '50px',
      transition: 'background-color 0.3s, color 0.3s',
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: '#fff',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      zIndex: 10,
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s, color 0.3s',
    },
    prevButton: {
      left: '5%', // Geser sedikit dari tengah kiri
    },
    nextButton: {
      right: '5%', // Geser sedikit dari tengah kanan
    },
  };

  return (
    <div style={styles.hero}>
      <div style={styles.sliderWrapper}>
        {/* Tombol Navigasi Sebelumnya */}
        <button
          style={{ ...styles.navButton, ...styles.prevButton }}
          onClick={prevSlide}
        >
          ❮
        </button>

        {/* Slider Gambar */}
        <div
          style={{
            ...styles.imageSlider,
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              style={styles.slide}
              key={slide.id}
            >
              <img src={slide.src} alt={slide.alt} style={styles.img} />
              <div style={styles.textOverlay}>
                <h1 style={styles.title}>{slide.title}</h1>
                <p style={styles.date}>{slide.date}</p>
                <a href={slide.link} style={styles.btnHero}>
                  Beli Tiket
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Navigasi Berikutnya */}
        <button
          style={{ ...styles.navButton, ...styles.nextButton }}
          onClick={nextSlide}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Hero;
