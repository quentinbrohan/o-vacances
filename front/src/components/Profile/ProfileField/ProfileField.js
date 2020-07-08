/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import { Edit2 } from 'react-feather';

import './profilefield.scss';

// component to contact form
const ProfileField = ({
  userInformation,
  userTitle,
  isDisabled,
}) => (

  <div className="profile-field">
    <label htmlFor="input">{userTitle}</label>
    {isDisabled && (
      <input
        type="text"
        value={userInformation}
        disabled
      />
    )}
    {!isDisabled && (
      <input
        type="text"
        value={userInformation}
        onChange=""
      />
    )}
    <Edit2 className="pen" onClick={() => (console.log('coucou'))}/>
  </div>
);

ProfileField.propTypes = {

  userTitle: PropTypes.string.isRequired,
  userInformation: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,

};

ProfileField.defaultProps = {
  isDisabled: false,
};

export default ProfileField;
