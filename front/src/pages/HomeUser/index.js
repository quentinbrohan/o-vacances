import { isFuture, isPast, parseISO } from 'date-fns';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Card from 'src/components/Card';
import Button from 'src/components/elements/Button';
import Loading from 'src/components/Loading';
import { useGetTripsByUserIdQuery } from 'src/services/trip';

// TODO: filter search ?
const HomeUser = () => {
  const {
    data: trips, error, isLoading, isFetching,
  } = useGetTripsByUserIdQuery();

  const futureTrips = trips?.trip.filter((trip) => isFuture(parseISO(trip.endDate)));
  const oldTrips = trips?.trip.filter((trip) => isPast(parseISO(trip.endDate)));

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (trips) {
    return (
      <main className="home-user">
        <Helmet>
          <title>Mes voyages</title>
          <meta name="description" content="Homepage utilisateur, recense les voyages" />
        </Helmet>
        {futureTrips && oldTrips && (
          <>
            <h1>Mes Voyages</h1>
            {futureTrips.length > 0 ? (
              <div className="cards-container">
                {futureTrips.map((trip) => (
                  <Card trip={trip} key={trip.id} mode="LINK" />
                ))}
              </div>
            ) : (
              <>
                <div>
                  Pas de voyages prévus.
                  <Link to="/creer-un-voyage">
                    <Button color="primary" className="inline">
                      Ajouter
                    </Button>
                  </Link>
                </div>
              </>
            )}

            <h2 style={{ opacity: 0.8 }}>Mes anciens voyages</h2>
            {oldTrips.length > 0 ? (
              <div className="cards-container" style={{ opacity: 0.6 }}>
                {oldTrips.map((trip) => (
                  <Card trip={trip} key={trip.id} mode="LINK" />
                ))}
              </div>
            ) : (
              <div>Pas d'anciens voyages.</div>
            )}
          </>
        )}
      </main>
    );
  }

  return <div>Erreur dans la requête.</div>;
};

export default HomeUser;
