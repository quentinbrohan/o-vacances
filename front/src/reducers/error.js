import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from 'src/actions/error';

const initialState = {
  // ici l'état initial
  success: {},
  error: {},
};

const settings = (state = initialState, action = {}) => {
  switch (action.type) {
    case SUCCESS_MESSAGE:
      return {
        ...state,
        success: action.success,
      };

    case ERROR_MESSAGE:
      return {
        ...state,
        error: action.error,
      };

    default: return state;
  }
};

export default settings;
