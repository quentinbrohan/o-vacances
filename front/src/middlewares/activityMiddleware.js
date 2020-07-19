import axios from 'axios';

import {
  FETCH_ACTIVITIES
} from 'src/actions/activity';

const activityMiddleware = (store) => (next) => (action) => {
  switch (action.type) {

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default activityMiddleware;
