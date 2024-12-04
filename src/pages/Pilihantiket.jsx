import React, { useState } from "react"; 
import EventData from "../data/EventData";
import { useParams, useNavigate } from "react-router-dom";

const PilihanTiket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EventData.find((event) => event.id === parseInt(id));

  const [selectedTickets, setSelectedTickets] = useState(
    event.tickets.map((ticket) => ({ type: ticket.type, quantity: 0 }))
  );

  const [showPopup, setShowPopup] = useState(false);

  const handleQuantityChange = (type, change) => {
    setSelectedTickets((prev) =>
      prev.map((ticket) =>
        ticket.type === type
          ? { ...ticket, quantity: Math.max(0, ticket.quantity + change) }
          : ticket
      )
    );
  };

  const handlePurchase = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmPurchase = () => {
    const totalPrice = selectedTickets.reduce((sum, ticket) => {
      const ticketInfo = event.tickets.find((t) => t.type === ticket.type);
      return sum + ticket.quantity * ticketInfo.price;
    }, 0);
    
    // Navigasi ke MetodePembayaran
    navigate(`/metode-pembayaran`, {
      state: { 
        eventDetail: event, 
        selectedTickets, 
        totalPrice 
      }
    });
  };

  const totalTickets = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
  const totalPrice = selectedTickets.reduce((sum, ticket) => {
    const ticketInfo = event.tickets.find((t) => t.type === ticket.type);
    return sum + ticket.quantity * ticketInfo.price;
  }, 0);

  const purchasedTickets = selectedTickets.filter((ticket) => ticket.quantity > 0);

  return (
    <div style={styles.container}>
      <h2>{`Pilih Tiket untuk ${event.title}`}</h2>
      <div style={styles.ticketList}>
        {event.tickets.map((ticket) => (
          <div key={ticket.type} style={styles.ticketItem}>
            <span>{ticket.type} - {formatCurrency(ticket.price)}</span>
            <div style={styles.quantityControls}>
              <button
                style={styles.buttonControl}
                onClick={() => handleQuantityChange(ticket.type, -1)}
                disabled={selectedTickets.find((t) => t.type === ticket.type).quantity === 0}
              >
                -
              </button>
              <span style={styles.quantityDisplay}>
                {selectedTickets.find((t) => t.type === ticket.type).quantity}
              </span>
              <button
                style={styles.buttonControl}
                onClick={() => handleQuantityChange(ticket.type, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.summary}>
        <p>Total Tiket: {totalTickets}</p>
        <p>Total Harga: {formatCurrency(totalPrice)}</p>
        <button style={styles.button} onClick={handlePurchase} disabled={totalTickets === 0}>
          Beli Tiket
        </button>
      </div>

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Konfirmasi</h3>
            <p>E-Tiket Anda akan dikirimkan ke:</p>
            <p>Email: <strong>kelompok8b@celerates.com</strong></p>
            <p>List item yang dibeli:</p>
            {purchasedTickets.map((ticket) => (
              <div key={ticket.type}>
                <p>Acara: {event.title}</p>
                <p>Kategori: {ticket.type}</p>
                <p>Kuantitas: {ticket.quantity}</p>
              </div>
            ))}
            <p>Anda yakin ingin melanjutkan?</p>
            <div style={styles.popupActions}>
              <button style={styles.cancelButton} onClick={handleClosePopup}>Batalkan</button>
              <button style={styles.confirmButton} onClick={handleConfirmPurchase}>Lanjutkan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const formatCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const styles = {
  container: {
    padding: "30px 15%",
    fontFamily: "Arial, sans-serif",
  },
  ticketList: {
    marginBottom: "20px",
  },
  ticketItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "8px",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
  },
  buttonControl: {
    padding: "5px 10px",
    margin: "0 5px",
    backgroundColor: "#FFCF00",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  quantityDisplay: {
    width: "30px",
    textAlign: "center",
  },
  summary: {
    marginTop: "20px",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#FFCF00",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  popupActions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#d9d9d9",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  confirmButton: {
    padding: "10px 20px",
    backgroundColor: "#FFCF00",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default PilihanTiket;
