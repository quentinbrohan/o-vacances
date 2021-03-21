/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { success as toastSuccess } from 'react-toastify-redux';
import Button from 'src/components/elements/Button';
import FormInput from 'src/components/FormInput';
import TripImageInput from 'src/components/TripImageInput';
import { history } from 'src/index';
import { useAddTripMutation, useEditTripMutation, useGetTripByIdQuery } from 'src/services/trip';
import { parseInternal } from 'src/utils/dates';
import {
  rulesPassword,
  rulesTripFormDescription,
  rulesTripFormLocation,
  rulesTripFormTitle,
  ValidateIsFutureEndDate,
  validateIsFutureStartDate,
} from 'src/utils/form';
import { getTripIdFromUrlParams } from 'src/utils/trip';

const TRIP_TYPES = ['countryside, beach, mountain, international, camping, sports,'];

const TripForm = () => {
  const dispatch = useDispatch();

  const isEditMode = !!useParams()?.id;
  const tripId = getTripIdFromUrlParams();

  const { data: trip, isLoadingTrip } = useGetTripByIdQuery(tripId, { skip: !isEditMode });

  const defaultValues = {
    tripImageInput: '',
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    password: '',
    passwordConfirm: '',
  };

  const [addTrip, { isLoading: isLoadingAddTrip }] = useAddTripMutation();
  const [editTrip, { isLoading: isLoadingEditTrip }] = useEditTripMutation();

  const { register, handleSubmit, watch, errors, getValues, reset, setValue } = useForm({
    shouldFocusError: true,
    defaultValues:
      isEditMode && trip
        ? {
            tripImageInput: trip.image,
            title: trip.title,
            description: trip.description,
            location: trip.location,
            startDate: parseInternal(trip.startDate),
            endDate: parseInternal(trip.endDate),
            password: trip.password,
            passwordConfirm: '',
          }
        : defaultValues,
  });

  useEffect(() => {
    if (isEditMode && trip) {
      reset({
        tripImageInput: trip.image,
        title: trip.title,
        description: trip.description,
        location: trip.location,
        startDate: parseInternal(trip.startDate),
        endDate: parseInternal(trip.endDate),
        password: trip.password,
        passwordConfirm: '',
      });
    }
    if (!isEditMode) {
      reset(defaultValues);
    }
  }, [trip, isEditMode, tripId]);

  const onSubmit = (formValues) => {
    if (isEditMode) {
      editTrip({ ...formValues, tripId })
        .then((response) => {
          if (response.data) {
            dispatch(toastSuccess('Voyage mis à jour.'));
            history.push(`/voyage/${tripId}`);
          }
        })
        .catch((addTripError) => console.warn(addTripError));
    } else {
      addTrip(formValues)
        .then((response) => {
          if (response.data) {
            dispatch(toastSuccess('Voyage créé.'));
            history.push(`/voyage/${response.data.id}`);
          }
        })

        .catch((addTripError) => console.warn(addTripError));
    }
  };

  return (
    <main className="trip-form">
      <Helmet>
        <title>{isEditMode ? 'Modifier un voyage' : 'Créer un voyage'}</title>
        <meta name="description" content={isEditMode ? 'Modifier un voyage' : 'Créer un voyage'} />
      </Helmet>
      <h1>{isEditMode ? 'Modifier un voyage' : 'Créer un voyage'}</h1>

      <form id="rhf-form" className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
        <TripImageInput
          register={register}
          error={errors.tripImageInput}
          image={trip?.image || ''}
          isEditForm={Boolean(tripId)}
          setValue={setValue}
        />
        <FormInput
          id="title"
          name="title"
          type="text"
          label="Titre"
          placeholder="Titre"
          register={register(rulesTripFormTitle)}
          error={errors.title}
        />
        <FormInput
          id="description"
          name="description"
          type="textarea"
          label="Description"
          placeholder="Description"
          register={register(rulesTripFormDescription)}
          error={errors.description}
        />
        <FormInput
          id="location"
          name="location"
          type="text"
          label="Lieu"
          placeholder="Lieu"
          register={register(rulesTripFormLocation)}
          error={errors.location}
        />
        <FormInput
          id="startDate"
          name="startDate"
          type="date"
          label="Départ"
          placeholder="Départ"
          register={register({
            required: 'Date de départ requise.',
            valueAsDate: true,
            // pattern: DATE_REGEX,
            validate: (startDate) => validateIsFutureStartDate(startDate),
          })}
          error={errors.startDate}
        />
        <FormInput
          id="endDate"
          name="endDate"
          type="date"
          label="Retour"
          placeholder="Retour"
          register={register({
            required: 'Date de retour requise.',
            valueAsDate: true,
            validate: (endDate) => ValidateIsFutureEndDate(endDate, getValues('startDate')),
          })}
          error={errors.endDate}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Mot de passe"
          placeholder="Mot de passe"
          register={register(rulesPassword)}
          error={errors.password}
        />
        <FormInput
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          label="Confirmer le mot de passe"
          placeholder="Confirmer le mot de passe"
          register={register({
            validate: (value) =>
              value === watch('password') || 'Les mots de passe saisis ne sont pas identiques.',
          })}
          error={errors.passwordConfirm}
        />

        <Button
          color="primary"
          type="submit"
          haveClassName="signin-form-button"
          loading={isEditMode ? isLoadingEditTrip : isLoadingAddTrip}
        >
          {isEditMode ? 'Modifier' : 'Créer'}
        </Button>
      </form>
    </main>
  );
};

export default TripForm;
