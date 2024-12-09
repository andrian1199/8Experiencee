import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirm.css';
import Navigasi from '../komponen Home/Navigasi';
import Lower from '../Detail Konser/Lower';

const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTickets, totalPrice } = location.state || {}; // Mengambil data dari state

  // Jika tidak ada data order yang tersedia, tampilkan error
  if (!selectedTickets || !totalPrice) {
    return <div>Error: No order details available.</div>;
  }

  const handleCheckout = () => {
    const orderDetails = {
      total: totalPrice,
      email: 'kelompok88@celerates.com', // Ganti dengan email yang sesuai
    };

    // Navigasi ke halaman Confirm2 dengan mengirimkan state
    navigate('/confirm2', { state: orderDetails });
  };

  return (
    <>
      <Navigasi />
      <div className="container my-5 pt-5">
        {/* Menambahkan padding-top (pt-5) untuk menghindari konten tenggelam di bawah navigasi */}
        <h2 className="text-center mb-4">Pilihan Tiket</h2>
        <div className="row">
          {/* Pilihan Metode Pembayaran */}
          <div className="col-md-8">
            <div className="payment-methods">
              <div className="payment-option d-flex align-items-center justify-content-between p-3 mb-3">
                <span className="fw-bold">QRIS</span>
                <img src="/path-to-qris-logo.png" alt="QRIS" className="payment-logo" />
              </div>
              <div className="payment-option d-flex align-items-center justify-content-between p-3 mb-3">
                <span className="fw-bold">BCA</span>
                <img src="/path-to-bca-logo.png" alt="BCA" className="payment-logo" />
              </div>
            </div>
          </div>

          {/* Detail Pesanan */}
          <div className="col-md-4">
            <div className="order-summary p-4 bg-white shadow-sm">
              <h4 className="fw-bold">Detail Pesanan</h4>
              <hr />
              {selectedTickets.map((ticket, index) => (
                <div key={index}>
                  <p className="mb-2">
                    <b>Category:</b> {ticket.category}
                  </p>
                  <p className="mb-2">
                    <b>Jumlah Tiket:</b> {ticket.quantity}
                  </p>
                  <p className="mb-2">
                    <b>Harga:</b> Rp. {ticket.price.toLocaleString()}
                  </p>
                  <hr />
                </div>
              ))}
              <h5 className="fw-bold">Total: Rp. {totalPrice.toLocaleString()}</h5>
              <button
                className="btn btn-warning text-white w-100 mt-3"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Lower />
    </>
  );
};

export default Confirm;
