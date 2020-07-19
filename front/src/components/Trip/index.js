/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Calendar, MapPin } from 'react-feather';
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
}) => {
  const currentTrip = useParams().id;
  const tripId = Number(currentTrip);
  useEffect(() => {
    fetchTrip(tripId);
  }, []);

  const [isOwnUser, setisOwnUser] = useState(false);
  const [focus, setFocus] = useState(null);
  // Trip's dates
  const [datesTrip, setDatesTrip] = useState({
    startDate: trip.startDate,
    endDate: trip.endDate,
  });

  // Participant's dates (default = user)
  const [datesParticipant, setDatesParticipant] = useState({
    startDate: '01-01-2025',
    endDate: '27-12-2025',
  });

  const { startDate, endDate } = datesParticipant;

  // moment date format
  const DATE_FORMAT_MOMENT = 'YY-MM-DD';

  const manageDisponibilities = (currentDisponibilities) => {
    // JSON to object
    const disp = (JSON.parse(currentDisponibilities.value));
    setDatesParticipant({
      startDate: disp.startDate,
      endDate: disp.endDate,
    });
  };

  const handleSuggestion = () => {
    addSuggestion();
  };

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
                  Du {moment(trip.startDate).format('ll')} au {moment(trip.endDate).format('ll')}.
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
                <label htmlFor="disponibilities">Calendrier des disponibilités</label>
                <select
                  name="disponibilities"
                  id="disponibilities"
                  onChange={() => manageDisponibilities(disponibilities)}
                >
                  <option disabled defaultValue>Participants</option>
                  {tripData.participants.map((participant) => (
                    <option
                    // Pass Object as JSON for value
                      value={JSON.stringify(participant.disponibilities)}
                      key={participant.firstName}
                    >
                      {participant.firstName}
                    </option>
                  ))}
                </select>
                {/* if logged user => able to edit own disponibilities */}
                <DateRangePicker
                // minDate={moment(datesTrip.startDate)}
                // maxDate={moment(datesTrip.endDate)}
                // TODO: DATE format YYYY-MM-DD in database !
                  startDate={moment(startDate, 'DD-MM-YYYY', true)}
                  endDate={moment(endDate, 'DD-MM-YYYY', true)}
                  startDateId="start"
                  endDateId="end"

                // disabled={!isCreator}
                  startDatePlaceholderText="Début disponibilité"
                  endDatePlaceholderText="Fin disponibilité"
                // disabled={!isOwnUser}
                // TODO: disable dates outside start/end Trip.
                // isOutsideRange={(date) => date.isBefore(datesTrip.startDate, 'day') || date.isAfter(datesTrip.endDate, 'day')}
                // isOutsideRange={(date) => !date.isBetween(datesTrip.startDate, datesTrip.endDate, 'day', true)}
                // withPortal
                  anchorDirection="right"
                  firstDayOfWeek={1}
                  hideKeyboardShortcutsPanel
                  regular
                  onDatesChange={({ startDate, endDate }) => {
                    if (startDate && endDate) {
                      setDatesParticipant({
                        startDate: startDate.format(DATE_FORMAT_MOMENT),
                        endDate: endDate.format(DATE_FORMAT_MOMENT),
                      });
                    }
                  }}
                  focusedInput={focus}
                  onFocusChange={(focus) => setFocus(focus)}
                />
                {/* If Calendar === user show button => axios post new dates */}
                {isOwnUser && (
                <Button
                  color="secondary"
                  size="smg"
                  type="submit"
                  onClick={() => manageDisponibilities()}
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
                    value="Excalibur"
                    disabled
                  />
                </div>
                <div className="trip-link">
                  <p>Lien du voyage:</p>
                  <a
                    href="#"
                    className="link"
                  >
                    http://o-vacances.fr/voyage/{trip.id}
                  </a>
                </div>
              </div>
              {/* OnClick copy Link to Clipboard ? */}
              {/* If isCreator => Link to TripEdit !! Need currentTripID */}
              {isCreator && (
              <Button
                color="secondary"
                size="smg"
                type="submit"
              >
                <Link to="/modifier-un-voyage">Modifier mon voyage</Link>
              </Button>
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
          <h2>Suggestions</h2>
          <div className="trip-suggestions">
            {(trip.suggestion.length > 1) && (
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
};

export default Trip;
