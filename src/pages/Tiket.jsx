import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tiket.css';

const Tiket = () => {
  const [quantities, setQuantities] = useState([0, 0, 0, 0]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const ticketPrice = 259900;
  const totalPrice = quantities.reduce((total, qty) => total + qty * ticketPrice, 0);

  const ticketCategories = ["VIP Guest A", "VIP Guest B", "VIP Guest C", "VIP Guest D"];
  const navigate = useNavigate();

  const incrementQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const decrementQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index]--;
    }
    setQuantities(newQuantities);
  };

  const toggleDetails = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleNext = () => {
    // Filter tiket yang dipilih
    const selectedTickets = quantities
      .map((qty, index) => ({
        category: ticketCategories[index],
        quantity: qty,
        price: qty * ticketPrice,
      }))
      .filter(ticket => ticket.quantity > 0);

    // Jika tidak ada tiket dipilih, tampilkan peringatan
    if (selectedTickets.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Anda belum memilih tiket!',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Membuat pesan detail tiket untuk alert
    const ticketDetails = selectedTickets
      .map(
        (ticket) =>
          `<b>Kategori:</b> ${ticket.category}<br><b>Kuantitas:</b> ${ticket.quantity}<br><b>Subtotal:</b> Rp. ${ticket.price.toLocaleString()}`
      )
      .join('<br><br>');

    const message = `
      Tiket akan dikirimkan ke email atau WhatsApp Anda.<br><br>
      <b>Detail Tiket:</b><br>${ticketDetails}<br><br>
      <b>Total Harga:</b> Rp. ${totalPrice.toLocaleString()}
    `;

    // Tampilkan SweetAlert konfirmasi
    Swal.fire({
      title: 'Konfirmasi Pembelian',
      html: message,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Lanjutkan',
      cancelButtonText: 'Kembali',
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Alert kedua untuk memastikan "OK" diklik sebelum navigasi
        Swal.fire({
          icon: 'success',
          title: 'Pembelian Berhasil!',
          text: 'Terima kasih! Anda akan diarahkan ke proses pembayaran.',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/confirm', {
            state: {
              selectedTickets,
              totalPrice, // Kirimkan totalPrice yang benar ke halaman Confirm
            },
          });
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Anda Memilih Kembali',
          text: 'Silakan periksa kembali pesanan Anda.',
        });
      }
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Pilihan Tiket</h2>
      <div className="ticket-list">
        {quantities.map((quantity, index) => (
          <div
            className={`ticket-card mb-3 ${selectedIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => toggleDetails(index)}
          >
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="ticket-details p-3">
                  <h3 className="ticket-title">{ticketCategories[index]}</h3>
                  <p className="ticket-price">Rp. {ticketPrice.toLocaleString()}</p>
                  {selectedIndex === index && (
                    <ul className="ticket-benefits mt-3">
                      <li>Dapat merchandise topi, lanyard</li>
                      <li>Tempat duduk teduh, nyaman</li>
                      <li>Dapat konsumsi</li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="quantity-control d-flex align-items-center justify-content-center">
                  <button
                    className="btn btn-light border"
                    onClick={(e) => {
                      e.stopPropagation();
                      decrementQuantity(index);
                    }}
                  >
                    -
                  </button>
                  <span className="fw-bold mx-3">{quantity}</span>
                  <button
                    className="btn btn-warning text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      incrementQuantity(index);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="total-card p-3 mt-4 bg-white shadow-sm text-center">
        <h3 className="fw-bold">Total Harga: Rp. {totalPrice.toLocaleString()}</h3>
        <button className="btn btn-warning text-white mt-2 px-4 py-2" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Tiket;
