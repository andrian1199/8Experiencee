
import React from 'react';
import rectangle7 from '../assets/Rectangle 7.png'; 
import unsplashImage from '../assets/unsplash_TZCppMjaOHU.svg'; 

const Komunitas = () => {
  return (
    <>
      <div className="L-left">
        <img src={rectangle7} alt="Komunitas" />
        <div className="text-contrainer">
          <h1>
            Ayo ikut Komunitas <br /> Se-Frekuensi
          </h1>
          <div className="btn-contrainer">
            <button type="button" className="btnkom">
              Masuk Komunitas
            </button>
            <button type="button" className="btnkom">
              Buat Komunitas
            </button>
          </div>
        </div>
      </div>

      <div className="L-komunitas">
        <div className="text-komunitas">
          <h1>Cari-Cari Info Terkini Disini</h1>
          <h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet quas assumenda nostrum odit qui
            minima amet similique deleniti ipsa, eum repellendus, fuga distinctio sint. Rerum cum ipsa aperiam
            eligendi ex.
          </h3>
          <div className="btnn">
            <button type="button" className="L-komm">
              Jelajahi
            </button>
          </div>
        </div>
        <div className="images">
          <img src={unsplashImage} alt="Terkini Info" />
        </div>
      </div>
    </>
  );
};

export default Komunitas; // Ekspor default komponen
