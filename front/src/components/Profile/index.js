import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';

import AvatarDefault from 'src/assets/images/svg/user.svg';

import { Edit2, Check } from 'react-feather';

import ProfileField from './ProfileField/ProfileField';

import './profile.scss';
import { editUser } from '../../actions/user';

// component to contact form
const Profile = ({
  isDisabled,
  deleteDisabledInput,
  fetchUser,
  info,
  changeField,
}) => {
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const avatar = (info.avatar ? info.avatar : AvatarDefault);

  return (

    <main className="profile">
      <h1>Mon profil</h1>
      <div className="profile-head">
        <div className="profile-head-img">
          <img className="profile-head-img-picture" src={avatar} alt={info.firstname} />
          <Button color="primary">Modifier la photo</Button>
        </div>
        <div className="profile-head-information">
          <form onSubmit={handleSubmit}>
            <ProfileField
              inputId={1}
              value={info.firstname}
              userTitle="Prénom"
              type="text"
              isDisabled={isDisabled}
              onChange={changeField}
            />
            <ProfileField
              inputId={2}
              value={info.lastname}
              userTitle="Nom"
              type="text"
              isDisabled={isDisabled}
              onChange={changeField}
            />
            <ProfileField
              inputId={3}
              value={info.email}
              userTitle="Email"
              type="text"
              isDisabled={isDisabled}
              onChange={changeField}
            />
            <ProfileField
              inputId={4}
              value={info.password}
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
              onClick={() => {
                deleteDisabledInput(true);
              }}
              type="submit"
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
  info: PropTypes.object.isRequired,
  changeField: PropTypes.func.isRequired,

};

export default Profile;
