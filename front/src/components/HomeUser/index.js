import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import userTrips from 'src/data/homeUserTripsData';
import userOldTrips from 'src/data/homeUserOldTripsData';
import Loading from 'src/components/Loading';
import TripCard from './TripCard';

import './homeUser.scss';

const HomeUser = ({
  fetchTrips,
  trips,
  isLoading,
}) => {
  useEffect(() => {
    fetchTrips();
  }, []);
  console.log(trips);
  // TODO: Filter trips => if Date's passed = oldTrip

  return (
    <main className="home-user">
      {isLoading && <Loading />}
      {!isLoading && (
      <>
        <h1>Mes Voyages</h1>
        <div className="my-trips">
          {trips.map((trip) => (
            <TripCard {...trip} key={trip.id} />
          ))}
        </div>

        <h2>Mes anciens voyages</h2>
        <div className="my-trips">
          {userOldTrips.map((trip) => (
            <TripCard {...trip} key={trip.id} />
          ))}
        </div>
      </>
      )}
    </main>
  );
};

HomeUser.propTypes = {
  fetchTrips: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default HomeUser;
