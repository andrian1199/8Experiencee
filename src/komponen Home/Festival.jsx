import React from 'react';
import { Link } from 'react-router-dom';
import EventData from '../data/EventData'; // Pastikan path sesuai
import EventCard from './EventCard'; // Pastikan path sesuai

const Festival = () => {
  // Filter hanya acara dengan type "festival"
  const festivalEvents = EventData.filter(event => event.type === 'festival');

  return (
    <div className="festival container py-5">
      <div className="festival-header mb-4">
        <div className="text-festival d-flex justify-content-between align-items-center">
          <h1>Festival</h1>
          <Link to="/detail-festival" className="btn btn-primary">
            Lihat Semua
          </Link>
        </div>
      </div>

      {/* Grid System */}
      <div className="row g-4"> {/* g-4: Spasi antar elemen */}
        {festivalEvents.map(event => (
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

export default Festival;
