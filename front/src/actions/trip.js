export const UPDATE_SUGGESTION_FIELD = 'UPDATE_SUGGESTION_FIELD';
export const ADD_SUGGESTION = 'ADD_SUGGESTION';
export const FETCH_TRIPS = 'FETCH_TRIPS';
export const SAVE_TRIPS = 'SAVE_TRIPS';
export const FETCH_TRIP = 'FETCH_TRIP';
export const SAVE_TRIP = 'SAVE_TRIP';
export const ADD_TRIP = 'ADD_TRIP';
export const NEW_TRIP = 'NEW_TRIP';
export const UPDATE_ACTIVITY_FIELD = 'UPDATE_ACTIVITY_FIELD';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const EDIT_ACTIVITY = 'EDIT_ACTIVITY';
export const CLEAR_SUGGESTION_FIELD = 'CLEAR_SUGGESTION_FIELD';
export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const SAVE_SUGGESTIONS = 'SAVE_SUGGESTIONS';
export const UPDATE_USER_DISPONIBILITIES = 'UPDATE_USER_DISPONIBILITIES';
export const MODIFY_USER_DISPONIBILITIES = 'MODIFY_USER_DISPONIBILITIES';
export const NEW_USER_DISPONIBILITIES = 'NEW_USER_DISPONIBILITIES';
export const UPDATE_TRIP_FORM_FIELD = 'UPDATE_TRIP_FORM_FIELD';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const DELETE_TRIP = 'DELETE_TRIP';
export const REMOVE_TRIP = 'REMOVE_TRIP';
export const UPDATE_TRIP_EDIT_FIELD = 'UPDATE_TRIP_EDIT_FIELD';
export const SAVE_TRIP_EDIT = 'SAVE_TRIP_EDIT';
export const MODIFY_TRIP = 'MODIFY_TRIP';
export const FETCH_DISPONIBILITIES = 'FETCH_DISPONIBILITIES';
export const SAVE_DISPONIBILITIES = 'SAVE_DISPONIBILITIES';
export const CHECK_ACTIVITY = 'CHECK_ACTIVITY';
export const LOADING = 'LOADING';

export const updateSuggestionField = (newValue, name) => ({
  type: UPDATE_SUGGESTION_FIELD,
  newValue,
  name,
});

export const addSuggestion = () => ({
  type: ADD_SUGGESTION,
});

export const fetchTrips = () => ({
  type: FETCH_TRIPS,
});

export const saveTrips = (trips) => ({
  type: SAVE_TRIPS,
  trips,
});

export const fetchTrip = (tripId) => ({
  type: FETCH_TRIP,
  tripId,
});

export const saveTrip = (trip, isCreator, userDisponibilities) => ({
  type: SAVE_TRIP,
  trip,
  isCreator,
  userDisponibilities,
});

export const addTrip = (formData) => ({
  type: ADD_TRIP,
  formData,
});

export const newTrip = () => ({
  type: NEW_TRIP,
});

export const updateActivityField = (newValue, name) => ({
  type: UPDATE_ACTIVITY_FIELD,
  newValue,
  name,
});

export const addActivity = () => ({
  type: ADD_ACTIVITY,
});

export const deleteActivity = () => ({
  type: DELETE_ACTIVITY,
});

export const fetchSuggestions = () => ({
  type: FETCH_SUGGESTIONS,
});

export const saveSuggestions = (suggestions) => ({
  type: SAVE_SUGGESTIONS,
  suggestions,
});

export const updateUserDisponibilities = (startDate, endDate) => ({
  type: UPDATE_USER_DISPONIBILITIES,
  startDate,
  endDate,
});

export const modifyUserDisponibilities = (startDate, endDate) => ({
  type: MODIFY_USER_DISPONIBILITIES,
  startDate,
  endDate,
});

export const newUserDisponibilities = (startDate, endDate) => ({
  type: NEW_USER_DISPONIBILITIES,
  startDate,
  endDate,
});

export const updateTripFormField = (newValue, name) => ({
  type: UPDATE_TRIP_FORM_FIELD,
  newValue,
  name,
});

export const editActivity = () => ({
  type: EDIT_ACTIVITY,
});
export const deleteTrip = () => ({
  type: DELETE_TRIP,
});

export const removeTrip = () => ({
  type: REMOVE_TRIP,
});

export const updateTripEditField = (newValue, name) => ({
  type: UPDATE_TRIP_EDIT_FIELD,
  newValue,
  name,
});

export const saveTripEdit = (trip, isCreator) => ({
  type: SAVE_TRIP_EDIT,
  trip,
  isCreator,
});

export const modifyTrip = () => ({
  type: MODIFY_TRIP,
});

export const fetchDisponibilities = () => ({
  type: FETCH_DISPONIBILITIES,
});

export const saveDisponibilities = (disponibilities) => ({
  type: SAVE_DISPONIBILITIES,
  disponibilities,
});

export const checkActivity = (id) => ({
  type: CHECK_ACTIVITY,
  id,
});

export const loading = (isLoading) => ({
  type: LOADING,
  isLoading,

});
