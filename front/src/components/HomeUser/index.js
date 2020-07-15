import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import userTrips from 'src/data/homeUserTripsData';
import userOldTrips from 'src/data/homeUserOldTripsData';
import TripCard from './TripCard';

import './homeUser.scss';

const HomeUser = ({ fetchTrips }) => {
  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <main className="home-user">
      <h1>Mes Voyages</h1>
      <div className="my-trips">
        {userTrips.map((trip) => (
          <TripCard {...trip} key={trip.id} />
        ))}
      </div>

      <h2>Mes anciens voyages</h2>
      <div className="my-trips">
        {userOldTrips.map((trip) => (
          <TripCard {...trip} key={trip.id} />
        ))}
      </div>
    </main>
  );
};

HomeUser.propTypes = {
  fetchTrips: PropTypes.func.isRequired,
};

export default HomeUser;
