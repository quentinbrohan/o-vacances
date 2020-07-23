/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Calendar, MapPin, HelpCircle, XCircle,
} from 'react-feather';
import Button from 'src/components/elements/Button';
// React Dates
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.scss';
import moment from 'moment';
import 'moment/locale/fr';
import { Link, useParams } from 'react-router-dom';
import Loading from 'src/components/Loading';
import Modal from 'react-modal';

import tripData from 'src/data/tripData';
import SuggestionForm from 'src/containers/Trip/SuggestionForm';
import ActivityCard from './ActivityCard';
import PlusCard from './PlusCard';
import Suggestion from './Suggestion';
import './trip.scss';

// Modal style
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '560px',
  },
};

// Bind modal to App element
Modal.setAppElement('#root');

const Trip = ({
  changeSuggestion,
  suggestionContent,
  fetchTrip,
  trip,
  isLoading,
  addSuggestion,
  isCreator,
  tripPassword,
  isOwnUser,
  userDisponibilities,
  changeUserDisponibilities,
  modifyUserDisponibilities,
  deleteTrip,
}) => {
  const currentTrip = useParams().id;
  const tripId = Number(currentTrip);
  useEffect(() => {
    fetchTrip(tripId);
  }, []);

  const [focus, setFocus] = useState(null);

  // Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Logged user disponibilities

  // moment date format
  const DATE_FORMAT_MOMENT = 'YYYY-MM-DD';

  const changeDisponibilities = () => {
    changeUserDisponibilities();
  };

  const reviseDisponibilities = () => {
    modifyUserDisponibilities();
  };

  const handleSuggestion = () => {
    addSuggestion();
  };

  const handleDelete = () => {
    deleteTrip();
  };

  // Merge trip.disponibility + trip.users for <select> options
  if (trip.length !== 0) {
    const { disponibility, users } = trip;
    console.log(disponibility);
    // console.log(users);

    const participantsDisponibilities = disponibility.map((disp) => ({
      ...disp,
      ...users.find(({ id }) => id === disp.id),
    }));
    console.log(participantsDisponibilities);
  }

  return (
    <main className="trip-details">

      {isLoading && <Loading />}
      {(!isLoading && trip.length !== 0) && (
      <>
        <img
          className="trip-photo"
          alt={trip.title}
          src={trip.image}
        />
        <section className="trip-info">
          <div className="left">
            <div className="trip-info-header">
              <h1>{trip.title}</h1>
              <div className="date">
                <Calendar />
                <p>
                  Du {moment(trip.startDate).format('ll')} au {moment(trip.endDate).format('ll')}
                </p>
              </div>
              <div className="location">
                <MapPin />
                <p>
                  {trip.location}
                </p>
              </div>
              <div className="creator">
                <p>Créé par {`${trip.creator.firstname} ${trip.creator.lastname}`} </p>
              </div>
            </div>

            <div className="trip-info-description">
              <p className="description">
                {trip.description}
              </p>
            </div>
          </div>

          <div className="right">
            <div className="trip-info-aside">
              <div className="participants">
                <p className="text">{`${trip.users.length} participants`}</p>
                <div className="avatars">
                  {trip.users.map((user) => (
                    <img
                      key={user.firstname}
                      src={user.avatar}
                      alt={user.firstname}
                      className="avatar"
                    />
                  ))}
                </div>
              </div>

              <div className="disponibilities">
                {/* Liste ? Intégration calendrier avec selector */}
                <p htmlFor="disponibilities">Calendrier des disponibilités</p>
                <select
                  name="disponibilities"
                  id="disponibilities"
                  // onChange={() => manageDisponibilities(disponibilities)}
                >
                  <option disabled>Participants</option>
                  {trip.disponibility.map((participant) => (
                    <option
                    // Pass Object as JSON for value
                      // value={JSON.stringify(participant.disponibilities)}
                      key={participant.id}
                      disabled={!isOwnUser}
                      defaultValue={!!isOwnUser}
                    >
                      {participant.id} - {moment(participant.startDate).format('L')} 🠒 {moment(participant.endDate).format('L')}
                    </option>
                  ))}
                </select>
                {/* if logged user => able to edit own disponibilities */}
                <DateRangePicker
                  minDate={moment(trip.startDate, 'YYYY-MM-DD')}
                  maxDate={moment(trip.endDate, 'YYYY-MM-DD')}
                // TODO: DATE format YYYY-MM-DD in database !
                  startDate={moment(trip.startDate, 'YYYY-MM-DD')}
                  endDate={moment(trip.endDate, 'YYYY-MM-DD')}
                  startDateId="start"
                  endDateId="end"

                  startDatePlaceholderText="Début disponibilité"
                  endDatePlaceholderText="Fin disponibilité"
                // TODO: disable dates outside start/end Trip.
                // isOutsideRange={(userDisponibilities) => (
                  // userDisponibilities.isBefore(userDisponibilities.startDate, 'day')
                  // || userDisponibilities.isAfter(userDisponibilities.endDate, 'day')
                  // )}
                // isOutsideRange={(userDisponibilities) => (
                  // !userDisponibilities.isBetween(
                    // userDisponibilities.startDate, userDisponibilities.endDate, 'day', true))}
                // withPortal
                  disabled={!isOwnUser}
                  anchorDirection="right"
                  firstDayOfWeek={1}
                  hideKeyboardShortcutsPanel
                  regular
                  onDatesChange={({ startDate, endDate }) => {
                    if (startDate && endDate) {
                      changeDisponibilities({
                        startDate: startDate.format(DATE_FORMAT_MOMENT),
                        endDate: endDate.format(DATE_FORMAT_MOMENT),
                      });
                    }
                  }}
                  focusedInput={focus}
                  onFocusChange={(focus) => setFocus(focus)}
                />
                {/* If Calendar === user ++ select === user: show button => axios post new dates */}
                {isOwnUser && (
                <Button
                  color="secondary"
                  size="sm"
                  type="submit"
                  onClick={() => reviseDisponibilities()}
                >
                  Modifier mes disponibilités
                </Button>
                )}
              </div>

              <div className="trip-access">
                <div className="trip-password">
                  <p>Mot de passe voyage:</p>
                  <input
                    type="text"
                    name="trip-password"
                    id="trip-password"
                    value={tripPassword}
                    disabled
                  />
                </div>
                <div className="trip-link">
                  <p>Lien du voyage:</p>
                  <a
                    href="http://o-vacances.fr/voyage/{trip.id}"
                    className="link"
                  >
                    http://o-vacances.fr/voyage/{trip.id}
                  </a>
                </div>
              </div>
              <div className="trip-help">
                <Button color="secondary" size="sm" onClick={openModal}>
                  <HelpCircle />
                </Button>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Aide voyage"
                >
                  <Button color="secondary" size="sm" onClick={closeModal}>
                    <XCircle />
                  </Button>
                  <h2>Besoin d'aide ?</h2>
                  <div>
                    Le mot de passe donne accès au voyage, il est nécessaire lors de la première
                    connexion pour s'authentifier au voyage uniquement, et n'est modifiable que
                    par le créateur du voyage.
                    <hr />
                    {/*
                    Le bouton "Modifier mes disponibilités" apparaît uniquement pour l'utilisateur
                    connecté quand celui-ci est selectionné dans la liste.
                    */}
                    Pour changer ses disponibilités en un clic, il suffit de changer ses
                    disponibilités dans le calendrier, ce dernier se ferme une fois avoir choisi
                    2 dates. Cliquer maintenant sur "Modifier mes disponibilités".
                    <hr />
                    La suppression d'un voyage ne peut se faire que par un utilisateur ayant le rôle
                    "créateur" (le créateur du voyage). Autrement, le voyage n'est pas
                    supprimé mais vous n'y aurez plus accès.
                    <hr />
                    Tout le monde peut proposer une activité ainsi qu'une suggestion.
                    <hr />
                    Des idées pour améliorer O'vacances ? Fais-nous en part grâce à notre <Link to="/contact">page contact</Link> !
                  </div>
                </Modal>
              </div>
              {/* OnClick copy Link to Clipboard ? */}
              {/* If isCreator => Link to TripEdit !! Need currentTripID */}
              {isCreator && (
                <>
                  <Button
                    color="secondary"
                    size="sm"
                    type="submit"
                  >
                    <Link to={`/modifier-un-voyage/${tripId}`}>Modifier mon voyage</Link>
                  </Button>
                  <Button
                    color="secondary"
                    size="sm"
                    type="submit"
                    onClick={() => handleDelete()}
                  >Supprimer mon voyage
                  </Button>
                </>
              )}
            </div>

          </div>

        </section>
        <section className="activities">
          <h2>Mes activités {''}

            <span>({trip.activities.length})</span>
          </h2>
          <div className="trip-activities">
            {trip.activities.slice(0, 5).map((activity) => (
              <ActivityCard {...activity} key={activity.id} />
            ))}
            {(trip.activities.length > 5)
          && (<PlusCard id={trip.id} />)}
          </div>
        </section>

        <section className="suggestions">
          <h2>Suggestions {''}
            <span>({trip.suggestion.length})</span>
          </h2>
          <div className="trip-suggestions">
            {(trip.suggestion.length >= 1) && (
              trip.suggestion.map((sugg) => (
                <Suggestion {...sugg} key={sugg.id} />
              ))
            )}
          </div>
          <SuggestionForm
            onChange={changeSuggestion}
            suggestionContent={suggestionContent}
            manageSuggestion={handleSuggestion}
          />
        </section>
      </>
      )}
    </main>
  );
};

Trip.propTypes = {
  changeSuggestion: PropTypes.func.isRequired,
  handleSuggestion: PropTypes.func.isRequired,
  manageSuggestion: PropTypes.func.isRequired,
  suggestionContent: PropTypes.string.isRequired,
  fetchTrip: PropTypes.func.isRequired,
  trip: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  addSuggestion: PropTypes.func.isRequired,
  isCreator: PropTypes.bool.isRequired,
  tripPassword: PropTypes.string.isRequired,
  isOwnUser: PropTypes.bool.isRequired,
  userDisponibilities: PropTypes.objectOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  changeUserDisponibilities: PropTypes.func.isRequired,
  modifyUserDisponibilities: PropTypes.func.isRequired,
  deleteTrip: PropTypes.func.isRequired,
};

export default Trip;
