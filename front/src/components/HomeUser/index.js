import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Loading from 'src/components/Loading';
import { isFuture, isPast, parseISO } from 'date-fns';
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

  useEffect(() => {
    fetchTrips();
  }, []);

  const futureTrips = trips.filter((trip) => isFuture(parseISO(trip.endDate)));
  const oldTrips = trips.filter((trip) => isPast(parseISO(trip.endDate)));
  // Filter trips => if endDate < actual Date = oldTrip
  // const oldTrips = trips.filter((trip) => (trip.endDate) < new Date());

  return (
    <main className="home-user">
      <Helmet>
        <title>Mes voyages</title>
        <meta name="description" content="Homepage utilisateur, recense les voyages" />
      </Helmet>
      <div className="connection-container" />
      {isLoading && <Loading />}
      {(!isLoading && futureTrips) && (
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
