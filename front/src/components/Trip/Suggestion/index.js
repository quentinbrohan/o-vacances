import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/fr';

// import Button from 'src/components/elements/Button';
// import { Edit } from 'react-feather';

import './suggestion.scss';

const Suggestion = ({
  user,
  date,
  description,
  title,
}) => (
  <div className="suggestion">
    <header
      className="suggestion-header"
    >
      <img
        src={user.avatar}
        alt="Avatar"
        className="suggestion-avatar"
      />
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
      {/* <Button color="secondary" size="sm" haveClassName="suggestion-button--edit">
          <Edit onClick={() => manageEdit()} />
        </Button> */}
    </div>
  </div>
);

Suggestion.propTypes = {
  user: PropTypes.objectOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  firstname: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Suggestion;
