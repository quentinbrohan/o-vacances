import { isSameYear, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Calendar, Lock, MapPin, Settings, Share } from 'react-feather';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { success as toastSuccess } from 'react-toastify-redux';
import ReactTooltip from 'react-tooltip';
import { ReactComponent as AvatarDefault } from 'src/assets/svg/user.svg';
import Card, { CardSeeMore } from 'src/components/Card';
import Button from 'src/components/elements/Button';
import Loading from 'src/components/Loading';
import ModalWrapper from 'src/components/ModalWrapper';
import { API_URL } from 'src/constants';
import { history } from 'src/index';
import ModalActivityForm from 'src/pages/trip/Trip/ModalActivityForm';
import ModalSuggestionForm from 'src/pages/trip/Trip/ModalSuggestionForm';
import {
  useDeleteTripMutation,
  useGetActivitiesByTripIdQuery,
  useGetSuggestionsByTripIdQuery,
  useGetTripByIdQuery,
} from 'src/services/trip';
import { parseDisplay, parseDisplaySameYear, sortByAscStartDateActivities } from 'src/utils/dates';
import { isTripArchived } from 'src/utils/trip';
import ModalHelp from './ModalHelp';
import ModalUserDisponibilities from './ModalUserDisponibilities';
import Suggestion from './Suggestion';
import './trip.scss';
import TripAuth from './TripAuth';

const Trip = () => {
  const currentTrip = useParams().id;
  const tripId = Number(currentTrip);

  const { data: trip, isLoading, isFetching, error, refetch } = useGetTripByIdQuery(tripId);

  const isArchived = isTripArchived(trip?.startDate, trip?.endDate);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { hasTripAccess } = useSelector((state) => state.trip);

  useEffect(() => {
    if (!trip && hasTripAccess) {
      refetch();
    }
  }, [hasTripAccess]);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error?.status === 401 && !hasTripAccess) {
    return <TripAuth isAuthenticated={isAuthenticated} tripId={tripId} />;
  }

  if (trip) {
    return (
      <main className="trip-details">
        <Helmet>
          <title>{trip.title}</title>
          <meta name="description" content="Un de mes voyages" />
        </Helmet>
        <TripInfo trip={trip} isArchived={isArchived} isLoading={isLoading} />
        <ActivitiesSection
          activities={trip.activities}
          tripId={trip.id}
          tripStartDate={trip.startDate}
          tripEndDate={trip.endDate}
          isArchived={isArchived}
        />
        <SuggestionsSection
          tripId={trip.id}
          suggestions={trip.suggestion}
          isArchived={isArchived}
        />
      </main>
    );
  }

  return <div>Erreur dans la requête.</div>;
};

export default Trip;

const TripInfo = ({ trip, isArchived, isLoading }) => {
  const dispatch = useDispatch();

  const { isCreator, isOwnUser } = useSelector((state) => state.trip);

  const initialCopiedState = {
    password: false,
    link: false,
  };
  const [copied, setCopied] = useState(initialCopiedState);

  const [
    deleteTrip,
    { isLoading: isLoadingDeleteTrip, isSuccess: isSuccessDeleteTrip },
  ] = useDeleteTripMutation();
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCopied(initialCopiedState);
    }, 3000);
    return () => clearInterval(timer);
  }, [copied]);

  const onDelete = () => {
    deleteTrip({ tripId: trip.id })
      .then((response) => {
        if (response.data) {
          dispatch(toastSuccess('Voyage supprimé.'));
          history.push('/');
        }
        if (response.error) {
          // TODO: throw Error instead of response
          setError(response.error.data.message);
        }
      })
      .catch((err) => {
        if (err) {
          setError(err.message);
        }
      });
  };

  return (
    <>
      <img className="trip-photo" alt={trip.title} src={trip.image} />
      <section className="trip-info">
        <div className="left">
          <div className="trip-info-header">
            <h1>{trip.title}</h1>
            <div className="location">
              <MapPin />
              <p>{trip.location}</p>
            </div>
            <div className="date">
              <Calendar />
              <p>
                Du{' '}
                {isSameYear(parseISO(trip.startDate), parseISO(trip.endDate))
                  ? parseDisplaySameYear(trip.startDate)
                  : parseDisplay(trip.startDate)}{' '}
                au {parseDisplay(trip.endDate)}
              </p>
            </div>
            <div className="creator">
              <p>Créé par {`${trip.creator.firstname} ${trip.creator.lastname}`} </p>
            </div>
          </div>

          <div className="trip-info-description">
            <p className="description">{trip.description}</p>
          </div>
        </div>
        <div className="right">
          <div className="trip-info-aside">
            <div className="participants">
              <p className="text">
                {trip.users.length > 1 ? `${trip.users.length} participants` : '1 participant'}
              </p>
              <div className="avatars">
                {trip.users
                  .slice(0, 10)
                  .map((user) =>
                    user.avatar !== null ? (
                      <img
                        key={user.firstname}
                        src={API_URL + user.avatar}
                        alt={user.firstname}
                        className="avatar"
                      />
                    ) : (
                      <AvatarDefault className="avatar" />
                    ),
                  )}
              </div>
            </div>
            <div className="disponibilities">
              <p htmlFor="disponibilities">Calendrier des disponibilités</p>
              <select name="disponibilities" id="disponibilities">
                <option value="participants" selected hidden>
                  Disponibilités des participants
                </option>
                {!isLoading &&
                  trip.disponibility.length > 0 &&
                  trip.disponibility.map((participantDisponibilities) => (
                    <option
                      key={participantDisponibilities.id}
                      disabled={isOwnUser}
                      defaultValue="Disponibilités des participants"
                      value={participantDisponibilities.id}
                    >
                      {participantDisponibilities.users[0].firstname}: {''}
                      {parseDisplay(participantDisponibilities.startDate)} 🠒{' '}
                      {parseDisplay(participantDisponibilities.endDate)}
                    </option>
                  ))}
              </select>
              <ModalUserDisponibilities
                tripId={trip.id}
                tripStartDate={trip.startDate}
                tripEndDate={trip.endDate}
                disponibilities={trip.disponibilities}
                isArchived={isArchived}
              />
            </div>
            <div className="trip-access">
              <div className="trip-password">
                <CopyToClipboard
                  text={trip.password}
                  onCopy={() => setCopied({ ...copied, password: true })}
                >
                  <Lock data-tip data-for="passwordTip" style={{ cursor: 'pointer' }} />
                </CopyToClipboard>
                <ReactTooltip id="passwordTip" place="top" effect="float">
                  {copied.password ? '✅ Mot de passe copié' : 'Copier le mot de passe'}
                </ReactTooltip>
                <input
                  type="text"
                  name="trip-password"
                  id="trip-password"
                  value={trip.password}
                  disabled
                />
              </div>
              <div className="trip-link">
                <CopyToClipboard
                  text={`${location.hostname}/voyage/${trip.id}`}
                  onCopy={() => setCopied({ ...copied, link: true })}
                >
                  <Share data-tip data-for="linkTip" style={{ cursor: 'pointer' }} />
                </CopyToClipboard>
                <ReactTooltip id="linkTip" place="top" effect="float">
                  {copied.link ? '✅ Lien copié' : 'Copier le lien'}
                </ReactTooltip>
                <Link href={`/voyage/${trip.id}`} className="link">
                  {`${location.hostname}/voyage/${trip.id}`}
                </Link>
              </div>
            </div>
            <div className="trip-buttons">
              {!isArchived && isCreator && (
                <>
                  <Button color="secondary" type="submit" className="trip-button inline">
                    <Link to={`/modifier-un-voyage/${trip.id}`}>
                      {' '}
                      <Settings />
                    </Link>
                  </Button>
                  <ModalWrapper
                    iconType="DELETE"
                    isEditMode={false}
                    title="Supprimer le voyage"
                    onConfirm={onDelete}
                    onConfirmColor="delete"
                    onConfirmLoading={isLoadingDeleteTrip}
                    onSuccess={isSuccessDeleteTrip}
                    onConfirmError={error}
                  >
                    Voulez-vous vraiment supprimer ce voyage?
                  </ModalWrapper>
                </>
              )}
              <ModalHelp />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

TripInfo.propTypes = {
  trip: PropTypes.object.isRequired,
  isArchived: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const ActivitiesSection = ({ activities, tripId, isArchived, tripStartDate, tripEndDate }) => {
  const {
    data,
    isLoading: isLoadingActivities,
    isFetching: isFetchingActivities,
  } = useGetActivitiesByTripIdQuery(tripId);

  const sortedDescendingStartDateActivities = sortByAscStartDateActivities(data || activities);

  return (
    <section className="activities">
      <div className="activity-header">
        <h2>Mes activités</h2>
        {!isArchived && (
          <ModalActivityForm
            tripId={tripId}
            tripStartDate={tripStartDate}
            tripEndDate={tripEndDate}
            isArchived={isArchived}
            modalIconType="ADD"
          />
        )}
      </div>
      {sortedDescendingStartDateActivities.length > 0 && (
        <div className="cards-container">
          {(isLoadingActivities || isFetchingActivities) && <Loading small />}

          {sortedDescendingStartDateActivities &&
            sortedDescendingStartDateActivities
              .slice(0, 5)
              .map((activity) => (
                <Card activity={activity} key={activity.id} tripId={tripId} mode="LINK" />
              ))}
          {sortedDescendingStartDateActivities.length > 5 && <CardSeeMore tripId={tripId} />}
        </div>
      )}
      {sortedDescendingStartDateActivities.length === 0 && <div>Pas d'activités.</div>}
    </section>
  );
};

// TODO: trip, activities, suggestion ProTypes
ActivitiesSection.propTypes = {
  activities: PropTypes.object.isRequired,
  tripId: PropTypes.number.isRequired,
  isArchived: PropTypes.bool.isRequired,
  tripStartDate: PropTypes.object.isRequired,
  tripEndDate: PropTypes.object.isRequired,
};

const SuggestionsSection = ({ tripId, suggestions, isArchived }) => {
  const {
    data,
    isLoading: isLoadingSuggestions,
    isFetching: isFetchingSuggestions,
  } = useGetSuggestionsByTripIdQuery(tripId);

  const sortedDescendingSuggestions = data?.slice().reverse() || suggestions.slice().reverse();
  // TODO: pagination ?

  return (
    <section className="suggestions">
      <div className="suggestions-header">
        <h2>Suggestions</h2>
        {!isArchived && (
          <ModalSuggestionForm tripId={tripId} isArchived={isArchived} modalIconType="ADD" />
        )}
      </div>
      <div className="trip-suggestions">
        {(isLoadingSuggestions || isFetchingSuggestions) && <Loading small />}
        {sortedDescendingSuggestions &&
          sortedDescendingSuggestions.map((suggestion) => (
            <Suggestion
              tripId={tripId}
              suggestion={suggestion}
              key={suggestion.id}
              isArchived={isArchived}
            />
          ))}
        {suggestions.length === 0 && <div>Pas de suggestions.</div>}
      </div>
    </section>
  );
};

SuggestionsSection.propTypes = {
  suggestions: PropTypes.object.isRequired,
  tripId: PropTypes.number.isRequired,
  isArchived: PropTypes.bool.isRequired,
};
