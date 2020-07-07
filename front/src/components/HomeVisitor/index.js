import React from 'react';
import { Link } from 'react-router-dom';

import Slideshow from './Slideshow/Slideshow';
import FeaturesSplit from './FeaturesSplit/FeaturesSplit';
import './homeVisitor.scss';

const HomeVisitor = () => (
  <div className="home-visitor">
    {/* Slideshow Images/Text */}
    <Slideshow />
    <FeaturesSplit />
    <button type="button">
      <Link to="/signin">Je m'inscris</Link>
    </button>

  </div>
);
export default HomeVisitor;
