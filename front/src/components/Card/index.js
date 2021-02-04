import { isSameYear, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Calendar, ChevronRight, MapPin } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { success as toastSuccess } from 'react-toastify-redux';
import PlaceholderImage from 'src/assets/images/placeholder.jpg';
import ModalWrapper from 'src/components/ModalWrapper';
import { API_URL } from 'src/constants';
import ModalActivityForm from 'src/pages/trip/Trip/ModalActivityForm';
import { useDeleteActivityMutation } from 'src/services/trip';
import { parseDisplay, parseDisplaySameYear } from 'src/utils/dates';
import { getCurrentUserId } from 'src/utils/user';
import './card.scss';

const Card = ({
  trip, activity, tripId, isArchived, mode,
}) => {
  const dispatch = useDispatch();
  const [
    deleteActivity,
    { isLoading: isLoadingDeleteActivity, isSuccess: isSuccessDeleteActivity },
  ] = useDeleteActivityMutation();

  const [error, setError] = useState('');

  const onDelete = () => {
    deleteActivity({
      activityId: activity.id,
      tripId: activity.trip.id,
    })
      .then((response) => {
        if (response.data) {
          dispatch(toastSuccess('Activité supprimée.'));
        }
      })
      .catch((deleteError) => {
        if (deleteError) {
          console.warn({ deleteError });
          setError(deleteError.error.mesage);
        }
      });
  };
  return (
    <article className="card">
      <header
        style={{ backgroundImage: `url(${API_URL}${trip ? trip.image : activity.category.image})` }}
        className="card-header"
      />
      <div className="card-body">
        <div className="body-content">
          <h3>{trip ? trip.title : activity.title}</h3>
          {trip && (
            <div className="location">
              <MapPin /> {trip.location}
            </div>
          )}
          <div className="date">
            <Calendar />
            {isSameYear(
              parseISO(trip ? trip.startDate : activity.startDate),
              parseISO(trip ? trip.endDate : activity.startDate),
            )
              ? parseDisplaySameYear(trip ? trip.startDate : activity.startDate)
              : parseDisplay(trip ? trip.startDate : activity.startDate)}{' '}
            🡒 {parseDisplay(trip ? trip.endDate : activity.endDate)}
          </div>
          <p className="description">
            {trip
              ? `${trip.description.slice(0, 160)}...`
              : `${activity.description.slice(0, 160)}...`}
          </p>
        </div>
        <div className="cta">
          {mode === 'LINK' && (
            <Link
              to={`/voyage/${tripId || (trip ? trip.id : activity.trip.id)}${
                activity ? '/activites/' : ''
              }`}
            >
              <ChevronRight className="linkto" />
            </Link>
          )}
          {activity
            && mode === 'VIEW'
            && !isArchived
            && activity.creator.id === getCurrentUserId() && (
              <>
                <ModalActivityForm
                  tripId={tripId}
                  activity={activity}
                  isEditMode
                  isArchived={isArchived}
                  modalIconType="EDIT"
                  tripStartDate={activity.trip.startDate}
                  tripEndDate={activity.trip.endDate}
                />
                <ModalWrapper
                  iconType="DELETE"
                  title="Supprimer le voyage"
                  isEditMode={false}
                  onConfirm={onDelete}
                  onConfirmColor="delete"
                  onConfirmLoading={isLoadingDeleteActivity}
                  onSuccess={isSuccessDeleteActivity}
                  onConfirmError={error}
                >
                  Voulez-vous vraiment supprimer "{activity.title}" ?
                </ModalWrapper>
              </>
          )}
        </div>
      </div>
    </article>
  );
};

Card.propTypes = {
  trip: PropTypes.shape({
    description: PropTypes.string,
    endDate: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.string,
    location: PropTypes.string,
    startDate: PropTypes.string,
    title: PropTypes.string,
  }),
  activity: PropTypes.shape({
    category: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
    }),
    creator: PropTypes.shape({
      avatar: PropTypes.string,
      email: PropTypes.string,
      firstname: PropTypes.string,
      id: PropTypes.number,
      lastname: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.string),
    }),
    description: PropTypes.string,
    endDate: PropTypes.string,
    id: PropTypes.number,
    startDate: PropTypes.string,
    title: PropTypes.string,
    trip: PropTypes.shape({
      description: PropTypes.string,
      endDate: PropTypes.string,
      id: PropTypes.number,
      image: PropTypes.string,
      location: PropTypes.string,
      startDate: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
  tripId: PropTypes.number,
  isArchived: PropTypes.bool,
  mode: PropTypes.string.isRequired,
};

Card.defaultProps = {
  trip: null,
  activity: null,
  isArchived: false,
  tripId: null,
};

export default Card;

export const CardSeeMore = ({ tripId }) => (
  <article className="card">
    <header style={{ backgroundImage: `url(${PlaceholderImage})` }} className="card-header" />
    <div className="card-body">
      <div className="body-content">
        <Link to={`/voyage/${tripId}/activites`}>
          <h2 style={{ textAlign: 'center' }}>Voir plus</h2>
        </Link>
      </div>
    </div>
  </article>
);

CardSeeMore.propTypes = {
  tripId: PropTypes.number.isRequired,
};
