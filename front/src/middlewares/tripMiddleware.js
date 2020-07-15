import axios from 'axios';

import {
  FETCH_TRIPS,
  saveTrips,
  FETCH_TRIP,
  saveTrip,
} from 'src/actions/trip';

const tripMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TRIPS: {
      // Endpoint fetch Trips list from user
      axios.get('http://localhost:8000/api/v0/users/1/trips')
        .then((response) => {
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

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default tripMiddleware;
