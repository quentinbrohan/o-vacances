import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from 'src/components/elements/Button';
import Field from './Field';
import './tripAuth.scss';

const TripAuth = ({
  isAuthenticated,
  handleTripAuth,
  changeField,
  password,
  tripId,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleTripAuth(tripId);
  };

  return (
    <div className="trip-auth">
      <div className="trip-auth-container">
        <h1>L'accès au voyage nécessite une autorisation !</h1>
        <p className="introduction">
          La page à laquelle vous tentez d'accéder nécessite une vérification.
          Si c'est la première fois que vous vous connectez c'est normal:
          il est nécessaire d'entrer le mot de passe*
          défini par le modérateur du voyage.
        </p>
        <p className="disclaimer">
          * Une fois l'authentification réussie vous avez accès au voyage car y étant participant,
          et le mot de passe n'est plus requis/demandé.
        </p>
        <div className="helper">
          <hr />
          {isAuthenticated && (
            <form
              className="trip-auth-form-element"
              onSubmit={handleSubmit}
            >
              <Field
                name="password"
                type="password"
                placeholder="Mot de passe du voyage"
                onChange={changeField}
                value={password}
                required
              />
              <Button
                color="primary"
                type="submit"
                haveClassName="trip-auth-form-button"
              >
                Authentification
              </Button>
            </form>
          )}
          {!isAuthenticated && (
            <p>
              Déjà un compte ? <Link to="/login">Connexion</Link>.
            </p>

          )}
          <hr />
          <p>
            Pas encore inscrit ? Tes amis n'attendent plus que toi ! <Link to="/signin">Inscription</Link>.
          </p>
        </div>

      </div>
    </div>
  );
};

TripAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleTripAuth: PropTypes.func.isRequired,
  tripId: PropTypes.number.isRequired,
  changeField: PropTypes.func.isRequired,
  password: PropTypes.string,
};

TripAuth.defaultProps = {
  password: '',
};

export default TripAuth;
