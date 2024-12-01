import React from 'react';
import { Link } from 'react-router-dom';
import EventData from '../data/EventData'; // Pastikan path benar
import EventCard from './EventCard'; // Pastikan path benar

const Konser = () => {
  // Filter hanya acara dengan type "konser"
  const konserEvents = EventData.filter(event => event.type === 'konser');

  return (
    <div className="konser container py-5">
      <div className="konser-header mb-4">
        <div className="text-festival d-flex justify-content-between align-items-center">
          <h1>Konser</h1>
          <Link to="/detail-konser" className="btn btn-primary">
            Lihat Semua
          </Link>
        </div>
      </div>

      {/* Grid System */}
      <div className="row g-4">
        {konserEvents.map(event => (
          <div className="col-6 col-md-3" key={event.id}>
            <EventCard
              title={event.title}
              date={event.date}
              location={event.location}
              price={event.price}
              image={event.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Konser;
