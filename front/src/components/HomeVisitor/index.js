import React from 'react';

import Slideshow from './Slideshow/Slideshow';
import FeaturesSplit from './FeaturesSplit/FeaturesSplit';
import './homeVisitor.scss';

const HomeVisitor = () => (
  <div className="home-visitor">
    {/* Slideshow Images/Text */}
    <Slideshow />
    <FeaturesSplit />

  </div>
);
export default HomeVisitor;
