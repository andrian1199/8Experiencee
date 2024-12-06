import '../komponen Home/Home.css';
import React from 'react';
import Navigation from '../komponen Home/Navigasi';
import Hero from '../komponen Home/Hero'; 
import Mid from '../komponen Home/Mid';
import Mid2 from '../komponen Home/Mid2';
import Konser from '../komponen Home/Konser';
import Festival from '../komponen Home/Festival'
import BlogKomunitas from '../komponen Home/BlogKomunitas'
import Faq from '../komponen Home/FAQ'
import Low from '../komponen Home/Low'
import Lower from '../Detail Konser/Lower'
import Footer from '../components/Footer';


function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Mid/>
      <Mid2/>
      <Konser/>
      <Festival/>
      <BlogKomunitas/>
      <Low/>
      <Faq/>
      <Footer/>
    </>
  );
}

export default Home;
