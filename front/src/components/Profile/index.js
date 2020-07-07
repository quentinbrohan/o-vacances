import React from 'react';

import ProfileField from './ProfileField/ProfileField';

import './profile.scss';

// component to contact form
const Profile = () => (

  <div className="profile">
    <h1>Mon profil</h1>
    <div className="profile-head">
      <div className="profile-head-img">
        <img className="profile-head-img-picture" src="https://via.placeholder.com/100x100" alt="" />
        <button type="button">Modifier la photo</button>
      </div>
      <div className="profile-head-information">
        <ProfileField />
        <ProfileField />
        <ProfileField />
        <ProfileField />
      </div>
    </div>
    <div className="profile-trip">
      <h2>J'organise un voyage</h2>
      <div className="profile-trip-information">
        <p>Je créé un voygage. J'invite mes amis ou ma famille.
          On s'organise ensemble avec O'Vacances!
          <br />
          Agenda, lieux, activités, suggestions,...
        </p>
        <button type="button">GO !</button>
      </div>
      <div className="profile-trip-archive">
        <h2>Mes anciens voyages</h2>
      </div>
    </div>
  </div>
);

export default Profile;
