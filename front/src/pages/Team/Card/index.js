import PropTypes from 'prop-types';
import React from 'react';
import { GitHub, Link, Linkedin } from 'react-feather';
import Tilt from 'react-tilt';
import './card.scss';

// TODO: card's width based on window size
const Card = ({
  name, picture, roles, linkedin, github, portfolio,
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
        <h2 className="roles">{roles.map((role) => role).join(', ')}</h2>
        <ul className="links">
          {github.length > 1 && (
            <li>
              <a href={github} rel="noopener noreferrer" target="_blank">
                <GitHub />
              </a>
            </li>
          )}
          {linkedin.length > 1 && (
            <li>
              <a href={linkedin} rel="noopener noreferrer" target="_blank">
                <Linkedin />
              </a>
            </li>
          )}
          {portfolio.length > 1 && (
            <li>
              <a href={portfolio} rel="noopener noreferrer" target="_blank">
                <Link />
              </a>
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
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  portfolio: PropTypes.string,
};

Card.defaultProps = {
  linkedin: '',
  github: '',
  portfolio: '',
};

export default Card;
