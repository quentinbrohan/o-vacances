import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'src/components/elements/Button';

import Field from './Field';

import './login.scss';

const Login = ({
  email,
  password,
  changeField,
  handleLogin,
  isLogged,

}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  return (

    <main className="login">
      <h1>Bon retour parmi nous.</h1>
      {isLogged && (
      <div>Vous êtes connecté</div>)}

      {!isLogged && (
      <div className="login-form">
        <form
          onSubmit={handleSubmit}
        >
          <Field
            name="email"
            placeholder="Adresse Email"
            onChange={changeField}
            value={email}
          />
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={changeField}
            value={password}
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
              Pas encore de compte? <Link to="/signin">Inscription</Link>
            </p>
          </div>
        </div>
      </div>
      )}
    </main>
  );
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
};

Login.defaultProps = {
  isLogged: false,
};

export default Login;
