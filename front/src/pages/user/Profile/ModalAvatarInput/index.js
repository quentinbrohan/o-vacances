import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { success as toastSuccess } from 'react-toastify-redux';
import { ReactComponent as AvatarDefault } from 'src/assets/svg/user.svg';
import FormInput from 'src/components/FormInput';
import ModalWrapper from 'src/components/ModalWrapper';
import { API_URL } from 'src/constants';
import { useEditUserAvatarMutation } from 'src/services/user';
import './modalAvatarInput.scss';

const ModalAvatarInput = ({ register, error, avatar }) => {
  const dispatch = useDispatch();

  const [imagePreviewUrl, setImagePreviewurl] = useState(avatar || '');

  const onChange = (e) => {
    const file = e.target.files;
    setImagePreviewurl(URL.createObjectURL(file[0]));
  };

  const [editUserAvatar, { isLoading, isSuccess }] = useEditUserAvatarMutation();

  const [editError, setEditError] = useState('');

  const onCancel = () => {
    setImagePreviewurl(avatar);
  };

  const onSubmit = () => {
    editUserAvatar()
      .then((res) => {
        if (res.data) {
          dispatch(toastSuccess('Avatar mis à jour.'));
        }
        if (res.error) {
          setEditError('Erreur dans la requête.');
        }
      })
      .catch((err) => {
        if (err) {
          console.warn({ err });
          setEditError('Erreur dans la requête.');
        }
      });
  };

  return (
    <div className="profile-avatar-default-img">
      {avatar ? (
        <img className="profile-avatar-default-img-picture" src={API_URL + avatar} alt={avatar} />
      ) : (
        <AvatarDefault className="profile-avatar-default-img-picture" />
      )}
      <ModalWrapper
        iconText="Modifier"
        isEditMode
        title="Modifier ma photo"
        onCancel={onCancel}
        onConfirm={onSubmit}
        onConfirmLoading={isLoading}
        onConfirmError={editError}
        onSuccess={isSuccess}
      >
        <div className="field">
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl.startsWith('blob') ? imagePreviewUrl : API_URL + avatar}
              alt="Prévisualisation"
              className="previewAvatarInput"
            />
          ) : (
            <AvatarDefault className="previewAvatarInput" />
          )}
          <FormInput
            id="profileAvatarInput"
            name="profileAvatarInput"
            type="file"
            accept="image/*"
            register={register}
            error={error}
            onChange={onChange}
          />
        </div>
      </ModalWrapper>
    </div>
  );
};

ModalAvatarInput.propTypes = {
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
  avatar: PropTypes.string,
};

ModalAvatarInput.defaultProps = {
  avatar: '',
  error: null,
};

export default ModalAvatarInput;
