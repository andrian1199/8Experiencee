import React from 'react';
import HeroSection from '../Detail Event/HeroSection';
import EventList from '../Detail Event/EventList';
import Navigasi from '../komponen Home/Navigasi';
import Footer from '../components/Footer'

const Event = () => {
  return (
    <div>
    
    <Navigasi />
      {/* Hero Section */}
      <HeroSection />

      {/* Event List */}
      <EventList />

      <Footer />
    </div>
  );
};

export default Event;
