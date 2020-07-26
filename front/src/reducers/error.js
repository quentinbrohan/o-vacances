import {
  ADD_ERROR,
  CLEAR_ERROR,
} from 'src/actions/error';

const initialState = {
  // ici l'état initial
  error: [],
};

const settings = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case CLEAR_ERROR:
      return {
        error: [],
      };

    default: return state;
  }
};

export default settings;
