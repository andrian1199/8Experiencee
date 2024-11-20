import React from 'react'
import logo from '../assets/FesTix 1.svg'
import search from '../assets/search.svg'
import ticket from '../assets/ticket.svg'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navigation">
    <img src={logo} alt="logo" className="logo" />
    <nav>
        <ul>
            <Link to="/Home" className="btn">Home</Link>
            <Link to="/blog" className="btn">Blog</Link>
            <li><a href="#" className="btn">Komunitas</a></li>
            <li><a href="#" className="btn">Tentang</a></li>
            <div className="btn-wrapper">
                <li><a href="#" className="btn light"><img src={search} alt="Search" /></a></li>
                <li><a href="#" className="btn light"><img src={ticket} alt="Ticket" /></a></li>
                <Link to="/login" className="btn light2">Masuk</Link>
            </div>
        </ul>
    </nav>
</div>

  )
}

export default Navbar