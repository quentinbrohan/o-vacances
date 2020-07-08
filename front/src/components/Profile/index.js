import React from 'react';
import PropTypes from 'prop-types';

// fausses données
import users from 'src/data/usersData';

import ProfileField from './ProfileField/ProfileField';

import './profile.scss';

// component to contact form
const Profile = ({ isDisabled }) => {
// simulation de récupération de l'utilisateur avec son id
  const user = users.find((one) => one.id === '3');
  console.log(isDisabled);

  return (
    <div className="profile">
      <h1>Mon profil</h1>
      <div className="profile-head">
        <div className="profile-head-img">
          <img className="profile-head-img-picture" src={user.avatar} alt={user.firstname} />
          <button type="button">Modifier la photo</button>
        </div>
        <div className="profile-head-information">
          <ProfileField userInformation={user.firstname} userTitle="Prénom" isDisabled={isDisabled} />
          <ProfileField userInformation={user.lastname} userTitle="Nom" isDisabled={isDisabled} />
          <ProfileField userInformation={user.email} userTitle="Email" isDisabled={isDisabled} />
          <ProfileField userInformation={user.password} userTitle="Mot de passe" disabled={isDisabled} />
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
};

Profile.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
};

export default Profile;
