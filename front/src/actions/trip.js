export const UPDATE_SUGGESTION_FIELD = 'UPDATE_SUGGESTION_FIELD';
export const ADD_SUGGESTION = 'ADD_SUGGESTION';
export const FETCH_TRIPS = 'FETCH_TRIPS';
export const SAVE_TRIPS = 'SAVE_TRIPS';
export const FETCH_TRIP = 'FETCH_TRIP';
export const SAVE_TRIP = 'SAVE_TRIP';
export const ADD_TRIP = 'ADD_TRIP';
export const NEW_TRIP = 'NEW_TRIP';

export const updateSuggestionField = (newValue) => ({
  type: UPDATE_SUGGESTION_FIELD,
  newValue,
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

export const saveTrip = (trip) => ({
  type: SAVE_TRIP,
  trip,
});

export const addTrip = (trip) => ({
  type: ADD_TRIP,
  trip,
});

export const newTrip = () => ({
  type: NEW_TRIP,
});
