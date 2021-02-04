import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Edit, HelpCircle, Plus, Trash2 as Trash, X,
} from 'react-feather';
import Modal from 'react-modal';
import Button from 'src/components/elements/Button';
import { modalStyles } from './modalStyles';
import './modalWrapper.scss';

// Bind modal to App element
Modal.setAppElement('#root');

const ModalWrapper = ({
  // Reusability && form reset
  isEditMode,
  isArchived,
  // Content
  title,
  children,
  // Icon
  iconText,
  iconType,
  // Actions
  onCancel,
  onConfirmColor,
  onConfirm,
  onConfirmLoading,
  onConfirmError,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (onSuccess) {
      setIsOpen(false);
    }
  }, [onSuccess]);

  const openCloseModal = (action) => {
    setIsOpen(action);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const IconType = () => {
    switch (iconType) {
      case 'ADD':
        return <Plus />;
      case 'EDIT':
        return <Edit />;
      case 'DELETE':
        return <Trash />;
      case 'HELP':
        return <HelpCircle />;
      default:
        return <Plus />;
    }
  };

  return (
    <>
      <Button color="secondary" className="inline" onClick={() => openCloseModal(true)}>
        {iconText}
        {iconType && <IconType />}
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => openCloseModal(false)}
        style={modalStyles}
        portalClassName="ReactModalPortal"
        contentLabel={title}
      >
        <div className="header">
          <h5>{title}</h5>

          <Button
            color="secondary"
            className="inline"
            onClick={() => openCloseModal(false)}
            haveClassName="close"
          >
            <X />
          </Button>
        </div>
        {isOpen && <div className="content">{children}</div>}
        {iconType !== 'HELP' && (
          <div className="actions">
            <Button
              color="secondary"
              size="sm"
              onClick={() => handleCancel()}
              disabled={isArchived}
            >
              Annuler
            </Button>
            <Button
              id="rhf-form"
              type="submit"
              color={onConfirmColor}
              size="sm"
              onClick={() => handleConfirm()}
              loading={onConfirmLoading}
              disabled={isArchived}
            >
              {isEditMode ? 'Modifier' : 'Confirmer'}
            </Button>
          </div>
        )}
        {onConfirmError && <div className="error">{onConfirmError}</div>}
      </Modal>
    </>
  );
};

ModalWrapper.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  isArchived: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  iconText: PropTypes.string,
  iconType: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirmColor: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onConfirmLoading: PropTypes.bool.isRequired,
  onConfirmError: PropTypes.string,
  onSuccess: PropTypes.bool.isRequired,
};

ModalWrapper.defaultProps = {
  isArchived: false,
  title: '',
  iconText: '',
  iconType: null,
  onCancel: null,
  onConfirmColor: 'primary',
  onConfirmError: null,
};

export default ModalWrapper;
