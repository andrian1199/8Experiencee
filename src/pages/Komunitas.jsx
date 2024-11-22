import React from "react";
import Navbar from "../komponen komunitas/Navbar";
import HeroSection from "../komponen komunitas/HeroSection";
import CommunityCards from "../komponen komunitas/CommunityCards";
import Footer from "../komponen komunitas/Footer";
import '../styles/Komunitas.css';

const Komunitas = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CommunityCards />
      <Footer />
    </>
  );
};

export default Komunitas;


