/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import : npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// == Import : local
import { API_URL } from 'src/helpers';
import './image.scss';

// == Composant
const Image = ({
  onChangeImage,
  image,
}) => {
  const [currentImage, setCurrentImage] = useState({
    file: '',
    imagePreviewUrl: image ? (API_URL + image) : '',
  });
  const { imagePreviewUrl } = currentImage;

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
        setCurrentImage({
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
        id="tripEdit-image"
        accept="image/*"
      />
    </div>

  );
};

Image.propTypes = {
  onChangeImage: PropTypes.func.isRequired,
  image: PropTypes.string,
};

Image.defaultProps = {
  image: '',
};

export default Image;
