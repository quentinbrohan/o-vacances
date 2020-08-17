import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-feather';
import { toDate } from 'src/utils/format';

import { API_URL } from 'src/helpers';
import './activityCard.scss';

const ActivityCard = ({
  id,
  title,
  startDate,
  endDate,
  category,
}) => (
  <Link
    to={`/voyage/${id}/activites#activite-${id}`}
  >
    <article className="activity-card">
      <header
        style={{ backgroundImage: `url(${API_URL + category.image})` }}
        className="activity-card-header"
      />
      <div className="activity-card-body">
        <h4>{title}</h4>
        <div className="body-content">
          <div className="date">
            <Calendar />
            <p>
              Du {toDate(startDate)} <br />
              au {toDate(endDate)}
            </p>
          </div>
        </div>

      </div>
    </article>
  </Link>
);

ActivityCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  category: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ActivityCard;
