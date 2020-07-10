import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';
import Image from './Image';

import './tripForm.scss';

const TripForm = ({ addImagePreview }) => (
  <div className="trip-form">
    <h1>Mon nouveau voyage</h1>
    <form className="trip-form-element">
      <Image
        className="trip-form-image"
        onChangeImage={addImagePreview}
      />
      <Field
        name="title"
        placeholder="Nom du voyage"
      />
      <Field
        name="description"
        placeholder="Descritption du voyage"
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
      <button
        type="submit"
        className="trip-form-button"
      >
        J'ajoute un voyage
      </button>
    </form>
  </div>

);

TripForm.propTypes = {
  addImagePreview: PropTypes.func.isRequired,
};

export default TripForm;
