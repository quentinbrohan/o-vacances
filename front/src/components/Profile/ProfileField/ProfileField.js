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
}) => {
  const isDisabled = true;
  return (

    <div className="profile-field">
      <label className="profile-field-label" htmlFor={inputId}>{userTitle}</label>
      <form action="">
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
        <Edit2
          className="pen"
          onClick=""
        />

      </form>
    </div>
  );
};

ProfileField.propTypes = {

  userTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  inputId: PropTypes.number.isRequired,

};

export default ProfileField;
