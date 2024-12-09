import React, { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Gaya CSS dalam objek JavaScript
  const styles = {
    faqBox: {
      padding: '10px 50px',
    },
    accordionItem: {
      padding: '10px 20px', // Padding kiri-kanan lebih kecil
      border: '2px solid #333333', // dark-color
      boxShadow: '0 0 0 0 #333333',
      transition: '0.3s box-shadow',
      marginBottom: '15px',
      borderRadius: '8px',
      backgroundColor: '#000', // Warna hitam untuk akordion
      color: '#fff', // Teks putih agar kontras
    },
    accordionItemHover: {
      boxShadow: '5px 5px 0 0 #f5f5f5',
    },
    accordionButton: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '20px',
      fontWeight: '600',
      color: '#fff', // Teks putih untuk tombol
      backgroundColor: 'transparent',
      boxShadow: 'none',
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left',
    },
    accordionButtonActive: {
      backgroundColor: '#FFCF00', // Highlight saat aktif
      color: '#000', // Ubah teks menjadi hitam saat aktif
    },
    accordionBody: {
      fontSize: '16px',
      color: '#fff', // Teks putih di dalam jawaban
      marginTop: '10px',
      lineHeight: '1.6',
      maxHeight: '0',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease-in-out, padding 0.3s ease-in-out',
    },
    accordionBodyOpen: {
      maxHeight: '500px', // Maksimal tinggi saat terbuka
      padding: '10px 0',
    },
    icon: {
      fontSize: '24px',
      transition: 'transform 0.3s ease-in-out',
      color: '#fff', // Ikon putih agar serasi
    },
    iconOpen: {
      transform: 'rotate(45deg)',
    },
  };

  return (
    <div style={styles.faqBox}>
      <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', marginBottom: '40px' }}>
        Frequently Asked Questions
      </h2>

      {/** FAQ Items */}
      {[
        {
          question: "Apakah saya perlu membuat akun untuk menggunakan website ini?",
          answer:
            "Anda tidak perlu membuat akun untuk menggunakan sebagian besar fitur website ini, tetapi untuk beberapa fitur tambahan, seperti membuat komunitas musik, Anda memerlukan akun.",
        },
        {
          question: "Bagaimana jika saya ingin membuat komunitas musik baru di website ini?",
          answer:
            "Anda dapat membuat komunitas musik baru setelah membuat akun dan masuk ke website. Pada halaman profil, Anda akan menemukan opsi untuk membuat komunitas baru.",
        },
        {
          question: "Bagaimana cara menemukan komunitas musik yang sesuai dengan minat saya?",
          answer:
            "Anda dapat menggunakan fitur pencarian di website untuk mencari komunitas musik berdasarkan genre atau minat lainnya. Anda juga dapat menjelajah melalui kategori komunitas.",
        },
        {
          question: "Apakah website ini menyediakan informasi tentang konser dan acara musik lainnya?",
          answer:
            "Ya, website ini menyediakan informasi tentang konser musik, acara musik, dan festival terkait lainnya. Anda dapat mencari acara berdasarkan lokasi atau jenis musik yang Anda sukai.",
        },
      ].map((faq, index) => (
        <div
          key={index}
          style={{
            ...styles.accordionItem,
            ...(activeIndex === index ? styles.accordionItemHover : {}),
          }}
        >
          <button
            style={{
              ...styles.accordionButton,
              ...(activeIndex === index ? styles.accordionButtonActive : {}),
            }}
            onClick={() => toggleAnswer(index)}
          >
            {faq.question}
            <span
              style={{
                ...styles.icon,
                ...(activeIndex === index ? styles.iconOpen : {}),
              }}
            >
              +
            </span>
          </button>
          <div
            style={{
              ...styles.accordionBody,
              ...(activeIndex === index ? styles.accordionBodyOpen : {}),
            }}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
