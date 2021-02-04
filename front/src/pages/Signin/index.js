import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { success as toastSuccess } from 'react-toastify-redux';
import Button from 'src/components/elements/Button';
import FormInput, { FormError } from 'src/components/FormInput';
import { history } from 'src/index';
import { useSignInMutation } from 'src/services/user';
import {
  rulesEmail,
  rulesFirstname,
  rulesLastname,
  rulesPassword,
} from 'src/utils/form';
import './signin.scss';

const Signin = ({ isAuthenticated }) => {
  if (isAuthenticated) history.push('/');

  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const {
    register, handleSubmit, watch, errors,
  } = useForm({
    shouldFocusError: true,
  });

  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit = (formValues) => {
    signIn(formValues)
      .then((result) => {
        if (result.data) {
          dispatch(toastSuccess('Inscription réussie.'));
          history.push('/login');
        }
        if (result.error) {
          setError('Erreur lors de la création du compte.');
        }
      })
      .catch((err) => console.warn({ err }));
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
        <form id="rhf-form" className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            id="firstname"
            name="firstname"
            type="text"
            label="Prénom"
            placeholder="Prénom"
            register={register(rulesFirstname)}
            error={errors.firstname}
          />
          <FormInput
            id="lastname"
            name="lastname"
            type="text"
            label="Nom"
            placeholder="Nom"
            register={register(rulesLastname)}
            error={errors.lastname}
          />
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            register={register(rulesEmail)}
            error={errors.email}
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            placeholder="Mot de passe"
            register={register(rulesPassword)}
            error={errors.password}
          />
          <FormInput
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            label="Confirmer le mot de passe"
            placeholder="Confirmer le mot de passe"
            register={register({
              validate: (value) => value === watch('password') || 'Les mots de passe saisis ne sont pas identiques.',
            })}
            error={errors.passwordConfirm}
          />

          {error.length > 0 && <FormError errorMessage={error} />}

          <Button
            color="primary"
            type="submit"
            loading={isLoading}
            haveClassName="signin-form-button"
          >
            S'inscrire
          </Button>
        </form>

        <div className="helper">
          <hr />
          <p>
            Déjà un compte? <Link to="/login">Connexion</Link>.
          </p>
        </div>
      </div>
    </main>
  );
};

Signin.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(Signin);
