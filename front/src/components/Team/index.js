/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';

import {
  GitHub,
  Linkedin,
  Link,
} from 'react-feather';

import './Team.scss';

// Component to present the team

const Team = ({ persons }) => (
  <div className="team">
    <h1>L'équipe</h1>
    <div className="team-cards">
      {persons.map((person) => (
        <article className="team-card" key={person.name}>
          <header
            style={{ backgroundImage: `url(${person.picture})` }}
            className="team-card-header"
          />
          <div className="team-card-body">
            <h4>{person.name}</h4>
            <div className="body-content">
              <p className="role">
                {person.role}
              </p>
              <ul className="links">
                {(person.github.length > 1) && (
                <li>
                  <a href={person.github}><GitHub /></a>
                </li>

                )}
                {(person.linkedin.length > 1) && (
                <li>
                  <a href={person.Linkedin}><Linkedin /></a>
                </li>
                )}
                {(person.portfolio.length > 1) && (
                <li>
                  <a href={person.portfolio}><Link /></a>
                </li>
                )}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

Team.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,

};
export default Team;
