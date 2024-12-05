import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MetodePembayaran = () => {
  const { state } = useLocation();
  const { eventDetail = {}, selectedTickets = [], totalPrice = 0 } = state || {};

  const [selectedMethod, setSelectedMethod] = useState("");
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!selectedMethod) {
      alert("Silakan pilih metode pembayaran!");
      return;
    }
    navigate("/konfirmasi-pesanan", {
      state: {
        eventDetail,
        selectedTickets,
        totalPrice,
        selectedMethod,
      },
    });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h2>Metode Pembayaran</h2>
      </div>

      <div style={styles.container}>
        <div style={styles.leftContainer}>
          <h3 style={styles.sectionTitle}>Metode Pembayaran</h3>
          <div
            style={{
              ...styles.paymentOption,
              ...(selectedMethod === "QRIS" ? styles.selectedOption : {}),
            }}
            onClick={() => setSelectedMethod("QRIS")}
          >
            <img src="/assets/qris.png" alt="QRIS" style={styles.icon} />
            <span>QRIS</span>
          </div>
          <div
            style={{
              ...styles.paymentOption,
              ...(selectedMethod === "BCA" ? styles.selectedOption : {}),
            }}
            onClick={() => setSelectedMethod("BCA")}
          >
            <img src="/assets/bca.png" alt="BCA" style={styles.icon} />
            <span>BCA</span>
          </div>
        </div>

        <div style={styles.rightContainer}>
          <h3 style={styles.sectionTitle}>Detail Pesanan</h3>
          <p>
            <strong>Acara:</strong> {eventDetail.title || "Nama Acara"}
          </p>
          <p>
            <strong>Tanggal:</strong> {eventDetail.date || "Tanggal Acara"}
          </p>
          <p>
            <strong>Lokasi:</strong> {eventDetail.location || "Lokasi Acara"}
          </p>
          <p>
            <strong>Jumlah Tiket:</strong>{" "}
            {selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0) || 1}
          </p>
          <p>
            <strong>Total Harga:</strong> {formatCurrency(totalPrice)}
          </p>
          <button style={styles.button} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
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
  pageContainer: {
    padding: "100px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F9F9F9",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "20px",
    fontWeight: "700",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },
  leftContainer: {
    flex: "1 1 60%",
    padding: "20px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    minWidth: "300px",
  },
  rightContainer: {
    flex: "1 1 35%",
    padding: "20px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    minWidth: "300px",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "700",
  },
  paymentOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
    border: "1px solid #DDD",
    borderRadius: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    backgroundColor: "#FFF",
    transition: "all 0.3s",
  },
  selectedOption: {
    backgroundColor: "#FFCF00",
    color: "#000",
    border: "1px solid #FFCF00",
  },
  icon: {
    height: "30px",
    marginRight: "10px",
  },
  button: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#FFCF00",
    color: "#000",
    border: "none",
    borderRadius: "40px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default MetodePembayaran;
