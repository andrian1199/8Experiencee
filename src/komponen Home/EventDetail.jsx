import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Import axios untuk request HTTP
import Navbar from "../komponen Home/Navigasi"; // Import Navbar

const API_URL = "http://localhost:5000/events"; // URL API untuk mengambil event

const EventDetail = () => {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const navigate = useNavigate(); // Gunakan useNavigate untuk tombol kembali
  const [event, setEvent] = useState(null); // State untuk menyimpan data event
  const [loading, setLoading] = useState(true); // Menandakan status loading
  const [error, setError] = useState(null); // Menangani error

  // Ambil data event berdasarkan ID dari API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`); // Ambil event berdasarkan ID
        const eventData = response.data;
        
        // Tidak perlu melakukan split, cukup simpan additionalImage seperti semula
        setEvent(eventData); // Set event ke state
        setLoading(false); // Set loading selesai
      } catch (error) {
        setError("Gagal mengambil data event.");
        setLoading(false); // Set loading selesai meski error
      }
    };

    fetchEvent();
  }, [id]); // Efek akan dijalankan setiap kali id berubah

  // Menampilkan status loading atau error jika ada
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return (
      <div style={styles.notFound}>
        <Navbar /> {/* Tambahkan Navbar di sini */}
        <h2>Event tidak ditemukan</h2>
        <p>Mohon periksa URL Anda atau kembali ke halaman sebelumnya.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Tambahkan Navbar */}
      <Navbar />

      {/* Tambahkan padding-top agar tidak terpotong */}
      <div style={styles.container}>
        {/* Tombol Back */}
        <div>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            Kembali
          </button>
        </div>

        {/* Kontainer untuk detail event */}
        <div style={styles.detailContainer}>
          {/* Bagian Kiri */}
          <div style={styles.left}>
            <img src={event.image} alt={event.title} style={styles.image} />
            <h2 style={styles.title}>Deskripsi</h2>
            <p style={styles.description}>{event.description}</p>

            {/* Gambar Tambahan */}
            <div style={styles.additionalImagesContainer}>
              {event.additionalImage ? (
                <img
                  src={event.additionalImage}
                  alt="Gambar tambahan"
                  style={styles.additionalImage}
                />
              ) : (
                <p>No additional image available.</p>
              )}
            </div>
          </div>

          {/* Bagian Kanan */}
          <div style={styles.right}>
            <div style={styles.info}>
              <h3 style={styles.infoTitle}>{event.title}</h3>
              <p>
                <strong>Tanggal:</strong> {event.date}
              </p>
              <p>
                <strong>Lokasi:</strong> {event.location}
              </p>
              <p>
                <strong>Harga Mulai:</strong> Rp
                {new Intl.NumberFormat("id-ID").format(event.price)}
              </p>
            </div>
            <button style={styles.button} onClick={() => navigate(`/event/${event.id}/tiket`)}>
              Beli Tiket
            </button>

            <div style={styles.share}>
              <p>Bagikan Event:</p>
              <button style={styles.shareButton}>Facebook</button>
              <button style={styles.shareButton}>Instagram</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Gaya CSS in JS
const styles = {
  container: {
    padding: "120px",
    paddingTop: "50px", // Tambahkan padding-top untuk mengimbangi tinggi navbar
    fontFamily: "Arial, sans-serif",
  },
  detailContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px", // Untuk memberi jarak antara tombol "Kembali" dan kontainer detail
    alignItems: "flex-start", // Pastikan kontainer kanan tidak mengikuti tinggi kiri
  },
  backButton: {
    fontSize: "16px",
    fontStyle: "italic",
    textDecoration: "underline",
    backgroundColor: "transparent",
    border: "none",
    color: "#000",
    cursor: "pointer",
    padding: "0",
  },
  left: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Menambahkan jarak antar elemen di dalam bagian kiri
  },
  right: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fff",
    height: "auto", // Sesuaikan tinggi dengan isi
  },
  image: {
    width: "100%", // Gambar utama tetap penuh lebar
    height: "100%", // Tinggi penuh kontainer
    objectFit: "cover",
    borderRadius: "8px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  description: {
    marginTop: "10px",
    lineHeight: "1.6",
  },
  additionalImagesContainer: {
    display: "flex",
    flexDirection: "column", // Gambar diatur vertikal
    gap: "10px",
    marginTop: "20px",
    height: "100%", // Pastikan tinggi kontainer penuh
  },
  additionalImage: {
    width: "100%", // Lebar penuh dari kontainer induknya
    height: "100%", // Tinggi penuh mengikuti kontainer
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  info: {
    marginBottom: "20px",
  },
  infoTitle: {
    fontSize: "24px", // Tambahkan ukuran font jika diperlukan
    fontWeight: "bold", // Membuat judul bold
    marginBottom: "10px", // Menambahkan jarak bawah antara judul dan elemen lainnya
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#FFCF00",
    border: "none",
    borderRadius: "40px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  share: {
    marginTop: "20px",
  },
  shareButton: {
    margin: "5px",
    padding: "8px",
    backgroundColor: "#ddd",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  notFound: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
};

export default EventDetail;
