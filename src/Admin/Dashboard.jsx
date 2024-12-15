import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById("salesChart").getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["5k", "10k", "15k", "20k", "25k", "30k", "35k"],
        datasets: [
          {
            label: "Penjualan",
            data: [20, 40, 60, 80, 100, 60, 80],
            borderColor: "#FFC107",
            backgroundColor: "rgba(255, 193, 7, 0.2)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "20px",
          marginLeft: "250px", // Pastikan ini sesuai lebar sidebar
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ margin: 0 }}>Dashboard</h4>
          <Link
            to="/admin/profile"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#000",
            }}
          >
            <span style={{ marginRight: "10px" }}>Wisnu</span>
            <img
              src="/path/to/user-profile.png"
              alt="Admin Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Link>
        </header>

        {/* Cards Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "15px",
              backgroundColor: "#ffffff",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h6 style={{ color: "#6c757d", marginBottom: "10px" }}>
              Penghasilan
            </h6>
            <h5 style={{ color: "#FFC107", fontWeight: "bold" }}>
              Rp. 123.000
            </h5>
          </div>

          {/* Card 2 */}
          <div
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "15px",
              backgroundColor: "#ffffff",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h6 style={{ color: "#6c757d", marginBottom: "10px" }}>
              Tiket Terjual
            </h6>
            <h5 style={{ color: "#FFC107", fontWeight: "bold" }}>1267</h5>
          </div>

          {/* Card 3 */}
          <div
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "15px",
              backgroundColor: "#ffffff",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h6 style={{ color: "#6c757d", marginBottom: "10px" }}>
              Kunjungan
            </h6>
            <h5 style={{ color: "#FFC107", fontWeight: "bold" }}>8000</h5>
          </div>
        </div>

        {/* Chart Section */}
        <div
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            backgroundColor: "#ffffff",
            padding: "20px",
            height: "400px",
          }}
        >
          <h6 style={{ color: "#6c757d", marginBottom: "20px" }}>
            Detail Penjualan
          </h6>
          <div style={{ height: "300px" }}>
            <canvas id="salesChart" style={{ maxWidth: "100%" }}></canvas>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
