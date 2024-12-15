import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UilAnalytics, UilCalendarAlt, UilShoppingCart, UilAngleDown, UilUsersAlt, UilFileAlt } from "@iconscout/react-unicons";
import "../styles/Admin.css";

const Sidebar = () => {
  const [isContentOpen, setIsContentOpen] = useState(false);

  const toggleContentDropdown = () => {
    setIsContentOpen(!isContentOpen);
  };

  return (
    <nav className="admin-nav">
      <div className="p-3 text-center">
        <img src="/assets/FesTix 1.svg" alt="Festix Logo" style={{ width: "100px" }} />
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
        <li className="nav-item mb-3">
          <NavLink
            to="/admin/orders"
            className="nav-link text-white d-flex align-items-center"
            activeClassName="active"
          >
            <UilShoppingCart className="me-2" />
            Order
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <div
            className="nav-link text-white d-flex align-items-center cursor-pointer"
            onClick={toggleContentDropdown}
          >
            <span className="me-2">Content</span>
            <UilAngleDown
              className="ms-auto"
              style={{
                transition: "transform 0.3s ease",
                transform: isContentOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
          {/* Konten tambahan untuk submenu */}
          {isContentOpen && (
            <ul className="nav flex-column ps-4">
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/community-list"
                  className="nav-link text-white d-flex align-items-center"
                  activeClassName="active"
                >
                  <UilUsersAlt className="me-2" />
                  Komunitas
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/blog-list"
                  className="nav-link text-white d-flex align-items-center"
                  activeClassName="active"
                >
                  <UilFileAlt className="me-2" />
                  Blog
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
