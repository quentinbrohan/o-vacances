import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'react-feather';
import moment from 'moment';
import 'moment/locale/fr';

import './tripCard.scss';

const TripCard = ({
  id,
  title,
  startDate,
  endDate,
  image,
  location,
}) => (
  <Link
    to={`/voyage/${id}`}
  >
    <article className="trip-card">
      <header
        style={{ backgroundImage: `url(${image})` }}
        className="trip-card-header"
      />
      <div className="trip-card-body">
        <h4>{title}</h4>
        <div className="body-content">
          <div className="date">
            <Calendar />
            <p>
              Du {moment(startDate).format('ll')} <br />
              au {moment(endDate).format('ll')}
            </p>
          </div>
          <div className="location">
            <MapPin />
            <p>
              {location}
            </p>
          </div>
        </div>

      </div>
    </article>
  </Link>
);

TripCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

TripCard.defaultProps = {
  image: '',
};

export default TripCard;
