import axios from 'axios';

import {
  FETCH_TRIPS,
  saveTrips,
} from 'src/actions/trip';

const tripMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TRIPS: {
      // Endpoint fetch Trips list from user
      axios.get('http://localhost:8000/api/v0/users/1/trips')
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

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default tripMiddleware;
