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
    console.log('handleSubmit');
    handleSignin();
  };

  return (
    <div className="signin">
      <h1>Bienvenue voyageur !</h1>
      <form className="signin-form-element" onSubmit={handleSubmit}>
        <Field
          label="Prénom"
          name="firstname"
          placeholder="Prénom"
          onChange={changeField}
          value={firstname}
        />
        <Field
          label="Nom"
          name="lastname"
          placeholder="Nom"
          onChange={changeField}
          value={lastname}
        />
        <Field
          label="Email"
          name="email"
          placeholder="Adresse Email"
          onChange={changeField}
          value={email}
        />
        <Field
          label="Mot de passe"
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

Signin.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleSignin: PropTypes.func.isRequired,
};

Signin.defaultProps = {
  firstname: '',
  lastname: '',
};

export default Signin;
