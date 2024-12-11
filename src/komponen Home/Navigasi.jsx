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

  // Memeriksa status login pada saat pertama kali komponen dimuat
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    // Menambahkan event listener untuk mendeteksi perubahan status login di localStorage
    const handleStorageChange = () => {
      const updatedStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(updatedStatus);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Fungsi untuk melakukan logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user'); // Hapus data user dari localStorage
    setIsLoggedIn(false);
    navigate('/login'); // Arahkan pengguna ke halaman login setelah logout
  };

  // Memeriksa apakah halaman saat ini aktif
  const isActive = (path) => location.pathname === path;

  // Style untuk container Navbar
  const containerStyle = {
    maxWidth: '95%',
    margin: '0 auto',
    padding: '0px 5px',
    paddingLeft: '0',
    paddingRight: '0',
  };

  // Style untuk Navbar
  const navbarStyle = {
    backgroundColor: '#212121', // Warna latar belakang
    height: '100px', // Atur tinggi navbar
    display: 'flex',
    alignItems: 'center', // Vertikal rata tengah
    padding: '0', // Hapus padding default
  };

  // Style untuk logo
  const logoStyle = {
    display: 'flex', // Pastikan logo mengikuti aturan flexbox
    alignItems: 'center',
    justifyContent: 'flex-start', // Logo berada di sebelah kiri
    maxWidth: '120px', // Sesuaikan lebar logo
    height: 'auto',
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm w-100" style={navbarStyle}>
      <Container style={containerStyle}>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" style={{ padding: '0', marginRight: 'auto' }}>
          <img src={logo} alt="Logo" style={logoStyle} />
        </Navbar.Brand>

        {/* Toggle Menu untuk perangkat kecil */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Menu */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            {/* Menu Navigation */}
            <Nav.Link
              as={Link}
              to="/"
              className={`btn text-white ${isActive('/') ? 'opacity-100' : 'opacity-50'}`}
            >
              Home
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
              to="/blog"
              className={`btn text-white ${isActive('/blog') ? 'opacity-100' : 'opacity-50'}`}
            >
              Blog
            </Nav.Link>
            
            <Nav.Link
              as={Link}
              to="/tentangkami"
              className={`btn text-white ${isActive('/tentangkami') ? 'opacity-100' : 'opacity-50'}`}
            >
              Tentang
            </Nav.Link>

            {/* Tiket, Profil, dan Logout */}
            <Nav.Item style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Tiket Button */}
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
                  {/* Profil Button */}
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
                      <img
                        src={profileIcon}
                        alt="Profile"
                        style={{ width: '20px', height: '20px' }}
                      />
                    </div>
                  </Link>

                  {/* Logout Button */}
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
