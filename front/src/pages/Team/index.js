import React from 'react';
import { Helmet } from 'react-helmet';
import teamData from 'src/data/teamData';
import Card from './Card';
import './Team.scss';

const Team = () => {
  if (teamData) {
    return (
      <main className="team">
        <Helmet>
          <title>L'équipe</title>
          <meta name="description" content="L'équipe qui a réalisée O'Vacances" />
        </Helmet>
        <h1>L'équipe</h1>

        <div className="team-cards">
          {teamData.map((dev) => (
            <Card {...dev} key={dev.name} />
          ))}
        </div>
      </main>
    );
  }

  return <div>Erreur dans la requête.</div>;
};

export default Team;
