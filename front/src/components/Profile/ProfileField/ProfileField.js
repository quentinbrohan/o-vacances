/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import { Edit2 } from 'react-feather';

import './profilefield.scss';

// component to change profil user
const ProfileField = ({
  userInformation,
  userTitle,
  isDisabled,
}) => (

  <div className="profile-field">
    <label htmlFor="input">{userTitle}</label>
    {isDisabled && (
      <input
        disabled
        type="text"
        defaultValue={userInformation}
      />
    )}
    {!isDisabled && (
      <input
        type="text"
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

};

export default ProfileField;
