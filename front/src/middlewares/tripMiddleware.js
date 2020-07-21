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

      // Endpoint add new suggestion to trip
      axios.post(`http://localhost:8000/api/v0/trips/${id}/suggestions/new`, {
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

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default tripMiddleware;
