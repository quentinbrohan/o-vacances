import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './plusCard.scss';

const PlusCard = ({
  id,
}) => (
  <Link
    to={`/voyage/${id}/activites`}
  >
    <article className="activity-card activity-card-plus">
      <header
        className="activity-card-header"
      />
      <div className="activity-card-body">
        <h2>Voir plus</h2>
      </div>
    </article>
  </Link>
);

PlusCard.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PlusCard;
