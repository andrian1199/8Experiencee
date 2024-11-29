import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../komponen Home/Navigasi';
import Low from '../Detail Konser/Lower';  // Pastikan pathnya benar
import './PilihanTiket.css'; // Mengimpor file CSS

function PilihanTiket() {
  const [tiket, setTiket] = useState([
    { id: 1, judul: 'VIP Guest', harga: 259900, manfaat: ['Dapat merchandise topi, lanyard', 'Tempat duduk nyaman', 'Dapat konsumsi'], jumlah: 0 },
    { id: 2, judul: 'VIP Guest', harga: 259900, manfaat: ['Dapat merchandise topi, lanyard', 'Tempat duduk nyaman', 'Dapat konsumsi'], jumlah: 0 },
    { id: 3, judul: 'VIP Guest', harga: 259900, manfaat: ['Dapat merchandise topi, lanyard', 'Tempat duduk nyaman', 'Dapat konsumsi'], jumlah: 0 },
  ]);
  
  const navigate = useNavigate(); // Inisialisasi navigate untuk pengaturan rute navigasi
  
  const handleJumlahPerubahan = (id, perubahan) => {
    setTiket(tiket.map(item => item.id === id ? { ...item, jumlah: Math.max(0, item.jumlah + perubahan) } : item));
  };

  const totalHarga = tiket.reduce((total, item) => total + item.harga * item.jumlah, 0);

  return (
    <>
      <Navigation />
      
      <div className="container-tiket">
        <h2>Pilihan Tiket</h2>
        
        {/* Looping untuk menampilkan daftar tiket */}
        {tiket.map(item => (
          <div key={item.id} className="tiket-card">
            <h3>{item.judul}</h3>
            <p className="harga">Rp {item.harga.toLocaleString('id-ID')}</p>
            <ul>
              {item.manfaat.map((manfaat, index) => (
                <li key={index}>{index + 1}. {manfaat}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={() => handleJumlahPerubahan(item.id, -1)} className="jumlah-btn">-</button>
              <span style={{ margin: '0 10px', fontSize: '1.2em' }}>{item.jumlah}</span>
              <button onClick={() => handleJumlahPerubahan(item.id, 1)} className="jumlah-btn">+</button>
            </div>
          </div>
        ))}

        {/* Menampilkan total harga */}
        <div className="total-harga">
          <span>Total</span>
          <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
        </div>

        {/* Tombol navigasi untuk menuju halaman Pembayaran */}
        <button onClick={() => navigate('/Pembayaran')} className="tombol-beli">
          Beli
        </button>
      </div>

      {/* Memanggil komponen Low (Lower) */}
      <Low />
    </>
  );
}

export default PilihanTiket;
