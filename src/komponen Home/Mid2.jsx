import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import genre1 from "../assets/genre1.svg";
import genre2 from "../assets/genre2.svg";
import genre3 from "../assets/genre3.svg";
import genre4 from "../assets/genre4.svg";
import genre5 from "../assets/Frame 674.png";

const MID2 = () => {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/kategori?genre=${genre}`);
  };

  return (
    <div
      className="MID2"
      style={{
        backgroundColor: "#FFC300", // Warna kuning sesuai desain
        padding: "0 20px", // Tambahkan padding kiri dan kanan
        margin: 0,
      }}
    >
      <div
        className="text-genre text-center"
        style={{
          padding: "40px 0", // Tambahkan lebih banyak padding atas-bawah
          color: "#000",
        }}
      >
        <h1 style={{ margin: 0 }}>Pilih Genre Favoritmu!</h1>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10} // Perkecil jarak antar slide
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        style={{
          padding: "20px 10px", // Tambahkan padding untuk memberikan ruang kiri-kanan
        }}
      >
        {[{ src: genre1, label: "Dangdut" },
          { src: genre2, label: "R&B" },
          { src: genre3, label: "Hip-hop" },
          { src: genre4, label: "Pop" },
          { src: genre5, label: "Indie" }].map((genre, index) => (
          <SwiperSlide key={index}>
            <button
              type="button"
              className="genre-button"
              onClick={() => handleGenreClick(genre.label)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <img
                src={genre.src}
                alt={genre.label}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  transition: "transform 0.3s ease",
                }}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MID2;
