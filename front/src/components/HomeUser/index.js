import React from 'react';

import userTrips from 'src/data/homeUserTripsData';
import TripCard from './TripCard';

import './homeUser.scss';

const HomeUser = () => {

  return (
    <div className="home-user">
      <h1>Mes Voyages</h1>
      <div className="my-trips">
        {userTrips.map((trip) => (
          <TripCard {...trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
};

export default HomeUser;
