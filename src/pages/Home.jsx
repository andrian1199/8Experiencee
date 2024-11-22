import '../komponen Home/Home.css';
import React from 'react';
import Navigation from '../komponen Home/Navbar';
import Hero from '../komponen Home/Hero'; 
import Mid from '../komponen Home/Mid';
import Mid2 from '../komponen Home/Mid2';
import Konser from '../komponen Home/Konser';
import Festival from '../komponen Home/Festival'
import Komunitas from '../komponen Home/Komunitas'
import Faq from '../komponen Home/FAQ'
import Low from '../komponen Home/Low'



function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Mid/>
      <Mid2/>
      <Konser/>
      <Festival/>
      <Komunitas/>
      <Faq/>
      <Low/>
    </>
  );
}

export default Home;
