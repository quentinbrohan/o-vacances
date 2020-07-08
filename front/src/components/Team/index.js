import React from 'react';
import PropTypes from 'prop-types';

import {
  GitHub,
  Linkedin,
  Link,
  UserPlus,
} from 'react-feather';

import './Team.scss';

// Component to present the team

const Team = ({ persons }) => (
  <div className="team">
    <h2>L'équipe</h2>
    <div className="team-cards">
      {/* {persons.map((person) => (
        <article key={person.name} className="team-card">
          <div className="team-card-img">
            <img src={person.picture} alt={person.name} />
          </div>
          <div className="team-card-text">
            <h3>{person.name}</h3>
            <p>
              {person.role}
            </p>
            <ul>
              <li>
                <a href={person.linkedin}><Linkedin /></a>
              </li>
              <li>
                <a href={person.github}><GitHub /></a>
              </li>
              <li>
                <a href={person.portfolio}><Link /></a>
              </li>
              <li>
                <a href="#"><UserPlus /></a>
              </li>
            </ul>
          </div>
        </article>
      ))} */}
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
                <li>
                  <a href={person.github}><GitHub /></a>
                </li>
                <li>
                  <a href={person.Linkedin}><Linkedin /></a>
                </li>
                <li>
                  <a href={person.portfolio}><Link /></a>
                </li>
                <li>
                  <a href="#"><UserPlus /></a>
                </li>
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
