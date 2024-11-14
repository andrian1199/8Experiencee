import React from 'react';  
import { Link } from 'react-router-dom';
import Navigation from '../komponen Home/Navbar';  
import Cardfes from '../assets/Frametiket.svg';  
import Cardfes2 from '../assets/Card Event Judul.svg';  
import ig from '../assets/instagram.jpeg'
import fb from '../assets/Facebook.jpeg'
import share from '../assets/Share.png'
import '../detail konser/Card4.css';  
import Lower from '../Detail Konser/Lower' 

function Card4() {  
  return (  
    <>  
      <Navigation />
      <div className="container mt-5"> 
        <div className="row justify-content-between align-items-center"> 
          <div className="col-md-5 text-center"> 
            <img src={Cardfes} alt="fes" className="img-fluid" /> 
          </div>
          <div className="col-md-5 text-center"> 
            <img src={Cardfes2} alt="fes" className="img-fluid" /> 
          <div className='textfes'>
            <h4>Mulai dari               Rp 150.000            </h4>
          </div>
          <Link to="/pilihan-tiket">
            <button className='Btnfes'>CEK TIKET</button>
           </Link>
          <div className='share'>
            <h4 className='textshare'> Bagikan Event</h4>
            <img src={ig} alt="fes" className="ig" />
            <img src={fb} alt="fes" className="fb" />
            <img src={share} alt="fes" className="share" />    
          </div>
            
          </div>
        </div>
      </div>
      <Lower/>   
    </>  
  );  
}  

export default Card4;
