import React from 'react';
import Button from 'src/components/elements/Button';

const Activities = () => {
  console.log('activities');

  return (
    <main className="trip-activities">
      <div />
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
        >
          Supprimer une/des activités
        </Button>
      </div>
    </main>
  );
};

export default Activities;
