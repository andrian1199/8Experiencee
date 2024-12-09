import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Table, Badge } from "react-bootstrap";
import orders from "../data/ordersData";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const OrderPage = () => {
  const [filter, setFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "success") return order.status === "success";
    if (filter === "failed") return order.status === "failed";
    return false;
  });

  return (
    <div className="admin-main container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 col-lg-10 px-4">
          <header className="admin-header d-flex justify-content-between align-items-center py-3 border-bottom">
            <h4 className="m-0">Order List</h4>
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
            <ul className="nav nav-pills mb-4 admin-nav-pills">
              <li className="nav-item">
                <button
                  className={`nav-link ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  Semua
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${filter === "success" ? "active" : ""}`}
                  onClick={() => setFilter("success")}
                >
                  Terjual
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${filter === "failed" ? "active" : ""}`}
                  onClick={() => setFilter("failed")}
                >
                  Dibatalkan
                </button>
              </li>
            </ul>

            <div className="admin-card shadow-sm">
              <div className="card-body">
                <Table striped bordered hover className="table-responsive admin-order-table">
                  <thead>
                    <tr>
                      <th>ID Pesanan</th>
                      <th>Tanggal</th>
                      <th>Acara</th>
                      <th>Pelanggan</th>
                      <th>Lokasi</th>
                      <th>Jumlah</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.event}</td>
                        <td>{order.customer}</td>
                        <td>{order.location}</td>
                        <td>{order.quantity}</td>
                        <td>
                          <Badge bg={order.status === "success" ? "success" : "danger"}>
                            {order.status === "success" ? "Terjual" : "Dibatalkan"}
                          </Badge>
                        </td>
                        <td>Rp. {order.total.toLocaleString("id-ID")}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderPage;
