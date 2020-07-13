import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/elements/Button';

import './errorPage.scss';

const ErrorPage = () => (
  <main className="error-page">
    <h1 className="error-name">404</h1>
    <p>Oups, il n'y a rien ici. La page a peut être été déplacée ou supprimée.</p>
    <Button color="primary" size="sm" haveClassName="homeButton">
      <Link to="/">Retourner à l'accueil</Link>
    </Button>
  </main>
);

export default ErrorPage;
