import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './plusCard.scss';

const PlusCard = ({
  id,
}) => (
  <Link
    to={`/trip/${id}/activities`}
  >
    <article className="activity-card activity-card-plus">
      <header
        className="activity-card-header"
      />
      <div className="activity-card-body">
        <h2>Voir toutes les activités</h2>
      </div>
    </article>
  </Link>
);

PlusCard.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PlusCard;
