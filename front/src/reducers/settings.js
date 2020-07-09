import { DELETE_DISABLED_INPUT } from 'src/actions/settings';

const initialState = {
  // ici l'état initial
  isDisabled: true,
};

const settings = (state = initialState, action = {}) => {
  switch (action.type) {
    case DELETE_DISABLED_INPUT:
      return {
        ...state,
        isDisabled: action.status,
      };

    default: return state;
  }
};

export default settings;
