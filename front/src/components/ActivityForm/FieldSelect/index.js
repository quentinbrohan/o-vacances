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
          <option value="Sport">Sport</option>
          <option value="Musée">Musée</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Plage-Piscine">Plage-Piscine</option>
        </select>
      </label>
    </div>
  );
};

FieldSelect.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Valeurs par défaut pour les props
FieldSelect.defaultProps = {
  value: '',
  type: 'text',
};
// == Export
export default FieldSelect;
