import {
  UPDATE_SUGGESTION_FIELD,
  ADD_SUGGESTION,
  SAVE_TRIPS,
  SAVE_TRIP,
} from 'src/actions/trip';

const initialState = {
  // ici l'état initial
  trips: {},
  trip: {},
  suggestionContent: '',
};

const trip = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_SUGGESTION_FIELD:
      return {
        ...state,
        suggestionContent: action.newValue,
      };

    case ADD_SUGGESTION:
      return {
        ...state,
        suggestionContent: '',
      };

    case SAVE_TRIPS:
      return {
        ...state,
        trips: action.trips,
      };

    case SAVE_TRIP:
      return {
        ...state,
        trip: action.trip,
      };

    default: return state;
  }
};

export default trip;
