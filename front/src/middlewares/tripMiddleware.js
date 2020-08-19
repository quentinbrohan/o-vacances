import axios from 'axios';
import { push } from 'connected-react-router';

// API_URL ENV
import { API_URL } from 'src/helpers';

import {
  FETCH_TRIPS,
  saveTrips,
  FETCH_TRIP,
  saveTrip,
  ADD_TRIP,
  ADD_SUGGESTION,
  ADD_ACTIVITY,
  EDIT_ACTIVITY,
  FETCH_SUGGESTIONS,
  saveSuggestions,
  MODIFY_USER_DISPONIBILITIES,
  NEW_USER_DISPONIBILITIES,
  DELETE_TRIP,
  removeTrip,
  MODIFY_TRIP,
  saveTripEdit,
  FETCH_DISPONIBILITIES,
  saveDisponibilities,
  fetchDisponibilities,
  DELETE_ACTIVITY,
  removeActivity,
  FETCH_ACTIVITIES,
  fetchActivities,
  saveActivities,
  saveUserDisponibilities,
  CHECK_TRIP_AUTH,
  loading,
  saveTripAuth,
  DELETE_SUGGESTION,
  clearActivityField,
  removeSuggestion,
  saveSuggestion,
  saveActivity,
} from 'src/actions/trip';

import {
  error as toastError,
  warning as toastWarning,
  success as toastSuccess,
} from 'react-toastify-redux';

import { checkIfCreator } from 'src/utils';
import currentUser from 'src/utils/getCurrentUser';

const tripMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TRIPS: {
      const user = currentUser();
      store.dispatch(loading(true));
      // Endpoint fetch Trips list from user
      axios.get(`${API_URL}/api/v0/users/${user}/trips`)
        .then((response) => {
          // console.log(response);

          store.dispatch(saveTrips(response.data.trip));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case FETCH_TRIP: {
      const { tripId } = action;
      const user = currentUser();

      store.dispatch(loading(true));
      // Endpoint fetch Trips from user
      axios.get(`${API_URL}/api/v0/users/${user}/trips/${tripId}`)
        .then((response) => {
          // console.log(response);
          if (response.status === 401) {
            // console.log(response.data.message);
          }

          // Check if creator
          const isCreator = checkIfCreator(response.data.creator, user);

          store.dispatch(saveTrip(response.data, isCreator));
        })
        .then(() => {
          store.dispatch(loading(false));
        })
        .catch((error) => {
          console.warn(error);
          // store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case ADD_TRIP: {
      const {
        title,
        description,
        location,
        startDate,
        endDate,
        password,
      } = store.getState().trip;
      const user = currentUser();
      // FormData = plain image

      const imageInput = document.querySelector('#tripForm-image');
      const file = imageInput.files[0];
      // console.log(file);

      const form = {
        title,
        description,
        location,
        startDate,
        endDate,
        password,
      };
      // console.log(form);

      const json = JSON.stringify(form);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('document', json);

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      // Endpoint add new suggestion to trip
      axios.post(`${API_URL}/api/v0/users/${user}/trips`,
        formData,
        config)
        .then((response) => {
          // console.log(response);
          store.dispatch(toastSuccess('Nouveau voyage créé'));
          store.dispatch(push(`/voyage/${response.data.id}`));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case ADD_SUGGESTION: {
      const { suggestionTitle, suggestionDescription } = store.getState().trip;
      const user = currentUser();
      const { id } = store.getState().trip.trip;

      // Endpoint add new suggestion to trip
      axios.post(`${API_URL}/api/v0/trips/${id}/suggestions/new`, {
        // props,
        title: suggestionTitle,
        description: suggestionDescription,
        user,
        trip: id,
      })
        .then((response) => {
          // console.log(response);

          store.dispatch(toastSuccess('Suggestion ajoutée !'));
          store.dispatch(saveSuggestion(response.data));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case FETCH_SUGGESTIONS: {
      const { id: tripId } = store.getState().trip.trip;

      // Endpoint fetch suggestions from trip
      axios.get(`${API_URL}/api/v0/trips/${tripId}/suggestions`)

        // props,
      // })
        .then((response) => {
          // console.log(response);
          store.dispatch(saveSuggestions(response.data));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case MODIFY_USER_DISPONIBILITIES: {
      const user = currentUser();
      const { id: tripId } = store.getState().trip.trip;
      const { id: disponibilityId } = store.getState().trip.userDisponibilities;
      const { startDate, endDate } = action.dates[0];

      // Endpoint add new suggestion to trip
      axios.patch(`${API_URL}/api/v0/users/${user}/disponibilities/${disponibilityId}`, {
        // props,
        trip: tripId,
        startDate,
        endDate,
      })
        .then((response) => {
          // console.log(response);

          store.dispatch(saveUserDisponibilities(response.data));
          store.dispatch(toastSuccess('Disponibilités mise à jour'));
          // For refresh
          store.dispatch(fetchDisponibilities(tripId));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case NEW_USER_DISPONIBILITIES: {
      const user = currentUser();
      const { id } = store.getState().trip.trip;
      const { startDate, endDate } = action.dates[0];

      // Endpoint add new user disponibilities to trip
      axios.post(`${API_URL}/api/v0/users/${user}/disponibilities`, {
        // props,
        trip: id,
        startDate,
        endDate,
      })
        .then((response) => {
          store.dispatch(saveUserDisponibilities(response.data));
          store.dispatch(toastSuccess('Mise à jour des disponibilités !'));
          // For refresh
          store.dispatch(fetchDisponibilities(id));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
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

      store.dispatch(loading(true));
      // Endpoint add new suggestion to trip
      axios.post(`${API_URL}/api/v0/trips/${id}/activities`, {
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
          // console.log(response);

          store.dispatch(saveActivity(response.data));
          store.dispatch(toastSuccess('Activité ajoutée !'));
          store.dispatch(loading(false));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
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

      // console.log(
      //   activityTitle,
      //   activityDescription,
      //   activityStartDate,
      //   activityEndDate,
      //   activityCategory,
      //   activityId,
      // );

      const { id } = store.getState().trip.trip;
      const user = currentUser();
      // Endpoint add new suggestion to trip
      axios.patch(`${API_URL}/api/v0/trips/${id}/activities/${activityId}/edit`, {
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
          // console.log(response);

          store.dispatch(fetchActivities());
          store.dispatch(toastSuccess('Activité modifiée !'));
          store.dispatch(clearActivityField());

        // Add suggestion to state or directly refresh Trip component afterward (?)
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case DELETE_TRIP: {
      const user = currentUser();
      const { id } = store.getState().trip.trip;
      store.dispatch(loading(true));
      // Endpoint add new suggestion to trip
      axios.delete(`${API_URL}/api/v0/users/${user}/trips/${id}/`)
        .then(() => {
          store.dispatch(removeTrip());
          store.dispatch(toastSuccess('Voyage supprimé'));
          store.dispatch(push('/'));
          store.dispatch(loading(false));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case MODIFY_TRIP: {
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

      const imageInput = document.querySelector('#tripEdit-image');
      const file = imageInput.files[0];
      // console.log(file);

      const form = {
        id,
        title,
        description,
        location,
        startDate,
        endDate,
        password,
      };
      // console.log(form);

      const json = JSON.stringify(form);
      // console.log(json);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('document', json);

      const config = {
        method: 'patch',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'multipart/form-data',
        },
      };

      // Endpoint fetch Trip from user
      axios.patch(`${API_URL}/api/v0/users/${user}/trips/${id}`,
        formData,
        config)
        .then((response) => {
          // console.log(response);

          store.dispatch(saveTripEdit(response.data));
          store.dispatch(toastSuccess('Modifications effectuées'));
          store.dispatch(push(`/voyage/${id}`));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case FETCH_DISPONIBILITIES: {
      const { id: tripId } = store.getState().trip.trip;
      const user = currentUser();

      // Endpoint fetch disponibilities from trip
      axios.get(`${API_URL}/api/v0/trips/${tripId}/disponibilities`, {
        // props,
      })
        .then((response) => {
          // console.log(response);

          const userDisponibilities = response.data.disponibility.filter((participant) => (
            participant.users[0].id === user));

          store.dispatch(saveDisponibilities(response.data.disponibility, userDisponibilities));
        })
        .catch((error) => {
          console.warn(error);
          // store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case DELETE_ACTIVITY: {
      const { id } = store.getState().trip.trip;
      const { activityId } = store.getState().trip;
      const user = currentUser();
      // Endpoint add new suggestion to trip
      axios.delete(`${API_URL}/api/v0/users/${user}/trips/${id}/activities/${activityId}/delete`)
        .then(() => {
          store.dispatch(removeActivity(activityId));
          store.dispatch(toastSuccess('Activité supprimée'));
        })
        .then(() => {
          // Redirect to HomeUser
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
        });

      next(action);
      break;
    }

    case FETCH_ACTIVITIES: {
      const { id } = store.getState().trip.trip;

      // Endpoint fetch disponibilities from trip
      axios.get(`http://localhost:8000/api/v0/trips/${id}/activities`, {
        // props,
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(saveActivities(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case CHECK_TRIP_AUTH: {
      const { tripId } = action;
      const user = currentUser();
      const { password } = store.getState().trip;

      store.dispatch(loading(true));
      // Endpoint registration to trip with password
      axios.post(`${API_URL}/api/v0/users/${user}/trips/${tripId}`, {
        password,
      })
        .then((response) => {
          // console.log(response);
          // IF Password OK || user already authenticated
          if (response.status === 200) {
            store.dispatch(saveTripAuth(true));
            // Check if creator
            const isCreator = checkIfCreator(response.data.creator, user);

            // Check if logged user have disponibilities
            const userDisponibilities = response.data.disponibility.filter((participant) => (
              participant.users[0].id === user));

            store.dispatch(saveTrip(response.data, isCreator, userDisponibilities));
          }
        })
        .catch((error) => {
          console.warn(error);
          if (error.response.status === 401) {
            store.dispatch(toastWarning(error.response.data.message));
            store.dispatch(saveTripAuth(false));
            store.dispatch(loading(false));
          }
        });

      next(action);
      break;
    }

    case DELETE_SUGGESTION: {
      const { id } = store.getState().trip.trip;
      const user = currentUser();
      const { suggestionId } = action;
      // Endpoint add delete suggestion to trip
      axios.delete(`${API_URL}/api/v0/users/${user}/trips/${id}/suggestions/${suggestionId}`)
        .then(() => {
          store.dispatch(removeSuggestion(suggestionId));
          store.dispatch(toastSuccess('Suggestion supprimée'));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError(error.response.data.message));
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
