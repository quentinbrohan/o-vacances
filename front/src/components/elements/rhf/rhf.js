/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';

import './rhfField.scss';

// TODO: Need to use Controller

export const RHFField = ({
  type, name, placeholder, required, inputRef, register, errors,
}) => {
  console.log({
    type, name, placeholder, required, inputRef, register, errors,
  });
  return (
    <div className="field">
      <label className="field-label">{placeholder}</label>
      <input
        className="field-input"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={errors.name ? 'true' : 'false'}
        inputRef={register}
      />

      {errors.name && <p className="error-message">{errors.name.message}</p>}
    </div>
  );
};

RHFField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  ref: PropTypes.func.isRequired,
  errors: PropTypes.array,
};

// Valeurs par défaut pour les props
RHFField.defaultProps = {
  type: 'text',
  required: false,
  errors: [],
};
