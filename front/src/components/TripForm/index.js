import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';
import Image from './Image';

import './tripForm.scss';

const TripForm = ({ addImagePreview }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // IMAGE
    // TODO: do something with state.file
    handleTripForm();
  };

  return (
    <div className="trip-edit">
      <h1>Mon nouveau voyage</h1>
      <form className="trip-edit-element" onSubmit={handleSubmit}>
        <Image
          className="trip-edit-image"
          onChangeImage={addImagePreview}
        />
        <Field
          name="title"
          placeholder="Nom du voyage"
        />
        <Field
          name="description"
          placeholder="Description du voyage"
          type="text"
        />
        <Field
          name="start-date"
          type="date"
          placeholder="Date de départ prévue"
        />
        <Field
          name="end-date"
          type="date"
          placeholder="Date de retour prévue"
        />
        <Field
          name="password"
          type="password"
          placeholder="Mot de passe du voyage"
        />
        <button
          type="submit"
          className="trip-form-button"
        >
          J'ajoute un voyage
        </button>
      </form>
    </div>
  );
};

TripForm.propTypes = {
  addImagePreview: PropTypes.func.isRequired,
};

export default TripForm;
