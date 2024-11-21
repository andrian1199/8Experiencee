import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../komponen blog/Navbar';
import Filter from '../komponen blog/Filter';
import blogData from '../data/BlogData';
import '../Blog/Blog.css'
import Card from '../komponen blog/Card'; // Impor Card
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [visibleCards, setVisibleCards] = useState(8); // Mulai dengan menampilkan 8 kartu

  const categories = ['Semua', 'Artis', 'Musik', 'Tips'];

  // Filter kartu berdasarkan kategori aktif
  const filteredCards = activeCategory === 'Semua'
    ? blogData
    : blogData.filter((card) => card.category === activeCategory);

  // Ambil kartu yang sesuai dengan jumlah yang ingin ditampilkan
  const cardsToDisplay = filteredCards.slice(0, visibleCards);

  // Fungsi untuk menambah jumlah kartu yang ditampilkan
  const showMoreCards = () => {
    setVisibleCards(visibleCards + 8); // Menambah 8 kartu setiap kali tombol ditekan
  };

  return (
    <div>
      <Navbar />
      <section className="container blog">
        <h1>Blog</h1>
        <div className="blog-content">
          <div className="content">
            <h1>Disini banyak informasi yang bisa kamu dapatkan - seputar konser, musik, dan lain-lain</h1>
            <p>Konser berasal dari bahasa Italia: concerto dan bahasa Latin: concertare yang berarti berjuang, bersaing dengan orang lain. Konser adalah pertunjukan langsung, biasanya musik, di depan penonton.</p>
            <button className="button" onClick={() => window.location.href = '#'}>Baca</button>
          </div>
          <div className="banner">
            <img src="assets/Bernadya 1.webp" alt="Banner" />
          </div>
        </div>
      </section>
      <Filter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <div className="container mt-2">
        <div className="row">
          {cardsToDisplay.map((card) => (
            <Card
              key={card.id}
              image={card.image}
              category={card.category}
              title={card.title}
              link={`/blog/${card.id}`} // Link menuju halaman detail
            />
          ))}
        </div>
      </div>
      {/* Tombol Tampilkan Lebih */}
      {visibleCards < filteredCards.length && (
        <div className="text-center mt-4">
          <button className="load-more" onClick={showMoreCards}>
            Tampilkan Lebih
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
