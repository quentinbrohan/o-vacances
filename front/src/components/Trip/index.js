/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, MapPin } from 'react-feather';

import tripData from 'src/data/tripData';
import ActivityCard from './ActivityCard';
import PlusCard from './PlusCard';
import './trip.scss';

const Trip = () => {
  console.log(tripData);

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
                    key={participant.firstname}
                    src={participant.avatar}
                    alt={participant.firstname}
                    className="avatar"
                  />
                ))}
              </div>
            </div>

            <div className="disponibilities">
              [Liste ? Intégration calendrier avec selector]
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
                  http://o-vacances.fr/trip/:id
                </a>
              </div>
            </div>
            {/* OnClick copy Link to Clipboard ? */}
          </div>

        </div>

      </div>
      <section>
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
      <h2>Suggestions</h2>
      <div className="trip-suggestions" />
      {/* Suggestion component (h2 + card) */}

    </main>
  );
};

export default Trip;
