import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from 'src/components/elements/Button';
import FeaturesSplit from './FeaturesSplit/FeaturesSplit';
import './homeVisitor.scss';
import Slideshow from './Slideshow/Slideshow';

const HomeVisitor = () => (
  <main className="home-visitor">
    <Helmet>
      <title>Planifier de somptueux voyages</title>
      <meta
        name="description"
        content="Homepage visiteur montrant les fonctionnalités de l'application"
      />
    </Helmet>
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
