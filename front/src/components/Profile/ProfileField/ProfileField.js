/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import './profilefield.scss';

// component to change profil user
const ProfileField = ({
  inputId,
  value,
  userTitle,
  type,
  isDisabled,
  onChange,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, inputId);
  };

  return (

    <div className="profile-field">
      <label className="profile-field-label" htmlFor={inputId}>{userTitle}</label>
      {isDisabled && (
      <input
        disabled
        type={type}
        defaultValue={value}
      />

      )}
      {!isDisabled && (
      <input
        type={type}
        defaultValue={value}
        onChange={handleChange}
      />
      )}
    </div>
  );
};

ProfileField.propTypes = {

  userTitle: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  inputId: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isrequired,

};

ProfileField.defaultProps = {
  value: '',
};

export default ProfileField;
