import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PilihanTiket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch data event dan tiket dari backend
    fetch(`http://localhost:5000/events/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data event");
        }
        return response.json();
      })
      .then((data) => {
        setEvent(data);
        setSelectedTickets(
          data.tickets.map((ticket) => ({
            type: ticket.type,
            quantity: 0,
          }))
        );
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleQuantityChange = (type, change) => {
    setSelectedTickets((prev) =>
      prev.map((ticket) =>
        ticket.type === type
          ? {
              ...ticket,
              quantity: Math.min(
                Math.max(0, ticket.quantity + change),
                event.tickets.find((t) => t.type === type).stock
              ),
            }
          : ticket
      )
    );
  };

  const handlePurchase = () => {
    if (selectedTickets.some((ticket) => ticket.quantity > 0)) {
      setShowPopup(true);
    } else {
      alert("Pilih setidaknya 1 tiket untuk melanjutkan!");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmPurchase = () => {
    const totalPrice = selectedTickets.reduce((sum, ticket) => {
      const ticketInfo = event.tickets.find((t) => t.type === ticket.type);
      return sum + ticket.quantity * ticketInfo.price;
    }, 0);

    navigate(`/metode-pembayaran`, {
      state: { 
        eventDetail: event, 
        selectedTickets, 
        totalPrice 
      },
    });
  };

  if (!event) {
    return <div style={{ textAlign: "center", padding: "100px" }}>Memuat data...</div>;
  }

  const totalTickets = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
  const totalPrice = selectedTickets.reduce((sum, ticket) => {
    const ticketInfo = event.tickets.find((t) => t.type === ticket.type);
    return sum + ticket.quantity * ticketInfo.price;
  }, 0);

  const purchasedTickets = selectedTickets.filter((ticket) => ticket.quantity > 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{`Pilih Tiket untuk ${event.title}`}</h2>
      <div style={styles.ticketList}>
        {event.tickets.map((ticket) => (
          <div key={ticket.type} style={styles.ticketItem}>
            <div>
              <span style={styles.ticketTitle}>
                {ticket.type} - {formatCurrency(ticket.price)}
              </span>
              <p style={styles.benefits}>{ticket.benefits}</p>
              <p style={styles.stock}>Stok Tersisa: {ticket.stock}</p>
            </div>
            <div style={styles.quantityControls}>
              <button
                style={styles.buttonControl}
                onClick={() => handleQuantityChange(ticket.type, -1)}
                disabled={
                  selectedTickets.find((t) => t.type === ticket.type).quantity === 0
                }
              >
                -
              </button>
              <span style={styles.quantityDisplay}>
                {selectedTickets.find((t) => t.type === ticket.type).quantity}
              </span>
              <button
                style={styles.buttonControl}
                onClick={() => handleQuantityChange(ticket.type, 1)}
                disabled={
                  selectedTickets.find((t) => t.type === ticket.type).quantity >=
                  ticket.stock
                }
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
              <button style={styles.cancelButton} onClick={handleClosePopup}>
                Batalkan
              </button>
              <button style={styles.confirmButton} onClick={handleConfirmPurchase}>
                Lanjutkan
              </button>
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
    padding: "100px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  ticketList: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  ticketItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "8px",
  },
  ticketTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  benefits: {
    fontSize: "14px",
    color: "#555",
    marginTop: "5px",
  },
  stock: {
    fontSize: "12px",
    color: "#888",
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
    borderRadius: "40px",
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
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#FFCF00",
    border: "none",
    borderRadius: "40px",
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
    width: "90%",
    maxWidth: "400px",
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
