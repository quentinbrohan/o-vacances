/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import : npm
import React from 'react';

// == Import : local
import './image.scss';

// == Composant
const Image = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: do something with -> this.state.file
  };

  const handleImageChange = (event) => {
    event.preventDefault();
  };

  return (

    <div>
      <img src="" alt="previsualisation" />
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit" onClick={handleSubmit}>Prévisualiser image</button>
      </form>
    </div>

  );
};

export default Image;
