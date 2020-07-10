/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar, MapPin } from 'react-feather';
// React Dates
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'; import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.scss';
import moment from 'moment';

import tripData from 'src/data/tripData';
import ActivityCard from './ActivityCard';
import PlusCard from './PlusCard';
import Suggestion from './Suggestion';
import './trip.scss';

const Trip = () => {
  const [focusedInput, setFocusedInput] = useState('startDate');
  const DATE_FORMAT_MOMENT = 'DD-MM-YYYY';
  // Trip's dates
  const [datesTrip, setDatesTrip] = useState({
    startDate: tripData.startDate,
    endDate: tripData.endDate,
  });
  // Participant's dates (default = user)
  const [datesParticipant, setDatesParticipant] = useState({
    startDate: '01-01-2025',
    endDate: '27-12-2025',
  });
  console.log(datesParticipant);
  console.log(focusedInput);

  return (
    <main className="trip-details">
      <img
        className="trip-photo"
        alt={tripData.title}
        src={tripData.image}
      />
      <div className="trip-info">
        <div className="left">
          <div className="trip-info-header">
            <h1>{tripData.title}</h1>
            <div className="date">
              <Calendar />
              <p>
                Du {tripData.startDate} au {tripData.endDate}.
              </p>
            </div>
            <div className="location">
              <MapPin />
              <p>
                {tripData.location}
              </p>
            </div>
          </div>

          <div className="trip-info-description">
            <p className="description">
              {tripData.description}
            </p>
          </div>
        </div>

        <div className="right">
          <div className="trip-info-aside">
            <div className="participants">
              <p className="text">{`${tripData.participants.length} participants`}</p>
              <div className="avatars">
                {tripData.participants.map((participant) => (
                  <img
                    key={participant.firstName}
                    src={participant.avatar}
                    alt={participant.firstName}
                    className="avatar"
                  />
                ))}
              </div>
            </div>

            <div className="disponibilities">
              {/* Liste ? Intégration calendrier avec selector */}
              <label htmlFor="disponibilities">Calendrier des disponibilités</label>
              <select name="disponibilities" id="disponibilities">
                <option disabled defaultValue>Participants</option>
                {tripData.participants.map((participant) => (
                  <option
                    value={participant.firstName}
                    key={participant.firstName}
                    onChange={(participant) => {
                      setDatesParticipant({
                        start: participant.disponibilities.startDate,
                        end: participant.disponibilities.endDate,
                      });
                    }}
                  >
                    {participant.firstName}
                  </option>
                ))}
              </select>
              {/* if logged user => able to edit own disponibilities */}
              <DateRangePicker
                startDate={moment('01-01-2025', 'DD-MM-YYYY', true)}
                endDate={moment('01-09-2025', 'DD-MM-YYYY', true)}
                startDateId="start"
                endDateId="end"
                firstDayOfWeek={1}
                anchorDirection="right"
                // withPortal
                // withFullScreenPortal
                regular
                onDatesChange={({ startDate, endDate }) => {
                  if (startDate && endDate) {
                    setDatesParticipant({
                      startDate: startDate.format(DATE_FORMAT_MOMENT),
                      endDate: endDate.format(DATE_FORMAT_MOMENT),
                    });
                  }
                }}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
              />
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
                  http://o-vacances.fr/voyage/:id
                </a>
              </div>
            </div>
            {/* OnClick copy Link to Clipboard ? */}
          </div>

        </div>

      </div>
      <section className="activities">
        <h2>Mes activités {''}

          <span>({tripData.activities.length})</span>
        </h2>
        <div className="trip-activities">
          {tripData.activities.slice(0, 5).map((activity) => (
            <ActivityCard {...activity} key={activity.id} />
          ))}
          {(tripData.activities.length > 5)
          && (<PlusCard id={tripData.id} />)}
        </div>
      </section>

      <section className="suggestions">
        <h2>Suggestions</h2>
        <div className="trip-suggestions">
          {/* Suggestion component (h2 + card) */}
          {tripData.suggestions.map((suggestion) => (
            <Suggestion {...suggestion} key={suggestion.id} />
          ))}
        </div>
      </section>

    </main>
  );
};

export default Trip;
