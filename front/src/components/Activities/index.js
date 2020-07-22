import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';
import { Link } from 'react-router-dom';

import ActivityForm from 'src/containers/ActivityForm';

import ActivityCard from './ActivityCard';
import './activities.scss';

const Activities = ({ activities }) => {
  const handleDelete = (selected) => {
    console.log(`Suppression des activités ${selected}`);
  };

  return (
    <main className="trip-activities">
      <div className="head">
        <h1>Activités</h1>
        <div className="cta">
          <ActivityForm
            color="primary"
            size="sm"
          >
            Ajouter une activité
          </ActivityForm>
          <Button
            color="primary"
            size="sm"
            onClick={handleDelete}
          >
            Supprimer des activités
          </Button>
        </div>
      </div>
      <div className="activities-list">
        {activities.map((activity) => (
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

Activities.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default Activities;
