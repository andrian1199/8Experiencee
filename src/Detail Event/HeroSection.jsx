import React from 'react';

const HeroSection = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.heroContent}>
        <h1>Kamu bisa cari konser-konser yang kita sediakan disini nih! Yuk nonton konser</h1>
        <p>
          Concert comes from Italian: concerto and Latin: concertare which means to strive,
          to compete with others. A concert is a live performance, usually of music, in front
          of an audience.
        </p>
        <button style={styles.button}>Cek Sekarang</button>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    backgroundImage: 'url("/path/to/your/background/image.jpg")', // Ganti dengan path sesuai
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '50px 20px',
    textAlign: 'center',
    color: '#fff',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#FFD700',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#000',
    fontWeight: 'bold',
  },
};

export default HeroSection;
