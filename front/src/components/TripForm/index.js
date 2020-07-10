import React from 'react';

import Field from './Field';

import './tripForm.scss';

const TripForm = () => (
  <div className="trip-form">
    <h1>Mon nouveau voyage</h1>
    <form className="trip-form-element">
      <Field
        name="Image"
        placeholder="Image"
        type="file"
        accept="image/png, image/jpeg"
      />
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

export default TripForm;
