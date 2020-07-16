import axios from 'axios';

import {
  FETCH_TRIPS,
  saveTrips,
  FETCH_TRIP,
  saveTrip,
  ADD_TRIP,
  newTrip,
} from 'src/actions/trip';

const tripMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TRIPS: {
      // Endpoint fetch Trips list from user
      axios.get('http://localhost:8000/api/v0/users/5/trips')
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
      // Endpoint fetch Trips list from user
      axios.get('http://localhost:8000/api/v0/trips/1')
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
      // const { tripForm props } = store.getState() //ttripForm;
    // Endpoint add new trip to user
      axios.post('http://localhost:8000/api/v0/users/5/trips', {
        // props,
      })
        .then((response) => {
          console.log(response);

          // TODO: newTrip = clear tripForm inputs
          store.dispatch(newTrip(response.data));
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
