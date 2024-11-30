import React, { useState } from "react";
import rectangle7 from "../assets/Rectangle 7.png";
import unsplashImage from "../assets/unsplash_TZCppMjaOHU.svg";

const Komunitas = () => {
  const [hover, setHover] = useState(false);

  // Inline styling
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      padding: "8rem",
      backgroundColor: "#f9f9f9",
    },
    header: {
      textAlign: "center",
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "2rem",
    },
    section: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "2rem",
    },
    reverseSection: {
      flexDirection: "row-reverse", // Membalik orientasi gambar dan teks
    },
    image: {
      width: "495px", // Fixed width
      height: "425px", // Fixed height
      objectFit: "cover", // Menjaga proporsi gambar
      borderRadius: "12px",
    },
    textContainer: {
      flex: 1,
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
      backgroundColor: "#fdd835",
      color: "#000",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#fbc02d",
    },
    // Menambahkan margin untuk jarak antara tulisan, tombol, dan gambar
    spacing: {
      marginRight: "3rem", // Menambahkan jarak lebih pada bagian kanan gambar
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.header}>Cek Nih Yang Dibawah!</h1>

      {/* Bagian Komunitas */}
      <div style={styles.section}>
        <img src={rectangle7} alt="Komunitas" style={styles.image} />
        <div style={{ ...styles.textContainer, ...styles.spacing }}>
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
            >
              Cek Selengkapnya
            </button>
          </div>
        </div>
      </div>

      {/* Bagian Info Terkini */}
      <div style={{ ...styles.section, ...styles.reverseSection }}>
        <img src={unsplashImage} alt="Terkini Info" style={styles.image} />
        <div style={{ ...styles.textContainer, ...styles.spacing }}>
          <h1 style={styles.title}>Cari-Cari Info Terkini Disini</h1>
          <p style={styles.paragraph}>
            Ayo cari info-info terkait musik, konser, dll. Di halaman blog kami,
            tekan tombol di bawah ya!
          </p>
          <button
            style={styles.button}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Cek Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default Komunitas;
