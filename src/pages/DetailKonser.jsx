import React from 'react';
import Navigation from '../komponen Home/Navbar';
import gambar1 from '../assets/detail.svg';
import SearchBar from '../Detail Konser/Search';
import Kategori from '../Detail Konser/Kategori';
import Lower from '../Detail Konser/Lower';


const DetailKonser = () => {
  return (
    <>
      <Navigation />
  <div
      className="gambar"
      style={{
        backgroundImage: `url(${gambar1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',

      }}
    >
  <div>
      <div className="container d-flex justify-content-start align-items-center" style={{ height: '100%' }}>
        <div className="text-content" style={{ marginLeft: '50px', fontSize: '40px', marginTop: '200px'}}>
          <h1 className="text-white mb-4">
            Kamu bisa cari konser-konser yang kita <br />
            sediakan disini nih! Yuk nonton konser
          </h1>
          <h2 className="text-white mb-4" style={{fontSize: '20px'}}>
            Concert comes from Italian: concerto and Latin: concertare which
            means to strive, to compete with others. A <br />
            concert is a live performance, usually of music, in front of an audience.
          </h2>
          <a href="#cek-konser" className="btnhero btn-primary mt-4" style={{ fontSize: "30px"}}>
            Cek Konser
          </a>
        </div>
      </div>
    </div>
    </div>
      <SearchBar/>
      <Kategori/>
      <Lower/>
      
    </>
  );
};

export default DetailKonser;
