import React from 'react';
import PropTypes from 'prop-types';

import './suggestion.scss';

const Suggestion = ({
  firstName,
  avatar,
  date,
  content,
}) => (
  <div className="suggestion">
    <header
      className="suggestion-header"
    >
      <img
        src={avatar}
        alt="Avatar"
        className="suggestion-avatar"
      />
      <div className="suggestion-header-info">
        <p className="suggestion-author">
          {firstName}
        </p>
        <p className="suggestion-date">
          {date}
        </p>

      </div>
    </header>
    <div className="suggestion-body">
      <p className="suggestion-content">
        {content}
      </p>
    </div>
  </div>
);

Suggestion.propTypes = {
  avatar: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Suggestion;
