import React from 'react';
import '../Blog/Blogdetail.css'
import ramimalkekImage from '../assets/Ramimalkek.webp';
import bernadyaImage from '../assets/Bernadya 1.webp';

const Blogdetail = () => {
    return (
        <>
            <header className="bg-dark text-white py-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <a href="#" className="logo text-warning h4">Festix</a>
                    <nav>
                        <a href="#" className="text-white me-4">Home</a>
                        <a href="#" className="text-white me-4">Komunitas</a>
                        <a href="#" className="text-warning">Blog</a>
                        <a href="#" className="text-white me-4">Tentang Kami</a>
                    </nav>
                    <div>
                        <i className="bx bx-search text-warning fs-4"></i>
                        <i className="bx bx-user text-warning fs-4 ms-3"></i>
                    </div>
                </div>
            </header>


            <section className="blog-detail container mt-5">
  
                <a href="../Blog/blog.html" className="btn btn-link text-dark mb-3">← Kembali</a>
                <div className="d-flex align-items-center">
                    <span className="badge bg-warning text-dark" style={{ borderRadius: '50px', padding: '0.4em 0.8em' }}>Artis</span>
                    <span className="text-muted ms-3">31 Desember 2024</span>
                </div>
                <h1 className="mt-3">Kisah di Balik Bernadya dan Karyanya</h1>
                <div className="profile d-flex align-items-center mt-3 mb-4">
                <img 
                className="rounded-circle me-3 profile-pic" 
                src={ramimalkekImage} 
                alt="Author" 
                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} 
                />
                    <div>
                        <h6 className="mb-0">Rami Malek</h6>
                        <small className="text-muted">Warner Bros Inc.</small>
                    </div>
                </div>

     
                <div className="content">
                <img 
                src={bernadyaImage} 
                alt="Gambar Blog" 
                className="img-fluid rounded mb-4" 
                />
                    <p>
                        Konser adalah salah satu bentuk hiburan yang sangat dinantikan banyak orang, terutama bagi para penggemar musik. Acara ini tidak hanya menghadirkan momen yang seru dan menyenangkan, tetapi juga memberikan pengalaman langsung untuk menikmati musik dari penyanyi atau band favorit. Penonton bisa merasakan atmosfer yang berbeda...
                    </p>
                    <p>
                        Bernadya Ribka Jayakusuma penyanyi asal Surabaya, Jawa Timur ini sukses membuat para pendengar lagunya auto galau.
                        Pasalnya beberapa lagu miliknya seperti lagu Satu Bulan dan Kini Mereka Tahu tengah viral di media sosial.
                        Penyanyi kelahiran 16 Maret 2004 tersebut kerap diundang untuk manggung keliling Indonesia. Meski terbilang sebagai penyanyi baru, namun lagu-lagunya mampu membius banyak orang dan membuat tergiang-ngiang karena liriknya yang indah.
                        Di tahun 2016 lalu, menjadi titik awal Bernadya meniti karier di dunia tarik suara. Dimana pada saat itu ia ikut ajang pencarian bakat cilik, The Voice Kids Indonesia. pada saat mengikuti ajang tersebut usia Bernadya masih 12 tahun.
                        Dengan membawakan lagu One and Only yang dipopulerkan oleh Adele, Bernadya sukses memukau para dewan juri.
                        Dimana pada saat itu ia sukses membuat Tulus yang merupakan salah satu juri memutar kursinya dan menjadi mentornya.
                        Bahkan video Bernadya pada saat The Blind Auditions tersebut telah ditonton 355 ribu penonton hingga saat ini.
                        Memecahkan Rekor Dengan Pendengar Bulanan Terbanyak
                        Kesuksesan Bernadya saat ini tidak hanya berhasil membius para pendengarnya lewat lagu-lagu yang related dengan mereka.
                        Tetapi Bernadya juga berhasil mencapai keberhasilan di platform musik melalui lagu-lagunya. Melalui konser, musisi tidak hanya memperlihatkan kemampuan bermusik mereka, tetapi juga mengekspresikan ide, emosi, dan pesan yang ingin disampaikan kepada dunia. 
                        Bagi penggemar, konser merupakan kesempatan untuk bertemu idola dan merasakan musik secara langsung—sebuah pengalaman yang mungkin sulit dilupakan.
                    </p>
                </div>
            </section>

            <footer className="bg-dark text-light py-4">
                <div className="container text-center">
                    <a href="#" className="logo text-warning h5 d-block mb-3">Festix</a>
                    <p className="mb-2">Platform terpercaya yang dirancang untuk memudahkan para penggemar musik menemukan informasi lengkap tentang konser dan festival favorit mereka.</p>
                    <div className="d-flex justify-content-center mb-3">
                        <a href="#" className="text-light mx-2">Privacy Policy</a>
                        <a href="#" className="text-light mx-2">Terms & Conditions</a>
                        <a href="#" className="text-light mx-2">Cookie Policy</a>
                        <a href="#" className="text-light mx-2">Contact</a>
                    </div>
                    <p className="mb-0">&copy; 2024 Kelompok 8</p>
                </div>
            </footer>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
};

export default Blogdetail;
