import axios from 'axios';

import {
  FETCH_TRIPS,
  saveTrips,
  FETCH_TRIP,
  saveTrip,
  ADD_TRIP,
  newTrip,
  ADD_SUGGESTION,
  clearSuggestionField,
  FETCH_SUGGESTIONS,
  saveSuggestions,
  fetchTrip,
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

          // // Check if creator
          const isCreator = checkIfCreator(response.data.creator, user);

          store.dispatch(saveTrip(response.data, isCreator));
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
          // Add suggestion to state or directly refresh Trip component afterward (?)
        })
        .then(() => {
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

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default tripMiddleware;
