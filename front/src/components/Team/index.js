import React from 'react';
import PropTypes from 'prop-types';

import {
  GitHub,
  Linkedin,
  Link,
  UserPlus,
} from 'react-feather';
import './Team.scss';

const Team = ({ persons }) => (

  <div className="team-cards">
    {persons.map((person) => (
      <article key={person.name} className="team-card">
        <img src="" alt="" />
        <h2>{person.name}</h2>
        <ul>
          <li>
            <Linkedin />
            <a href="#">Linkedin</a>
          </li>
          <li>
            <GitHub />
            <a href="#">Github</a>
          </li>
          <li>
            <Link />
            <a href="#">Lien portfolio</a>
          </li>
          <li>
            <UserPlus />
            <a href="#">Autre</a>
          </li>
        </ul>
      </article>
    ))}
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
