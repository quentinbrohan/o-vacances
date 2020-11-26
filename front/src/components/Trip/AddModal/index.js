import React, { useState } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';
import {
  Edit3, MessageSquare, Plus, X,
} from 'react-feather';

import { modalStyles } from 'src/utils/modal';

import Button from '../../elements/Button';

const AddModal = () => {
  const [mode, setMode] = useState('');
  console.log({ mode });

  Modal.setAppElement('div');
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handler = (newMode) => {
    setMode(newMode);
    console.log({ mode });
  };

  return (
    <div>
      <Button color="secondary" size="sm" type="submit">
        <Plus
          className="edit"
          onClick={() => {
            openModal();
          }}
        />{' '}
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Que voulez-vous ajouter?"
        style={modalStyles}
      >
        <span onClick={closeModal}>
          <X />
        </span>
        <h2>Que voulez-vous ajouter?</h2>
        <div className="addModal-actions">
          {mode === '' && (
            <>
              <Action
                icon={<Edit3 />}
                title="Ajouter une activité"
                description="Nouvelle activité selon thème."
                mode="activity"
              />
              <Action
                icon={<MessageSquare />}
                title="Ajouter une suggestion"
                description="Démarrer une nouvelle suggestion"
                mode="suggestion"
              />
            </>
          )}
          {mode === 'activity' && <div>NewActivity</div>}
          {mode === 'suggestion' && <div>NewSuggestion</div>}
        </div>
      </Modal>
    </div>
  );
};

export default AddModal;

const Action = ({
  icon, title, description, mode,
}) => (
  <Button type="secondary">
    <div>{icon}</div>
    <h4>{title}</h4>
    <p>{description}</p>
  </Button>
);

Action.propTypes = {
  icon: Proptypes.node.isRequired,
  title: Proptypes.string.isRequired,
  description: Proptypes.string.isRequired,
  mode: Proptypes.string.isRequired,
};
