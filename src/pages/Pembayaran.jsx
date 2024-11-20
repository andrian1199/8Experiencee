import React from 'react';
import bcaLogo from '../assets/Bca.png';
import qrisLogo from '../assets/Qris.png';
import Navigation from '../komponen Home/Navbar';
import Low from '../Detail Konser/Lower';

function TicketSelection() {
  return (
    <>
      <Navigation />
      <div style={styles.container}>
        <div style={styles.ticketOptions}>
          <h2>Pilihan Tiket</h2>
          <button style={styles.paymentOption}>
            <span>QRIS</span>
            <img src={bcaLogo} alt="BCA" style={styles.logo} />
          </button>
          <button style={styles.paymentOption}>
            <span>BCA</span>
            <img src={qrisLogo} alt="QRIS" style={styles.logo} />
          </button>
        </div>

        <div style={styles.orderSummary}>
          <h3>Detail Pesanan</h3>
          <p>Category: Reality Club</p>
          <p>Date: 10 Desember 2024</p>
          <p>Time: 20:00 - 22:00</p>
          <p>Location: Graha Unesa Loka Wetan</p>
          <hr />
          <p>Sound of Downtown Presale Day 2 - Rp150.000</p>
          <button style={styles.checkoutButton}>Checkout</button>
        </div>
      </div>
      <Low />
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    paddingTop: '80px', // Menambahkan jarak di atas agar tidak tertutup oleh Navigation
  },
  ticketOptions: {
    flex: 1,
    marginRight: '20px',
  },
  paymentOption: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  logo: {
    height: '20px',
  },
  orderSummary: {
    flex: 1,
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
  },
  checkoutButton: {
    marginTop: '20px',
    padding: '10px',
    width: '100%',
    backgroundColor: '#ffcc00',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default TicketSelection;
