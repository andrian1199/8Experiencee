import React from "react";
import backgroundImage from "./assets/background-image.jpg"; // Pastikan path ini sesuai dengan lokasi file gambar Anda

const Bernard = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "50px 20px",
        textAlign: "center",
      }}
    >
      <h1>Kami bertujuan ingin berbagi kebahagiaan melalui konser musik dan Festival bersamamu!</h1>
      <p>Ayo kenalan sama kita sekarang!</p>
      <button
        style={{
          backgroundColor: "#FFD700", // Warna kuning tombol
          color: "black",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => alert("Tombol Cek Sekarang diklik!")}
      >
        Cek Sekarang
      </button>
    </section>
  );
};

export default Bernard;
