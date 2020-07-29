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
  required,
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

        <select
          value={value}
          onChange={handleChange}
          required={required}
        >
          <option selected hidden> Choisir une catégorie</option>
          <option value="1">Restaurant</option>
          <option value="2">Sortie nocturne</option>
          <option value="3">Sport</option>
          <option value="4">Visite culturelle</option>
          <option value="5">Point d'eau</option>
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
  required: PropTypes.bool,
};

FieldSelect.defaultProps = {
  required: false,
};

// Valeurs par défaut pour les pro
// == Export
export default FieldSelect;
