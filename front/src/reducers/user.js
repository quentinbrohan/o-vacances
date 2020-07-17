import {
  UPDATE_USER_FIELD,
  SAVE_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
} from 'src/actions/user';

const initialState = {
  // ici l'état initial
  firstname: '',
  lastname: '',
  email: 'quentin@gmail.com',
  password: 'quentin',
  info: {},
  isAuthenticated: false,
  isLoading: true,
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
      };

    case SAVE_USER:
      return {
        ...state,
        info: action.data,
        isAuthenticated: true,
        email: '',
        password: '',
      };

    case LOG_IN_USER:
      return {
        ...state,
        isAuthenticated: true,
      };

    case LOG_OUT_USER:
      return {
        ...state,
        isAuthenticated: false,
      };

    default: return state;
  }
};

export default user;
