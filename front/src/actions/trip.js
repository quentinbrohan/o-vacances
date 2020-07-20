export const UPDATE_SUGGESTION_FIELD = 'UPDATE_SUGGESTION_FIELD';
export const ADD_SUGGESTION = 'ADD_SUGGESTION';
export const FETCH_TRIPS = 'FETCH_TRIPS';
export const SAVE_TRIPS = 'SAVE_TRIPS';
export const FETCH_TRIP = 'FETCH_TRIP';
export const SAVE_TRIP = 'SAVE_TRIP';
export const ADD_TRIP = 'ADD_TRIP';
export const NEW_TRIP = 'NEW_TRIP';
export const CLEAR_SUGGESTION_FIELD = 'CLEAR_SUGGESTION_FIELD';
export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const SAVE_SUGGESTIONS = 'SAVE_SUGGESTIONS';

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

export const saveTrip = (trip, isCreator) => ({
  type: SAVE_TRIP,
  trip,
  isCreator,
});

export const addTrip = (trip) => ({
  type: ADD_TRIP,
  trip,
});

export const newTrip = () => ({
  type: NEW_TRIP,
});

export const clearSuggestionField = () => ({
  type: CLEAR_SUGGESTION_FIELD,
});

export const fetchSuggestions = () => ({
  type: FETCH_SUGGESTIONS,
});

export const saveSuggestions = (suggestions) => ({
  type: SAVE_SUGGESTIONS,
  suggestions,
});
