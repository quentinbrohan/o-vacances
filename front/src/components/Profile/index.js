import React from 'react';

import ProfileField from './ProfileField/ProfileField';

import './profile.scss';

// component to contact form
const Profile = () => (

  <div className="profile">
    <div className="profile-head">
      <div className="profile-head-img">
        <img className="profile-head-img-picture" src="https://via.placeholder.com/100x100" alt="" />
        <button type="button">Modifier la photo de profil</button>
      </div>
      <div className="profile-head-information">
        <ProfileField />
        <ProfileField />
        <ProfileField />
        <ProfileField />
      </div>
    </div>
    <div className="profile-trip">
      <div className="profile-trip-information">
        <p>Fonctionnalités</p>
        <button type="button">Créer un voyage</button>
      </div>
      <div className="profile-trip-archive">
        Résumés des anciens voyages
      </div>
    </div>
  </div>

);

export default Profile;
