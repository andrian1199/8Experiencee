import React, { useState } from 'react';
import '../Blog/blog.css';
import Navigation from '../komponen Home/Navbar';
import Low from '../Detail Konser/Lower';
import { Link } from 'react-router-dom';
import bernadyaImage from '../assets/bernadya 1.webp'

const Blog = () => {
    const [filter, setFilter] = useState('semua');
    const [itemsToShow, setItemsToShow] = useState(8);

    const blogCards = [
        { id: 1, category: 'artist', title: 'Kisah di Balik Bernadya dan Karyanya', img: 'assets/BernadyaR.svg' },
        { id: 2, category: 'music', title: 'Perjalanan Lagu Perahu Kertas: Dari Ide Hingga Jadi Hits', img: 'assets/PerahuKertas.svg' },
        { id: 3, category: 'tips', title: '9 Outfit Nonton Konser Stylish dan Nyaman', img: 'assets/Outfit.svg' },
        { id: 4, category: 'artist', title: 'Rizky Febian: Musisi Muda Berbakat', img: 'assets/RizkyW.svg' },
        { id: 5, category: 'music', title: 'Kisah di Balik Lagu Hits Satru Karya Denny Caknan', img: 'assets/Satru.svg' },
        { id: 6, category: 'tips', title: '10 Tips Nonton Konser Pemula!', img: 'assets/Pemula.svg' },
        { id: 7, category: 'artist', title: 'Kisah Sukses Tulus: Dari Nol Hingga jadi Bintang', img: 'assets/Tulus.svg' },
        { id: 8, category: 'artist', title: 'Momen Tak Terlupakan di Hidup NDX AKA', img: 'assets/Ndx.svg' },
    ];

    
    const updateVisibleCards = () => {
        setItemsToShow((prevCount) => prevCount + 4);
    };

    
    const filteredCards = blogCards
        .filter(card => filter === 'semua' || card.category === filter)
        .slice(0, itemsToShow);

    return (
        <>
            <Navigation /> 

            <section className="container blog">
                <h1>Blog</h1>
                <div className="blog-content">
                    <div className="content">
                        <h1>Disini banyak informasi yang bisa kamu dapatkan - seputar konser, musik, dan lain-lain</h1>
                        <p>Konser berasal dari bahasa Italia: concerto dan bahasa Latin: concertare yang berarti berjuang, bersaing dengan orang lain. Konser adalah pertunjukan langsung, biasanya musik, di depan penonton.</p>
                        <button className="button">
                        <Link to="/blog-detail" className="text-decoration-none text-white">Baca</Link>
                        </button>
                    </div>
                    <div className="image">
                       <img src={bernadyaImage} alt="Banner Image" />
                    </div>
                </div>
            </section>

            <div>
                {/* Filter */}
                <div className="container text-start my-4">
                    <div className="post-filter-container d-flex justify-content-start flex-wrap gap-2">
                        {['semua', 'music', 'artist', 'tips'].map((category) => (
                            <span
                                key={category}
                                className={`filter-item btn btn-secondary ${filter === category ? 'active-filter' : ''}`}
                                onClick={() => setFilter(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Blog Cards */}
                <div className="container mt-2">
                    <div className="row">
                        {filteredCards.map(card => (
                            <div key={card.id} className={`col-md-3 mb-4 ${card.category} category`}>
                                <div className="card">
                                    <img src={card.img} className="card-img-top" alt="Image" />
                                    <div className="card-body">
                                        <span className={`category-badge-${card.category}`}>{card.category}</span>
                                        <h5 className="card-title">{card.title}</h5>
                                         <p className="card-text">
                                         <Link to="/blog-detail" className="text-decoration-none">Baca Sekarang</Link>
                                       </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    
                    {itemsToShow < blogCards.filter(card => filter === 'semua' || card.category === filter).length && (
                        <div className="button-container text-center">
                            <button onClick={updateVisibleCards} className="btn btn-primary">
                                Tampilkan lebih banyak
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Low /> 
        </>
    );
};

export default Blog;
