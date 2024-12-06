import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#212121",
    color: "#ffffff",
    padding: "30px 10px", // Kurangi padding horizontal
    textAlign: "left",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    paddingLeft: "0px", // Tambahkan padding untuk kontainer
    paddingRight: "0px",
  };

  const logoStyle = {
    width: "150px",
    marginBottom: "20px",
  };

  const descriptionStyle = {
    fontSize: "16px",
    lineHeight: "1.8",
    marginBottom: "30px",
    maxWidth: "600px", // Membatasi lebar teks deskripsi
  };

  const copyrightStyle = {
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "20px",
  };

  const linkContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "30px",
    fontSize: "16px",
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
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
    </footer>
  );
};

export default Footer;
