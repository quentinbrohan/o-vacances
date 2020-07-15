import {
  UPDATE_SUGGESTION_FIELD,
  ADD_SUGGESTION,
} from 'src/actions/trip';

const initialState = {
  // ici l'état initial
  info: {},
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

    default: return state;
  }
};

export default trip;
