import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'react-feather';
import { toDate } from 'src/utils/format';

import { API_URL } from 'src/helpers';
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
        style={{ backgroundImage: `url(${API_URL + image})` }}
        className="trip-card-header"
      />
      <div className="trip-card-body">
        <h4>{title}</h4>
        <div className="body-content">
          <div className="date">
            <Calendar />
            <p>
              Du {toDate(startDate)} <br />
              au {toDate(endDate)}
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
