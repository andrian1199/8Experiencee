import React from "react";
import { NavLink } from "react-router-dom";
import { UilAnalytics, UilCalendarAlt, UilShoppingCart } from '@iconscout/react-unicons';
import "../styles/Admin.css";

const Sidebar = () => {
  return (
    <nav className="admin-nav">
      <div className="p-3 text-center">
        <img src="../assets/FesTix 1.svg" alt="Festix Logo" style={{ width: "100px" }} />
      </div>
      <ul className="nav flex-column px-3">
        <li className="nav-item mb-3">
          <NavLink
            to="/admin/dashboard"
            className="nav-link text-white d-flex align-items-center"
            activeClassName="active"
          >
            <UilAnalytics className="me-2" />
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/admin/event-list"
            className="nav-link text-white d-flex align-items-center"
            activeClassName="active"
          >
            <UilCalendarAlt className="me-2" />
            Daftar Event
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/orders"
            className="nav-link text-white d-flex align-items-center"
            activeClassName="active"
          >
            <UilShoppingCart className="me-2" />
            Order
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
