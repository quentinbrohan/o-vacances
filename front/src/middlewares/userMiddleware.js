import axios from 'axios';

import {
  SIGN_IN,
  LOG_IN,
  saveUser,
} from 'src/actions/user';

// const config = {
// headers: { Authorization: `Bearer ${token}` },
// headers: { Authorization: 'Bearer mon-token' },
// };

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
      axios.post('http://localhost:8000/api/v0/users/register', {
        firstname,
        lastname,
        email,
        password,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            console.log('Inscription réussie');
          }
          else {
            console.log('Erreur lors de l\'inscription');
          }

          // store.dispatch(saveUser(response.data.info, response.data.logged));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }
    case LOG_IN: {
      const { email: username, password } = store.getState().user;
      // const { username } = store.getState().user.email;
      console.log(username, password);

      // withCredentials : autorisation d'accéder au cookie
      axios.post('http://localhost:8000/api/login_check', {
        password,
        // email,
        username,
      }, {
        withCredentials: true,
        // config,
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
