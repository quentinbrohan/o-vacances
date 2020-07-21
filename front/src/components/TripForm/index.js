import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/elements/Button';

import Field from './Field';
import Image from './Image';

import './tripForm.scss';

const TripForm = ({
  addImagePreview,
  changeField,
  title,
  description,
  startDate,
  endDate,
  password,
  handleTripForm,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // IMAGE
    // TODO: do something with state.file
    handleTripForm();
  };

  return (
    <main className="trip-edit">
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

        />
        <Field
          name="description"
          placeholder="Description du voyage"
          type="text"
          onChange={changeField}
          value={description}

        />
        <Field
          name="start-date"
          type="date"
          placeholder="Date de départ prévue"
          onChange={changeField}
          value={startDate}

        />
        <Field
          name="end-date"
          type="date"
          placeholder="Date de retour prévue"
          onChange={changeField}
          value={endDate}

        />
        <Field
          name="password"
          type="password"
          placeholder="Mot de passe du voyage"
          onChange={changeField}
          value={password}

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
  addImagePreview: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  handleTripForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default TripForm;
