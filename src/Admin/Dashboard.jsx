import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="admin-main container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 col-lg-10 px-4">
          <header className="admin-header d-flex justify-content-between align-items-center py-3 border-bottom">
            <h4 className="m-0">Dashboard</h4>
            <div className="d-flex align-items-center">
              <Link to="/admin/profile" className="text-decoration-none text-dark d-flex align-items-center">
                <span className="me-2">Wisnu</span>
                <img
                  src="/path/to/user-profile.png"
                  alt="Admin Profile"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>
            </div>
          </header>

          <div className="admin-container my-4">
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h6 className="text-muted">Penghasilan</h6>
                    <h5 className="text-warning">Rp. 123.000</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h6 className="text-muted">Tiket Terjual</h6>
                    <h5 className="text-warning">1267</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h6 className="text-muted">Kunjungan</h6>
                    <h5 className="text-warning">8000</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-card shadow-sm mx-auto" style={{ maxWidth: "900px" }}>
              <div className="card-body">
                <h6 className="card-title">Detail Penjualan</h6>
                <canvas id="salesChart"></canvas>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
