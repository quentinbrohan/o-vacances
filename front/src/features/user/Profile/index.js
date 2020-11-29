/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Check, Edit2, XSquare } from 'react-feather';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'src/components/elements/Button';
import { EMAIL_REGEX } from 'src/constants/patterns';
import { editUser, getCurrentUser } from 'src/features/user';
import './profile.scss';
import ProfileImage from './ProfileImage';

const Profile = ({
  changeField,
  addImagePreview,
  handleEditUserImage,
}) => {
  const dispatch = useDispatch();
  const {
    firstname, lastname, email, avatar, isLoading,
  } = useSelector((state) => state.user);

  const [isDisabled, setDisabled] = useState(true);
  // const [isPasswordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const {
    register, handleSubmit, errors, reset,
  } = useForm({
    defaultValues: {
      firstname,
      lastname,
      email,
    },
  });

  // if (
  //   formValues.firstname !== firstname
  // 		|| formValues.lastname !== lastname
  // 		|| formValues.email !== email
  // ) {
  //   setTouched(true);
  //   console.log({ isTouched });
  // }

  const onSubmit = (formValues) => {
    dispatch(editUser(formValues));
  };

  if (firstname || lastname || email || avatar) {
    return (
      <main className="profile">
        <Helmet>
          <title>Mon profil</title>
          <meta name="description" content="Mon profil" />
        </Helmet>
        <div className="connection-container" />
        <h1>Mon profil</h1>
        <div className="profile-head">
          {/* FIXME: show current avatar, use RHF ? */}
          <ProfileImage
            name="avatar"
            avatar={avatar}
            firstname={firstname}
            onChangeImage={addImagePreview}
            onChange={changeField}
            handleEditUserImage={handleEditUserImage}
          />
          <div className="profile-head-information">
            <form className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <label className="field-label">Prénom</label>
                <input
                  className="field-input"
                  name="firstname"
                  type="text"
                  placeholder="Prénom"
                  aria-invalid={!!errors.firstname}
                  ref={register({
                    required: 'Prénom requis.',
                    maxLength: {
                      value: 80,
                    },
                  })}
                  disabled={isDisabled}
                />
                {errors.firstname && (
                <p className="error-message">{errors.firstname.message}</p>
                )}
              </div>

              <div className="field">
                <label className="field-label">Nom</label>
                <input
                  className="field-input"
                  name="lastname"
                  type="text"
                  placeholder="Nom"
                  aria-invalid={!!errors.lastname}
                  ref={register({
                    required: 'Nom requis.',
                    maxLength: {
                      value: 80,
                    },
                  })}
                  disabled={isDisabled}
                />
                {errors.lastname && (
                <p className="error-message">{errors.lastname.message}</p>
                )}
              </div>

              <div className="field">
                <label className="field-label">Email</label>
                <input
                  className="field-input"
                  name="email"
                  type="text"
                  placeholder="Email"
                  aria-invalid={!!errors.email}
                  ref={register({
                    required: 'Requis',
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Email invalide.',
                    },
                  })}
                  disabled={isDisabled}
                />
                {errors.email && (
                <p className="error-message">{errors.email.message}</p>
                )}
              </div>

              {/* TODO: state if wanna change password + specific Action */}
              {/* <div className="field">
                <label className="field-label">Mot de passe</label>
                <input
                  className="field-input"
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  aria-invalid={!!errors.password}
                  ref={register({
                    required: 'Mot de passe requis.',
                  minLength: {
                      value: 8,
                    message:
                        'Le mot de passe doit contenir au moins 8 caractères.',
                        },
                  })}
                  disabled={isDisabled}
                />
                {errors.password && (
                <p className="error-message">{errors.password.message}</p>
                )}
              </div>

              <div className="field">
                <label className="field-label">Confirmer le mot de passe</label>
                <input
                  className="field-input"
                  name="passwordConfirm"
                  type="password"
                  placeholder="Mot de passe"
                  aria-invalid={!!errors.passwordConfirm}
                  ref={register({
                    validate: (value) => value === watch('password')
                      || 'Les mots de passe saisis ne sont pas identiques.',
                  })}
                  disabled={isDisabled}
                />
                {errors.passwordConfirm && (
                <p className="error-message">{errors.passwordConfirm.message}</p>
                )}
              </div>
   */}
              {!isDisabled && (
              <div className="cta-form">
                <Button
                  type="button"
                  color="secondary"
                  loading={isLoading}
                  onClick={() => {
                    setDisabled(true);
                    reset();
                  }}
                >
                  <XSquare className="icon cancel" />
                </Button>
                <Button
                  type="submit"
                  color="secondary"
                  loading={isLoading}
                  onClick={() => {
                    setDisabled(true);
                    handleSubmit(onSubmit)();
                  }}
                >
                  <Check className="icon confirm" />
                </Button>
              </div>
              )}
            </form>
            {isDisabled && (
            <Button
              color="secondary"
              type="button"
              loading={isLoading}
              onClick={() => setDisabled(false)}
              style={{ marginLeft: '1.25rem' }}
            >
              <Edit2 className="icon edit" />
            </Button>
            )}
          </div>
        </div>

        <div className="profile-trip">
          <h2>Organiser un voyage</h2>
          <div className="profile-trip-information">
            <p>
              Prévois ton prochain voyage et préviens ta famille et tes amis,{' '}
              pour s'organiser ensemble !
            </p>
            <Link to="/creer-un-voyage">
              <Button color="primary" haveClassName="profil-trip-button">
                Go !
              </Button>
            </Link>
          </div>
          <div className="profile-trip-archive">
            <h2>Mes anciens voyages</h2>
          </div>
        </div>
      </main>
    );
  }

  return <div>Erreur dans le chargement du profil</div>;
};
Profile.propTypes = {
  changeField: PropTypes.func.isRequired,
  addImagePreview: PropTypes.func.isRequired,
  handleEditUserImage: PropTypes.func.isRequired,
};

export default Profile;
