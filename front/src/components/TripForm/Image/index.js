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
    name: '',
    imagePreviewUrl: '',
  });
  const { imagePreviewUrl } = image;

  const handleChange = (evt) => {
    // Check if filesize < 3 Mo
    const FileSize = evt.target.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 3) {
      alert('L\'image doit faire moins de 3 Mo !');
      document.querySelector('#tripForm-image').value = null;
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
        id="tripForm-image"
        accept="image/*"
      />
    </div>

  );
};

Image.propTypes = {
  onChangeImage: PropTypes.func.isRequired,
};
export default Image;
