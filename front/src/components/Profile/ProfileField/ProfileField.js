/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import { Edit2 } from 'react-feather';

import './profilefield.scss';

// component to change profil user
const ProfileField = ({
  userInformation,
  userTitle,
  type,
  isDisabled,
}) => (

  <div className="profile-field">
    <label className="profile-field-label" htmlFor={userInformation}>{userTitle}</label>
    {isDisabled && (
      <input
        disabled
        type={type}
        defaultValue={userInformation}
      />
    )}
    {!isDisabled && (
      <input
        type={type}
        value={userInformation}
        onChange=""
      />
    )}
    <Edit2 className="pen" onClick={() => (console.log('coucou'))} />
  </div>
);

ProfileField.propTypes = {

  userTitle: PropTypes.string.isRequired,
  userInformation: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,

};

export default ProfileField;
