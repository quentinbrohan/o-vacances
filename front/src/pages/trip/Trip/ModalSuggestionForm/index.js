import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { success as toastSuccess } from 'react-toastify-redux';
import FormInput from 'src/components/FormInput';
import ModalWrapper from 'src/components/ModalWrapper';
import { useAddSuggestionMutation, useEditSuggestionMutation } from 'src/services/trip';
import { rulesTripFormDescription, rulesTripFormTitle } from 'src/utils/form';
import { getTripIdFromUrlParams } from 'src/utils/trip';

const ModalSuggestionForm = ({
  tripId, suggestion, isArchived, modalIconType,
}) => {
  const dispatch = useDispatch();

  const isEditMode = Boolean(suggestion);
  const tripIdFromSuggestion = tripId || getTripIdFromUrlParams();

  const defaultValues = {
    title: '',
    description: '',
  };

  const [
    addSuggestion,
    { isLoading: isLoadingAddSuggestion, isSuccess: isSuccessAddSuggestion },
  ] = useAddSuggestionMutation();
  const [
    editSuggestion,
    { isLoading: isLoadingEditSuggestion, isSuccess: isSuccessEditSuggestion },
  ] = useEditSuggestionMutation();

  const [error, setError] = useState('');

  const {
    register, handleSubmit, errors, reset,
  } = useForm({
    shouldFocusError: true,
    defaultValues:
      isEditMode && suggestion
        ? {
          title: suggestion.title,
          description: suggestion.description,
        }
        : defaultValues,
  });

  useEffect(() => {
    if (isEditMode && suggestion) {
      reset({
        title: suggestion.title,
        description: suggestion.description,
      });
    }
    if (!isEditMode) {
      reset(defaultValues);
    }
  }, [suggestion, isEditMode, tripIdFromSuggestion]);

  const onSubmit = (formValues) => {
    if (isEditMode) {
      editSuggestion({
        ...formValues,
        tripId: tripIdFromSuggestion,
        suggestionId: suggestion?.id,
      })
        .then((response) => {
          if (response.data) {
            dispatch(toastSuccess('Suggestion mis à jour.'));
          }
        })
        .catch((editSuggestionError) => {
          if (editSuggestionError) {
            setError('Erreur dans la requête.');
          }
        });
    }
    else {
      addSuggestion({
        ...formValues,
        tripId: tripIdFromSuggestion,
      })
        .then((response) => {
          if (response.data) {
            dispatch(toastSuccess('Suggestion ajoutée.'));
          }
        })
        .catch((addSuggestionError) => {
          if (addSuggestionError) {
            setError('Erreur dans la requête.');
          }
        });
    }
  };

  return (
    <ModalWrapper
      iconType={modalIconType || 'ADD'}
      title={`${isEditMode ? 'Modifier' : 'Ajouter'} une suggestion`}
      isEditMode={isEditMode}
      isArchived={isArchived}
      onConfirm={handleSubmit(onSubmit)}
      onConfirmLoading={isEditMode ? isLoadingEditSuggestion : isLoadingAddSuggestion}
      onConfirmError={error}
      onSuccess={isEditMode ? isSuccessEditSuggestion : isSuccessAddSuggestion}
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
            id="description"
            name="description"
            type="textarea"
            label="Description"
            placeholder="Description"
            register={register(rulesTripFormDescription)}
            error={errors.description}
          />
        </form>
      </div>
    </ModalWrapper>
  );
};

export default ModalSuggestionForm;

ModalSuggestionForm.propTypes = {
  tripId: PropTypes.number,
  suggestion: PropTypes.object,
  isArchived: PropTypes.bool.isRequired,
  modalIconType: PropTypes.string.isRequired,
};

ModalSuggestionForm.defaultProps = {
  tripId: null,
  suggestion: null,
};
