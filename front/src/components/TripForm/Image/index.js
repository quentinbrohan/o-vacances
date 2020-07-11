/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import : npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './image.scss';

// == Composant
const Image = ({ onChangeImage }) => {
  const [image, setImage] = useState({
    file: '',
    imagePreviewUrl: '',
  });
  const { imagePreviewUrl } = image;

  const handleChange = (evt) => {
    onChangeImage(evt.target.value);

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

  return (

    <div className="field">
      <label
        htmlFor="field-image"
        className="field-label"
      >
        Image de couverture voyage
      </label>
      {(imagePreviewUrl) && (
      <img
        src={imagePreviewUrl}
        alt="Prévisualisation"
        className="preview"
      />
      )}
      <input
        type="file"
        className="field-input"
        onChange={handleChange}
      />
    </div>

  );
};

Image.propTypes = {
  onChangeImage: PropTypes.func.isRequired,
};
export default Image;
