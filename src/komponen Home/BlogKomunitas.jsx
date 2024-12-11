import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import rectangle7 from "../assets/Rectangle 7.png";
import unsplashImage from "../assets/unsplash_TZCppMjaOHU.svg";

const BlogKomunitas = () => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      padding: "3rem 7rem", // Padding fleksibel
      backgroundColor: "#f9f9f9",
    },
    header: {
      textAlign: "center",
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "2rem",
    },
    section: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "2rem",
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "2rem",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      flexWrap: "wrap", // Agar elemen otomatis turun saat layar kecil
    },
    reverseSection: {
      flexDirection: "row-reverse", // Gambar di kanan, teks di kiri
    },
    image: {
      width: "100%",
      maxWidth: "600px", // Batasi ukuran maksimal
      height: "auto",
      objectFit: "cover",
      borderRadius: "12px",
    },
    textContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "flex-start",
      textAlign: "left",
    },
    title: {
      fontSize: "1.8rem",
      color: "#222",
      marginBottom: "0.5rem",
    },
    paragraph: {
      fontSize: "1rem",
      color: "#555",
      marginBottom: "1rem",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
    },
    button: {
      padding: "0.8rem 1.5rem",
      fontWeight: "600",
      fontSize: "1rem",
      border: "none",
      borderRadius: "40px",
      cursor: "pointer",
      backgroundColor: "#ffcf00",
      color: "#000",
      transition: "background-color 0.3s ease",
    },
    // Media Queries untuk Responsivitas
    "@media (max-width: 768px)": {
      section: {
        flexDirection: "column", // Ubah menjadi kolom saat layar kecil
        alignItems: "center", // Pusatkan isi
        textAlign: "center", // Teks berada di tengah
      },
      textContainer: {
        alignItems: "center",
        textAlign: "center",
      },
      image: {
        maxWidth: "100%", // Biarkan gambar memenuhi lebar tanpa menjadi kecil
      },
    },
    "@media (max-width: 480px)": {
      header: {
        fontSize: "1.5rem",
      },
      title: {
        fontSize: "1.3rem",
      },
      paragraph: {
        fontSize: "0.9rem",
      },
      button: {
        fontSize: "0.8rem",
        padding: "0.6rem 1rem",
      },
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.header}>Cek Nih Yang Dibawah!</h1>

      {/* Bagian Komunitas */}
      <div style={styles.section}>
        <img src={rectangle7} alt="Komunitas" style={styles.image} />
        <div style={styles.textContainer}>
          <h1 style={styles.title}>
            Ayo Ikut Komunitas <br /> Se-Frekuensi Sama Kamu!
          </h1>
          <p style={styles.paragraph}>
            Kamu pengen ngumpul dan ngobrol tapi nggak punya teman yang
            sefrekuensi aliran musik? Tenang, kami ada halaman komunitas buat
            kamu nih.
          </p>
          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => navigate("/komunitas")}
            >
              Masuk Komunitas
            </button>
          </div>
        </div>
      </div>

      {/* Bagian Info Terkini */}
      <div style={{ ...styles.section, ...styles.reverseSection }}>
        <img src={unsplashImage} alt="Terkini Info" style={styles.image} />
        <div style={styles.textContainer}>
          <h1 style={styles.title}>Cari-Cari Info Terkini Disini</h1>
          <p style={styles.paragraph}>
            Ayo cari info-info terkait musik, konser, dll. Di halaman blog kami,
            tekan tombol di bawah ya!
          </p>
          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => navigate("/blog")}
            >
              Cek Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogKomunitas;
