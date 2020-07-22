import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';
import Image from './Image';

import './tripEdit.scss';

const TripEdit = ({ addImagePreview }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // todo
    handleTripForm();
  };

  return (
    <main className="trip-edit">
      <h1>Je modifie mon voyage</h1>
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
        <Field
          name="password"
          type="password"
          placeholder="Mot de passe du voyage"
        />
        <button
          type="submit"
          className="trip-edit-button"
        >
          Je modifie mon voyage
        </button>
      </form>
    </main>
  );
};

TripEdit.propTypes = {
  addImagePreview: PropTypes.func.isRequired,
};

export default TripEdit;
