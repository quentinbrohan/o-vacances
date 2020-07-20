import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';
import Modal from 'react-modal';

import Field from './Field';

import FieldSelect from './FieldSelect';

import './activityForm.scss';

const ActivityForm = ({ changeField, activity }) => {
  Modal.setAppElement('div');
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (

    <div className="activity-form">
      <Button onClick={openModal}>Ajouter une activité</Button>
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

        <form className="activity-form-element" onSubmit="">
          <Field
            name="title"
            placeholder="Activité"
            onChange={changeField}
            value={activity.title}
          />
          <FieldSelect
            name="category"
            placeholder="Catégorie"
            onChange={changeField}
            value={activity.category.title}
          />
          <Field
            name="start-date"
            placeholder="Date de début"
            type="date"
            onChange={changeField}
            value={activity.startDate}
          />

          <Field
            name="end-date"
            placeholder="Date de fin"
            type="date"
            onChange={changeField}
            value={activity.startDate}
          />
          <Field
            name="location"
            type="adress"
            placeholder="Lieu"
            onChange={changeField}
            value={activity.location}
          />
          <Field
            name="description"
            type="textarea"
            placeholder="On fait quoi?"
            onChange={changeField}
            value={activity.description}

          />
        </form>
        <Button className="activity-form-button" onClick={closeModal}>j'ajoute</Button>
      </Modal>
    </div>

  );
};

ActivityForm.propTypes = {
  changeField: PropTypes.func.isRequired,
};

export default ActivityForm;
