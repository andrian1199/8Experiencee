import React, { useState } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";

const KonfirmasiPesanan = () => {
  const { state } = useLocation();
  const { eventDetail = {}, selectedTickets = [], totalPrice = 0, selectedMethod = "" } = state || {};
  const navigate = useNavigate();

  // State untuk menampilkan pop-up konfirmasi
  const [showModal, setShowModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null); // State untuk bukti pembayaran
  const [previewImage, setPreviewImage] = useState(null); // State untuk preview gambar

  // Fungsi untuk kembali ke halaman metode pembayaran
  const handleCancel = () => {
    navigate("/metode-pembayaran", { state: { eventDetail, selectedTickets, totalPrice } });
  };

  // Fungsi untuk menampilkan pop-up konfirmasi
  const handleProceed = () => {
    if (!selectedMethod) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }
    if (!paymentProof) {
      alert("Silakan unggah bukti pembayaran terlebih dahulu.");
      return;
    }
    setShowModal(true); // Menampilkan pop-up konfirmasi
  };

  // Fungsi untuk melanjutkan pembayaran setelah konfirmasi
  const confirmPayment = () => {
    alert("Pembayaran Anda sedang diproses!");
    navigate("/status-pembayaran", {
      state: { eventDetail, selectedTickets, totalPrice, selectedMethod },
    });
    setShowModal(false); // Menutup pop-up setelah konfirmasi
  };

  // Fungsi untuk membatalkan pop-up
  const cancelPayment = () => {
    setShowModal(false); // Menutup pop-up jika dibatalkan
  };

  // Fungsi untuk menangani unggahan bukti pembayaran
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPaymentProof(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Pop-up Konfirmasi */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Konfirmasi Pembayaran</h3>
            <p>Apakah Anda yakin ingin melakukan transaksi ini?</p>
            <div style={styles.modalActions}>
              <button style={styles.cancelButton} onClick={cancelPayment}>Batal</button>
              <button style={styles.confirmButton} onClick={confirmPayment}>Konfirmasi</button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.container}>
        {/* Ringkasan Pesanan */}
        <div style={styles.summary}>
          <h3 style={styles.sectionTitle}>Ringkasan Pesanan</h3>
          <p><strong>Acara:</strong> {eventDetail.title || "Nama Acara"}</p>
          <p><strong>Tanggal:</strong> {eventDetail.date || "Tanggal Acara"}</p>
          <p><strong>Lokasi:</strong> {eventDetail.location || "Lokasi Acara"}</p>
          <p><strong>Jumlah Tiket:</strong> {selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0)}</p>
          <p><strong>Total Harga:</strong> {formatCurrency(totalPrice)}</p>
          <p><strong>Metode Pembayaran:</strong> {selectedMethod || "Belum Dipilih"}</p>
        </div>

        {/* Detail Pembayaran */}
        <div style={styles.paymentDetails}>
          <h3 style={styles.sectionTitle}>Detail Pembayaran</h3>
          {selectedMethod === "QRIS" && (
            <div>
              <p>Scan kode QR berikut untuk menyelesaikan pembayaran:</p>
              <img src="/assets/qris-sample.png" alt="Kode QR QRIS" style={styles.qrImage} />
            </div>
          )}
          {selectedMethod === "BCA" && (
            <div>
              <p>Silakan transfer ke rekening berikut:</p>
              <p><strong>Bank:</strong> BCA</p>
              <p><strong>Nomor Rekening:</strong> 123-456-7890</p>
              <p><strong>Atas Nama:</strong> PT Musikku</p>
            </div>
          )}
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="paymentProof" style={{ display: "block", marginBottom: "10px" }}>
              Unggah Bukti Pembayaran:
            </label>
            <input type="file" id="paymentProof" accept="image/*" onChange={handleFileUpload} />
            {paymentProof && <p style={{ marginTop: "10px" }}>File diunggah: {paymentProof.name}</p>}
            {previewImage && <img src={previewImage} alt="Preview Bukti Pembayaran" style={styles.previewImage} />}
          </div>
        </div>

        {/* Tombol */}
        <div style={styles.actions}>
          <button style={styles.cancelButton} onClick={handleCancel}>Batalkan</button>
          <button style={styles.proceedButton} onClick={handleProceed}>Bayar Sekarang</button>
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
    padding: "200px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F9F9F9",
    minHeight: "100vh",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  summary: {
    padding: "20px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  paymentDetails: {
    padding: "20px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "700",
  },
  qrImage: {
    width: "200px",
    height: "200px",
    margin: "20px auto",
  },
  previewImage: {
    marginTop: "10px",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#d9d9d9",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  proceedButton: {
    padding: "10px 20px",
    backgroundColor: "#FFCF00",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-evenly",
    gap: "10px",
  },
  confirmButton: {
    padding: "10px 20px",
    backgroundColor: "#FFCF00",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default KonfirmasiPesanan;
