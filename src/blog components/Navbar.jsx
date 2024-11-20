import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logo from '../assets/FesTix 1.svg';
import ticket from '../assets/ticket2.svg';
import '../Blog/Navbar.css'; // Mengimpor file CSS Navbar

function Navigasi() {
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
            <Nav.Link as={Link} to="/Home" className="btn text-white opacity-50 hover:opacity-100">
              Home
            </Nav.Link>

            {/* Blog */}
            <Nav.Link as={Link} to="/blog" className="btn text-white opacity-50 hover:opacity-100">
              Blog
            </Nav.Link>

            {/* Komunitas */}
            <Nav.Link href="#" className="btn text-white opacity-50 hover:opacity-100">
              Komunitas
            </Nav.Link>

            {/* Tentang */}
            <Nav.Link href="#" className="btn text-white opacity-50 hover:opacity-100">
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
                  padding: '12px',  // Sesuaikan padding agar bulat
                  width: '50px',  // Tentukan lebar tombol
                  height: '50px',  // Tentukan tinggi tombol agar simetris
                  borderRadius: '50%' // Pastikan tombol bulat sempurna
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

export default Navigasi;

<div
    style={{
        display: 'flex',
        alignItems: 'center', // Sejajarkan elemen secara vertikal
        gap: '1rem', // Jarak antar elemen
    }}
>
    <i
        className="bx bx-ticket"
        style={{
            fontSize: '1.8rem', // Ukuran ikon
            color: '#ffc107', // Warna ikon
            lineHeight: '1', // Pastikan tinggi baris ikon tidak membuatnya naik/turun
        }}
    ></i>
    <button
        style={{
            backgroundColor: '#ffc107', // Warna tombol
            border: 'none',
            borderRadius: '50px', // Bentuk tombol bulat
            padding: '0.5rem 1.5rem', // Padding tombol
            fontWeight: 'bold',
            color: '#000', // Warna teks tombol
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center', // Teks di tombol juga sejajar
            justifyContent: 'center', // Konten tombol berada di tengah
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#ffca2c')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#ffc107')}
    >
        Masuk
    </button>
</div>

