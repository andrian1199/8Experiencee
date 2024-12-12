import React from "react";
import { useLocation } from "react-router-dom";

const CekTiket = () => {
  const { state } = useLocation();
  const { user = {}, tickets = [] } = state || {};

  return (
    <div style={styles.pageContainer}>
      <main style={styles.main}>
        <h1 style={styles.title}>Tiket Anda</h1>
        <img
          src="/assets/FesTix 1.svg"
          alt="Festix Logo"
          style={styles.mainLogo}
        />
        <div style={styles.infoContainer}>
          <p><strong>Nama Pengguna:</strong> {user.username || "Nama Tidak Tersedia"}</p>
          <p><strong>Email:</strong> {user.email || "Email Tidak Tersedia"}</p>
        </div>
        <div style={styles.ticketsContainer}>
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <div key={index} style={styles.ticket}>
                <p><strong>Acara:</strong> {ticket.eventName || "Nama Acara"}</p>
                <p><strong>Tanggal:</strong> {ticket.eventDate || "Tanggal Acara"}</p>
                <p><strong>Lokasi:</strong> {ticket.eventLocation || "Lokasi Acara"}</p>
                <p><strong>Jumlah Tiket:</strong> {ticket.quantity || 0}</p>
              </div>
            ))
          ) : (
            <p style={styles.noTickets}>Tidak ada tiket tersedia</p>
          )}
        </div>
        <div style={styles.actions}>
          <a href="/" style={styles.homeLink}>Kembali ke Home</a>
        </div>
      </main>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F9F9F9",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "600px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1F1F1F",
    marginBottom: "20px",
  },
  mainLogo: {
    width: "120px",
    height: "auto",
    margin: "20px 0",
  },
  infoContainer: {
    textAlign: "left",
    marginBottom: "20px",
    lineHeight: "1.6",
    fontSize: "16px",
    color: "#333",
  },
  ticketsContainer: {
    textAlign: "left",
    marginBottom: "20px",
    lineHeight: "1.6",
    fontSize: "16px",
    color: "#333",
  },
  ticket: {
    padding: "10px",
    backgroundColor: "#EFEFEF",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  noTickets: {
    textAlign: "center",
    color: "#888",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  homeLink: {
    textDecoration: "none",
    fontSize: "16px",
    color: "#1F1F1F",
    fontWeight: "bold",
  },
};

export default CekTiket;
