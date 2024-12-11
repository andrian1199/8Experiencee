import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import headerImage from "../assets/tentangkami.png";
import teamPhoto from "../assets/group.png";
import Navigation from '../komponen Home/Navigasi';
import Footer from '../components/Footer';
import Festix from "../assets/FesTixKom.png";


const TentangKami = () => {
  const settings = {
    dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 6,
  autoplay: true,
  autoplaySpeed: 0,
  pauseOnHover: true,
  centerMode: true,
  focusOnSelect: true,
  };
  
  return (
    <div>
      <Navigation />

      <header
  className="header-section"
  style={{
    backgroundImage: `url(${headerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#fff",
    padding: "80px 150px",
    textAlign: "left",
  }}
>
  <h1 style={{ marginBottom: "20px", lineHeight: "1.5", fontSize: "32px", marginTop: "100px" }}>
    Kami bertujuan ingin berbagi <br />
    kebahagiaan melalui konser musik dan <br />
    Festival bersamamu!
  </h1>
  <p style={{ marginBottom: "30px", fontSize: "16px" }}>
    Ayo kenalan sama kita sekarang!
  </p>
  <button
    style={{
      padding: "10px 25px",
      backgroundColor: "#ffcc00",
      border: "none",
      cursor: "pointer",
      borderRadius: "30px",
      fontWeight: "bold",
      fontSize: "14px",
      width: "auto",
    }}
  >
    Cek Sekarang
  </button>
</header>


    <section
      className="intro-section"
      style={{
        display: "flex",
        flexDirection: window.innerWidth <= 768 ? "column" : "row", // Kolom untuk layar kecil
        alignItems: window.innerWidth <= 768 ? "center" : "flex-start",
        padding: window.innerWidth <= 768 ? "40px 20px" : "80px 150px",
        gap: "20px",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* Gambar tim */}
      <img
        src={teamPhoto}
        alt="Team Photo"
        style={{
          width: window.innerWidth <= 768 ? "70%" : "500px", // Tetap cukup besar di layar kecil
          borderRadius: "10px",
          maxWidth: "100%",
          marginBottom: window.innerWidth <= 768 ? "20px" : "0", // Tambah margin di bawah untuk layar kecil
        }}
      />
      
      {/* Konten teks */}
      <div
        style={{
          textAlign: window.innerWidth <= 768 ? "center" : "left", // Tengahkan teks di layar kecil
          maxWidth: window.innerWidth <= 768 ? "90%" : "50%", // Batasi lebar teks
        }}
      >
        <h2
          style={{
            fontSize: window.innerWidth <= 768 ? "24px" : "28px", // Sesuaikan ukuran teks
            marginBottom: "10px",
            marginTop: "0",
          }}
        >
          Ayo Temukan Kebahagiaan Bersama Kawan!
        </h2>
        <p
          style={{
            fontSize: window.innerWidth <= 768 ? "16px" : "20px", // Responsif: Ukuran font
            color: "#555",
            marginTop: "0",
            textAlign: "justify",
          }}
        >
          Kami memahami bahwa konser adalah tentang pengalaman dan kami disini
          untuk memastikan Anda mendapatkan pengalaman terbaik. Dengan FesTix, Anda bisa
          mendapatkan informasi akurat, memesan tiket dengan aman, dan bergabung dalam komunitas
          yang berbagi minat musik yang sama.
        </p>
      </div>
    </section>






      {/* Stats Section */}
      <section
        className="stats-section"
        style={{
          backgroundColor: "#ffcc00",
          color: "#ffffff",
          textAlign: "center",
          padding: "50px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {[
          { value: "50000+", label: "Tiket Terjual" },
          { value: "20000+", label: "Orang Bergabung" },
          { value: "10+", label: "Kota yang Terjangkau" },
          { value: "100%", label: "Aman dan Terpercaya" },
        ].map((stat, index) => (
          <div key={index}>
            <h3 style={{ fontSize: "28px", marginBottom: "10px" }}>
              {stat.value}
            </h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

     {/* Testimonials Section */}
<section
  className="testimonials-section"
  style={{
    textAlign: "center",
  }}
>

{/* Testimonials Section */}
<section
  className="testimonials-section"
  style={{
    textAlign: "center",
  }}
>
  {/* Container khusus untuk "Dari Mereka Untuk Kami" */}
  <div
    style={{
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "0",
      margin: "0",
      width: "100vw",
      boxSizing: "border-box",
    }}
  >
    <h2 style={{ margin: "0" }}>
      <span style={{ color: "#ffcc00" }}>Dari</span>{" "}
      <span style={{ color: "#000000" }}>Mereka</span>
    </h2>
    <h2 style={{ margin: "0" }}>
      <span style={{ color: "#000000" }}>Untuk</span>{" "}
      <span style={{ color: "#ffcc00" }}>Kami</span>
    </h2>
  </div>

  {/* Container untuk gambar dengan background opacity */}
<div
  style={{
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.17)",
    padding: "50px",
    marginTop: "-80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {/* Gambar Background */}
  <img
    src="./src/assets/FesTixKom.png"
    alt="Background"
    style={{
      maxWidth: "100%",
      borderRadius: "10px",
    }}
  />

  {/* Gambar Testi di atas background */}
<img
  src="./src/assets/katamereka.png"
  alt="Testimonial Overlay"
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    maxHeight: "90%",
  }}
/>
</div>
</section>


</section>

      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          marginTop: "50px",
        }}
      >
        {/* Kiri: Deskripsi */}
<div
  style={{
    flex: 1.5,
    maxWidth: "50%",
    backgroundColor: "white",
    padding: "33px",
    borderRadius: "10px",
    boxShadow: "0px 6px 6px 2px rgba(0, 0, 0, 0.25)",
    marginLeft: "80px",
  }}
>
  <h2>Disini, setiap pengalaman dirancang khusus untukmu.</h2>
  <p>
    Kami memberikan fleksibilitas yang menyenangkan agar kamu dapat merasakan sesuatu yang unik. Bagi para pecinta musik, penggemar olahraga, pecinta seni, atau siapa pun yang sedang berjuang mengejar impian, selalu ada hal menarik yang menantimu di sini!
  </p>
  <img
    src="./src/assets/Festix 1.svg"
    alt="FesTix Logo"
    style={{
      width: "332px",
      height: "auto",
      display: "block",
      margin: "20px auto 0",
    }}
  />
</div>

        {/* Kanan: Visi dan Misi */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginRight: "80px",
          }}
        >
          {/* Visi */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 6px 6px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h3 style={{ color: "#ffcc00" }}>Visi Kami</h3>
            <p>
              Menjadi platform terdepan yang menghubungkan penggemar musik dengan konser dan festival berkualitas, menciptakan pengalaman yang tak terlupakan dan memperkuat komunitas musik di Indonesia.
            </p>
          </div>
          {/* Misi */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 6px 6px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h3 style={{ color: "#ffcc00" }}>Misi Kami</h3>
            <p>
              Menyediakan informasi akurat dan terpercaya tentang konser dan festival musik, serta menghadirkan fitur-fitur yang memudahkan pengguna dalam mencari teman dengan minat yang sama, sehingga setiap individu dapat menikmati kebersamaan dan keseruan dalam setiap acara musik.
            </p>
          </div>
        </div>
      </section>

      {/* Dipercaya oleh Banyak Event Organizer */}
<div
  style={{
    backgroundColor: "#ffcc00",
    textAlign: "center",
    padding: "40px 20px",
    marginTop: "45px",
  }}
>
  <p
    style={{
      fontSize: "14px",
      textTransform: "uppercase",
      fontWeight: "bold",
      color: "#000",
      marginBottom: "10px",
    }}
  >
    Dipercaya oleh Banyak Event Organizer
  </p>
  <h2
  style={{
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "20px",
    lineHeight: "1.5",
  }}
>
  Dari sekian banyak acara seru yang <br />
  telah kami hadirkan, yang mana jadi <br />
  favoritmu?
</h2>
  <p
    style={{
      fontSize: "16px",
      color: "#000",
      marginTop: "0",
    }}
  >
    Mulai dari gathering komunitas, nyanyi bareng, hingga konser <br />
    musik, acara apa yang paling ingin kamu ikuti?
  </p>
</div>

{/* Tambahkan carousel di sini */}
      <div
        style={{
          backgroundColor: "#fff",
          textAlign: "center",
          padding: "20px 10px",
          marginTop: "20px",
        }}
      >
        <Slider {...settings}>
          <div>
            <img
              src="./src/assets/katarsis.png"
              alt="Katarsis"
              style={{ height: "60px", margin: "0 auto", objectFit: "contain", transform: "scale(1.5)", 
                transition: "transform 0.5s ease" }}
            />
          </div>
          <div>
            <img
              src="./src/assets/SOD.png"
              alt="SOD"
              style={{ height: "60px", margin: "0 auto", objectFit: "contain", transform: "scale(1.5)",
                transition: "transform 0.5s ease" }}
            />
          </div>
          <div>
            <img
              src="./src/assets/G.png"
              alt="SOD"
              style={{ height: "60px", margin: "0 auto", objectFit: "contain", transform: "scale(1.5)",
                transition: "transform 0.5s ease" }}
            />
          </div>
          <div>
            <img
              src="./src/assets/DreamFlavours.png"
              alt="SOD"
              style={{ height: "60px", margin: "0 auto", objectFit: "contain", transform: "scale(1.5)",
                transition: "transform 0.5s ease" }}
            />
          </div>
          <div>
            <img
              src="./src/assets/mahaka.png"
              alt="SOD"
              style={{ height: "60px", margin: "0 auto", objectFit: "contain", transform: "scale(1.5)",
                transition: "transform 0.5s ease" }}
            />
          </div>
          <div>
            <img
              src="./src/assets/AlcorPrime.png"
              alt="SOD"
              style={{ height: "60px", margin: "0 auto", objectFit: "contain" , transform: "scale(1.5)",
                transition: "transform 0.5s ease" }}
            />
          </div>
          </Slider>
          </div>

      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default TentangKami; 