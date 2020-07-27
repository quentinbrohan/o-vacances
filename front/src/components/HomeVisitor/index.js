import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/elements/Button';
import { Helmet } from 'react-helmet';

// import Loading from 'src/components/Loading';
import Slideshow from './Slideshow/Slideshow';
import FeaturesSplit from './FeaturesSplit/FeaturesSplit';
import './homeVisitor.scss';

const HomeVisitor = () => (
  <main className="home-visitor">
    <Helmet>
      <title>Planifier de somptueux voyages</title>
      <meta name="description" content="Homepage visiteur montrant les fonctionnalités de l'application" />
    </Helmet>
    <div className="connection-container" />
    {/* Slideshow Images/Text */}
    <Slideshow />
    <FeaturesSplit />
    <div className="cta-container">
      <Button color="secondary" haveClassName="button-home-signin">
        <Link to="/signin">Je m'inscris</Link>
      </Button>
    </div>
  </main>
);
export default HomeVisitor;
