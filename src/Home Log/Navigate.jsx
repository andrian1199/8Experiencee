import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logo from '../assets/FesTix 1.svg';
import profileIcon from '../assets/profile.svg'; // Ikon profil
import ticket from '../assets/ticket2.svg'; // Ikon tiket
import './Navbar.css'; // Impor file CSS

function Navigate() {
  const location = useLocation();

  // Fungsi untuk mengecek apakah link saat ini adalah halaman aktif
  const isActive = (path) => location.pathname === path;

  // Simulasi status login
  const isLoggedIn = false; // Ganti dengan state atau logika asli untuk login

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar">
      <Container fluid>
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        {/* Toggler untuk Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="navbar-nav ml-auto">
            {/* Home */}
            <Nav.Link
              as={Link}
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Nav.Link>

            {/* Blog */}
            <Nav.Link
              as={Link}
              to="/blog"
              className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
            >
              Blog
            </Nav.Link>

            {/* Komunitas */}
            <Nav.Link
              href="#"
              className="nav-link"
            >
              Komunitas
            </Nav.Link>

            {/* Tentang */}
            <Nav.Link
              href="#"
              className="nav-link"
            >
              Tentang
            </Nav.Link>

            {/* Ikon Tiket */}
            <Nav.Item>
              <Button
                variant="link"
                className="btn-ticket"
              >
                <img src={ticket} alt="Ticket" className="ticket-icon" />
              </Button>
            </Nav.Item>

            {/* Ikon Profil */}
            <Nav.Item>
              <Link to={isLoggedIn ? "/profile" : "/login"}>
                <Button
                  variant="link"
                  className="btn-profile-icon"
                >
                  <img src={profileIcon} alt="Profile" className="profile-icon" />
                </Button>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigate;
