/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { Edit2 } from 'react-feather';

import './profilefield.scss';

// component to contact form
const ProfileField = () => (

  <div className="profile-field">
    <label htmlFor="button">Name</label>
    <input type="text" />
    <Edit2 className="pen" />
  </div>
);

export default ProfileField;
