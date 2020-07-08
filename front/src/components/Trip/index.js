import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, MapPin } from 'react-feather';

import tripData from 'src/data/tripData';
import './trip.scss';

const Trip = () => {
  console.log(tripData);

  return (
    <main className="trip-details">
      <img
        className="trip-photo"
        alt={tripData.title}
        src={tripData.image}
      />
      <div className="trip-info">
        <div className="left">
          <h1>{tripData.title}</h1>
          <div className="date">
            <Calendar />
            <p>
              Du {tripData.startDate} au {tripData.endDate}.
            </p>
          </div>
          <div className="location">
            <MapPin />
            <p>
              {tripData.location}
            </p>
          </div>
        </div>
        <div className="right">
          <div className="participants"></div>
        </div>
      </div>
    </main>
  );
};

export default Trip;
