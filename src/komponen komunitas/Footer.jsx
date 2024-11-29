import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#212121", color: "white", padding: "8px 20px", marginTop: "100px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src="asset/FesTixLogo1.png" alt="Festix Logo" width="100" height="40" style={{ marginBottom: "20px" }} />
            <p style={{ fontSize: "12px", lineHeight: "1.6" }}>
              Platform terpercaya yang dirancang untuk memudahkan para penggemar musik menemukan informasi lengkap tentang konser dan festival favorit mereka.
            </p>
            <p style={{ fontSize: "10px" }}>
              Copyright 2024 Kelompok 8B | <a href="#" style={{ color: "white", textDecoration: "none" }}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
