import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Calendar,
  // MapPin,
  Trash2 as Thrash,
  Circle as Select,
  CheckCircle as Unselect,
} from 'react-feather';
import Button from 'src/components/elements/Button';

import ActivityEdit from 'src/containers/ActivityEdit';

import './activityCard.scss';

const ActivityCard = ({
  id,
  title,
  image,
  startDate,
  endDate,
  description,
  deleteActivity,
  checkActivityId,
}) => {
  // Selected activities
  const [selected, setSelected] = useState([]);
  // Check if current activity is selected
  const isSelected = (activityId) => selected.includes(activityId);

  // Handle selector (add/remove) activity from selected
  const manageSelect = (activityId) => {
    if (isSelected(activityId)) {
      setSelected(selected.filter((selectedIds) => (selectedIds !== activityId)));
    }
    else {
      setSelected(() => [...selected, activityId]);
    }
  };

  // const manageDeleteSingle = () => {
  //   console.log(`Suppression de l'activité ${id}`);
  // };

  const handleCheckActivity = () => (
    checkActivityId(id)
  );

  return (
    <article className="activity-card" id={`activite-${id}`}>
      <header
        style={{ backgroundImage: `url(${image})` }}
        className="activity-card-header"
      />
      <div className="activity-card-body">
        <div className="body-content">
          <h4>{title}</h4>
          <div className="date">
            <Calendar />
            <p>
              Du {moment(startDate).format('ll')} au {moment(endDate).format('ll')}
            </p>
          </div>
          {/* <div className="location">
           <MapPin />
            <p>
              Situation
            </p>
            </div> */}
          <p className="description">{description}</p>
        </div>
        <div className="activity-cta">
          <Button color="secondary" size="sm">
            {isSelected(id) ? (
              <Unselect
                className="selector--selected"
                onClick={() => manageSelect(id)}
              />
            )
              : (

                <Select
                  className="selector"
                  onClick={() => manageSelect(id)}
                />

              )}
          </Button>
          <Button color="secondary" size="sm">
            <Thrash
              className="delete"
              onClick={() => {
                handleCheckActivity();
                deleteActivity();
              }}
            />
          </Button>
          <Button>
            <ActivityEdit
              className="edit"
              color="secondary"
              size="sm"
              Id={id}
            />
          </Button>

        </div>
      </div>
    </article>
  );
};

ActivityCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  checkActivityId: PropTypes.func.isRequired,
};

export default ActivityCard;
