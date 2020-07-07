import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'react-feather';

import './tripCard.scss';

const RecipeSmall = ({
  id,
  title,
  startDate,
  endDate,
  image,
  location,
}) => (
  <Link
    to={`/trip/${id}`}
  >
    <article className="trip-card">
      <header
        style={{ backgroundImage: `url(${image})` }}
        className="trip-card-header"
      />
      {/* <img src={image} alt="Voyage" className="trip-card-header"/> */}
      <div className="trip-card-body">
        <h4>{title}</h4>
        <div className="body-content">
          <div className="date">
            <Calendar />
            <p>
              Du {startDate} <br />
              au { endDate}
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

RecipeSmall.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default RecipeSmall;
