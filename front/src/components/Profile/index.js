import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';
import { ReactComponent as AvatarDefault } from 'src/assets/svg/user.svg';
import { Helmet } from 'react-helmet';

import { Link } from 'react-router-dom';

import { Edit2, Check } from 'react-feather';

import ProfileImage from './ProfileImage';
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
  addImagePreview,
  handleEditUserImage,
}) => {
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (

    <main className="profile">
      <Helmet>
        <title>Mon profil</title>
        <meta name="description" content="Mon profil" />
      </Helmet>
      <div className="connection-container" />
      <h1>Mon profil</h1>
      <div className="profile-head">
        <ProfileImage
          name="avatar"
          avatar={avatar}
          firstname={firstname}
          onChangeImage={addImagePreview}
          onChange={changeField}
          handleEditUserImage={handleEditUserImage}
        />
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
              <Button color="secondary" className="profil-button">
                <Edit2
                  className="icon pen"
                  onClick={() => {
                    deleteDisabledInput(false);
                  }}
                />

              </Button>
            )}
            {!isDisabled && (
              <Button color="secondary" className="profil-button">

                <Check
                  className="icon check"
                  type="submit"
                  onClick={() => {
                    deleteDisabledInput(true);
                    handleEditUser();
                  }}
                />
              </Button>
            )}
          </form>
        </div>
      </div>

      <div className="profile-trip">
        <h2>J'organise un voyage</h2>
        <div className="profile-trip-information">
          <p>Je crée un voyage. J'invite mes amis ou ma famille.
            On s'organise ensemble avec O'Vacances !
            <br />
            Agenda, lieux, activités, suggestions...
          </p>
          <Link to="/creer-un-voyage">
            <Button
              color="primary"
              haveClassName="profil-trip-button"
            >
              GO !
            </Button>
          </Link>
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
  password: PropTypes.string,
  handleEditUser: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  addImagePreview: PropTypes.func.isRequired,
  handleEditUserImage: PropTypes.func.isRequired,

};

Profile.defaultProps = {
  avatar: AvatarDefault,
  password: '',
};

export default Profile;
