import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-feather';

import './activityCard.scss';

const ActivityCard = ({
  id,
  name,
  image,
  startDate,
  endDate,
}) => (
  <Link
    to={`/trip/${id}/activities`}
  >
    <article className="activity-card">
      <header
        style={{ backgroundImage: `url(${image})` }}
        className="activity-card-header"
      />
      <div className="activity-card-body">
        <h4>{name}</h4>
        <div className="body-content">
          <div className="date">
            <Calendar />
            <p>
              Du {startDate} <br />
              au { endDate}
            </p>
          </div>
        </div>

      </div>
    </article>
  </Link>
);

ActivityCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default ActivityCard;
