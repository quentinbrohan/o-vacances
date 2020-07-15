import {
  UPDATE_SUGGESTION_FIELD,
  ADD_SUGGESTION,
  SAVE_TRIPS,
} from 'src/actions/trip';

const initialState = {
  // ici l'état initial
  trips: {},
  activities: {},
  suggestions: {},
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
      console.log(action);

      return {
        ...state,
        trips: action.trips,
      };

    default: return state;
  }
};

export default trip;
