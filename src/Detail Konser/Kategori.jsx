import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './konser.css';
import card4 from '../assets/card 4.svg';
import card5 from '../assets/card 5.svg';
import card6 from '../assets/card 6.svg';
import card7 from '../assets/card 7.svg';
import card8 from '../assets/card 8.svg';
import card9 from '../assets/card 9.svg';
import card10 from '../assets/card 10.svg';
import card11 from '../assets/card 11.svg';
import card12 from '../assets/card 12.svg';
import card13 from '../assets/card 13.svg';
import card14 from '../assets/card 14.svg';
import card15 from '../assets/card 15.svg';

const imageCategories = {
  All: [card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15],
  Rock: [card4, card5, card6, card7],
  Jazz: [card8, card9, card10, card11],
  Pop: [card12, card13, card14, card15],
};

function Kategori() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="kategori-container">
      <div className="button-group d-flex mb-4">
        <button className="kategori-button btn btn-outline-primary mx-2" onClick={() => setSelectedCategory('All')}>All</button>
        <button className="kategori-button btn btn-outline-primary mx-2" onClick={() => setSelectedCategory('Rock')}>Rock</button>
        <button className="kategori-button btn btn-outline-primary mx-2" onClick={() => setSelectedCategory('Jazz')}>Jazz</button>
        <button className="kategori-button btn btn-outline-primary mx-2" onClick={() => setSelectedCategory('Pop')}>Pop</button>
      </div>

      <div className="row">
        {imageCategories[selectedCategory].map((image, index) => (
          <div key={index} className="col-12 col-md-3 mb-4">
            {/* Periksa jika gambar adalah card4, maka beri link */}
            {image === card4 ? (
              <Link to="/card4">  {/* Arahkan ke /card4 */}
                <img 
                  src={image} 
                  className="img-fluid" 
                  alt={`gambar ${selectedCategory} ${index + 1}`} 
                />
              </Link>
            ) : (
              <img 
                src={image} 
                className="img-fluid" 
                alt={`gambar ${selectedCategory} ${index + 1}`} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kategori;
