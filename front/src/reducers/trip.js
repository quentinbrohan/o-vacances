import {
  UPDATE_SUGGESTION_FIELD,
  ADD_SUGGESTION,
  SAVE_TRIPS,
  SAVE_TRIP,
} from 'src/actions/trip';

const initialState = {
  // ici l'état initial
  trips: [],
  trip: [],
  suggestionDescription: '',
  suggestionTitle: '',
  isLoading: true,
};

const trip = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_SUGGESTION_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
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
        isLoading: false,
      };

    case SAVE_TRIP:
      return {
        ...state,
        trip: action.trip,
        isLoading: false,
      };

    default: return state;
  }
};

export default trip;
