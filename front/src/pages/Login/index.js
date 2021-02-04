import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  success as toastSuccess
} from 'react-toastify-redux';
import Button from 'src/components/elements/Button';
import FormInput, { FormError } from 'src/components/FormInput';
import { history } from 'src/index';
import { useLogInMutation } from 'src/services/user';
import { rulesEmail, rulesLoginPassword } from 'src/utils/form';
import './login.scss';

const Login = ({ isAuthenticated }) => {
  if (isAuthenticated) history.push('/');
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [logIn, { isLoading }] = useLogInMutation();

  const { register, handleSubmit, errors } = useForm({
    shouldFocusError: true,
  });

  const onSubmit = (formValues) => {
    logIn(formValues)
      .then((result) => {
        if (result.data) {
          dispatch(toastSuccess('Connexion réussie.'));
          history.push('/');
        }
        if (result.error.status === 401) {
          setError('Adresse email ou mot de passe incorrect.');
        }
        else if (result.error) {
          setError(result.error.data.message);
        }
      })
      .catch((err) => console.warn({ err }));
  };

  return (
    <main className="login">
      <Helmet>
        <title>Connexion</title>
        <meta name="description" content="Connexion" />
      </Helmet>
      <div className="connection-container">
        <h1>Connexion</h1>
        <form id="rhf-form" className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
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
            register={register(rulesLoginPassword)}
            error={errors.password}
          />

          {error.length > 0 && <FormError errorMessage={error} />}

          <Button color="primary" type="submit" loading={isLoading}>
            Se connecter
          </Button>
        </form>

        <div>
          <div className="login-layout">
            <p>J'ai oublié mon mot de passe</p>
            <hr />
            <p>
              Pas encore de compte? <Link to="/signin">Inscription</Link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
