import React from 'react';
import HeroSection from '../Detail Event/HeroSection';
import SearchBar from '../Detail Event/SearchBar';
import CategoryFilter from '../Detail Event/CategoryFilter';
import EventList from '../Detail Event/EventList';

const Event = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Search Bar */}
      <SearchBar />

      {/* Category Filter */}
      <CategoryFilter />

      {/* Event List */}
      <EventList />
    </div>
  );
};

export default Event;
