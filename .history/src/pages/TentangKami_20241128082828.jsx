import React from 'react';
 // Pastikan ada file CSS untuk styling tambahan

const TentangKami = () => {
  return (
    <div className="tentang-kami" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar />
      <div className="content">
        <header className="header">
          <img src={logo} alt="Festix Logo" className="logo" />
          <h1 className="title">Kami bertujuan ingin berbagi kebahagiaan melalui konser musik dan Festival bersamamu!</h1>
          <p className="subtitle">Ayo kenalan sama kita sekarang!</p>
          <button className="cta-button">Cek Sekarang</button>
        </header>
        <section className="section-1">
          <h2>Ayo Temukan Kebahagiaan Bersama Kawan!</h2>
          <p>Kami memahami bahwa konser adalah tentang pengalaman dan kami disini untuk memastikan Anda mendapatkan pengalaman terbaik. Dengan Festix, Anda bisa mendapatkan informasi aktual, memesan tiket dengan aman, dan bergabung dalam komunitas yang berbagi minat yang sama.</p>
        </section>
        <section className="section-2">
          <h2>Dari Mereka Untuk Kami</h2>
          <div className="testimonial">
            <blockquote>
              <p>"Platform ini sangat membantu saya dalam menemukan konser yang saya suka. Pesan pembelian tiketnya pun aman."</p>
              <footer>- Rina, Jakarta</footer>
            </blockquote>
          </div>
          <div className="testimonial">
            <blockquote>
              <p>"Akhirnya bisa menemukan teman-teman yang punya selera musik sama. Sekarang saya selalu update konser terbaru dan nggak pernah ketinggalan acara favorit!"</p>
              <footer>- Andi, Bandung</footer>
            </blockquote>
          </div>
        </section>
        <section className="section-3">
          <h2>Disini, setiap pengalaman dirancang khusus untukmu.</h2>
          <p>Kami memberikan fleksibilitas dan kenyamanan agar kamu dapat merasakan sesuatu yang unik. Bagi para pecinta musik, penggemar olahraga, pencinta seni, atau siapa pun yang sedang berjuang mengejar impian, selalu ada hal menarik yang menanti di sini!</p>
        </section>
        <section className="section-4">
          <h2>Dipercaya Oleh Banyak Event Organizer</h2>
          <p>Dari sekian banyak acara seru yang telah kami hadirkan, yang mana jadi favoritmu?</p>
          <div className="logos">
            <img src={require('../assets/katarasisLive.png')} alt="Katarasis Live" />
            <img src={require('../assets/G.png')} alt="G" />
            <img src={require('../assets/DreamHorizon.png')} alt="Dream Horizon" />
            <img src={require('../assets/mahaX.png')} alt="Mahaka X" />
            <img src={require('../assets/ALC.png')} alt="ALC" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default TentangKami;
