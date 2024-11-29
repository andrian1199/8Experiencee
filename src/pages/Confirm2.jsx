import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigasi from '../komponen Home/Navigasi';
import Lower from '../Detail Konser/Lower'; // Menggunakan komponen Lower yang sudah benar

const Confirm2 = () => {
  const location = useLocation();
  const { total, email } = location.state || { total: 0, email: '' };

  return (
    <>
      <Navigasi />
      <div className="container text-center my-5" style={{ paddingTop: '80px' }}> {/* Menambahkan padding atas untuk menghindari overlap dengan navigasi */}
        <h1 className="mb-4">Terima Kasih Udah Pesan!</h1>
        <img src="/path-to-logo.png" alt="Festix Logo" className="my-3" />
        <p className="mb-3">Pembayaranmu sebesar Rp {total.toLocaleString('id-ID')} berhasil!</p>
        <p className="mb-4">
          Tiket elektronik dan kuitansi sudah dikirim ke <b>{email}</b>.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-warning text-white">Unduh Tiket</button>
          <button className="btn btn-outline-dark">Kembali ke Home</button>
        </div>
      </div>
      <div className="mt-5"> {/* Menambahkan margin bawah agar konten tidak berdekatan dengan Lower */}
        <Lower />
      </div>
    </>
  );
};

export default Confirm2;
