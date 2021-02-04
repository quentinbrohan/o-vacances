import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import Card from 'src/components/Card';
import Loading from 'src/components/Loading';
import ModalActivityForm from 'src/pages/trip/Trip/ModalActivityForm';
import { useGetActivitiesByTripIdQuery } from 'src/services/trip';
import { sortByAscStartDateActivities } from 'src/utils/dates';
import { getTripIdFromUrlParams, isTripArchived } from 'src/utils/trip';
import './activities.scss';

const Activities = ({ location }) => {
  const { data: activities, isLoading } = useGetActivitiesByTripIdQuery(
    location?.state?.tripId || getTripIdFromUrlParams(),
  );

  const sortedDescendingStartDateActivities = sortByAscStartDateActivities(activities);

  const trip = activities?.find((activity) => activity.trip);
  const isArchived = isTripArchived(trip?.startDate, trip?.endDate);

  return (
    <main className="trip-activities">
      <Helmet>
        <title>Activités</title>
        <meta name="description" content="Activités" />
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="header">
            <h1>Activités</h1>
            <div className="cta">
              {!isArchived && trip && (
                <ModalActivityForm
                  tripId={trip.tripId}
                  isEditMode={false}
                  tripStartDate={trip.startDate}
                  tripEndDate={trip.endDate}
                  isArchived={isArchived}
                  modalIconType="ADD"
                />
              )}
            </div>
          </div>
          <div className="cards-container">
            {sortedDescendingStartDateActivities
            && sortedDescendingStartDateActivities.map((activity) => (
              <Card activity={activity} key={activity.id} tripid={trip.tripId} mode="VIEW" />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

Activities.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Activities;
