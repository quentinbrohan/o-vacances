/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';
import features from 'src/data/HomeVisitorFeaturesData';
import './featuresSplit.scss';

const FeaturesSplit = () => (
  <section className="features-split" id="fonctionnalites">
    <h2 className="title">Le complexe rendu simple</h2>
    <p>Grâce à ses nombreuses fonctionnalités, O'Vacances m'aide tout au long de mon voyage.</p>
    <div className="split">
      {features.map((feature, index) => (
        <Feature
          title={feature.title}
          description={feature.description}
          image={feature.image}
          comingSoon={feature.comingSoon}
          index={index}
          key={index}
        />
      ))}
    </div>
  </section>
);

export default FeaturesSplit;

export const Feature = ({
  title, description, image, comingSoon, index,
}) => (
  <div className={`split-item${index > 0 && index % 2 === 1 ? '-inverted' : ''}`}>
    <div className="split-item-content">
      <h3>{title}</h3>
      {comingSoon && <p className="coming-soon">Prochainement</p>}

      <p>{description}</p>
    </div>
    <div className="split-item-image">
      <img src={image} alt={title} />
    </div>
  </div>
);

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
  comingSoon: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
