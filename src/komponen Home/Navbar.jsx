import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logo from '../assets/FesTix 1.svg';
import ticket from '../assets/ticket2.svg';
import '../Blog/Navbar.css'; // Mengimpor file CSS Navbar


function Navigasi() {
  const location = useLocation();

  // Fungsi untuk mengecek apakah link saat ini adalah halaman aktif
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm w-100">
      <Container fluid>
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        {/* Toggler untuk Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            {/* Home */}
            <Nav.Link
              as={Link}
              to="/Home"
              className={`btn text-white opacity-${isActive('/Home') ? '100' : '50'}`}
            >
              Home
            </Nav.Link>

            {/* Blog */}
            <Nav.Link
              as={Link}
              to="/blog"
              className={`btn text-white opacity-${isActive('/blog') ? '100' : '50'}`}
            >
              Blog
            </Nav.Link>

            {/* Komunitas */}
            <Nav.Link
              href="#"
              className="btn text-white opacity-50 hover:opacity-100"
            >
              Komunitas
            </Nav.Link>

            {/* Tentang */}
            <Nav.Link
              href="#"
              className="btn text-white opacity-50 hover:opacity-100"
            >
              Tentang
            </Nav.Link>

            {/* Ikon Ticket */}
            <Nav.Item>
              <Button
                variant="link"
                className="btn light rounded-circle"
                style={{
                  backgroundColor: '#FFCF00',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '12px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                }}
              >
                <img src={ticket} alt="Ticket" style={{ width: '24px', height: '24px' }} />
              </Button>
            </Nav.Item>

            {/* Tombol Masuk */}
            <Nav.Item>
              <Link to="/login" className="btn btn-light2">
                Masuk
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigasi