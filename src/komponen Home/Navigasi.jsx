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

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    const handleStorageChange = () => {
      const updatedStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(updatedStatus);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm w-100">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`btn text-white ${isActive('/') ? 'opacity-100' : 'opacity-50'}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/blog"
              className={`btn text-white ${isActive('/blog') ? 'opacity-100' : 'opacity-50'}`}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/komunitas"
              className={`btn text-white ${isActive('/komunitas') ? 'opacity-100' : 'opacity-50'}`}
            >
              Komunitas
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/tentangkami"
              className={`btn text-white ${isActive('/tentangkami') ? 'opacity-100' : 'opacity-50'}`}
            >
              Tentang
            </Nav.Link>

            {/* Tiket, Profil, dan Logout */}
            <Nav.Item style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button
                variant="link"
                className="btn light rounded-circle"
                style={{
                  backgroundColor: '#FFCF00',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '8px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid black',
                }}
              >
                <img src={ticket} alt="Ticket" style={{ width: '16px', height: '16px' }} />
              </Button>

              {isLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link to="/profil">
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#FFCF00',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '2px solid black',
                      }}
                    >
                      <img
                        src={profileIcon}
                        alt="Profile"
                        style={{ width: '16px', height: '16px' }}
                      />
                    </div>
                  </Link>

                  <Button
                    onClick={handleLogout}
                    variant="link"
                    className="btn text-black"
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#FFCF00',
                      borderRadius: '15px',
                      border: '2px solid black',
                      fontWeight: 'bold',
                      fontSize: '12px',
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
