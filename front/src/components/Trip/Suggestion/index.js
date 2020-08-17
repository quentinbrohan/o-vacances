import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';

import { toStringSuggestion } from 'src/utils/format';
import getCurrentUser from 'src/utils/getCurrentUser';

import {
  // Edit,
  XSquare,
} from 'react-feather';

// import Button from 'src/components/elements/Button';
// import { Edit } from 'react-feather';

import { API_URL } from 'src/helpers';
import './suggestion.scss';

const Suggestion = ({
  id,
  user,
  createdAt,
  description,
  title,
  handleSuggestionDelete,
}) => {
  const currentUser = getCurrentUser();

  // const manageEdit = (suggestionId) => {
  //   handleSuggestionEdit(suggestionId);
  // };

  const manageDelete = (suggestionId) => {
    handleSuggestionDelete(suggestionId);
  };

  return (
    <div className="suggestion">
      <header
        className="suggestion-header"
      >
        <img
          src={API_URL + user.avatar}
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
              {toStringSuggestion(createdAt)}
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
      {user.id === currentUser && (
      <div className="suggestion-cta">
        {/* <Button
          color="secondary"
          className="cta-edit"
          onClick={() => manageEdit(id)}
        >
          <Edit />
        </Button> */}
        <Button
          color="secondary"
          className="cta-delete"
          onClick={() => manageDelete(id)}

        >
          <XSquare />
        </Button>

      </div>
      )}
    </div>
  );
};

Suggestion.propTypes = {
  user: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleSuggestionDelete: PropTypes.func.isRequired,
};

export default Suggestion;
