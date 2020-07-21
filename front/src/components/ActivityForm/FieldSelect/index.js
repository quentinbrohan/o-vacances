/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

import './fieldSelect.scss';

// == Import : local

// == Composant
const FieldSelect = ({
  value,
  name,
  placeholder,
  onChange,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <div className="field">
      <label
        htmlFor={inputId}
        className="field-label"
      >{placeholder}
        <select value={value} onChange={handleChange}>
          <option value="1">restaurant</option>
          <option value="2">sortie nocturne</option>
          <option value="3">sport</option>
          <option value="4">visite culturelle</option>
          <option value="5">point d'eau</option>
        </select>
      </label>
    </div>
  );
};

FieldSelect.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Valeurs par défaut pour les pro
// == Export
export default FieldSelect;
