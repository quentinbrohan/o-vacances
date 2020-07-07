import React from 'react';
import PropTypes from 'prop-types';
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
    <div className="signin">
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
        <button
          type="submit"
          className="signin-form-button"
        >
          S'inscrire
        </button>
      </form>
    </div>
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
