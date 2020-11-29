import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { push } from 'connected-react-router';

import {
  error as TOAST_ERROR,
  message as TOAST_MESSAGE,
  success,
  success as TOAST_SUCCESS,
  warning as TOAST_WARNING,
} from 'react-toastify-redux';

import { API_URL } from 'src/constants';
import { currentUserId } from 'src/utils/getCurrentUser';
import { checkIfCreator } from 'src/utils';
import { EDIT_ACTIVITY } from '../../actions/trip';

const initialState = {
  trips: [],
  isLoading: true,
  isCreator: false,
  isOwnUser: false,
  hasTripAccess: false,
  userDisponibilities: [],
  // TODO: REMOVE INPUTS FROM STATE as we use RHF
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    // Immutable state created by Immer
    // https://redux-toolkit.js.org/tutorials/intermediate-tutorial#mutable-update-logic
    // https://github.com/immerjs/immer
    LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SAVE_TRIPS: (state, action) => {
      state.trips = action.payload;
      state.isLoading = false;
    },
    SAVE_TRIP: (state, action) => {
      state.trips = state.trips.push(action.payload);
      state.isLoading = false;
    },
    SAVE_SUGGESTION: (state, action) => {
      console.log('addSugg', action);
      // TODO: filter trips => tripId === currentTrip && push new suggestion
      // state.trips.filter((trip) => trip.id === action.payload.tripId)
      // suggestion: state.trip.suggestion.push(action.payload)
    },
    SAVE_SUGGESTIONS: (state, actions) => {
      // TODO: filter trips => tripId === currentTrip && push suggestions
      // state.trips.filter((trip) => trip.id === action.payload.tripId)
      // suggestion: state.trip.suggestion.push(action.payload)
    },
    SAVE_USER_DISPONIBILITIES: (state, action) => {
      state.userDisponibilities = action.payload;
    },
    SAVE_ACTIVITY: (state, action) => {
      // TODO: filter trips => tripId === currentTrip && push activity
      // activity: state.trip.activity.push(action.payload)
    },
    EDIT_ACTIVITY: (state, action) => {
      // TODO: filter trips => tripId === currentTrip && filter suggestion => suggestionId === suggestionId && replace suggestion
    },
    REMOVE_TRIP: (state, action) => {
      // TODO: filter trips => tripId !== currenTrip
    },
    UPDATE_TRIP: (state, action) => {
      // TODO: filter trips => tripId === currenTrip && replace trip
    },
    SAVE_DISPONIBILITIES: (state, action) => {
      // TODO: filter trips +> tripId === currentTrip && push disponibilities & userDisponibilities
    },
    REMOVE_ACTIVITY: (state, action) => {
      // TODO: filter trips => tripId !== currenTrip && filter activities => activity !== activityId
    },
    SAVE_ACTIVITIES: (state, action) => {
      // TODO: filter trips => tripId === currentTrip && push activities
    },
    SAVE_TRIP_AUTH: (state, action) => {
      state.hasTripAccess = action.payload;
    },
    REMOVE_SUGGESTION: (state, action) => {
      // TODO: filter trips => tripId !== currenTrip && filter suggestions => suggestion !== suggestionId
    },
  },
});

export default tripSlice.reducer;

export const {
  // TRIPS
  LOG_OUT_TRIP,
  REMOVE_TRIP,
  SAVE_TRIP_AUTH,
  SAVE_TRIP,
  SAVE_TRIPS,
  UPDATE_TRIP,
  // SUGGESTIONS
  ADD_SUGGESTION,
  REMOVE_SUGGESTION,
  SAVE_SUGGESTION,
  SAVE_SUGGESTIONS,
  // ACTIVITY
  CHECK_ACTIVITY,
  REMOVE_ACTIVITY,
  SAVE_ACTIVITY,
  SAVE_ACTIVITIES,
  SAVE_TRIP_ACTIVITIES,
  // DISPONIBILITIES
  SAVE_DISPONIBILITIES,
  SAVE_USER_DISPONIBILITIES,
  UPDATE_USER_DISPONIBILITIES,
  // MISC
  LOADING,
  // CLEAR
  UPDATE_SUGGESTION_FIELD,
  UPDATE_ACTIVITY_FIELD,
  UPDATE_TRIP_FORM_FIELD,
  UPDATE_TRIP_EDIT_FIELD,
  CLEAR_ACTIVITY_FIELD,
} = tripSlice.actions;

export const getTrips = () => (dispatch) => {
  dispatch(LOADING(true));

  axios
    .get(`${API_URL}/api/v0/users/${currentUserId}/trips`)
    .then((response) => {
      dispatch(SAVE_TRIPS(response.data.trip));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(toastError(error.response.data.message));
    });
};

// TODO: on Trip page: filter trips => tripId || fetchTrip(tripId)
export const getTrip = (tripId) => (dispatch) => {
  console.log({ tripId });

  axios
    .get(`${API_URL}/api/v0/users/${currentUserId}/trips/${tripId}`)
    .then((response) => {
      if (response.status === 401) {
        // console.log(response.data.message);
      }

      // Check if creator
      const isCreator = checkIfCreator(response.data.creator, currentUserId);

      dispatch(SAVE_TRIP(response.data, isCreator));
    })
    .then(() => {
      dispatch(LOADING(false));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(toastError(error.response.data.message));
    });
};

export const addTrip = (formValues) => (dispatch) => {
  const {
    title, description, location, startDate, endDate, password,
  } = formValues;

  // TODO: Look RHF file upload
  const inputImage = document.querySelector('#tripForm-image');
  const file = inputImage.files[0];

  const form = {
    title,
    description,
    location,
    startDate,
    endDate,
    password,
  };

  const json = JSON.stringify(form);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('document', json);

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  axios
    .post(`${API_URL}/api/v0/users/${currentUserId}/trips`, formData, config)
    .then((response) => {
      dispatch(TOAST_SUCCESS('Nouveau voyage créé'));
      dispatch(push(`/voyage/${response.data.id}`));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(toastError(error.response.data.message));
    });
};

export const addSuggestion = (formValues) => (dispatch) => {
  const { title, description, tripId } = formValues;

  axios
    .post(`${API_URL}/api/v0/trips/${tripId}/suggestions/new`, {
      title,
      description,
      user: currentUserId,
      trip: tripId,
    })
    .then((response) => {
      dispatch(TOAST_SUCCESS('Suggestion ajoutée !'));
      dispatch(SAVE_SUGGESTION(response.data, tripId));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(TOAST_ERROR(error.response.data.message));
    });
};

export const getSuggestions = (tripId) => (dispatch) => {
  axios
    .get(`${API_URL}/api/v0/trips/${tripId}/suggestions`)

  // props,
  // })
    .then((response) => {
      // console.log(response);
      dispatch(SAVE_SUGGESTIONS(response.data, tripId));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(TOAST_ERROR(error.response.data.message));
    });
};

export const editUserDisponibilities = (formValues) => (dispatch) => {
  const {
    startDate, endDate, tripId, disponibilityId,
  } = formValues;

  axios
    .patch(`${API_URL}/api/v0/users/${currentUserId}/disponibilities/${disponibilityId}`, {
      // props,
      trip: tripId,
      startDate,
      endDate,
    })
    .then((response) => {
      // console.log(response);

      dispatch(SAVE_USER_DISPONIBILITIES(response.data));
      dispatch(TOAST_SUCCESS('Disponibilités mise à jour'));
      // For refresh
      // dispatch(getDisponibilities(tripId));
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const addUserDisponibilities = (formValues) => (dispatch) => {
  const { startDate, endDate, tripId } = formValues;

  axios
    .post(`${API_URL}/api/v0/users/${currentUserId}/disponibilities`, {
      // props,
      trip: tripId,
      startDate,
      endDate,
    })
    .then((response) => {
      dispatch(SAVE_USER_DISPONIBILITIES(response.data));
      dispatch(TOAST_SUCCESS('Mise à jour des disponibilités !'));
      // For refresh
      // dispatch(getDisponibilities(tripId));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(toastError(error.response.data.message));
    });
};

export const addActivity = (formValues) => (dispatch) => {
  const {
    title, description, category, startDate, endDate, tripId,
  } = formValues;

  axios
    .post(`${API_URL}/api/v0/trips/${tripId}/activities`, {
      title,
      description,
      startDate,
      endDate,
      category,
      trip: tripId,
      creator: currentUserId,
    })
    .then((response) => {
      // console.log(response);

      dispatch(SAVE_ACTIVITY(response.data, tripId));
      dispatch(TOAST_SUCCESS('Activité ajoutée !'));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(TOAST_ERROR(error.response.data.message));
    });
};

export const editActivity = (formValues) => (dispatch) => {
  const {
    title, description, category, startDate, endDate, tripId, activityId,
  } = formValues;

  axios
    .patch(`${API_URL}/api/v0/trips/${tripId}/activities/${activityId}/edit`, {
      title,
      description,
      startDate,
      endDate,
      category,
      trip: tripId,
      creator: currentUserId,
    })
    .then((response) => {
      // console.log(response);

      dispatch(EDIT_ACTIVITY());
      dispatch(TOAST_SUCCESS('Activité modifiée !'));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(Error(error.response.data.message));
    });
};

export const deleteTrip = (tripId) => (dispatch) => {
  dispatch(LOADING(true));

  axios
    .delete(`${API_URL}/api/v0/users/${currentUserId}/trips/${tripId}/`)
    .then(() => {
      dispatch(REMOVE_TRIP());
      dispatch(TOAST_SUCCESS('Voyage supprimé'));
      dispatch(push('/'));
      dispatch(LOADING(false));
    })
    .catch((error) => {
      console.warn(error);
      dispatch(TOAST_ERROR(error.response.data.message));
    });
};

export const editTrip = (formValues) => (dispatch) => {
  const {
    title, description, location, startDate, endDate, password, tripId,
  } = formValues;

  // TODO: Look RHF file upload
  const imageInput = document.querySelector('#tripEdit-image');
  const file = imageInput.files[0];

  const form = {
    id: tripId,
    title,
    description,
    location,
    startDate,
    endDate,
    password,
  };

  const json = JSON.stringify(form);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('document', json);

  const config = {
    method: 'patch',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'multipart/form-data',
    },
  };

  axios
    .patch(`${API_URL}/api/v0/users/${currentUserId}/trips/${tripId}`, formData, config)
    .then((response) => {
      dispatch(UPDATE_TRIP(response.data, tripId));
      dispatch(TOAST_SUCCESS('Modifications effectuées'));
      dispatch(push(`/voyage/${tripId}`));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(TOAST_ERROR(error.response.data.message));
    });
};

export const getDisponibilities = (tripId) => (dispatch) => {
  axios
    .get(`${API_URL}/api/v0/trips/${tripId}/disponibilities`)
    .then((response) => {
      const userDisponibilities = response.data.disponibility.filter(
        (participant) => participant.users[0].id === currentUserId,
      );

      dispatch(SAVE_DISPONIBILITIES(response.data.disponibility, userDisponibilities));
    })
    .catch((error) => {
      console.warn(error);
      // dispatch(TOAST_ERROR(error.response.data.message));
    });
};

export const deleteActivity = (tripId, activityId) => (dispatch) => {
  axios
    .delete(`${API_URL}/api/v0/users/${currentUserId}/trips/${tripId}/activities/${activityId}/delete`)
    .then(() => {
      dispatch(REMOVE_ACTIVITY(activityId));
      dispatch(TOAST_SUCCESS('Activité supprimée'));
    })
    .catch((error) => {
      console.warn(error);
      dispatch(TOAST_ERROR(error.response.data.message));
    });
};

export const getActivities = (tripId) => (dispatch) => {
  axios
    .get(`http://localhost:8000/api/v0/trips/${tripId}/activities`)
    .then((response) => {
      dispatch(SAVE_ACTIVITIES(response.data));
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const checkTripAuthentication = (formValues) => (dispatch) => {
  const { password, tripId } = formValues;

  dispatch(LOADING(true));

  axios
    .post(`${API_URL}/api/v0/users/${currentUserId}/trips/${tripId}`, {
      password,
    })
    .then((response) => {
      // console.log(response);
      // IF Password OK || user already authenticated
      if (response.status === 200) {
        dispatch(SAVE_TRIP_AUTH(true));
        // Check if creator
        const isCreator = checkIfCreator(response.data.creator, currentUserId);

        // Check if logged user have disponibilities
        const userDisponibilities = response.data.disponibility.filter(
          (participant) => participant.users[0].id === currentUserId,
        );

        dispatch(SAVE_TRIP(response.data, isCreator, userDisponibilities));
      }
    })
    .catch((error) => {
      console.warn(error);
      if (error.response.status === 401) {
        dispatch(SAVE_TRIP_AUTH(false));
        dispatch(LOADING(false));
        dispatch(TOAST_WARNING(error.response.data.message));
      }
    });
};

export const deleteSuggestion = (tripId, suggestionId) => (dispatch) => {
  axios
    .delete(`${API_URL}/api/v0/users/${currentUserId}/trips/${tripId}/suggestions/${suggestionId}`)
    .then(() => {
      dispatch(REMOVE_SUGGESTION(suggestionId));
      dispatch(TOAST_SUCCESS('Suggestion supprimée'));
    })
    .catch((error) => {
      console.warn(error);
      dispatch(TOAST_ERROR(error.response.data.message));
    });
};
