import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Calendar,
  // MapPin,
  Circle,
  CheckCircle,
  Edit,
  Trash2 as Thrash,
} from 'react-feather';

import Button from 'src/components/elements/Button';
import ActivityEdit from 'src/containers/ActivityEdit';
import { toDate } from 'src/utils/format';
import { API_URL } from 'src/constants';
import './activityCard.scss';

const ActivityCard = ({
  id,
  title,
  startDate,
  endDate,
  description,
  deleteActivity,
  checkActivityId,
  category,
}) => {
  // Selected activities
  const [selected, setSelected] = useState([]);
  // Check if current activity is selected
  const isSelected = (activityId) => selected.includes(activityId);

  // Handle selector (add/remove) activity from selected
  const manageSelect = (activityId) => {
    if (isSelected(activityId)) {
      setSelected(selected.filter((selectedIds) => selectedIds !== activityId));
    }
    else {
      setSelected(() => [...selected, activityId]);
    }
  };

  // const manageDeleteSingle = () => {
  //   console.log(`Suppression de l'activité ${id}`);
  // };

  const handleCheckActivity = () => checkActivityId(id);

  return (
    <article className="activity-card" id={`activite-${id}`}>
      <header
        style={{ backgroundImage: `url(${API_URL + category.image})` }}
        className="activity-card-header"
      />
      <div className="activity-card-body">
        <div className="body-content">
          <h4>{title}</h4>
          <div className="date">
            <Calendar />
            <p>
              Du {toDate(startDate)} au {toDate(endDate)}
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
          {isSelected(id) ? (
            <Button
              color="secondary"
              className="cta-select"
              onClick={() => manageSelect(id)}
            >
              <CheckCircle />
            </Button>
          ) : (
            <Button
              color="secondary"
              className="cta-unselect"
              onClick={() => manageSelect(id)}
            >
              <Circle />
            </Button>
          )}

          <Button color="secondary" className="cta-edit">
            {/* TODO: Rewrite ActivityEdit */}
            {/* <ActivityEdit
              color="secondary"
              size="sm"
              Id={id}
            /> */}
            <Edit />
          </Button>

          <Button
            color="secondary"
            className="cta-delete"
            onClick={() => {
              handleCheckActivity();
              deleteActivity();
            }}
          >
            <Thrash />
          </Button>
        </div>
      </div>
    </article>
  );
};

ActivityCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  checkActivityId: PropTypes.func.isRequired,
  category: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ActivityCard;
