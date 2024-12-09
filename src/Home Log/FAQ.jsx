import React, { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Gaya CSS yang digabungkan dalam JSX
  const styles = {
    faqContainer: {
      padding: '20px',
    },
    faqTitle: {
      textAlign: 'center', // Menyusun teks di tengah
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '40px',
    },
    faqItem: {
      backgroundColor: 'black', // Kotak hitam untuk item
      marginBottom: '15px',
      padding: '15px',
      borderRadius: '10px',
      color: 'white', // Teks putih
    },
    faqQuestion: {
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    faqAnswer: {
      marginTop: '10px',
      paddingLeft: '20px',
      fontSize: '16px',
    },
    faqQuestionSpan: {
      fontSize: '20px',
    },
  };

  return (
    <div style={styles.faqContainer}>
      <div style={styles.faqTitle}>Frequently Asked Questions</div>

      {/* FAQ Item 1 */}
      <div style={styles.faqItem}>
        <div style={styles.faqQuestion} onClick={() => toggleAnswer(0)}>
          <p>Apakah saya perlu membuat akun untuk menggunakan website ini?</p>
          <span style={styles.faqQuestionSpan}>{activeIndex === 0 ? '-' : '+'}</span>
        </div>
        {activeIndex === 0 && (
          <div style={styles.faqAnswer}>
            <p>Anda tidak perlu membuat akun untuk menggunakan sebagian besar fitur website ini, tetapi untuk beberapa fitur tambahan, seperti membuat komunitas musik, Anda memerlukan akun.</p>
          </div>
        )}
      </div>

      {/* FAQ Item 2 */}
      <div style={styles.faqItem}>
        <div style={styles.faqQuestion} onClick={() => toggleAnswer(1)}>
          <p>Bagaimana jika saya ingin membuat komunitas musik baru di website ini?</p>
          <span style={styles.faqQuestionSpan}>{activeIndex === 1 ? '-' : '+'}</span>
        </div>
        {activeIndex === 1 && (
          <div style={styles.faqAnswer}>
            <p>Anda dapat membuat komunitas musik baru setelah membuat akun dan masuk ke website. Pada halaman profil, Anda akan menemukan opsi untuk membuat komunitas baru.</p>
          </div>
        )}
      </div>

      {/* FAQ Item 3 */}
      <div style={styles.faqItem}>
        <div style={styles.faqQuestion} onClick={() => toggleAnswer(2)}>
          <p>Bagaimana cara menemukan komunitas musik yang sesuai dengan minat saya?</p>
          <span style={styles.faqQuestionSpan}>{activeIndex === 2 ? '-' : '+'}</span>
        </div>
        {activeIndex === 2 && (
          <div style={styles.faqAnswer}>
            <p>Anda dapat menggunakan fitur pencarian di website untuk mencari komunitas musik berdasarkan genre atau minat lainnya. Anda juga dapat menjelajah melalui kategori komunitas.</p>
          </div>
        )}
      </div>

      {/* FAQ Item 4 */}
      <div style={styles.faqItem}>
        <div style={styles.faqQuestion} onClick={() => toggleAnswer(3)}>
          <p>Apakah website ini menyediakan informasi tentang konser dan acara musik lainnya?</p>
          <span style={styles.faqQuestionSpan}>{activeIndex === 3 ? '-' : '+'}</span>
        </div>
        {activeIndex === 3 && (
          <div style={styles.faqAnswer}>
            <p>Ya, website ini menyediakan informasi tentang konser musik, acara musik, dan festival terkait lainnya. Anda dapat mencari acara berdasarkan lokasi atau jenis musik yang Anda sukai.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;
