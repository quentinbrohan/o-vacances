/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import './profilefield.scss';

// component to change profil user
const ProfileField = ({
  name,
  value,
  userTitle,
  type,
  isDisabled,
  onChange,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  return (

    <div className="profile-field">
      <label className="profile-field-label" htmlFor={name}>{userTitle}</label>
      {isDisabled && (
      <input
        disabled
        type={type}
        defaultValue={value}
        onChange={handleChange}
      />

      )}
      {!isDisabled && (
      <input
        type={type}
        value={value}
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
  name: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,

};

ProfileField.defaultProps = {
  value: null,
};

export default ProfileField;
