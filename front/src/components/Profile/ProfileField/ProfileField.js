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
}) => (

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
      onChange=""
    />
    )}
  </div>
);

ProfileField.propTypes = {

  userTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  inputId: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,

};

export default ProfileField;
