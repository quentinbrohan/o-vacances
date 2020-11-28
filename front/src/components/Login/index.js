import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Button from 'src/components/elements/Button';
// import Field from './Field';
import 'src/components/elements/rhf/rhfField.scss';
import './login.scss';

const Login = ({
  handleLogin,
  isAuthenticated,
}) => {
  const {
    register, handleSubmit, watch, errors,
  } = useForm();
  const onSubmit = (formValues) => {
    console.log(formValues);
    handleLogin(formValues);
  };

  return (
    <main className="login">
      <Helmet>
        <title>Connexion</title>
        <meta name="description" content="Connexion" />
      </Helmet>
      <div className="connection-container">
        <h1>Bon retour parmi nous.</h1>
        {!isAuthenticated ? (
          <>
            <form className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
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
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                  })}
                />
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>

              <Button
                color="primary"
                type="submit"
              >
                S'inscrire
              </Button>
            </form>

            <div>
              <div className="login-layout">
                <p>J'ai oublié mon mot de passe</p>
                <hr />
                <p>
                  Pas encore de compte ? <Link to="/signin">Inscription</Link>
                </p>
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    </main>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

Login.defaultProps = {
  isAuthenticated: false,
};

export default Login;
