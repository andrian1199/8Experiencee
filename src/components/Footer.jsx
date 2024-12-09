import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#212121",
    color: "#ffffff",
    padding: "30px 0", // Hapus padding horizontal
    textAlign: "left",
  };

  const containerStyle = {
    maxWidth: "85%", // Kurangi batasan lebar maksimum
    width: "100%", // Memastikan kontainer mengisi seluruh lebar layar
    margin: "0 auto", // Pusatkan kontainer secara horizontal
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const logoAndDescriptionStyle = {
    flex: 1,
  };

  const linkAndCopyrightContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Default untuk layar kecil
    gap: "15px",
  };

  const linkContainerStyle = {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap", // Link turun jika ruang sempit
    justifyContent: "flex-end", // Tetap di kanan pada layar besar
    width: "100%",
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
  };

  const copyrightStyle = {
    fontWeight: "bold",
    fontSize: "16px",
    whiteSpace: "nowrap", // Mencegah teks menjadi dua baris
  };

  const descriptionStyle = {
    fontSize: "16px",
    lineHeight: "1.8",
    maxWidth: "600px", // Membatasi lebar deskripsi agar tidak terlalu panjang
    marginBottom: "30px",
  };

  const logoStyle = {
    width: "150px",
    marginBottom: "20px",
  };

  // Responsivitas
  const responsiveStyle = {
    '@media (min-width: 768px)': {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    linkAndCopyrightContainerStyle: {
      flexDirection: "row",
      alignItems: "center", // Link dan copyright sejajar di layar besar
      justifyContent: "space-between",
      width: "100%",
    },
  };

  return (
    <footer style={footerStyle}>
      <div style={{ ...containerStyle, ...responsiveStyle }}>
        {/* Bagian Logo dan Deskripsi */}
        <div style={logoAndDescriptionStyle}>
          <img
            src="../assets/FesTix 1.svg"
            alt="Festix Logo"
            style={logoStyle}
          />
          <div style={descriptionStyle}>
            Platform terpercaya yang dirancang untuk memudahkan para penggemar musik
            menemukan informasi lengkap tentang konser dan festival favorit mereka.
            Kami hadir untuk menjawab kebutuhan Anda dalam mendapatkan informasi
            yang akurat, aman, dan terpusat tentang dunia musik live.
          </div>
        </div>

        {/* Bagian Copyright dan Link */}
        <div style={{ ...linkAndCopyrightContainerStyle, ...responsiveStyle.linkAndCopyrightContainerStyle }}>
          <div style={copyrightStyle}>
            Copyright 2024 Kelompok 8B
          </div>
          <div style={linkContainerStyle}>
            <a href="#privacy" style={linkStyle}>
              Privacy Policy
            </a>
            <a href="#terms" style={linkStyle}>
              Terms & Conditions
            </a>
            <a href="#cookies" style={linkStyle}>
              Cookie Policy
            </a>
            <a href="#contact" style={linkStyle}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
