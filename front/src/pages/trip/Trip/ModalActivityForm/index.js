import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { success as toastSuccess } from 'react-toastify-redux';
import FormInput from 'src/components/FormInput';
import ModalWrapper from 'src/components/ModalWrapper';
import { useAddActivityMutation, useEditActivityMutation } from 'src/services/trip';
import { parseInternal } from 'src/utils/dates';
import { rulesTripFormDescription, rulesTripFormTitle, ValidateIsFutureEndDate, validateIsFutureStartDate } from 'src/utils/form';
import { getTripIdFromUrlParams } from 'src/utils/trip';

const ModalActivityForm = ({
  tripId,
  activity,
  tripStartDate,
  tripEndDate,
  isArchived,
  modalIconType,
}) => {
  const dispatch = useDispatch();

  const isEditMode = Boolean(activity);
  const tripIdFromActivity = tripId || getTripIdFromUrlParams();

  const defaultValues = {
    title: '',
    category: 1,
    description: '',
    startDate: '',
    endDate: '',
  };

  const [
    addActivity,
    { isLoading: isLoadingAddActivity, isSuccess: isSuccessAddActivity },
  ] = useAddActivityMutation();
  const [
    editActivity,
    { isLoading: isLoadingEditActivity, isSuccess: isSuccessEditActivity },
  ] = useEditActivityMutation();

  const [error, setError] = useState('');

  const {
    register, handleSubmit, errors, getValues, reset, control, setValue,
  } = useForm({
    shouldFocusError: true,
    defaultValues:
      isEditMode && activity
        ? {
          title: activity.title,
          description: activity.description,
          startDate: parseInternal(activity.startDate),
          endDate: parseInternal(activity.endDate),
        }
        : defaultValues,
  });

  useEffect(() => {
    if (isEditMode && activity) {
      reset({
        title: activity.title,
        description: activity.description,
        startDate: parseInternal(activity.startDate),
        endDate: parseInternal(activity.endDate),
      });
    }
    if (!isEditMode) {
      reset(defaultValues);
    }
  }, [activity, isEditMode, tripIdFromActivity]);

  const onSubmit = (formValues) => {
    if (isEditMode) {
      editActivity({
        ...formValues,
        tripId: tripIdFromActivity,
        activityId: activity?.id,
        category: formValues.category.id,
      })
        .then((response) => {
          if (response.data) {
            dispatch(toastSuccess('Activité mise à jour.'));
          }
        })
        .catch((editActivityError) => {
          if (editActivityError) {
            setError('Erreur dans la requête.');
          }
        });
    }
    else {
      addActivity({
        ...formValues,
        tripId: tripIdFromActivity,
      })
        .then((response) => {
          if (response.data) {
            dispatch(toastSuccess('Activité ajoutée.'));
          }
        })
        .catch((addActivityError) => {
          if (addActivityError) {
            setError('Erreur dans la requête.');
          }
        });
    }
  };

  return (
    <ModalWrapper
      iconType={modalIconType || 'ADD'}
      title={`${isEditMode ? 'Modifier' : 'Ajouter'} une activité`}
      isEditMode={isEditMode}
      isArchived={isArchived}
      onConfirm={handleSubmit(onSubmit)}
      onConfirmLoading={isEditMode ? isLoadingEditActivity : isLoadingAddActivity}
      onConfirmError={error}
      onSuccess={isEditMode ? isSuccessEditActivity : isSuccessAddActivity}
    >
      <div className="activity-form">
        <form id="rhf-form" className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
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
            id="category"
            name="category"
            type="select"
            label="Catégorie"
            placeholder="Catégorie"
            register={register()}
            error={errors.category}
            selectPlaceholder="Choisir une catégorie"
            control={control}
            setValue={setValue}
            currentCategory={activity?.category}
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
            id="startDate"
            name="startDate"
            type="date"
            min={parseInternal(tripStartDate)}
            max={parseInternal(tripEndDate)}
            label="Départ"
            placeholder="Départ"
            register={register({
              required: 'Date de départ requise.',
              validate: (startDate) => validateIsFutureStartDate(startDate),
            })}
            error={errors.startDate}
          />
          <FormInput
            id="endDate"
            name="endDate"
            type="date"
            min={parseInternal(tripStartDate)}
            max={parseInternal(tripEndDate)}
            label="Retour"
            placeholder="Retour"
            register={register({
              required: 'Date de retour requise.',
              validate: (endDate) => ValidateIsFutureEndDate(endDate, getValues('startDate')),
            })}
            error={errors.endDate}
          />
        </form>
      </div>
    </ModalWrapper>
  );
};

export default ModalActivityForm;

ModalActivityForm.propTypes = {
  tripId: PropTypes.number,
  activity: PropTypes.object,
  tripStartDate: PropTypes.string.isRequired,
  tripEndDate: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired,
  modalIconType: PropTypes.string.isRequired,
};

ModalActivityForm.defaultProps = {
  tripId: null,
  activity: null,
};
