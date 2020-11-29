import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { push } from 'connected-react-router';
import jwtDecode from 'jwt-decode';

import {
  error as TOAST_ERROR,
  message as TOAST_MESSAGE,
  success as TOAST_SUCCESS,
  warning as TOAST_WARNING,
} from 'react-toastify-redux';

import { API_URL } from 'src/constants';

import { currentUserId } from 'src/utils/getCurrentUser';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  avatar: '',
  info: {},
  role: [],
  isAuthenticated: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Immutable state created by Immer
    // https://redux-toolkit.js.org/tutorials/intermediate-tutorial#mutable-update-logic
    // https://github.com/immerjs/immer
    LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SAVE_USER_PROFILE: (state, action) => {
      const {
        firstname, lastname, email, avatar, info, roles,
      } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.email = email;
      state.avatar = avatar;
      state.info = info;
      state.role = [roles];
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    LOG_IN_USER: (state) => {
      state.isAuthenticated = true;
    },
    LOG_OUT_USER: (state) => {
      // TODO: reset all state
      state.isAuthenticated = false;
    },
    SAVE_USER_IMAGE: (state, action) => {
      state.avatar = action.payload;
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;

export const {
  // AUTH
  CHECK_AUTHENTICATION,
  LOG_IN,
  LOG_OUT,
  SIGN_IN,
  // USER
  FETCH_USER,
  SAVE_USER,
  EDIT_USER,
  EDIT_USER_IMAGE,
  SAVE_USER_IMAGE,
  SAVE_USER_PROFILE,
  // USER SAVE
  LOG_IN_USER,
  LOG_OUT_USER,
  // MISC
  LOADING,
} = userSlice.actions;

export const signIn = (formValues) => (dispatch) => {
  dispatch(LOADING(true));

  const {
    firstname, lastname, email, password,
  } = formValues;

  const config = {
    headers: {
      crossDomain: true,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      withCredentials: false,
    },
  };

  axios
    .post(
      `${API_URL}/users/register`,
      {
        firstname,
        lastname,
        email,
        password,
      },
      config,
    )
    .then((response) => {
      if (response.status === 201) {
        dispatch(TOAST_SUCCESS('Inscription réussie'));
        dispatch(push('/login'));
      }
    })
    .catch((error) => {
      dispatch(TOAST_ERROR(error.response.data));
    });
};

export const logIn = (formValues) => (dispatch) => {
  dispatch(LOADING(true));

  const { email, password } = formValues;

  axios
    .post(`${API_URL}/api/login_check`, {
      password,
      email,
    })
    .then((response) => {
      if (response.status === 200) {
        const { token } = response.data;

        dispatch(TOAST_SUCCESS('Connexion réussie'));
        // TODO: thunk: login => storeToken THEN await getCurrentUser
        dispatch(LOG_IN_USER());
        // Store token in localStorage
        window.localStorage.setItem('authToken', token);
        // axios Global settings to forward header + token
        axios.defaults.withCredentials = true;
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        dispatch(push('/mes-voyages'));
      }
    })
    .catch((error) => {
      dispatch(LOADING(false));
      if (error.response.status === 401) {
        dispatch(TOAST_ERROR('Email ou mot de passe invalide.'));
      }
      else {
        dispatch(TOAST_ERROR(error.response.data));
      }
    });
};

export const getCurrentUser = () => (dispatch) => {
  axios
    .get(`${API_URL}/api/v0/users/${currentUserId}/profil`)
    .then((response) => {
      dispatch(SAVE_USER_PROFILE(response.data));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(addError(error.response.data.message));
    });
};

export const editUser = (formValues) => (dispatch) => {
  const { firstname, lastname, email } = formValues;

  // FIXME: ERROR 500: detail: "Notice: Undefined index: password"
  axios
    .patch(`${API_URL}/api/v0/users/${currentUserId}/edit`, {
      email,
      lastname,
      firstname,
    })
    .then((response) => {
      dispatch(TOAST_SUCCESS('Modifications effectuées'));
      dispatch(SAVE_USER_PROFILE(response.data));
    })
    .catch((error) => {
      console.warn(error);
      dispatch(TOAST_ERROR(error.response.data.message || error.detail));
    });
};

// TODO: async thunk: token OK = fetchUser - token NOK = logout
export const checkAuthentication = () => (dispatch) => {
  const token = window.localStorage.getItem('authToken');
  // If token still valid
  if (token) {
    const jwtData = jwtDecode(token);
    // Check if JWT exp date > actual Date
    if (jwtData.exp * 1000 > new Date().getTime()) {
      // Add to Axios global config:
      axios.defaults.withCredentials = true;
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      dispatch(LOG_IN_USER());
      dispatch(getCurrentUser());
    }
    else {
      dispatch(LOG_OUT_USER());
      // TODO/ clear trip && user;
      // dispatch(push('/'));
    }
  }
};

export const logOut = () => (dispatch) => {
  // Remove token from localStoreage
  window.localStorage.removeItem('authToken');
  delete axios.defaults.headers.Authorization;

  dispatch(LOG_OUT_USER());
  // TODO/ clear trip && user;
  // dispatch(LOG_OUT_TRIP());
  dispatch(push('/'));
};

// TODO: Look RHF file upload
export const editUserImage = () => (dispatch) => {
  const imageInput = document.querySelector('#profile-field-input.profile-image');
  const file = imageInput.files[0];

  const formData = new FormData();

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  axios
    .put(`${API_URL}/api/v0/users/${currentUserId}/upload`, formData, config)
    .then((response) => {
      console.log(response);
      dispatch(TOAST_SUCCESS('Photo sauvegardée !'));
      // save new avatar URL in store.
      dispatch(SAVE_USER_IMAGE(response.data));
    })
    .catch((error) => {
      console.warn(error);
    });
};
