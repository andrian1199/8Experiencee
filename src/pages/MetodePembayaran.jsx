import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const MetodePembayaran = () => {
  const { state } = useLocation();
  const { eventDetail, selectedTickets, totalPrice } = state || {};

  const [selectedMethod, setSelectedMethod] = useState("");

  const handleCheckout = () => {
    if (!selectedMethod) {
      alert("Silakan pilih metode pembayaran!");
      return;
    }
    alert(`Anda memilih metode pembayaran: ${selectedMethod}`);
  };

  return (
    <div style={styles.container}>
      {/* Kontainer Kiri */}
      <div style={styles.leftContainer}>
        <h3>Pilih Metode Pembayaran</h3>
        <div style={styles.paymentOption}>
          <input
            type="radio"
            id="qris"
            name="payment"
            value="QRIS"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <label htmlFor="qris" style={styles.label}>
            QRIS
          </label>
        </div>
        <div style={styles.paymentOption}>
          <input
            type="radio"
            id="bank"
            name="payment"
            value="Bank Transfer"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <label htmlFor="bank" style={styles.label}>
            Bank Transfer
          </label>
        </div>
      </div>

      {/* Kontainer Kanan */}
      <div style={styles.rightContainer}>
        <h3>Detail Pesanan</h3>
        <p><strong>Acara:</strong> {eventDetail.title}</p>
        <p><strong>Tanggal:</strong> {eventDetail.date}</p>
        <p><strong>Lokasi:</strong> {eventDetail.location}</p>
        <p><strong>Jumlah Tiket:</strong> {selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0)}</p>
        <p><strong>Total Harga:</strong> {formatCurrency(totalPrice)}</p>
      </div>

      <button style={styles.button} onClick={handleCheckout}>Bayar</button>
    </div>
  );
};

const formatCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  leftContainer: {
    width: "45%",
  },
  rightContainer: {
    width: "45%",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
  },
  paymentOption: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  label: {
    marginLeft: "10px",
  },
  button: {
    backgroundColor: "#FFCF00",
    color: "#000",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default MetodePembayaran;
