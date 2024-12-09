import React from 'react';
import Low from '../assets/FOOTER.svg';

function Lower() {
  console.log("Low component rendered");
  return (
    <div className="Lower">
      <img src={Low} className="img-fluid w-100" alt="gambar bawah" />
    </div>
  );
}

export default Lower;
