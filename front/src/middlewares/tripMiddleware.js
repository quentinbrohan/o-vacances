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
  FETCH_SUGGESTIONS,
  saveSuggestions,
  fetchTrip,
  MODIFY_USER_DISPONIBILITIES,
  NEW_USER_DISPONIBILITIES,
  DELETE_TRIP,
  removeTrip,
  MODIFY_TRIP,
  saveTripEdit,
  FETCH_DISPONIBILITIES,
  saveDisponibilities,
  fetchDisponibilities,
  fetchSuggestions,
  DELETE_ACTIVITY,
  removeActivity,
  FETCH_ACTIVITIES,
  fetchActivities,
  saveActivities,
  saveUserDisponibilities,
  CHECK_TRIP_AUTH,
  loading,
  saveTripAuth,
  saveTripActivities,
} from 'src/actions/trip';

import {
  successMessage,
  errorMessage,
} from 'src/actions/error';

import {
  error as toastError,
  message as toastMessage,
  success as toastSuccess,
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

      store.dispatch(loading(true));
      // Endpoint fetch Trips from user
      axios.get(`http://localhost:8000/api/v0/users/${user}/trips/${tripId}`)
        .then((response) => {
          console.log(response);
          if (response.status === 401) {
            console.log(response.data.message);
          }

          // Check if creator
          const isCreator = checkIfCreator(response.data.creator, user);
          // Get logged user disponibilities
          // const userDisponibilities = response.data.disponibility.filter((x) => x.id === user);

          // TODO: Delete  Temp userDisp === firstOne
          // console.log(response.data.disponibility[0]);

          const userDisponibilities = response.data.disponibility[0];

          store.dispatch(saveTrip(response.data, isCreator, userDisponibilities));
        })
        .then(() => {
          store.dispatch(fetchDisponibilities(tripId));
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
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
      console.log(file);

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

      // // Appear as empty
      // console.log(formData);
      // // but isn't !
      // console.log(formData.get('file'));
      // console.log(formData.get('document'));

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      // Endpoint add new suggestion to trip
      axios.post(`http://localhost:8000/api/v0/users/${user}/trips`,
        formData,
        config)
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

      // Endpoint add new suggestion to trip
      axios.post(`http://localhost:8000/api/v0/trips/${id}/suggestions/new`, {
        // props,
        title: suggestionTitle,
        description: suggestionDescription,
        user,
        trip: id,
      })
        .then(() => {
          store.dispatch(toastSuccess('Suggestion ajoutée !'));
          store.dispatch(fetchSuggestions(id));
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
      const { id: tripId } = store.getState().trip.trip;
      const { id: disponibilityId } = store.getState().trip.userDisponibilities;
      const { startDate, endDate } = action;

      // Endpoint add new suggestion to trip
      axios.patch(`http://localhost:8000/api/v0/users/${user}/disponibilities/${disponibilityId}`, {
        // props,
        trip: tripId,
        startDate,
        endDate,
      })
        .then((response) => {
          console.log(response);

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
      const { startDate, endDate } = action;

      // Endpoint add new suggestion to trip
      axios.post(`http://localhost:8000/api/v0/users/${user}/disponibilities`, {
        // props,
        trip: id,
        startDate,
        endDate,
      })
        .then((response) => {
          store.dispatch(saveUserDisponibilities(response.data));
          store.dispatch(toastSuccess('Mise à jour des disponibilités'));
          // For refresh
          store.dispatch(fetchDisponibilities(id));
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
          store.dispatch(saveTripActivities(response.data));
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
      axios.patch(`http://localhost:8000/api/v0/trips/${id}/activities/${activityId}/edit`, {
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
          store.dispatch(fetchActivities());
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
      store.dispatch(loading(true));
      // Endpoint add new suggestion to trip
      axios.delete(`http://localhost:8000/api/v0/users/${user}/trips/${id}/`)
        .then(() => {
          store.dispatch(removeTrip());
          store.dispatch(toastSuccess('Voyage supprimé'));
          store.dispatch(loading(false));
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

    case FETCH_DISPONIBILITIES: {
      const { id } = store.getState().trip.trip;

      // Endpoint fetch disponibilities from trip
      axios.get(`http://localhost:8000/api/v0/trips/${id}/disponibilities`, {
        // props,
      })
        .then((response) => {
          console.log(response);
          console.log(response.data.disponibility);
          store.dispatch(saveDisponibilities(response.data.disponibility));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case DELETE_ACTIVITY: {
      const { id } = store.getState().trip.trip;
      const { activityId } = store.getState().trip;
      const user = currentUser();
      // Endpoint add new suggestion to trip
      axios.delete(`http://localhost:8000/api/v0/users/${user}/trips/${id}/activities/${activityId}/delete`)
        .then(() => {
          store.dispatch(removeActivity());
          store.dispatch(toastSuccess('Activité supprimée'));
          store.dispatch(fetchActivities());
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

    case FETCH_ACTIVITIES: {
      const { id } = store.getState().trip.trip;

      // Endpoint fetch disponibilities from trip
      axios.get(`http://localhost:8000/api/v0/trips/${id}/activities`, {
        // props,
      })
        .then((response) => {
          console.log(response);
          console.log(response.data);
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
      axios.post(`http://localhost:8000/api/v0/users/${user}/trips/${tripId}`, {
        password,
      })
        .then((response) => {
          console.log(response);
          // IF Password OK || user already authenticated
          if (response.status === 200) {
            store.dispatch(saveTripAuth(true));
            store.dispatch(fetchTrip(tripId));
          }
        })
        .catch((error) => {
          console.warn(error);
          if (error.response.status === 401) {
            console.log(error.response.data.message);
            // display error
            store.dispatch(saveTripAuth(false));
            store.dispatch(loading(false));
          }
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
