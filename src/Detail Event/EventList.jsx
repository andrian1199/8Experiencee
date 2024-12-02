import React from 'react';
import EventCard from '../komponen Home/EventCard'; // Sesuaikan dengan EventCard-mu
import EventData from '../data/EventData'; // Data dummy untuk event

const EventList = () => {
  return (
    <div style={styles.container}>
      {EventData.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    padding: '20px',
  },
};

export default EventList;
