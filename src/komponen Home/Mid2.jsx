import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import genre1 from '../assets/genre1.svg';
import genre2 from '../assets/genre2.svg';
import genre3 from '../assets/genre3.svg';
import genre4 from '../assets/genre4.svg';
import genre5 from '../assets/Frame 674.png';

const MID2 = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleGenreClick = (genre) => {
    // Abaikan genre 4 dan 7
    if (genre === 'Genre 4' || genre === 'Genre 7') {
      return;
    }
    // Navigasi ke halaman Kategori dan kirimkan genre sebagai query
    navigate(`/kategori?genre=${genre}`);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const distance = e.clientX - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
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
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'nowrap',
          cursor: 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="genre" style={{ display: 'inline-flex' }}>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Dangdut')}>
              <img src={genre1} alt="Dangdut" />
            </button>
          </div>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Rock')}>
              <img src={genre2} alt="Rock" />
            </button>
          </div>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Hiphop')}>
              <img src={genre3} alt="Hiphop" />
            </button>
          </div>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Pop')}>
              <img src={genre4} alt="Pop" />
            </button>
          </div>
          <div className="genred">
            <button type="button" onClick={() => handleGenreClick('Indie')}>
              <img src={genre5} alt="Indie" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MID2;
