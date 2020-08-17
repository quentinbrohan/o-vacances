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
// React Date Range
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './dateRange_overrides.scss'; // Overrides default theme
import { DateRange } from 'react-date-range';
import { fr } from 'date-fns/locale';
import {
  // dateToString,
  toDate,
  // toString,
  // ISOToString,
  // formatDate,
} from 'src/utils/format';
// import { parseISO } from 'date-fns';
import { Helmet } from 'react-helmet';

import { Link, useParams } from 'react-router-dom';
import Loading from 'src/components/Loading';
import Modal from 'react-modal';

import { API_URL } from 'src/helpers';

// import tripData from 'src/data/tripData';
import TripAuth from 'src/containers/Trip/TripAuth';
import SuggestionForm from 'src/containers/Trip/SuggestionForm';
import ActivityForm from 'src/containers/ActivityForm';
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
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '560px',
    zIndex: 4,
  },
};

// Bind modal to App element
Modal.setAppElement('#root');

const Trip = ({
  trip,
  isLoading,
  isCreator,
  tripPassword,
  isOwnUser,
  userDisponibilities,
  reviseUserDisponibilities,
  addUserDisponibilities,
  handleTripDelete,
  checkTripAuth,
  haveTripAccess,
  handleSuggestionDelete,
}) => {
  const currentTrip = useParams().id;
  const tripId = Number(currentTrip);
  const [haveDisponibilities, setHaveDisponibilities] = useState(false);

  useEffect(() => {
    checkTripAuth(tripId);
  }, []);

  // Modal Help
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

  // Modal Disponibilities
  const [modalDispIsOpen, setDispIsOpen] = useState(false);
  function openDispModal() {
    setDispIsOpen(true);
  }
  function afterOpenDispModal() {
    // references are now sync'd and can be accessed.
  }

  function closeDispModal() {
    setDispIsOpen(false);
  }

  // User disponibilities
  // React Date Range
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  useEffect(() => {
    if (userDisponibilities) {
      setState([
        {
          startDate: new Date(userDisponibilities.startDate),
          endDate: new Date(userDisponibilities.endDate),
          key: 'selection',
        },
      ]);
      setHaveDisponibilities(true);
    }
  }, [userDisponibilities]);

  const handleDisponibilities = () => {
    reviseUserDisponibilities(state);
  };

  const createDisponibilities = () => {
    addUserDisponibilities(state);
  };

  // const handleSuggestion = () => {
  //   addSuggestion();
  // };

  const manageTripDelete = () => {
    handleTripDelete();
  };

  const manageSuggestionDelete = (suggestionId) => {
    handleSuggestionDelete(suggestionId);
  };

  return (
    <main className="trip-details">
      {(!isLoading && !haveTripAccess) && <TripAuth tripId={tripId} />}
      {isLoading && <Loading />}
      {(!isLoading && trip.length !== 0) && (
      <>
        <Helmet>
          <title>{trip.title}</title>
          <meta name="description" content="Un de mes voyages" />
        </Helmet>
        <img
          className="trip-photo"
          alt={trip.title}
          src={`${API_URL + trip.image}`}
        />
        <section className="trip-info">
          <div className="left">
            <div className="trip-info-header">
              <h1>{trip.title}</h1>
              <div className="date">
                <Calendar />
                <p>
                  Du {toDate(trip.startDate)} au {toDate(trip.endDate)}
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
                <p className="text">{trip.users.length > 1 ? `${trip.users.length} participants` : '1 participant'}</p>
                <div className="avatars">
                  {trip.users.map((user) => (
                    <img
                      key={user.firstname}
                      src={user.avatar ? API_URL + user.avatar : null}
                      alt={user.firstname}
                      className="avatar"
                    />
                  ))}
                </div>
              </div>

              <div className="disponibilities">
                <p htmlFor="disponibilities">Calendrier des disponibilités</p>
                <select
                  name="disponibilities"
                  id="disponibilities"
                >
                  <option disabled>Participants</option>
                  {(!isLoading && trip.disponibility.length >= 1) && (
                    trip.disponibility.map((participant) => (
                      <option
                        key={participant.id}
                        disabled={isOwnUser}
                        defaultValue={isOwnUser}
                      >
                        {participant.users[0].firstname}: {''}
                        {toDate(participant.startDate)} 🠒 {toDate(participant.endDate)}
                      </option>
                    ))

                  )}
                </select>
                {/* if logged user => able to edit own disponibilities */}
                <Button color="secondary" size="sm" onClick={openDispModal}>
                  Mes disponibilités
                </Button>
                <Modal
                  isOpen={modalDispIsOpen}
                  onAfterOpen={afterOpenDispModal}
                  onRequestClose={closeDispModal}
                  style={customStyles}
                  contentLabel="Disponibilités"
                >
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={closeDispModal}
                    haveClassName="disponibilites-modal-button"
                  >
                    <XCircle />
                  </Button>
                  <DateRange
                    locale={fr}
                    editableDateInputs
                    onChange={(item) => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    direction="vertical"
                    minDate={new Date(trip.startDate)}
                    maxDate={new Date(trip.endDate)}
                    showMonthArrow
                    dateDisplayFormat="dd MMM yyyy"
                    startDatePlaceholder="Début disponibilités"
                    endDatePlaceholder="Fin disponibilités"
                  />
                  {/* CTA Add/Edit user disponiblities */}
                  {(!isLoading && haveDisponibilities) && (
                  <Button
                    color="secondary"
                    size="sm"
                    type="submit"
                    onClick={handleDisponibilities}
                  >
                    Modifier mes disponibilités
                  </Button>
                  )}
                  {!haveDisponibilities && (
                  <Button
                    color="primary"
                    size="sm"
                    type="submit"
                    onClick={createDisponibilities}
                  >
                    Ajouter mes disponibilités
                  </Button>
                  )}
                </Modal>
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
                  <Link
                    href={`localhost:8080/voyage/${trip.id}`}
                    className="link"
                  >
                    {/* Shall be prod url */}
                    http://o-vacances.fr/voyage/{trip.id}
                  </Link>
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
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={closeModal}
                    haveClassName="help-modal-button"
                  >
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
              <ActivityForm
                color="primary"
                size="sm"
              >
                Ajouter une activité
              </ActivityForm>              {/* OnClick copy Link to Clipboard ? */}
              {isCreator && (
                <>
                  <Button
                    color="secondary"
                    size="sm"
                    type="submit"
                    className="trip-button"
                  >
                    <Link to={`/modifier-un-voyage/${tripId}`}>Modifier</Link>
                  </Button>
                  <Button
                    color="secondary"
                    size="sm"
                    type="submit"
                    className="trip-button"
                    onClick={() => manageTripDelete()}
                  > <a href="#">Supprimer</a>
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
            {(trip.suggestion.length >= 1 && !isLoading) && (
              trip.suggestion.map((sugg) => (
                <Suggestion
                  {...sugg}
                  key={sugg.id}
                  handleSuggestionDelete={manageSuggestionDelete}
                />
              ))
            )}
          </div>
          <SuggestionForm />
        </section>
      </>
      )}
    </main>
  );
};

Trip.propTypes = {
  checkTripAuth: PropTypes.func.isRequired,
  trip: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isCreator: PropTypes.bool.isRequired,
  tripPassword: PropTypes.string.isRequired,
  isOwnUser: PropTypes.bool.isRequired,
  userDisponibilities: PropTypes.array,
  reviseUserDisponibilities: PropTypes.func.isRequired,
  addUserDisponibilities: PropTypes.func.isRequired,
  handleTripDelete: PropTypes.func.isRequired,
  haveTripAccess: PropTypes.bool.isRequired,
  handleSuggestionDelete: PropTypes.func.isRequired,
};

Trip.defaultProps = {
  userDisponibilities: [],
};

export default Trip;
