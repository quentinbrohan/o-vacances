import axios from 'axios';

import {
  FETCH_TRIPS,
  saveTrips,
  FETCH_TRIP,
  saveTrip,
  ADD_TRIP,
  newTrip,
  ADD_SUGGESTION,
  ADD_ACTIVITY,
  EDIT_ACTIVITY,
  clearSuggestionField,
  FETCH_SUGGESTIONS,
  saveSuggestions,
  fetchTrip,
  MODIFY_USER_DISPONIBILITIES,
} from 'src/actions/trip';

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

      // Endpoint fetch Trips list from user
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
      // TODO:
      const user = currentUser();
      // Endpoint add new trip to user
      axios.post(`http://localhost:8000/api/v0/users/${user}/trips`, {
        // props,
      })
        .then((response) => {
          console.log(response);

          // store.dispatch(newTrip(response.data));
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
          console.log('Modification des dispo de l\'utilisateur effectuée');
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

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default tripMiddleware;
