import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import logo from '../assets/FesTix 1.svg';
import ticket from '../assets/ticket2.svg';
import profileIcon from '../assets/Profile.svg';
import './Navbar.css';

function Navigasi() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Memeriksa status login
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    if (!loggedInStatus) {
      navigate('/login');
    }

    const handleStorageChange = () => {
      const updatedStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(updatedStatus);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Apakah Anda yakin ingin logout?');
    if (!confirmLogout) return;

    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/auth/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      alert('Berhasil logout!');
      navigate('/login');
    } catch (error) {
      console.error('Terjadi kesalahan saat logout:', error);
      alert('Gagal logout, silakan coba lagi.');
    }
  };

  const isActive = (path) => location.pathname === path;

  const containerStyle = {
    maxWidth: '95%',
    margin: '0 auto',
    padding: '0px 5px',
    paddingLeft: '0',
    paddingRight: '0',
  };

  const navbarStyle = {
    backgroundColor: '#212121',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    padding: '',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: '120px',
    height: 'auto',
  };

  return (
    <Navbar bg="#212121" variant="dark" expand="lg" fixed="top" className="shadow-sm w-100" style={navbarStyle}>
      <Container style={containerStyle}>
        <Navbar.Brand as={Link} to="/" style={{ padding: '0', marginRight: 'auto' }}>
          <img src={logo} alt="Logo" style={logoStyle} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="custom-toggler" />

        <Navbar.Collapse id="navbar-nav" className="navbar-collapse">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className={`btn text-white ${isActive('/') ? 'opacity-100' : 'opacity-50'}`}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/komunitas"
              className={`btn text-white ${isActive('/komunitas') ? 'opacity-100' : 'opacity-50'}`}
            >
              Komunitas
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" className={`btn text-white ${isActive('/blog') ? 'opacity-100' : 'opacity-50'}`}>
              Blog
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/tentangkami"
              className={`btn text-white ${isActive('/tentangkami') ? 'opacity-100' : 'opacity-50'}`}
            >
              Tentang
            </Nav.Link>

            <Nav.Item style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                  border: '2px solid black',
                }}
              >
                <img src={ticket} alt="Ticket" style={{ width: '20px', height: '20px' }} />
              </Button>

              {isLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Link to="/profil">
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#FFCF00',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '2px solid black',
                      }}
                    >
                      <img src={profileIcon} alt="Profile" style={{ width: '20px', height: '20px' }} />
                    </div>
                  </Link>

                  <Button
                    onClick={handleLogout}
                    variant="link"
                    className="btn text-black"
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#FFCF00',
                      borderRadius: '40px',
                      border: '2px solid black',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
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
