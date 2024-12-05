const EventData = [
  {
    id: 1,
    title: "Sound of Downtown Volume 6 Surabaya",
    date: "4 - 5 Agustus 2024",
    location: "Surabaya",
    price: 109000,
    image: "/assets/sod.png",
    genre: "Pop",
    type: "festival",
    description: "Nikmati malam penuh kebahagiaan dengan hits terbaik dari Bernadya di Surabaya. Jangan lewatkan momen spesial ini!",
    additionalImages: ["/assets/soddetail.png"],
    tickets: [
      { 
        type: "Regular", 
        price: 109000, 
        benefits: "Tiket masuk saja." 
      },
      { 
        type: "VIP", 
        price: 300000, 
        benefits: "Tiket masuk dan akses VIP lounge." 
      },
      { 
        type: "VVIP", 
        price: 500000, 
        benefits: "Tiket masuk, akses VIP lounge, dan merchandise eksklusif." 
      },
    ],
  },

  {
    id: 2,
    title: "Tunggu Aku di Bandung",
    date: "4 - 5 Agustus 2024",
    location: "Bandung",
    price: 300000,
    image: "/assets/so7.webp",
    genre: "Pop",
    type: "konser",
    description: "Nikmati malam penuh kebahagiaan dengan hits terbaik dari Bernadya di Surabaya. Jangan lewatkan momen spesial ini!",
    additionalImages: ["/assets/so7detail.webp"],
    tickets: [
      { 
        type: "Reguler", 
        price: 300000, 
        benefits: "Tiket masuk dan akses VIP lounge." 
      },
      { 
        type: "VIP", 
        price: 500000, 
        benefits: "Tiket masuk, akses VIP lounge, dan merchandise eksklusif." 
      },
    ],
  },
];

export default EventData;