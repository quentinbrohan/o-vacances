import React, { useState } from 'react';
import Button from 'src/components/elements/Button';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { ReactComponent as AvatarDefault } from 'src/assets/svg/user.svg';

import './profileImage.scss';

const ProfileImage = ({
  avatar,
  name,
  firstname,
  onChangeImage,
  onChange,
  handleEditUser,
}) => {
  Modal.setAppElement('div');
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const [image, setImage] = useState({
    file: '',
    imagePreviewUrl: '',
  });
  const { imagePreviewUrl } = image;

  const handleChange = (evt) => {
    onChangeImage(evt.target.value);
    onChange(evt.target.value, name);

    const reader = new FileReader();
    const file = evt.target.files[0];

    reader.onloadend = () => {
      setImage({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  console.log(avatar);
  return (
    <div className="profile-head-img">
      { avatar === null ? (<AvatarDefault className="profile-head-img-picture" />) : (<img className="profile-head-img-picture" src={avatar} alt={firstname} />)}
      <Button color="primary" onClick={openModal}>Modifier la photo</Button>

      <Modal
        className="profile-image-modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          },
        }}
      >
        <span className="profile-image-button-close" onClick={closeModal}>x</span>
        <h4>Previsualiser sa photo</h4>
        <div className="field">
          {(imagePreviewUrl) && (
          <img
            src={imagePreviewUrl}
            alt="Prévisualisation"
            className="preview"
          />
          )}
          <input
            type="file"
            id="profile-field-input"
            onChange={handleChange}
          />
        </div>
        <Button
          className="profile-image-button"
          onClick={() => {
            handleEditUser();
            closeModal();
          }}
        >MODIFIER LA PHOTO
        </Button>
      </Modal>
    </div>
  );
};
ProfileImage.propTypes = {
  name: PropTypes.string,
  firstname: PropTypes.string.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleEditUser: PropTypes.func.isRequired,
};

ProfileImage.defaultProps = {
  name: AvatarDefault,

};

export default ProfileImage;
