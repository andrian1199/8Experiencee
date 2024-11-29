import React from "react";
import Navigasi from '../komponen Home/Navigasi'
const TentangKami = () => {
  return (
    <div>
        <Navigasi/>
      {/* Header Section */}
      <header className="header-section" style={{ backgroundColor: "#000", color: "#fff", padding: "50px 20px", textAlign: "center" }}>
        <h1>Kami bertujuan ingin berbagi kebahagiaan melalui konser musik dan festival bersamamu!</h1>
        <button style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#ffcc00", border: "none", cursor: "pointer" }}>Cek Sekarang</button>
      </header>

      {/* Introduction Section */}
      <section className="intro-section" style={{ display: "flex", alignItems: "center", padding: "50px 20px" }}>
        <div>
          <img src="team-photo.jpg" alt="Team Photo" style={{ width: "300px", borderRadius: "10px", marginRight: "20px" }} />
        </div>
        <div>
          <h2>Ayo Temukan Kebahagiaan Bersama Kawan!</h2>
          <p>Kami memahami bahwa konser adalah tentang pengalaman dan kami di sini untuk memastikan Anda mendapatkan pengalaman terbaik.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" style={{ backgroundColor: "#ffcc00", color: "#000", textAlign: "center", padding: "50px 20px" }}>
        <div>
          <h3>50000+</h3>
          <p>Tiket Terjual</p>
        </div>
        <div>
          <h3>20000+</h3>
          <p>Orang Bergabung</p>
        </div>
        <div>
          <h3>10+</h3>
          <p>Kota yang Terjangkau</p>
        </div>
        <div>
          <h3>100%</h3>
          <p>Aman dan Terpercaya</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" style={{ padding: "50px 20px" }}>
        <h2>Dari Mereka Untuk Kami</h2>
        <div>
          <blockquote>
            <p>"Platform ini sangat membantu saya dalam menemukan konser yang saya suka."</p>
            <footer>- Rina, Jakarta</footer>
          </blockquote>
          <blockquote>
            <p>"Akhirnya bisa menemukan teman-teman yang punya selera musik sama."</p>
            <footer>- Andi, Bandung</footer>
          </blockquote>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="mission-vision-section" style={{ display: "flex", padding: "50px 20px", justifyContent: "space-between" }}>
        <div>
          <h3>Visi Kami</h3>
          <p>Menjadi platform terpercaya yang menghubungkan penggemar musik.</p>
        </div>
        <div>
          <h3>Misi Kami</h3>
          <p>Menyediakan informasi akurat dan terpercaya tentang konser dan festival musik.</p>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section" style={{ backgroundColor: "#f4f4f4", padding: "50px 20px", textAlign: "center" }}>
        <h2>Dipercaya oleh Banyak Event Organizer</h2>
        <div>
          <img src="partner1-logo.png" alt="Partner 1" style={{ margin: "10px" }} />
          <img src="partner2-logo.png" alt="Partner 2" style={{ margin: "10px" }} />
          <img src="partner3-logo.png" alt="Partner 3" style={{ margin: "10px" }} />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section" style={{ backgroundColor: "#000", color: "#fff", textAlign: "center", padding: "20px" }}>
        <p>© 2024 Kelompok 88. Platform terpercaya untuk penggemar musik.</p>
      </footer>
    </div>
  );
};

export default TentangKami;
