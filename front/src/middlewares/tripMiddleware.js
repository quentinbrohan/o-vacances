import axios from 'axios';

import {
  FETCH_TRIPS,
  saveTrips,
  FETCH_TRIP,
  saveTrip,
  ADD_TRIP,
  newTrip,
  ADD_SUGGESTION,
} from 'src/actions/trip';

import currentUser from 'src/utils/getCurrentUser';

const tripMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TRIPS: {
      // Endpoint fetch Trips list from user
      axios.get('http://localhost:8000/api/v0/users/2/trips')
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

      // Endpoint fetch Trips list from user
      axios.get(`http://localhost:8000/api/v0/users/2/trips/${tripId}`)
        .then((response) => {
          console.log(response);

          store.dispatch(saveTrip(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case ADD_TRIP: {
    // Endpoint add new trip to user
      axios.post(`http://localhost:8000/api/v0/trips/${tripId}/suggestions/new`, {
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
      console.log(action);
      const { suggestionTitle, suggestionDescription } = store.getState().trip;
      const user = currentUser();
      const { id } = store.getState().trip.trip;

      // Endpoint add new suggestion to trip
      axios.post(`http://localhost:8000/api/v0/trips/${user}/suggestions/new`, {
        // props,
        title: suggestionTitle,
        description: suggestionDescription,
        user,
        id,
      })
        .then((response) => {
          console.log(response);

          // TODO: newTrip = clear tripForm inputs DONE
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
