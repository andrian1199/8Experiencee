import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navigation from '../komponen Home/Navbar';
import Low from '../Detail Konser/Lower';

function PilihanTiket() {
  const [tiket, setTiket] = useState([
    { id: 1, judul: 'VIP Guest', harga: 259900, manfaat: ['Dapat merchandise topi, lanyard', 'Tempat duduk nyaman', 'Dapat konsumsi'], jumlah: 0 },
    { id: 2, judul: 'VIP Guest', harga: 259900, manfaat: ['Dapat merchandise topi, lanyard', 'Tempat duduk nyaman', 'Dapat konsumsi'], jumlah: 0 },
    { id: 3, judul: 'VIP Guest', harga: 259900, manfaat: ['Dapat merchandise topi, lanyard', 'Tempat duduk nyaman', 'Dapat konsumsi'], jumlah: 0 },
  ]);
  
  const navigate = useNavigate(); // Inisialisasi navigate
  
  const handleJumlahPerubahan = (id, perubahan) => {
    setTiket(tiket.map(item => item.id === id ? { ...item, jumlah: Math.max(0, item.jumlah + perubahan) } : item));
  };

  const totalHarga = tiket.reduce((total, item) => total + item.harga * item.jumlah, 0);

  return (
    <>
      <Navigation />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>Pilihan Tiket</h2>
        {tiket.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px', marginBottom: '10px', backgroundColor: '#FFF3CD' }}>
            <h3>{item.judul}</h3>
            <p style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#333' }}>Rp {item.harga.toLocaleString('id-ID')}</p>
            <ul style={{ margin: '10px 0', padding: '0', listStyleType: 'none', color: '#333' }}>
              {item.manfaat.map((manfaat, index) => (
                <li key={index}>{index + 1}. {manfaat}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={() => handleJumlahPerubahan(item.id, -1)} style={gayaTombol}>-</button>
              <span style={{ margin: '0 10px', fontSize: '1.2em' }}>{item.jumlah}</span>
              <button onClick={() => handleJumlahPerubahan(item.id, 1)} style={gayaTombol}>+</button>
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '1.5em', fontWeight: 'bold' }}>
          <span>Total</span>
          <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
        </div>
        <button onClick={() => navigate('/Pembayaran')} style={gayaTombolBeli}>
          Beli
        </button>
      </div>
      <Low />
    </>
  );
}

const gayaTombol = {
  backgroundColor: '#FFD700',
  border: 'none',
  borderRadius: '5px',
  color: '#333',
  fontSize: '1em',
  padding: '5px 10px',
  cursor: 'pointer',
};

const gayaTombolBeli = {
  backgroundColor: '#FFD700',
  border: 'none',
  borderRadius: '5px',
  color: '#333',
  fontSize: '1.2em',
  fontWeight: 'bold',
  padding: '10px 20px',
  cursor: 'pointer',
  marginTop: '10px',
  width: '100%',
  textAlign: 'center',
};

export default PilihanTiket;
