import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';
import { Helmet } from 'react-helmet';

import Field from './Field';
import Image from './Image';

import './tripForm.scss';

const TripForm = ({
  addImagePreview,
  changeField,
  title,
  file,
  description,
  startDate,
  endDate,
  password,
  handleTripForm,
  location,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Image
    handleTripForm();
  };

  return (
    <main className="trip-edit">
      <Helmet>
        <title>Créer un voyage</title>
        <meta name="description" content="Créer un voyage" />
      </Helmet>
      <h1>Mon nouveau voyage</h1>
      <form className="trip-edit-element" onSubmit={handleSubmit}>
        <Image
          className="trip-edit-image"
          onChangeImage={addImagePreview}
        />
        <Field
          name="title"
          placeholder="Nom du voyage"
          onChange={changeField}
          value={title}
          required

        />
        <Field
          name="description"
          placeholder="Description du voyage"
          type="text"
          onChange={changeField}
          value={description}
          required
        />
        <Field
          name="location"
          placeholder="Lieu du voyage"
          type="text"
          onChange={changeField}
          value={location}
          required
        />
        <Field
          name="startDate"
          type="date"
          placeholder="Date de départ prévue"
          onChange={changeField}
          value={startDate}
          required

        />
        <Field
          name="endDate"
          type="date"
          placeholder="Date de retour prévue"
          onChange={changeField}
          value={endDate}
          required

        />
        <Field
          name="password"
          type="password"
          placeholder="Mot de passe du voyage"
          onChange={changeField}
          value={password}
          required

        />
        <Button
          color="primary"
          haveClassName="trip-form-button"
        >
          J'ajoute un voyage
        </Button>
      </form>
    </main>
  );
};

TripForm.propTypes = {
  changeField: PropTypes.func.isRequired,
  handleTripForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  addImagePreview: PropTypes.func.isRequired,
  file: PropTypes.object,
};

TripForm.defaultProps = {
  file: null,
};

export default TripForm;
