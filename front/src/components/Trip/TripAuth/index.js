import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './tripAuth.scss';

const TripAuth = () => {
  console.log('tripAuth');

  return (
    <div className="trip-auth">
      <div className="trip-auth-container">
        <h1>L'accès au voyage nécessite une autorisation !</h1>
        <p className="introduction">
          La page auquelle vous tentez d'accéder nécessite une vérification.
          Si c'est la première fois que vous vous connectez c'est normal:
          il est nécessaire d'entrer le mot de passe*,
          défini par le modérateur du voyage.
        </p>
        <p className="disclaimer">
          * Une fois l'authentification réussie vous avez accès au voyage car y étant participant,
          et le mot de passe n'est plus requis/demandé.
        </p>
        <div className="helper">
          <hr />
          <p>
            Pas encore inscrit ? Tes amis n'attendent plus que toi ! <Link to="/signin">Inscription</Link>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TripAuth;
