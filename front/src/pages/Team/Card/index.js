/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import Tilt from 'react-tilt';

import {
  GitHub,
  Linkedin,
  Link,
} from 'react-feather';

import './card.scss';

const Card = ({
  name,
  picture,
  role,
  linkedin,
  github,
  portfolio,
  autre,
}) => (
  <Tilt
    className="Tilt"
    options={{
      max: 15,
      perspective: 1000,
      scale: 1,
    }}
  >
    <div className="team-card Tilt-inner">
      <div className="team-card-image-container">
        <div className="image-container">
          <img src={picture} alt={name} className="image" />
        </div>
      </div>
      <div className="team-card-info">
        <h1 className="name">{name}</h1>
        <h2 className="role">{role}</h2>
        <ul className="links">
          {(github.length > 1) && (
          <li>
            <a href={github} rel="noopener noreferrer" target="_blank"><GitHub /></a>
          </li>

          )}
          {(linkedin.length > 1) && (
          <li>
            <a href={linkedin} rel="noopener noreferrer" target="_blank"><Linkedin /></a>
          </li>
          )}
          {(portfolio.length > 1) && (
          <li>
            <a href={portfolio} rel="noopener noreferrer" target="_blank"><Link /></a>
          </li>
          )}
        </ul>
      </div>
    </div>
  </Tilt>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  portfolio: PropTypes.string,
  autre: PropTypes.string,
};

Card.defaultProps = {
  linkedin: '',
  github: '',
  portfolio: '',
  autre: '',
};

export default Card;
