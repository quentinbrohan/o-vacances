import { fr } from 'date-fns/locale';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDispatch, useSelector } from 'react-redux';
import { success as toastSuccess } from 'react-toastify-redux';
import ModalWrapper from 'src/components/ModalWrapper';
import {
  useAddUserDisponibilitiesMutation,
  useEditUserDisponibilitiesMutation,
} from 'src/services/trip';
import { FORMAT_DATE_DISPLAY } from 'src/utils/dates';
import './dateRange_overrides.scss'; // Overrides default theme

const ModalUserDisponibilities = ({
  tripId, tripStartDate, tripEndDate, isArchived,
}) => {
  const dispatch = useDispatch();

  const { userDisponibilities } = useSelector((state) => state.trip);

  const [hasDisponibilities, setHasDisponibilities] = useState(false);
  const [dateRangeUserDisponibilities, setDateRangeUserDisponibilities] = useState([
    {
      startDate: userDisponibilities?.length > 0 ? new Date(userDisponibilities.startDate) : null,
      endDate: userDisponibilities?.length > 0 ? new Date(userDisponibilities.endDate) : null,
      key: 'selection',
    },
  ]);

  useEffect(() => {
    if (userDisponibilities?.length > 0) {
      setHasDisponibilities(true);

      setDateRangeUserDisponibilities([
        {
          startDate: new Date(userDisponibilities.startDate),
          endDate: new Date(userDisponibilities.endDate),
          key: 'selection',
        },
      ]);
    }
  }, [userDisponibilities]);

  const [
    addUserDisponibilities,
    { isLoading: isLoadingAddUserDisponibilities, isSuccess: isSuccessAddUserDisponibilities },
  ] = useAddUserDisponibilitiesMutation();
  const [
    editUserDisponibilities,
    { isLoading: isLoadingEditUserDisponibilities, isSuccess: isSuccessEditUserDisponibilities },
  ] = useEditUserDisponibilitiesMutation();

  const [error, setError] = useState('');

  const onSubmit = () => {
    if (hasDisponibilities) {
      editUserDisponibilities({
        startDate: new Date(dateRangeUserDisponibilities[0].startDate).toISOString(),
        endDate: new Date(dateRangeUserDisponibilities[0].endDate).toISOString(),
        tripId,
        userDisponibilitiesId: userDisponibilities.id,
      })
        .then((response) => {
          if (response.data) {
            dispatch(toastSuccess('Disponibilités mises à jour.'));
          }
        })
        .catch((err) => {
          if (err) {
            setError(err.error.data.message);
          }
        });
    }
    else {
      addUserDisponibilities({
        startDate: new Date(dateRangeUserDisponibilities[0].startDate).toISOString(),
        endDate: new Date(dateRangeUserDisponibilities[0].endDate).toISOString(),
        tripId,
      })
        .then((response) => {
          if (response.data) {
            dispatch(toastSuccess('Disponibilités ajoutées.'));
          }
        })
        .catch((err) => {
          if (err) {
            setError(err.error.data.message);
          }
        });
    }
  };

  return (
    <ModalWrapper
      iconText="Mes disponibilités"
      title="Mes disponibilités pour voyager"
      isEditMode={hasDisponibilities}
      isArchived={isArchived}
      onConfirm={onSubmit}
      onConfirmLoading={
        hasDisponibilities ? isLoadingEditUserDisponibilities : isLoadingAddUserDisponibilities
      }
      onConfirmError={error}
      onSuccess={
        hasDisponibilities ? isSuccessEditUserDisponibilities : isSuccessAddUserDisponibilities
      }
    >
      <div className="my-disponibilities-container">
        <DateRange
          locale={fr}
          editableDateInputs
          onChange={(range) => setDateRangeUserDisponibilities([range.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRangeUserDisponibilities}
          direction="vertical"
          minDate={new Date(tripStartDate)}
          maxDate={new Date(tripEndDate)}
          showMonthArrow
          dateDisplayFormat={FORMAT_DATE_DISPLAY}
          startDatePlaceholder="Début de la disponibilité"
          endDatePlaceholder="Fin de la disponibilité"
        />
      </div>
    </ModalWrapper>
  );
};

ModalUserDisponibilities.propTypes = {
  tripId: PropTypes.number.isRequired,
  tripStartDate: PropTypes.string.isRequired,
  tripEndDate: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired,
};

export default ModalUserDisponibilities;
