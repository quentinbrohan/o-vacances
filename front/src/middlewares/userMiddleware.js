import axios from 'axios';

import {
  SIGN_IN,
} from 'src/actions/user';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SIGN_IN: {
      const {
        firstname,
        lastname,
        email,
        password,
      } = store.getState().user;

      // Endpoint API for user creation through Symfony
      axios.post('http://localhost:8000/api/v0/users', {
        firstname,
        lastname,
        email,
        password,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    default:
      next(action);
  }
};
export default userMiddleware;
