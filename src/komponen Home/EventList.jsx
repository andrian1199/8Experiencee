import React from 'react';
import { UilCalendarAlt, UilMapMarkerAlt } from '@iconscout/react-unicons';
import eventData from '../data/EventData'; // Import EventData


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
  card: {
    width: '310px',
    height: '470px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: '200px',
    backgroundColor: '#f4f4f4',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '15px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    color: '#666',
    marginTop: '20px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  infoText: {
    fontSize: '16px',
    color: '#666',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: '#000',
  },
  priceLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '5px',
  },
  priceValue: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#FFCF00',
  },
};

export default EventList;
