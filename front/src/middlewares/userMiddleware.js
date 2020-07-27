import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
} from 'src/actions/user';

import {
  error as toastError,
  message as toastMessage,
  warning as toastWarning,
  success as toastSuccess,
  info as toastInfo,
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

      // Endpoint API for user creation through Symfony
      axios.post('http://localhost:8000/users/register', {
        firstname,
        lastname,
        email,
        password,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            console.log('Inscription réussie');
            store.dispatch(toastSuccess('Inscription réussie'));
          }
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(toastError('Erreur lors de l\'inscription'));
        });

      next(action);
      break;
    }
    case LOG_IN: {
      const { email, password } = store.getState().user;

      // withCredentials : autorisation d'accéder au cookie
      axios.post('http://localhost:8000/api/login_check', {
        password,
        email,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const { token } = response.data;

            store.dispatch(logInUser());
            // Store token in localStorage
            window.localStorage.setItem('authToken', token);
            // axios Global settings to forward header + token
            axios.defaults.withCredentials = true;
            axios.defaults.headers.Authorization = `Bearer ${token}`;
          }
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }
    case FETCH_USER: {
      // Endpoint fetch User Profil
      axios.get(`http://localhost:8000/api/v0/users/${currentUser()}/profil`)
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
        lastname,
        firstname,
        password,
      } = store.getState().user;

      // withCredentials : autorisation d'accéder au cookie
      axios.put(`http://localhost:8000/api/v0/users/${currentUser()}/edit`, {
        email,
        lastname,
        firstname,
        password,
      })
        .then((response) => {
          console.log(response);
          store.dispatch(toastSuccess('Modifications effectuées'));
        })
        .catch((error) => {
          console.warn(error);
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
          // console.log('Token valide');
          store.dispatch(logInUser());
          next(action);
          break;
        }
        else {
          store.dispatch(logOutUser());
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

      next(action);
      break;
    }

    case EDIT_USER_IMAGE: {
      const imageInput = document.querySelector('#profile-field-input.profile-image');
      const file = imageInput.files[0];
      console.log(file);

      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      // withCredentials : autorisation d'accéder au cookie
      axios.put(`http://localhost:8000/api/v0/users/${currentUser()}/upload`,
        formData,
        config)
        .then((response) => {
          console.log(response);
          store.dispatch(toastSuccess('Photo sauvegardée !'));
          // save new avatar URL in store.
          // store.dispatch(updateUserImage(response.data))
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
