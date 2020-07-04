import React from 'react';

import {
  GitHub,
  Linkedin,
  Link,
  UserPlus,
} from 'react-feather';
import './Team.scss';

const Team = () => (
  <article className="team-cards">
    <div className="team-card">
      <img src="" alt="" />
      <h2>Nom Prénom</h2>
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
    </div>
  </article>
);

export default Team;
