/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// import {
//   GitHub,
//   Linkedin,
//   Link,
// } from 'react-feather';

import teamData from 'src/data/teamData';
import Card from './Card';

import './Team.scss';

// Component to present the team

const Team = () => (
  <main className="team">
    <Helmet>
      <title>L'équipe</title>
      <meta name="description" content="L'équipe qui a réalisé O'Vacances" />
    </Helmet>
    <h1>L'équipe</h1>
    <div className="team-cards">
      {teamData.map((dev) => (
        <Card {...dev} key={dev.name} />
      ))}
      {/* {persons.map((person) => (
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
                  <a href={person.github} rel="noopener noreferrer" target="_blank"><GitHub /></a>
                </li>

                )}
                {(person.linkedin.length > 1) && (
                <li>
                  <a href={person.linkedin} rel="noopener noreferrer" target="_blank"><Linkedin /></a>
                </li>
                )}
                {(person.portfolio.length > 1) && (
                <li>
                  <a href={person.portfolio} rel="noopener noreferrer" target="_blank"><Link /></a>
                </li>
                )}
              </ul>
            </div>
          </div>
        </article>
      ))} */}
    </div>
  </main>
);

Team.propTypes = {
  // persons: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     name: PropTypes.string.isRequired,
  //   }),
  // ).isRequired,

};
export default Team;
