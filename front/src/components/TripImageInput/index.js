/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FormInput from 'src/components/FormInput';
import { API_URL } from 'src/constants';
import './tripImageInput.scss';

const TripImageInput = ({
  register, error, image, isEditForm,
}) => {
  const [imagePreviewUrl, setImagePreviewurl] = useState('');
  const [currentImagePath, SetCurrentImagePath] = useState('');
  const [isEditImageMode, setIsEditImageMode] = useState(false);

  const onChange = (e) => {
    const file = e?.target?.files;
    // if (image) {
    // SetCurrentImagePath(image);
    // }
    if (file) {
      // SetCurrentImagePath('');
      setImagePreviewurl(URL.createObjectURL(file[0]));
    }
  };

  const onClick = () => {
    if (isEditImageMode) {
      setImagePreviewurl('');
      setIsEditImageMode(false);
    }
    else {
      setIsEditImageMode(true);
    }
  };

  useEffect(() => {
    if (image) {
      // onChange(image);
      SetCurrentImagePath(image);
    }
  }, [image]);

  return (
    <div className="tripFormImage-input">
      {currentImagePath && isEditForm && (
        <>
          <label>Couverture actuelle</label>
          <img src={API_URL + currentImagePath} alt="Prévisualisation" className="preview" />
        </>
      )}
      {imagePreviewUrl && isEditForm && (
        <img src={imagePreviewUrl} alt="Prévisualisation" className="preview" />
      )}
      {image && (
        <div className="change-image-check">
          <input
            type="checkbox"
            onClick={onClick}
            checked={isEditImageMode}
            name="editTripImageInput"
          />
          <span>Changer de photo</span>
        </div>
      )}
      {isEditImageMode || !isEditForm ? (
        <FormInput
          id="tripImageInput"
          name="tripImageInput"
          label="Photo de couverture"
          type="file"
          accept="image/*"
          register={register}
          error={error}
          onChange={onChange}
        />
      ) : null}
    </div>
  );
};
TripImageInput.propTypes = {
  register: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  image: PropTypes.string,
  isEditForm: PropTypes.bool.isRequired,
};

TripImageInput.defaultProps = {
  image: '',
};

export default TripImageInput;
