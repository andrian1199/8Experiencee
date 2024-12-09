import React, { useState } from 'react';
import './konser.css';
import Frametiket from '../assets/Frametiket.svg';
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
import Search from './Search';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const imageCategories = {
  All: [
    { src: card4, title: "Sound of Downtown", date: "3-4 Agustus 2024", price: "Rp 150.000", specialImage: Frametiket, place: "Jakarta", vendor: "Vendor A" },
    { src: card5, title: "Konser Rock 2", date: "2 Desember 2024", price: "Rp 600.000", place: "Bandung", vendor: "Vendor B" },
    { src: card6, title: "Konser Jazz 1", date: "3 Desember 2024", price: "Rp 450.000", place: "Surabaya", vendor: "Vendor C" },
    { src: card7, title: "Konser Jazz 2", date: "4 Desember 2024", price: "Rp 700.000", place: "Yogyakarta", vendor: "Vendor D" },
    { src: card8, title: "Festival Pop", date: "1 Januari 2025", price: "Rp 300.000", place: "Semarang", vendor: "Vendor E" },
    { src: card9, title: "Rock Legend", date: "10 Januari 2025", price: "Rp 900.000", place: "Bali", vendor: "Vendor F" },
    { src: card10, title: "Jazz Delight", date: "14 Februari 2025", price: "Rp 500.000", place: "Medan", vendor: "Vendor G" },
    { src: card11, title: "Indie Fest", date: "20 Februari 2025", price: "Rp 400.000", place: "Makassar", vendor: "Vendor H" },
    { src: card12, title: "Symphony Night", date: "28 Februari 2025", price: "Rp 750.000", place: "Manado", vendor: "Vendor I" },
    { src: card13, title: "Acoustic Harmony", date: "5 Maret 2025", price: "Rp 200.000", place: "Bogor", vendor: "Vendor J" },
    { src: card14, title: "Pop Star", date: "12 Maret 2025", price: "Rp 350.000", place: "Cirebon", vendor: "Vendor K" },
    { src: card15, title: "Rock Fusion", date: "20 Maret 2025", price: "Rp 650.000", place: "Lampung", vendor: "Vendor L" },
  ],
  Dangdut: [
    { src: card5, title: "Konser Rock 2", date: "2 Desember 2024", price: "Rp 600.000", place: "Bandung", vendor: "Vendor B" },
    { src: card9, title: "Rock Legend", date: "10 Januari 2025", price: "Rp 900.000", place: "Bali", vendor: "Vendor F" },
    { src: card15, title: "Rock Fusion", date: "20 Maret 2025", price: "Rp 650.000", place: "Lampung", vendor: "Vendor L" },
  ],
  Jazz: [
    { src: card6, title: "Konser Jazz 1", date: "3 Desember 2024", price: "Rp 450.000", place: "Surabaya", vendor: "Vendor C" },
    { src: card7, title: "Konser Jazz 2", date: "4 Desember 2024", price: "Rp 700.000", place: "Yogyakarta", vendor: "Vendor D" },
    { src: card10, title: "Jazz Delight", date: "14 Februari 2025", price: "Rp 500.000", place: "Medan", vendor: "Vendor G" },
  ],
  Pop: [
    { src: card8, title: "Festival Pop", date: "1 Januari 2025", price: "Rp 300.000", place: "Semarang", vendor: "Vendor E" },
    { src: card14, title: "Pop Star", date: "12 Maret 2025", price: "Rp 350.000", place: "Cirebon", vendor: "Vendor K" },
  ],
};

function Kategori() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredImages = imageCategories[selectedCategory].filter((image) =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="kategori-container">
      <Search onSearch={handleSearch} />
      {selectedImage ? (
        <div className="detail-container d-flex p-4">
          <div className="image-container me-4">
            <img
              src={selectedImage.specialImage || selectedImage.src}
              alt={selectedImage.title}
              className="img-fluid rounded"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="text-container">
            <h1 className=" text-primary">{selectedImage.title}</h1>
            <div className="info-box p-3 my-3 border rounded">
              <p><FontAwesomeIcon icon={faCalendarAlt} /> {selectedImage.date}</p>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {selectedImage.place}</p>
              <p><FontAwesomeIcon icon={faBuilding} /> {selectedImage.vendor}</p>
            </div>
            <div className="price-box p-3 my-3 border rounded">
              <h4 className="text-success">Harga: {selectedImage.price}</h4>
              <Link to={`/tiket/${selectedImage.price}`} className="btn btn-success mt-2">
                Cek Tiket
              </Link>
            </div>
            <div className="my-4">
              <h5>Bagikan Event:</h5>
              <div className="social-icons d-flex gap-3">
                <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                <a href="https://api.whatsapp.com"><FontAwesomeIcon icon={faWhatsapp} size="2x" /></a>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setSelectedImage(null)}>
              Kembali ke Kategori
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="button-group d-flex mb-4">
            {Object.keys(imageCategories).map((category) => (
              <button
                key={category}
                className="kategori-button btn btn-outline-primary mx-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="row">
            {filteredImages.map((image, index) => (
              <div key={index} className="col-12 col-md-3 mb-4 d-flex align-items-center">
                <div className="image-container">
                  <img
                    src={image.src}
                    className="img-fluid rounded"
                    alt={image.title}
                    onClick={() => handleImageClick(image)}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Kategori;