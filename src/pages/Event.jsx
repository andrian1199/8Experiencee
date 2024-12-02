import React from 'react';
import HeroSection from '../Detail Event/HeroSection';
import SearchBar from '../Detail Event/SearchBar';
import EventList from '../Detail Event/EventList';
import Navigasi from '../komponen Home/Navigasi';

const Event = () => {
  return (
    <div>
    
    <Navigasi />
      {/* Hero Section */}
      <HeroSection />


      {/* Event List */}
      <EventList />
    </div>
  );
};

export default Event;
