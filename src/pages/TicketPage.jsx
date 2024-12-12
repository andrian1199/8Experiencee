import React from "react";

const TicketPage = ({ tickets }) => {
  // Data tiket contoh jika tidak ada props
  const exampleTickets = [
    {
      id: "FST31025",
      day: "DAY 2",
      type: "Standart",
      event: "Sound of Downtown Volume Festival Music",
      date: "20 Desember 2024",
      time: "10:00 - 22:00",
      location: "Graha Unesa Lidah Wetan",
      qrCode: "/assets/qrcode1.png", // Sesuaikan path QR Code
    },
    {
      id: "FST31025",
      day: "DAY 2",
      type: "Standart",
      event: "Reality Club Tour Indonesia",
      date: "20 Oktober 2024",
      time: "19:00 - 23:00",
      location: "Graha Unesa Lidah Wetan",
      qrCode: "/assets/qrcode2.png", // Sesuaikan path QR Code
    },
  ];

  const ticketData = tickets || exampleTickets;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tiket</h1>
      <div style={styles.tab}>
        <span style={{ ...styles.tabItem, ...styles.activeTab }}>Event Mendatang</span>
        <span style={styles.tabItem}>Riwayat</span>
      </div>
      <div style={styles.ticketList}>
        {ticketData.map((ticket, index) => (
          <div key={index} style={styles.ticketCard}>
            <div style={styles.ticketInfo}>
              <p style={styles.ticketId}>ID Pesanan: {ticket.id}</p>
              <h3 style={styles.ticketDay}>
                {ticket.day} <span style={styles.ticketType}>{ticket.type}</span>
              </h3>
              <p style={styles.eventName}>{ticket.event}</p>
              <p style={styles.eventDetails}>
                {ticket.date} | {ticket.time}
              </p>
              <p style={styles.eventLocation}>{ticket.location}</p>
            </div>
            <div style={styles.qrContainer}>
              <img src={ticket.qrCode} alt="QR Code" style={styles.qrCode} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F9F9F9",
    padding: "20px",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1F1F1F",
    marginBottom: "20px",
  },
  tab: {
    display: "flex",
    borderBottom: "2px solid #FFD700",
    marginBottom: "20px",
  },
  tabItem: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#666",
    cursor: "pointer",
  },
  activeTab: {
    color: "#000",
    fontWeight: "bold",
    borderBottom: "4px solid #FFD700",
  },
  ticketList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  ticketCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  ticketInfo: {
    flex: 1,
  },
  ticketId: {
    fontSize: "14px",
    color: "#999",
  },
  ticketDay: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000",
  },
  ticketType: {
    fontSize: "14px",
    color: "#FFD700",
    marginLeft: "10px",
  },
  eventName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  eventDetails: {
    fontSize: "14px",
    color: "#666",
  },
  eventLocation: {
    fontSize: "14px",
    color: "#666",
  },
  qrContainer: {
    marginLeft: "20px",
  },
  qrCode: {
    width: "80px",
    height: "80px",
  },
};

export default TicketPage;
