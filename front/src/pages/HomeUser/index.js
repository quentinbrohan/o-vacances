import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect, useDispatch, useSelector } from 'react-redux';

import { fetchTrips, saveTrips } from 'src/actions/trip';
import { getTrips } from 'src/features/trip';

import Loading from 'src/components/Loading';
import { isFuture, isPast, parseISO } from 'date-fns';
import TripCard from './TripCard';

import './homeUser.scss';

const HomeUser = ({
  // trips,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { trips } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(getTrips());
  }, []);

  const futureTrips = trips.filter((trip) => isFuture(parseISO(trip.endDate)));
  const oldTrips = trips.filter((trip) => isPast(parseISO(trip.endDate)));

  if (trips) {
    return (
      <main className="home-user">
        <Helmet>
          <title>Mes voyages</title>
          <meta
            name="description"
            content="Homepage utilisateur, recense les voyages"
          />
        </Helmet>
        <div className="connection-container" />
        {isLoading && <Loading />}
        {!isLoading && futureTrips && (
          <>
            <h1>Mes Voyages</h1>
            <div className="my-trips">
              {futureTrips.map((trip) => (
                <TripCard {...trip} key={trip.id} />
              ))}
            </div>

            <h2 style={{ opacity: 0.8 }}>
              Mes anciens voyages
            </h2>
            <div className="my-trips" style={{ opacity: 0.6 }}>
              {oldTrips.map((trip) => (
                <TripCard {...trip} key={trip.id} />
              ))}
            </div>
          </>
        )}
      </main>
    );
  }

  return <div>Erreur dans l'accès aux données.</div>;
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

const mapStateToProps = (state) => ({
  trips: state.trip.trips,
  isLoading: state.trip.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: () => {
    dispatch(fetchTrips());
  },
  saveTrips: () => {
    dispatch(saveTrips());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeUser);
