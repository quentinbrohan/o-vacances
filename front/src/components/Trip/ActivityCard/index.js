import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-feather';
import moment from 'moment';
import 'moment/locale/fr';

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
        style={{ backgroundImage: `url(${category.image})` }}
        className="activity-card-header"
      />
      <div className="activity-card-body">
        <h4>{title}</h4>
        <div className="body-content">
          <div className="date">
            <Calendar />
            <p>
              Du {moment(startDate).format('ll')} <br />
              au {moment(endDate).format('ll')}
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
  image: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  category: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
    })
  )
};

export default ActivityCard;
