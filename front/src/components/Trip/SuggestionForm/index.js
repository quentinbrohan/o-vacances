/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Button from 'src/components/elements/Button';
import { Send } from 'react-feather';
import PropTypes from 'prop-types';
import Field from './Field';

import './suggestionForm.scss';

const SuggestionForm = ({
  handleSuggestion,
  suggestionDescription,
  suggestionTitle,
  changeField,
}) => {
  const manageSubmit = (evt) => {
    evt.preventDefault();
    handleSuggestion();
  };

  return (
    <form className="suggestion-form" onSubmit={manageSubmit}>
      <div className="suggestion-form-title">Ajouter une suggestion</div>
      <Field
        name="suggestionTitle"
        placeholder="Titre"
        onChange={changeField}
        value={suggestionTitle}
        required
      />
      <Field
        name="suggestionDescription"
        placeholder="Description"
        onChange={changeField}
        value={suggestionDescription}
        required
      />
      <Button color="secondary" size="sm" type="submit">
        Envoyer <Send />
      </Button>
    </form>
  );
};

SuggestionForm.propTypes = {
  suggestionDescription: PropTypes.string,
  suggestionTitle: PropTypes.string,
  changeField: PropTypes.func.isRequired,
  handleSuggestion: PropTypes.func.isRequired,
};

SuggestionForm.defaultProps = {
  suggestionDescription: '',
  suggestionTitle: '',
};

export default SuggestionForm;
