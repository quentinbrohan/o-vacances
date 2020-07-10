/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './image.scss';

// == Composant
const Image = ({ onChangeImage }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: do something with -> this.state.file
  };
  const handleChange = (evt) => {
    onChangeImage(evt.target.value);
  };

  return (

    <div>
      <img src="" alt="previsualisation" />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>Prévisualiser image</button>
      </form>
    </div>

  );
};

Image.propTypes = {
  onChangeImage: PropTypes.func.isRequired,
};
export default Image;
