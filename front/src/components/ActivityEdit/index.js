import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';
import Modal from 'react-modal';

import { Edit2 } from 'react-feather';

import Field from './Field';

import FieldSelect from './FieldSelect';

import './activityEdit.scss';

const ActivityEdit = ({
  Id,
  changeField,
  activityTitle,
  activityDescription,
  activityStartDate,
  activityEndDate,
  activityCategory,
  handleEditActivity,
  activities,
  checkActivityId,
  clearField,
}) => {
  Modal.setAppElement('div');
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    clearField();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getActivityById = () => (
    activities.find((activity) => (activity.id === Id))
  );
  const handleCheckActivity = () => (
    checkActivityId(Id)
  );

  const activity = getActivityById(activities, Id);

  return (
    <div className="activity-edit">
      <Edit2
        className="edit"
        onClick={() => {
          handleCheckActivity();
          openModal();
        }}
      />
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
        <span
          className="activity-edit-button-close"
          onClick={closeModal}
        >x
        </span>
        <h2 ref={subtitle}>Modifier cette activité</h2>

        <form
          className="activity-edit-element"
          onSubmit={() => {
            handleSubmit();
          }}
        >
          <Field
            name="activityTitle"
            placeholder={activity.title}
            onChange={changeField}
            value={activityTitle}
            type="text"
            labelTitle="Activité"
          />
          <FieldSelect
            name="activityCategory"
            onChange={changeField}
            value={activityCategory}
            labelTitle="Catégorie"
          />
          <Field
            name="activityStartDate"
            placeholder={activity.startDate}
            type="date"
            onChange={changeField}
            value={activityStartDate}
            labelTitle="Date de début"
          />

          <Field
            name="activityEndDate"
            placeholder={activity.endDate}
            type="date"
            onChange={changeField}
            value={activityEndDate}
            labelTitle="Date de fin"
          />
          <Field
            name="activityDescription"
            type="textarea"
            placeholder={activity.description}
            onChange={changeField}
            value={activityDescription}
            labelTitle="Description"
          />
        </form>
        <Button
          className="activity-edit-button"
          onClick={() => {
            handleEditActivity();
            closeModal();
          }}
        >Modifier
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
  activityDescription: PropTypes.string,
  handleEditActivity: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
  Id: PropTypes.number.isRequired,
  checkActivityId: PropTypes.func.isRequired,
  clearField: PropTypes.func.isRequired,
};

ActivityEdit.defaultProps = {
  activityDescription: '',
};
export default ActivityEdit;
