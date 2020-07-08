/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import { Edit2 } from 'react-feather';

import './profilefield.scss';

// component to change profil user
const ProfileField = ({
  inputId,
  value,
  userTitle,
  type,
  isDisabled,
  onClick,
}) => (

  <div className="profile-field">
    <form
      className="signin-form-element"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
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
        value={value}
        onChange={(event) => {
          console.log(event.currentTarget.value);
        }}
      />
      )}
      <Edit2
        className="pen"
        onClick={onClick}
      />
    </form>
  </div>
);

ProfileField.propTypes = {

  userTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  inputId: PropTypes.number.isRequired,

};

export default ProfileField;
