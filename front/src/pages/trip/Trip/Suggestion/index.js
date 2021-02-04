import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { XSquare } from 'react-feather';
import { useDispatch } from 'react-redux';
import { success as toastSuccess } from 'react-toastify-redux';
import { ReactComponent as AvatarDefault } from 'src/assets/svg/user.svg';
import Button from 'src/components/elements/Button';
import { API_URL } from 'src/constants';
import ModalSuggestionForm from 'src/pages/trip/Trip/ModalSuggestionForm';
import { useDeleteSuggestionMutation } from 'src/services/trip';
import { parseDisplay } from 'src/utils/dates';
import { getCurrentUserId } from 'src/utils/user';
import './suggestion.scss';

const Suggestion = ({ tripId, suggestion, isArchived }) => {
  const dispatch = useDispatch();
  const [
    deleteSuggestion,
    { isLoading: isLoadingDeleteSuggestion, isSuccess: isSuccessDeleteSuggestion },
  ] = useDeleteSuggestionMutation();

  const [error, setError] = useState('');

  const onDelete = (suggestionId) => {
    deleteSuggestion({
      suggestionId,
      tripId,
    })
      .then((response) => {
        if (response.data) {
          dispatch(toastSuccess('Suggestion supprimée.'));
        }
      })
      .catch((deleteError) => {
        if (deleteError) {
          console.warn({ deleteError });
          setError(deleteError.error.mesage);
        }
      });
  };

  return (
    <div className="suggestion">
      <header className="suggestion-header">
        {suggestion.user.avatar !== null ? (
          <img
            src={API_URL + suggestion.user.avatar}
            alt={suggestion.user.firstname}
            className="suggestion-avatar"
          />
        ) : (
          <AvatarDefault className="suggestion-avatar" />
        )}
        <div className="suggestion-header-info">
          <p className="suggestion-title">{suggestion.title}</p>
          <p className="suggestion-author">
            {suggestion.user.firstname}
            <span className="suggestion-date">{parseDisplay(suggestion.createdAt)}</span>
          </p>
        </div>
      </header>
      <div className="suggestion-body">
        <p className="suggestion-description">{suggestion.description}</p>
      </div>
      {suggestion.user.id === getCurrentUserId() && (
        <div className="suggestion-cta">
          <ModalSuggestionForm
            tripId={tripId}
            suggestion={suggestion}
            isArchived={isArchived}
            modalIconType="EDIT"
            onSuccess={isSuccessDeleteSuggestion}
            onConfirmError={error}
          />
          <Button
            color="secondary"
            className="cta-delete"
            onClick={() => onDelete(suggestion.id)}
            loading={isLoadingDeleteSuggestion}
          >
            <XSquare />
          </Button>
        </div>
      )}
    </div>
  );
};

Suggestion.propTypes = {
  tripId: PropTypes.number.isRequired,
  suggestion: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  isArchived: PropTypes.bool.isRequired,
};

export default Suggestion;
