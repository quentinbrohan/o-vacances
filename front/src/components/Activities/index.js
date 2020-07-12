import React from 'react';
import Button from 'src/components/elements/Button';

import tripData from 'src/data/tripData';
import ActivityCard from './ActivityCard';

import './activities.scss';

const Activities = () => {
  const handleDelete = (selected) => {
    console.log(`Suppression des activités ${selected}`);
  };

  return (
    <main className="trip-activities">
      <div className="head">
        <h1>Activités</h1>
        <div className="cta">
          <Button
            color="primary"
            size="sm"
          >
            Ajouter une activité
          </Button>
          <Button
            color="primary"
            size="sm"
            onClick={() => handleDelete()}
          >
            Supprimer des activités
          </Button>
        </div>
      </div>
      <div className="activities-list">
        {tripData.activities.map((activity) => (
          <ActivityCard
            {...activity}
            key={activity.id}
            manageDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
};

export default Activities;
