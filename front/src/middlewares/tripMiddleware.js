import axios from 'axios';

import {
  FETCH_TRIPS,
  saveTrips,
  FETCH_TRIP,
  saveTrip,
  ADD_TRIP,
  ADD_SUGGESTION,
  ADD_ACTIVITY,
  EDIT_ACTIVITY,
  clearSuggestionField,
  FETCH_SUGGESTIONS,
  saveSuggestions,
  fetchTrip,
  MODIFY_USER_DISPONIBILITIES,
  DELETE_TRIP,
  removeTrip,
  MODIFY_TRIP,
  saveTripEdit,
} from 'src/actions/trip';

import {
  successMessage,
  errorMessage,
} from 'src/actions/error';

import {
  error as toastError,
  message as toastMessage,
  warning as toastWarning,
  success as toastSuccess,
  info as toastInfo,
} from 'react-toastify-redux';

import { checkIfCreator } from 'src/utils';
import currentUser from 'src/utils/getCurrentUser';

const tripMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TRIPS: {
      const user = currentUser();
      // Endpoint fetch Trips list from user
      axios.get(`http://localhost:8000/api/v0/users/${user}/trips`)
        .then((response) => {
          console.log(response);

          store.dispatch(saveTrips(response.data.trip));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case FETCH_TRIP: {
      const { tripId } = action;
      const user = currentUser();

      // Endpoint fetch Trips from user
      axios.get(`http://localhost:8000/api/v0/users/${user}/trips/${tripId}`)
        .then((response) => {
          console.log(response);

          // Check if creator
          const isCreator = checkIfCreator(response.data.creator, user);
          // Get logged user disponibilities
          const userDisponibilities = response.data.disponibility.filter((x) => x.id === user);

          store.dispatch(saveTrip(response.data, isCreator, userDisponibilities[0]));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case ADD_TRIP: {
      const {
        title,
        description,
        startDate,
        endDate,
        password,
      } = store.getState().trip;
      const user = currentUser();
      // FormData = plain image
      const { formData } = action;
      console.log(formData);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      // Request must be ASYNC !
      // Endpoint add new suggestion to trip
      axios.post(`http://localhost:8000/api/v0/users/${user}/trips`, {
        formData,
        title,
        description,
        startDate,
        endDate,
        password,
        // creator: user,
      }, config)
        .then((response) => {
          console.log(response);
          store.dispatch(toastSuccess('Nouveau voyage créé'));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case ADD_SUGGESTION: {
      const { suggestionTitle, suggestionDescription } = store.getState().trip;
      const user = currentUser();
      const { id } = store.getState().trip.trip;
      console.log(id);

      // Endpoint add new suggestion to trip
      axios.post(`http://localhost:8000/api/v0/trips/${id}/suggestions/new`, {
        // props,
        title: suggestionTitle,
        description: suggestionDescription,
        user,
        trip: id,
      })
        .then(() => {
          store.dispatch(clearSuggestionField());
        })
        .then(() => {
          // For refresh
          store.dispatch(fetchTrip(id));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case FETCH_SUGGESTIONS: {
      const { id } = store.getState().trip.trip;

      // Endpoint fetch suggestions from trip
      axios.get(`http://localhost:8000/api/v0/trips/${id}/suggestions`, {
        // props,
      })
        .then((response) => {
          console.log(response);
          store.dispatch(saveSuggestions(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case MODIFY_USER_DISPONIBILITIES: {
      const user = currentUser();
      const { id } = store.getState().trip.trip;
      const { startDate, endDate } = action;

      // Endpoint add new suggestion to trip
      axios.patch(`http://localhost:8000/api/v0/users/${id}/disponibilities/${id}`, {
        // props,
        user,
        trip: id,
        startDate,
        endDate,
      })
        .then(() => {
          store.dispatch(toastSuccess('Mise à jour des disponibilités'));
        })
        .then(() => {
          // For refresh
          store.dispatch(fetchTrip(id));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case ADD_ACTIVITY: {
      const {
        activityTitle,
        activityDescription,
        activityStartDate,
        activityEndDate,
        activityCategory,
      } = store.getState().trip;
      const { id } = store.getState().trip.trip;
      const user = currentUser();

      // Endpoint add new suggestion to trip
      axios.post(`http://localhost:8000/api/v0/trips/${id}/activities`, {
        // props,
        title: activityTitle,
        description: activityDescription,
        startDate: activityStartDate,
        endDate: activityEndDate,
        category: activityCategory,
        trip: id,
        creator: user,
      })
        .then((response) => {
          console.log(response);

          // TODO: newTrip = cleForm inputs DONE
          // Add suggestion to state or directly refresh Trip component afterward (?)
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case EDIT_ACTIVITY: {
      const {
        activityTitle,
        activityDescription,
        activityStartDate,
        activityEndDate,
        activityCategory,
        activityId,
      } = store.getState().trip;
      const { id } = store.getState().trip.trip;
      const user = currentUser();

      // Endpoint add new suggestion to trip
      axios.patch(`/api/v0/trips/${id}/activities/${activityId}/edit`, {
        // props,
        title: activityTitle,
        description: activityDescription,
        startDate: activityStartDate,
        endDate: activityEndDate,
        category: activityCategory,
        trip: id,
        creator: user,
      })
        .then((response) => {
          console.log(response);

        // TODO: newTrip = cleForm inputs DONE
        // Add suggestion to state or directly refresh Trip component afterward (?)
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case DELETE_TRIP: {
      const user = currentUser();
      const { id } = store.getState().trip.trip;

      // Endpoint add new suggestion to trip
      axios.delete(`http://localhost:8000/api/v0/users/${user}/trips/${id}`, {
        // props,
        user,
        trip: id,
      })
        .then(() => {
          store.dispatch(removeTrip());
          store.dispatch(toastSuccess('Voyage supprimé'));
        })
        .then(() => {
          // Redirect to HomeUser
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case MODIFY_TRIP: {
      const { tripId } = action;
      const user = currentUser();
      const {
        id,
        title,
        description,
        location,
        startDate,
        endDate,
        password,
      } = store.getState().trip.trip;

      // Endpoint fetch Trip from user
      axios.patch(`http://localhost:8000/api/v0/users/${user}/trips/${id}`, {
        title,
        description,
        location,
        startDate,
        endDate,
        password,
      })
        .then((response) => {
          console.log(response);

          // TODO: newTrip = cleForm inputs DONE
          // Add suggestion to state or directly refresh Trip component afterward (?)
          store.dispatch(saveTripEdit(response.data));
          store.dispatch(toastSuccess('Modifications effectuées'));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default tripMiddleware;
