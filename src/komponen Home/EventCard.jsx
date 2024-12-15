import React from "react";
import { UilCalendarAlt, UilMapMarkerAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

const formatEventDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.getUTCMonth(); // getUTCMonth() dimulai dari 0
  const year = date.getUTCFullYear();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  const formattedDate = `${day} ${monthNames[month]} ${year}`;
  return formattedDate;
};


const formatCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const EventCard = ({ id, title, date, location, price, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/event/${id}`); // Navigasi ke detail acara berdasarkan id
  };

  return (
    <div style={styles.card} onClick={handleCardClick}>
      <div style={styles.imageContainer}>
        <img src={image} alt={title} style={styles.image} />
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <div style={styles.info}>
          <div style={styles.infoItem}>
            <UilCalendarAlt size="20" color="#666" />
            <span style={styles.infoText}>{formatEventDate(date)}</span>
          </div>
          <div style={styles.infoItem}>
            <UilMapMarkerAlt size="20" color="#666" />
            <span style={styles.infoText}>{location}</span>
          </div>
        </div>
        <div style={styles.footer}>
          <div style={styles.price}>
            <span style={styles.priceLabel}>Mulai Dari</span>
            <strong style={styles.priceValue}>{formatCurrency(price)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "310px",
    height: "470px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    cursor: "pointer", // Menambahkan pointer untuk menunjukkan kartu dapat diklik
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },

  },
  imageContainer: {
    height: "200px",
    backgroundColor: "#f4f4f4",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "15px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: "#666",
    marginTop: "20px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  infoText: {
    fontSize: "16px",
    color: "#666",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: "auto",
  },
  price: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    color: "#000",
  },
  priceLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "5px",
  },
  priceValue: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#FFCF00",
  },
};

export default EventCard;
