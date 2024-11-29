import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logo from '../assets/FesTix 1.svg';
import ticket from '../assets/ticket2.svg';
import profileIcon from '../assets/Profile.svg';
import './Navbar.css';

function Navigasi() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mengatur status login ketika komponen dimuat
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    // Memantau perubahan status login melalui localStorage
    const handleStorageChange = () => {
      const updatedStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(updatedStatus);
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Hapus status login dari localStorage
    setIsLoggedIn(false); // Update status login
    navigate('/login'); // Arahkan ke halaman login
  };

  // Fungsi untuk mengecek apakah link saat ini adalah halaman aktif
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm w-100">
      <Container fluid>
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`btn text-white opacity-${isActive('/') ? '100' : '50'}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/blog"
              className={`btn text-white opacity-${isActive('/blog') ? '100' : '50'}`}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              href="/komunitas"
              className="btn text-white opacity-50 hover:opacity-100"
            >
              Komunitas
            </Nav.Link>
            <Nav.Link
              href="/tentangkami"
              className="btn text-white opacity-50 hover:opacity-100"
            >
              Tentang
            </Nav.Link>
            <Nav.Item style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {/* Tiket */}
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
                  border: '2px solid black', // Garis hitam
                }}
              >
                <img src={ticket} alt="Ticket" style={{ width: '24px', height: '24px' }} />
              </Button>

              {/* Profil atau Masuk */}
              {isLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Profil Button */}
                  <Link to="/profil" className="btn">
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#FFCF00', // Warna kuning
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '2px solid black', // Garis hitam
                      }}
                    >
                      <img
                        src={profileIcon}
                        alt="Profile"
                        style={{
                          width: '24px',
                          height: '24px',
                        }}
                      />
                    </div>
                  </Link>

                  {/* Logout Button */}
                  <Button
                    onClick={handleLogout}
                    variant="link"
                    className="btn text-white"
                    style={{ marginLeft: '10px' }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                // Login Button
                <Link to="/login" className="btn btn-light2">
                  Masuk
                </Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigasi;
