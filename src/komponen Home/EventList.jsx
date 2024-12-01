import React from 'react';
import EventCard from './EventCard';
import eventData from '../data/EventData'; // Import data acara

const EventList = () => {
  return (
    <div style={styles.container}>
      {eventData.map((event) => (
        <EventCard 
          key={event.id} 
          title={event.title} 
          date={event.date} 
          location={event.location} 
          price={event.price} 
          image={event.image} 
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    padding: '20px',
  },
};

export default EventList;
