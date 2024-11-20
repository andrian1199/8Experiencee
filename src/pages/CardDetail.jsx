import React from 'react';
import { useParams } from 'react-router-dom';

function CardDetail() {
  const { cardId } = useParams();  // Mengambil id dari URL

  return (
    <div>
      <h1>Detail Card {cardId}</h1>
      {/* Bisa menambahkan informasi lebih lanjut sesuai dengan cardId */}
    </div>
  );
}

export default CardDetail;
