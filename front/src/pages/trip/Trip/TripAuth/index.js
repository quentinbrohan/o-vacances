import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { success as toastSuccess } from 'react-toastify-redux';
import Button from 'src/components/elements/Button';
import FormInput, { FormError } from 'src/components/FormInput';
import { useLoginTripMutation } from 'src/services/trip';
import { rulesLoginPassword } from 'src/utils/form';
import './tripAuth.scss';

const TripAuth = ({ isAuthenticated, tripId }) => {
  const dispatch = useDispatch();

  const [loginTrip, { isLoading }] = useLoginTripMutation();

  const [error, setError] = useState('');

  const {
    register, handleSubmit, errors,
  } = useForm({
    shouldFocusError: true,
  });

  const onSubmit = (formValues) => {
    loginTrip({
      password: formValues.password,
      tripId,
    })
      .then((result) => {
        if (result.data) {
          dispatch(toastSuccess('Authentification réussie.'));
        }
        if (result.error) {
          setError(result.error.data.message);
        }
      })
      .catch((err) => console.warn({ err }));
  };

  return (
    <div className="trip-auth">
      <div className="trip-auth-container">
        <h1>L'accès à ce voyage nécessite une autorisation!</h1>
        <p className="introduction">
          Si c'est la première fois que vous vous connectez pas de panique. Il est nécessaire
          d'entrer le mot de passe du voyage auquel vous tentez d'accéder. Ce mot de passe vous a
          été fourni par le créateur du voyage.
        </p>
        <div className="helper">
          <hr />
          {isAuthenticated && (
            <form id="rhf-form" className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                id="password"
                name="password"
                type="password"
                label="Mot de passe"
                placeholder="Mot de passe"
                register={register(rulesLoginPassword)}
                error={errors.password}
              />

              {error.length > 0 && <FormError errorMessage={error} />}

              <Button
                color="primary"
                type="submit"
                loading={isLoading}
                haveClassName="trip-auth-form-button"
              >
                S'authentifier
              </Button>
            </form>
          )}
          {!isAuthenticated && (
            <p>
              Déjà un compte? <Link to="/login">Connexion</Link>.
            </p>
          )}
          <hr />
          <p>
            Pas encore inscrit? Tes amis n'attendent plus que toi!{' '}
            <Link to="/signin">Inscription</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

TripAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  tripId: PropTypes.number.isRequired,
};

export default TripAuth;
