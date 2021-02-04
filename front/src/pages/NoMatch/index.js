import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/elements/Button';
import { Helmet } from 'react-helmet';

import './noMatch.scss';

const NoMatch = () => (
  <main className="no-match">
    <Helmet>
      <title>Page non trouvée</title>
      <meta name="description" content="Page non trouvée" />
    </Helmet>
    <div className="connection-container" />
    <h1 className="error-name">404</h1>
    <p>Oups, il n'y a rien ici. La page a peut être été déplacée ou supprimée.</p>
    <Button color="primary" haveClassName="homeButton">
      <Link to="/">Retourner à l'accueil</Link>
    </Button>
  </main>
);

export default NoMatch;
