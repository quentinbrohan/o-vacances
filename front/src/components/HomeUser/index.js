import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Loading from 'src/components/Loading';
import moment from 'moment';
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

  const futureTrips = trips.filter((trip) => moment(trip.endDate) > moment());
  // Filter trips => if endDate < actual Date = oldTrip
  const oldTrips = trips.filter((trip) => moment(trip.endDate) < moment());

  return (
    <main className="home-user">
      {isLoading && <Loading />}
      {!isLoading && (
      <>
        <h1>Mes Voyages</h1>
        <div className="my-trips">
          {futureTrips.map((trip) => (
            <TripCard {...trip} key={trip.id} />
          ))}
        </div>

        <h2>Mes anciens voyages</h2>
        <div className="my-trips">
          {oldTrips.map((trip) => (
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
