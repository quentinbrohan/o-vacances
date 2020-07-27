import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';
import ActivityForm from 'src/containers/ActivityForm';
import { Helmet } from 'react-helmet';

import ActivityCard from './ActivityCard';
import './activities.scss';

const Activities = ({ activities, deleteActivity, checkActivityId }) => {
  const handleDelete = (selected) => {
    console.log(`Suppression des activités ${selected}`);
  };

  return (
    <main className="trip-activities">
      <Helmet>
        <title>Activités</title>
        <meta name="description" content="Activités" />
      </Helmet>
      <div className="connection-container" />
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
            deleteActivity={deleteActivity}
            checkActivityId={checkActivityId}
          />
        ))}
      </div>
    </main>
  );
};

Activities.propTypes = {
  activities: PropTypes.array.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  checkActivityId: PropTypes.func.isRequired,
};

export default Activities;
