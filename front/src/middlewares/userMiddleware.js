import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { push } from 'connected-react-router';

// API_URL ENV
import { API_URL } from 'src/helpers';

import {
  SIGN_IN,
  LOG_IN,
  FETCH_USER,
  updateUserProfil,
  EDIT_USER,
  CHECK_AUTHENTICATION,
  LOG_OUT,
  logInUser,
  logOutUser,
  EDIT_USER_IMAGE,
  updateUserImage,
  loading,
} from 'src/actions/user';

import { logOutTrip } from 'src/actions/trip';

import { addError } from 'src/actions/error';

import {
  error as toastError,
  // message as toastMessage,
  // warning as toastWarning,
  success as toastSuccess,
} from 'react-toastify-redux';

import currentUser from 'src/utils/getCurrentUser';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SIGN_IN: {
      const {
        firstname,
        lastname,
        email,
        password,
      } = store.getState().user;

      const config = {
        headers: {
          crossDomain: true,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          withCredentials: false,
        },
      };

      store.dispatch(loading(true));
      // Endpoint API for user creation through Symfony
      axios.post(`${API_URL}/users/register`, {
        firstname,
        lastname,
        email,
        password,
      }, config)
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            store.dispatch(toastSuccess('Inscription réussie'));
            store.dispatch(push('/login'));
          }
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError('Erreur lors de l\'inscription'));
          // store.dispatch(addError(error.response.data.message));
        });

      next(action);
      break;
    }
    case LOG_IN: {
      const { email, password } = store.getState().user;

      store.dispatch(loading(true));
      // withCredentials : autorisation d'accéder au cookie
      axios.post(`${API_URL}/api/login_check`, {
        password,
        email,
      })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            const { token } = response.data;

            store.dispatch(toastSuccess('Connexion réussie'));
            store.dispatch(logInUser());
            // Store token in localStorage
            window.localStorage.setItem('authToken', token);
            // axios Global settings to forward header + token
            axios.defaults.withCredentials = true;
            axios.defaults.headers.Authorization = `Bearer ${token}`;
            store.dispatch(push('/mes-voyages'));
          }
        })
        .catch((error) => {
          console.warn(error);
          if (error.response.status === 401) {
            store.dispatch(addError('Adresse email ou mot de passe invalide.'));
            store.dispatch(toastError(error.response.data.message));
          }
          else {
            store.dispatch(addError(error.response.data));
          }
        });

      next(action);
      break;
    }
    case FETCH_USER: {
      // Endpoint fetch User Profil
      axios.get(`${API_URL}/api/v0/users/${currentUser()}/profil`)
        .then((response) => {
          // console.log(response);

          store.dispatch(updateUserProfil(response.data));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(addError(error.response.data.message));
        });

      next(action);
      break;
    }
    case EDIT_USER: {
      const {
        email,
        lastname,
        firstname,
        password,
      } = store.getState().user;

      // withCredentials : autorisation d'accéder au cookie
      axios.patch(`${API_URL}/api/v0/users/${currentUser()}/edit`, {
        email,
        lastname,
        firstname,
        password,
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(toastSuccess('Modifications effectuées'));
          store.dispatch(updateUserProfil(response.data));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(addError(error.response.data.message));
        });
      next(action);
      break;
    }

    case CHECK_AUTHENTICATION: {
      const token = window.localStorage.getItem('authToken');
      // If token still valid
      if (token) {
        const jwtData = jwtDecode(token);
        // Check if JWT exp date > actual Date
        if (jwtData.exp * 1000 > new Date().getTime()) {
          // Add to Axios global config:
          axios.defaults.withCredentials = true;
          axios.defaults.headers.Authorization = `Bearer ${token}`;
          store.dispatch(logInUser());
          next(action);
          break;
        }
        else {
          store.dispatch(logOutUser());
          // store.dispatch(push('/'));
          next(action);
          break;
        }
      }

      next(action);
      break;
    }

    case LOG_OUT: {
      // Remove token from localStoreage
      window.localStorage.removeItem('authToken');
      delete axios.defaults.headers.Authorization;

      store.dispatch(logOutUser());
      store.dispatch(logOutTrip());
      store.dispatch(push('/'));

      next(action);
      break;
    }

    case EDIT_USER_IMAGE: {
      const imageInput = document.querySelector('#profile-field-input.profile-image');
      const file = imageInput.files[0];
      // console.log(file);

      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      // withCredentials : autorisation d'accéder au cookie
      axios.put(`${API_URL}/api/v0/users/${currentUser()}/upload`,
        formData,
        config)
        .then((response) => {
          // console.log(response);
          store.dispatch(toastSuccess('Photo sauvegardée !'));
          // save new avatar URL in store.
          // store.dispatch(updateUserImage(response.data))
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(addError(error.response.data.message));
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
