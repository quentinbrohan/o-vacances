/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Button from 'src/components/elements/Button';
// TODO: Need Rework RHFField for reusability
// import { RHFField } from 'src/components/elements/rhf/rhf';
import 'src/components/elements/rhf/rhfField.scss';
import './signin.scss';

import { useDispatch, useSelector } from 'react-redux';
import { signIn } from 'src/features/user';
import { EMAIL_REGEX } from 'src/constants/patterns';

const Signin = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const {
    register, handleSubmit, watch, errors,
  } = useForm();

  const onSubmit = (formValues) => {
    dispatch(signIn(formValues));
  };

  return (
    <main className="signin">
      {isAuthenticated && <Redirect to="/" />}
      <Helmet>
        <title>Inscription</title>
        <meta name="description" content="Inscription" />
      </Helmet>
      <div className="connection-container">
        <h1>Inscription</h1>
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
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="field">
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
            />
            {errors.passwordConfirm && (
              <p className="error-message">{errors.passwordConfirm.message}</p>
            )}
          </div>

          <Button
            color="primary"
            type="submit"
            haveClassName="signin-form-button"
            loading={isLoading}
          >
            S'inscrire
          </Button>
        </form>

        <div className="helper">
          <hr />
          <p>
            Déjà un compte ? <Link to="/login">Connexion</Link>.
          </p>
        </div>
      </div>
    </main>
  );
};

Signin.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Signin;
