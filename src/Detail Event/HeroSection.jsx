import React from "react";

const HeroSection = () => {
  return (
    <>
      <style>
        {`
          .hero-section {
            position: relative;
            height: 80vh;
            display: flex;
            color: white;
            background-image: url('/assets/event.jpg');
            background-size: cover;
            background-position: center;
          }

          .hero-text {
            z-index: 1;
          }

          .hero-section::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 0;
          }

          .hero-text h1 {
            font-size: 2rem;
            font-weight: bold;
            margin: 0;
          }

          .hero-text h6 {
            font-size: 1rem;
            font-weight: normal;
            margin-top: 20px;
          }

          .hero-text {
            position: absolute;
            top: 50%;
            left: 40%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-weight: bold;
          }

          .cek-button {
            background-color: #FFCF00;
            color: #212121;
            border: none;
            padding: 10px 20px;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 30px;
            cursor: pointer;
            margin-top: 15px;
            text-transform: uppercase;
            transition: background-color 0.3s ease;
          }

          .cek-button:hover {
            background-color: #FFB800;
          }
        `}
      </style>

      <section className="hero-section">
        <div className="hero-text">
          <h1>Ayo Cari Event-event Favoritmu!</h1>
          <h6>
            "Yuk, temukan komunitas seru yang cocok banget dengan selera musikmu! Dari Pop yang catchy, Rock yang bikin semangat, hingga artis favoritmu—semua ada di sini. Gabung sekarang, jadilah bagian dari vibe yang luar biasa!".
          </h6>
          <button className="cek-button">Cek Sekarang</button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
