import React, { useRef } from "react";
import Navbar from "../komponen Home/Navigasi";
import HeroSection from "../komponen komunitas/HeroSection";
import CommunityCards from "../komponen komunitas/CommunityCards";
import Footer from "../komponen komunitas/Footer";
import "../styles/Komunitas.css";

const Komunitas = () => {
  const communityRef = useRef(null); // Gunakan useRef untuk referensi ke CommunityCards

  const scrollToCommunity = () => {
    if (communityRef.current) {
      communityRef.current.scrollIntoView({ behavior: "smooth" }); // Gulir dengan efek smooth
    }
  };

  return (
    <>
      <Navbar />
      <HeroSection scrollToCommunity={scrollToCommunity} /> {/* Berikan fungsi scroll */}
      <div ref={communityRef}>
        <CommunityCards />
      </div>
      <Footer />
    </>
  );
};

export default Komunitas;
