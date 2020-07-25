import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Button from 'src/components/elements/Button';

import Field from './Field';

import './login.scss';

const Login = ({
  email,
  password,
  changeField,
  handleLogin,
  isAuthenticated,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  // Redirect to Home ('/') after 5s when connected
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = setTimeout(() => {
        history.push('/');
      }, 5000);
      return () => clearTimeout(redirect);
    }
  });

  return (

    <main className="login">
      <div className="connection-container">
        <h1>Bon retour parmi nous.</h1>
        {isAuthenticated && (
          <div className="is-authenticated">
            <div>Vous êtes connecté</div>
            <p>Redirection automatiqument vers Accueil...</p>
            <p>
              Si la redirection ne s'effectue pas automatiqument,
              <Link to="/" className="redirect">cliquer ici.</Link>
            </p>
          </div>
        )}

        {!isAuthenticated && (
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
};

Login.defaultProps = {
  isAuthenticated: false,
};

export default Login;
