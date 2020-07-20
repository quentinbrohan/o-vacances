import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/fr';

import './suggestion.scss';

const Suggestion = ({
  user,
  // avatar,
  date,
  description,
  title,
}) => (
  <div className="suggestion">
    <header
      className="suggestion-header"
    >
      {/* <img
        src={avatar}
        alt="Avatar"
        className="suggestion-avatar"
      /> */}
      <div className="suggestion-header-info">
        <p className="suggestion-title">
          {title}
        </p>
        <p className="suggestion-author">
          {user.firstname}
          <span className="suggestion-date">
            {moment(date).format('lll')}
          </span>
        </p>

      </div>
    </header>
    <div className="suggestion-body">
      <p className="suggestion-description">
        {description}
      </p>
    </div>
  </div>
);

Suggestion.propTypes = {
  // avatar: PropTypes.string.isRequired,
  user: PropTypes.objectOf(
    PropTypes.shape({
      firstname: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  firstname: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Suggestion;
