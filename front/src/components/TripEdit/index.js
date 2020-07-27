import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Field from './Field';
import Image from './Image';

import './tripEdit.scss';

const TripEdit = ({
  addImagePreview,
  changeField,
  title,
  description,
  startDate,
  endDate,
  password,
  location,
  handleTripEdit,
  image,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // todo
    handleTripEdit();
  };

  return (
    <main className="trip-edit">
      <Helmet>
        <title>Modifier mon voyage</title>
        <meta name="description" content="Modifier mon voyage" />
      </Helmet>
      <h1>Je modifie mon voyage</h1>
      <form className="trip-edit-element" onSubmit={handleSubmit}>
        <div className="div">
          {/* {image && (
          <>
            <p>Photo de couverture actuelle</p>
            <img src={image} alt="Couverture du voyage" />
          </>
          )} */}
          {!image && (
          <p> Pas de photo de couverture actuellement</p>
          )}
        </div>
        <Image
          className="trip-edit-image"
          onChangeImage={addImagePreview}
          image={image}
        />
        <Field
          name="title"
          placeholder="Nom du voyage"
          value={title}
          onChange={changeField}
        />
        <Field
          name="description"
          placeholder="Description du voyage"
          type="text"
          value={description}
          onChange={changeField}
        />
        <Field
          name="location"
          placeholder="Lieu du voyage"
          type="text"
          value={location}
          onChange={changeField}
        />
        <Field
          name="startDate"
          type="date"
          placeholder="Date de départ prévue"
          value={startDate}
          onChange={changeField}
        />
        <Field
          name="endDate"
          type="date"
          placeholder="Date de retour prévue"
          value={endDate}
          onChange={changeField}
        />
        <Field
          name="password"
          type="password"
          placeholder="Mot de passe du voyage"
          value={password}
          onChange={changeField}
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
  handleTripEdit: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  password: PropTypes.string,
  location: PropTypes.string,
  image: PropTypes.string,
};

TripEdit.defaultProps = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  password: '',
  location: '',
  image: '',
};

export default TripEdit;
