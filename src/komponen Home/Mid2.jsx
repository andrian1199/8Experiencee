import React from 'react';
import genre1 from '../assets/genre1.svg';
import genre2 from '../assets/genre2.svg';
import genre3 from '../assets/genre3.svg';
import genre4 from '../assets/genre4.svg';
import genre5 from '../assets/Frame 674.png';

const MID2 = () => {
  const handleGenreClick = (genre) => {
    alert(`${genre} clicked`);
  };

  return (
    <div className="MID2">
      <div className="text-genre">
        <h1>Pilih Genre Favoritmu!</h1>
      </div>
      <div className="scroll-container">
        <div className="genre">
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
