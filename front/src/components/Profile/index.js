import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';

import AvatarDefault from 'src/assets/svg/user.svg';

import { Edit2, Check } from 'react-feather';

import ProfileField from './ProfileField/ProfileField';

import './profile.scss';

// component to contact form
const Profile = ({
  isDisabled,
  deleteDisabledInput,
  fetchUser,
  firstname,
  lastname,
  email,
  password,
  avatar,
  changeField,
  handleEditUser,
}) => {
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const Avatar = (avatar === null ? AvatarDefault : avatar);
console.log(avatar);
console.log(Avatar);
  return (

    <main className="profile">
      <h1>Mon profil</h1>
      <div className="profile-head">
        <div className="profile-head-img">
          <img className="profile-head-img-picture" src={Avatar} alt={firstname} />
          <Button color="primary">Modifier la photo</Button>
        </div>
        <div className="profile-head-information">
          <form onSubmit={handleSubmit}>
            <ProfileField
              name="firstname"
              value={firstname}
              userTitle="Prénom"
              type="text"
              isDisabled={isDisabled}
              onChange={changeField}
            />
            <ProfileField
              name="lastname"
              value={lastname}
              userTitle="Nom"
              type="text"
              isDisabled={isDisabled}
              onChange={changeField}
            />
            <ProfileField
              name="email"
              value={email}
              userTitle="Email"
              type="text"
              isDisabled={isDisabled}
              onChange={changeField}
            />
            <ProfileField
              name="password"
              value={password}
              userTitle="Mot de passe"
              type="password"
              isDisabled={isDisabled}
              onChange={changeField}
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
              type="submit"
              onClick={() => {
                deleteDisabledInput(true);
                handleEditUser();
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
    </main>
  );
};
Profile.propTypes = {

  deleteDisabledInput: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  fetchUser: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  avatar: PropTypes.string,

};

Profile.defaultProps = {
  avatar: 'src/assets/svg/user.svg',
};

export default Profile;
