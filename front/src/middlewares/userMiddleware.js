import axios from 'axios';

import {
  SIGN_IN,
  LOG_IN,
  saveUser,
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
      axios.post('/api/v0/users/login', {
        firstname,
        lastname,
        email,
        password,
      })
        .then((response) => {
          store.dispatch(saveUser(response.data.info, response.data.logged));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }
    case LOG_IN: {
      const { email, password } = store.getState().user;

      // withCredentials : autorisation d'accéder au cookie
      axios.post('http://localhost:8000/api/v0/users/login', {
        email,
        password,
      }, {
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          store.dispatch(saveUser(response.data.info, response.data.logged));
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
export default userMiddleware;
