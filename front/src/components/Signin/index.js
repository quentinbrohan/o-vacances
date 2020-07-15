import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';
import Field from './Field';

import './signin.scss';

const Signin = ({
  firstname,
  lastname,
  email,
  password,
  changeField,
  handleSignin,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignin();
  };

  return (
    <main className="signin">
      <div className="connection-container">

        <h1>Bienvenue voyageur !</h1>
        <form className="signin-form-element" onSubmit={handleSubmit}>
          <Field
            name="firstname"
            placeholder="Prénom"
            onChange={changeField}
            value={firstname}
          />
          <Field
            name="lastname"
            placeholder="Nom"
            onChange={changeField}
            value={lastname}
          />
          <Field
            name="email"
            type="email"
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
          <Button
            color="primary"
            type="submit"
            haveClassName="signin-form-button"
          >
            S'inscrire
          </Button>
        </form>
        <div className="helper">
          <hr />
          <p>
            Déjà un compte ? <Link to="/login">Connexion</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

Signin.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleSignin: PropTypes.func.isRequired,
};

export default Signin;
