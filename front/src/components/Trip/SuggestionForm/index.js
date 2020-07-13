/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Button from 'src/components/elements/Button';
import { Send } from 'react-feather';
import PropTypes from 'prop-types';

import './suggestionForm.scss';

const SuggestionForm = ({
  handleSuggestion,
  onChange,
  suggestionContent,
}) => {
  const manageSubmit = (evt) => {
    evt.preventDefault();
    handleSuggestion();
  };

  const handleChange = (evt) => {
    onChange(evt.target.value, suggestionContent);
  };

  return (
    <form className="suggestion-form" onSubmit={manageSubmit}>
      <label className="field-label">Ajouter une suggestion</label>
      <input
        type="text"
        place="Votre suggestion"
        className="field-input"
        onChange={handleChange}
        value={suggestionContent}
        name="suggestion"
      />
      <Button color="secondary" size="sm" type="submit">
        <Send />

      </Button>
    </form>
  );
};

SuggestionForm.propTypes = {
  handleSuggestion: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  suggestionContent: PropTypes.string,
};

SuggestionForm.defaultProps = {
  suggestionContent: '',
};

export default SuggestionForm;
