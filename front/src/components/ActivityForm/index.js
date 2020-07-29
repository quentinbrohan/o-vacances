import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';
import Modal from 'react-modal';

import Field from './Field';

import FieldSelect from './FieldSelect';

import './activityForm.scss';

const ActivityForm = ({
  changeField,
  activityTitle,
  activityDescription,
  activityStartDate,
  activityEndDate,
  activityCategory,
  handleAddActivity,
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

  return (

    <div className="activity-form">
      <Button
        color="primary"
        size="sm"
        onClick={openModal}
      >
        Ajouter une activité
      </Button>
      <Modal
        className="activity-form-modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <span className="activity-form-button-close" onClick={closeModal}>x</span>
        <h2 ref={subtitle}>Nouvelle activité</h2>

        <form className="activity-form-element" onSubmit={handleSubmit}>
          <Field
            name="activityTitle"
            placeholder="Activité"
            onChange={changeField}
            value={activityTitle}
            type="text"
            required
          />
          <FieldSelect
            name="activityCategory"
            placeholder="Catégorie"
            onChange={changeField}
            value={activityCategory}
            required
          />
          <Field
            name="activityStartDate"
            placeholder="Date de début"
            type="date"
            onChange={changeField}
            value={activityStartDate}
            required
          />

          <Field
            name="activityEndDate"
            placeholder="Date de fin"
            type="date"
            onChange={changeField}
            value={activityEndDate}
            required

          />
          <Field
            name="activityDescription"
            type="textarea"
            placeholder="On fait quoi ?"
            onChange={changeField}
            value={activityDescription}
          />
        </form>
        <Button
          className="activity-form-button"
          color="primary"
          size="sm"
          onClick={() => {
            handleAddActivity();
            closeModal();
          }}
        >j'ajoute
        </Button>
      </Modal>
    </div>

  );
};

ActivityForm.propTypes = {
  changeField: PropTypes.func.isRequired,
  activityTitle: PropTypes.string.isRequired,
  activityCategory: PropTypes.string.isRequired,
  activityStartDate: PropTypes.string.isRequired,
  activityEndDate: PropTypes.string.isRequired,
  activityDescription: PropTypes.string,
  handleAddActivity: PropTypes.func.isRequired,
  clearField: PropTypes.func.isRequired,

};

ActivityForm.defaultProps = {
  activityDescription: '',
};

export default ActivityForm;
