import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';

import { Edit2, Check } from 'react-feather';

// fausses données
import users from 'src/data/usersData';

import ProfileField from './ProfileField/ProfileField';

import './profile.scss';

// component to contact form
const Profile = ({ isDisabled, deleteDisabledInput }) => {
// simulation de récupération de l'utilisateur avec son id
  const user = users.find((one) => one.id === '3');
  console.log(isDisabled);

  return (
    <div className="profile">
      <h1>Mon profil</h1>
      <div className="profile-head">
        <div className="profile-head-img">
          <img className="profile-head-img-picture" src={user.avatar} alt={user.firstname} />
          <Button color="primary">Modifier la photo</Button>
        </div>
        <div className="profile-head-information">
          <form>
            <ProfileField
              inputId={1}
              value={user.firstname}
              userTitle="Prénom"
              type="text"
              isDisabled={isDisabled}
            />
            <ProfileField
              inputId={2}
              value={user.lastname}
              userTitle="Nom"
              type="text"
              isDisabled={isDisabled}
            />
            <ProfileField
              inputId={3}
              value={user.email}
              userTitle="Email"
              type="text"
              isDisabled={isDisabled}
            />
            <ProfileField
              inputId={4}
              value={user.password}
              userTitle="Mot de passe"
              type="password"
              isDisabled={isDisabled}
            />
            {isDisabled && (
            <Edit2
              className="icon pen"
              onClick={() => {
                deleteDisabledInput(false);
              }}
            />
            )}
            {!isDisabled && (
            <Check
              className="icon check"
              onClick={() => {
                deleteDisabledInput(true);
              }}
            />
            )}
          </form>
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
          <Button
            color="primary"
            haveClassName="profil-trip-button"
          >
            GO !
          </Button>
        </div>
        <div className="profile-trip-archive">
          <h2>Mes anciens voyages</h2>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {

  deleteDisabledInput: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,

};

export default Profile;
