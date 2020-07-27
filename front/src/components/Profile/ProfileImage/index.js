import React, { useState } from 'react';
import Button from 'src/components/elements/Button';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { ReactComponent as AvatarDefault } from 'src/assets/svg/user.svg';

import { API_URL } from 'src/helpers';
import './profileImage.scss';

const ProfileImage = ({
  avatar,
  name,
  firstname,
  onChangeImage,
  // onChange,
  handleEditUserImage,
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
    imagePreviewUrl: avatar.length !== '' ? avatar : '',
  });
  const { imagePreviewUrl } = image;

  const handleChange = (evt) => {
    // Check if filesize < 3 Mo
    const FileSize = evt.target.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 3) {
      alert('L\'image doti faire moins de 3 Mo !');
      document.querySelector('#profile-field-input.profile-image').value = null;
    }
    else {
      onChangeImage(evt.target.files[0]);

      const reader = new FileReader();
      const file = evt.target.files[0];

      reader.onloadend = () => {
        setImage({
          file,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-head-img">
      { avatar ?  (<img className="profile-head-img-picture" src={API_URL + avatar} alt={firstname} />) : (<AvatarDefault className="profile-head-img-picture" />)}
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
            className="profile-image"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <Button
          className="profile-image-button"
          onClick={() => {
            handleEditUserImage();
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
  avatar: PropTypes.string,
  firstname: PropTypes.string.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  handleEditUserImage: PropTypes.func.isRequired,
};

ProfileImage.defaultProps = {
  name: AvatarDefault,
  avatar: '',
};

export default ProfileImage;
