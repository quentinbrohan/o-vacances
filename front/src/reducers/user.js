import {
  UPDATE_USER_FIELD,
  SAVE_USER,
  UPDATE_USER_PROFIL,
  LOG_IN_USER,
  LOG_OUT_USER,
} from 'src/actions/user';

const initialState = {
  // ici l'état initial
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  avatar: '',
  info: {},
  isAuthenticated: true,
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

    case UPDATE_USER_PROFIL:
      return {
        ...state,
        info: action.data.info,
        role: [action.data.roles],
        email: action.data.email,
        password: action.data.password,
        firstname: action.data.firstname,
        lastname: action.data.lastname,
        avatar: action.data.avatar,
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
