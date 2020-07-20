/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Calendar, MapPin, HelpCircle } from 'react-feather';
import Button from 'src/components/elements/Button';
// React Dates
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.scss';
import moment from 'moment';
import 'moment/locale/fr';
import { Link, useParams } from 'react-router-dom';
import Loading from 'src/components/Loading';

import tripData from 'src/data/tripData';
import SuggestionForm from 'src/containers/Trip/SuggestionForm';
import ActivityCard from './ActivityCard';
import PlusCard from './PlusCard';
import Suggestion from './Suggestion';
import './trip.scss';

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
}) => {
  const currentTrip = useParams().id;
  const tripId = Number(currentTrip);
  useEffect(() => {
    fetchTrip(tripId);
  }, []);

  const [focus, setFocus] = useState(null);

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

  // Merge trip.disponibility + trip.users for <select> options
  // if (trip.length !== 0) {
  //   const { disponibility, users } = trip;
  //   console.log(users);

  //   const usersDisponibilities = disponibility.map((disp) => ({
  //     ...disp,
  //     ...users.find(({ id }) => id === disp.id),
  //   }));
  //   return usersDisponibilities;
  // }

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
                // isOutsideRange={(date) => date.isBefore(dates.startDate, 'day') || date.isAfter(dates.endDate, 'day')}
                // isOutsideRange={(date) => !date.isBetween(dates.startDate, dates.endDate, 'day', true)}
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
                  size="smg"
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
                <details>
                  <summary>
                    <HelpCircle />
                  </summary>
                  {/* Modal instead of <details> ? */}
                  Le mot de passe donne accès au voyage, il est nécessaire lors de la première
                  connexion pour s'authentifier au voyage uniquement. Il est modifiable
                  par le créateur du voyage uniquement.
                  <hr />
                  Le bouton "Modifier mes disponibilités" apparaît uniquement pour l'utilisateur
                  connecté quand celui-ci est selectionné dans la liste. Il suffit de changer ses
                  disponibilités dans le calendrier et cliquer sur "Modifier mes disponibilités" !
                </details>
              </div>
              {/* OnClick copy Link to Clipboard ? */}
              {/* If isCreator => Link to TripEdit !! Need currentTripID */}
              {isCreator && (
                <>
                  <Button
                    color="secondary"
                    size="smg"
                    type="submit"
                  >
                    <Link to="/modifier-un-voyage">Modifier mon voyage</Link>
                  </Button>
                  <Button
                    color="secondary"
                    size="smg"
                    type="submit"
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
};

export default Trip;
