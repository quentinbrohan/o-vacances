import React, { useState } from 'react';
import Button from 'src/components/elements/Button';
import Modal from 'react-modal';

import Field from './Field';

import './activityForm.scss';

const ActivityForm = () => {
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
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          },
        }}
      >

        <h2 ref={subtitle}>Nouvelle activité</h2>

        <form className="activity-form-element" onSubmit="">
          <Field
            name="Activité"
            placeholder="Activité"

          />
          <Field
            name="start-date"
            placeholder="Date de début"
            type="date"

          />
          <Field
            name="end-date"
            placeholder="Date de fin"
            type="date"
          />
          <Field
            name="lieux"
            type="adress"
            placeholder="Lieu"
            // onChange={changeField}
            // value={password}
          />
          <Field
            name="description"
            type="textarea"
            placeholder="On fait quoi?"
            // onChange={changeField}
            // value={password}
          />
        </form>
        <Button onClick={closeModal}>j'ajoute</Button>
      </Modal>
    </div>

  );
};

export default ActivityForm;
