import React, { useRef, useState } from 'react';
import genre1 from '../assets/genre1.svg';
import genre2 from '../assets/genre2.svg';
import genre3 from '../assets/genre3.svg';
import genre4 from '../assets/genre4.svg';
import genre5 from '../assets/Frame 674.png';

const MID2 = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleGenreClick = (genre) => {
    alert(`${genre} clicked`);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX); // Simpan posisi awal saat klik
    setScrollLeft(scrollContainerRef.current.scrollLeft); // Simpan posisi scroll saat klik
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Hitung jarak pergeseran berdasarkan pergerakan mouse
    const distance = e.clientX - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Hentikan drag saat mouse dilepas
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false); // Hentikan drag jika mouse keluar dari area
    }
  };

  return (
    <div className="MID2">
      <div className="text-genre">
        <h1>Pilih Genre Favoritmu!</h1>
      </div>
      <div
        className="scroll-container"
        ref={scrollContainerRef}
        style={{
          overflow: 'hidden', // Menyembunyikan scroll bar
          display: 'flex', // Membuat gambar dalam satu baris horizontal
          flexWrap: 'nowrap',
          cursor: 'grab', // Tunjukkan kursor grab saat di hover
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="genre" style={{ display: 'inline-flex' }}>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Genre 3')}>
              <img src={genre1} alt="Genre 3" />
            </button>
          </div>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Genre 4')}>
              <img src={genre2} alt="Genre 4" />
            </button>
          </div>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Genre 5')}>
              <img src={genre3} alt="Genre 5" />
            </button>
          </div>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Genre 6')}>
              <img src={genre4} alt="Genre 6" />
            </button>
          </div>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Genre 7')}>
              <img src={genre5} alt="Genre 7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MID2;
