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
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';
export const SAVE_USER_DISPONIBILITIES = 'SAVE_USER_DISPONIBILITIES';
export const CHECK_TRIP_AUTH = 'CHECK_TRIP_AUTH';
export const SAVE_TRIP_AUTH = 'SAVE_TRIP_AUTH';
export const SAVE_TRIP_ACTIVITIES = 'SAVE_TRIP_ACTIVITIES';
export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES';
export const SAVE_ACTIVITIES = 'SAVE_ACTIVITIES';
export const DELETE_SUGGESTION = 'DELETE_SUGGESTION';
export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';
export const LOG_OUT_TRIP = 'LOG_OUT_TRIP';
export const CLEAR_ACTIVITY_FIELD = 'CLEAR_ACTIVITY_FIELD';
export const SAVE_SUGGESTION = 'SAVE_SUGGESTION';
export const SAVE_ACTIVITY = 'SAVE_ACTIVITY';

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

export const addActivity = (activity) => ({
  type: ADD_ACTIVITY,
  activity,
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

export const modifyUserDisponibilities = (dates) => ({
  type: MODIFY_USER_DISPONIBILITIES,
  dates,
});

export const newUserDisponibilities = (dates) => ({
  type: NEW_USER_DISPONIBILITIES,
  dates,
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

export const saveDisponibilities = (disponibilities, userDisponibilities) => ({
  type: SAVE_DISPONIBILITIES,
  disponibilities,
  userDisponibilities,
});

export const checkActivity = (id) => ({
  type: CHECK_ACTIVITY,
  id,
});

export const loading = (isLoading) => ({
  type: LOADING,
  isLoading,
});

export const removeActivity = (activityId) => ({
  type: REMOVE_ACTIVITY,
  activityId,
});

export const saveUserDisponibilities = (userDisponibilities) => ({
  type: SAVE_USER_DISPONIBILITIES,
  userDisponibilities,
});

export const checkTripAuth = (tripId, haveTripAccess) => ({
  type: CHECK_TRIP_AUTH,
  tripId,
  haveTripAccess,
});

export const saveTripAuth = (haveTripAccess) => ({
  type: SAVE_TRIP_AUTH,
  haveTripAccess,
});

export const saveTripActivities = (tripActivity) => ({
  type: SAVE_TRIP_ACTIVITIES,
  tripActivity,
});

export const fetchActivities = () => ({
  type: FETCH_ACTIVITIES,
});

export const saveActivities = (newActivities) => ({
  type: SAVE_ACTIVITIES,
  newActivities,
});

export const deleteSuggestion = (suggestionId) => ({
  type: DELETE_SUGGESTION,
  suggestionId,
});

export const removeSuggestion = (suggestionId) => ({
  type: REMOVE_SUGGESTION,
  suggestionId,
});

export const logOutTrip = () => ({
  type: LOG_OUT_TRIP,
});

export const clearActivityField = () => ({
  type: CLEAR_ACTIVITY_FIELD,
});

export const saveSuggestion = (suggestion) => ({
  type: SAVE_SUGGESTION,
  suggestion,
});

export const saveActivity = (activity) => ({
  type: SAVE_ACTIVITY,
  activity,
});
