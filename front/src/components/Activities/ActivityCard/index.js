import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Calendar,
  MapPin,
  Trash2 as Thrash,
  Circle as Select,
  CheckCircle as Unselect,
} from 'react-feather';

import './activityCard.scss';

const ActivityCard = ({
  id,
  name,
  image,
  startDate,
  endDate,
  location,
  description,
  handleDelete,
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
      setSelected((selected) => [...selected, activityId]);
    }
  };

  const manageDeleteSingle = (id) => {
    console.log(`Suppression de l'activité ${id}`);
  };

  return (
    <article className="activity-card" id={`activite-${id}`}>
      <header
        style={{ backgroundImage: `url(${image})` }}
        className="activity-card-header"
      />
      <div className="activity-card-body">
        <div className="body-content">
          <h4>{name}</h4>
          <div className="date">
            <Calendar />
            <p>
              Du {startDate} au {endDate}
            </p>
          </div>
          <div className="location">
            <MapPin />
            <p>
              {location}
            </p>
          </div>
          <p className="description">{description}</p>
        </div>
        <div className="activity-cta">
          <button type="button">
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
          </button>
          <button type="button">
            <Thrash
              className="delete"
              onClick={() => manageDeleteSingle(id)}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

ActivityCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ActivityCard;
