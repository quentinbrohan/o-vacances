import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';
import Modal from 'react-modal';

import { Edit2 } from 'react-feather';

import Field from './Field';

import FieldSelect from './FieldSelect';

import './activityEdit.scss';

const ActivityEdit = ({
  activityId,
  changeField,
  activityTitle,
  activityDescription,
  activityStartDate,
  activityEndDate,
  activityCategory,
  handleEditActivity,
  activities,
}) => {
  Modal.setAppElement('div');
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  console.log(activityId);
  console.log(activities);

  const getActivityById = (activities, activityId) => {
    activities.find((activity) => (activity.id === activityId));
  };

  const activity = getActivityById(activities, activityId);

  return (

    <div className="activity-edit">
      <Edit2 className="edit" onClick={openModal} />
      <Modal
        className="activity-edit-modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <span className="activity-edit-button-close" onClick={closeModal}>x</span>
        <h2 ref={subtitle}>Modifier cette activité</h2>

        <form className="activity-edit-element" onSubmit={handleSubmit}>
          <Field
            name="activityTitle"
            placeholder={activity.title}
            onChange={changeField}
            value={activityTitle}
            type="text"
          />
          <FieldSelect
            name="activityCategory"
            placeholder="Catégorie"
            onChange={changeField}
            value={activityCategory}
          />
          <Field
            name="activityStartDate"
            placeholder="Date de début"
            type="date"
            onChange={changeField}
            value={activityStartDate}
          />

          <Field
            name="activityEndDate"
            placeholder="Date de fin"
            type="date"
            onChange={changeField}
            value={activityEndDate}
          />
          <Field
            name="activityDescription"
            type="textarea"
            placeholder="On fait quoi?"
            onChange={changeField}
            value={activityDescription}
          />
        </form>
        <Button
          className="activity-edit-button"
          onClick={() => {
            handleEditActivity();
            closeModal();
          }}
        >j'ajoute
        </Button>
      </Modal>
    </div>

  );
};

ActivityEdit.propTypes = {
  changeField: PropTypes.func.isRequired,
  activityTitle: PropTypes.string.isRequired,
  activityCategory: PropTypes.string.isRequired,
  activityStartDate: PropTypes.string.isRequired,
  activityEndDate: PropTypes.string.isRequired,
  activityDescription: PropTypes.string.isRequired,
  handleEditActivity: PropTypes.func.isRequired,

};

export default ActivityEdit;
