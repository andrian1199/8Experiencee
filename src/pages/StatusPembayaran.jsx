import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StatusPembayaran = () => {
  const { state } = useLocation();
  console.log("State yang diterima:", state); // Cek state yang diterima
  const {
    eventDetail = {},
    selectedTickets = [],
    totalPrice = 0,
    selectedMethod = "",
    user = {}, // Menambahkan user dari state
  } = state || {}; // Pastikan state ada

  const navigate = useNavigate();

  // Fungsi untuk memformat tanggal lahir (dd-mm-yyyy)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Tanggal Tidak Tersedia";  // Jika format tanggal tidak valid
    }
    return date.toLocaleDateString('id-ID', options); // Format tanggal Indonesia
  };

  const handleGoHome = () => {
    navigate("/");  // Navigasi kembali ke halaman utama
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.main}>
        <h1 style={styles.title}>Terima Kasih Udah Pesan!</h1>
        <img
          src="/assets/FesTix 1.svg"
          alt="Festix Logo"
          style={styles.mainLogo}
        />
        <div style={styles.infoContainer}>
          {/* Menampilkan Nama Pengguna, Email, dan Tanggal Lahir */}
          <p><strong>Nama Pengguna:</strong> {user.username || "Nama Tidak Tersedia"}</p>
          <p><strong>Email:</strong> {user.email || "Email Tidak Tersedia"}</p>
          <p><strong>Tanggal Lahir:</strong> {user.birth_date ? formatDate(user.birth_date) : "Tanggal Tidak Tersedia"}</p>
          <p><strong>Acara:</strong> {eventDetail.title || "Nama Acara"}</p>
          <p><strong>Tanggal:</strong> {eventDetail.date || "Tanggal Acara"}</p>
          <p><strong>Lokasi:</strong> {eventDetail.location || "Lokasi Acara"}</p>
          <p><strong>Jumlah Tiket:</strong> {selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0)}</p>
          <p><strong>Total Harga:</strong> {formatCurrency(totalPrice)}</p>
          <p><strong>Metode Pembayaran:</strong> {selectedMethod || "Belum Dipilih"}</p>
        </div>
        <div style={styles.paymentInfo}>
          <p>
            Tiket elektronik dan kuitansi sudah dikirim ke{" "}
            <strong>{user.email || "Email Tidak Tersedia"}</strong>
          </p>
        </div>
        <div style={styles.actions}>
          <a href="/tiket-page" style={styles.ticketLink}>
            Lihat Tiket
          </a>
          <button style={styles.homeButton} onClick={handleGoHome}>
            Kembali ke Home
          </button>
        </div>
      </main>
    </div>
  );
};

// Fungsi untuk memformat mata uang
const formatCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
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
  paymentInfo: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "30px",
    lineHeight: "1.5",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  ticketLink: {
    textDecoration: "none",
    fontSize: "16px",
    color: "#1F1F1F",
    fontWeight: "bold",
  },
  homeButton: {
    padding: "10px 20px",
    backgroundColor: "#FFD700",
    border: "none",
    borderRadius: "40px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default StatusPembayaran;
