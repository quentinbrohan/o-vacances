import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Button from 'src/components/elements/Button';
import { Helmet } from 'react-helmet';

import Field from './Field';

import './login.scss';

const Login = ({
  email,
  password,
  changeField,
  handleLogin,
  isAuthenticated,
  error,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
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
          <div className="login-form">
            <form
              onSubmit={handleSubmit}
            >
              <Field
                name="email"
                placeholder="Adresse Email"
                onChange={changeField}
                value={email}
                type="email"
                required
              />
              <Field
                name="password"
                type="password"
                placeholder="Mot de passe"
                onChange={changeField}
                value={password}
                required
              />
              {error && (
              <p className="error-message">{error}</p>
              )}
              <div>
                <Button color="primary">
                  Connexion
                </Button>
              </div>
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
          </div>
        )
          : (
            <Redirect to="/" />
          )}

      </div>
    </main>
  );
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.array,
};

Login.defaultProps = {
  isAuthenticated: false,
  error: [],
};

export default Login;
