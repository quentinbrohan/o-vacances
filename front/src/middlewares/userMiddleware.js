import axios from 'axios';

import {
  SIGN_IN,
  LOG_IN,
  saveUser,
  FETCH_USER,
  updateUserProfil,
  EDIT_USER,
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
    case FETCH_USER: {
      // Endpoint fetch User Profil
      axios.get('http://localhost:8000/api/v0/user/2/profil')
        .then((response) => {
          console.log(response);

          store.dispatch(updateUserProfil(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }
    case EDIT_USER: {
      const {
        email,
        password,
        lastname,
        firstname,
      } = store.getState().user;

      // withCredentials : autorisation d'accéder au cookie
      axios.patch('http://localhost:8000/api/v0/users/2/edit', {
        email,
        password,
        lastname,
        firstname,
      }, {
        withCredentials: false,
        // config,
      })
        .then((response) => {
          console.log(response);
          store.dispatch(updateUserProfil(response.data));
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
