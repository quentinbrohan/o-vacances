import {
  UPDATE_USER_FIELD,
  SAVE_USER,
  UPDATE_USER_PROFIL,
  LOG_IN_USER,
  LOG_OUT_USER,
  UPDATE_USER_IMAGE,
  LOADING,
  SIGN_IN,
} from 'src/actions/user';

const initialState = {
  // ici l'état initial
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  avatar: '',
  info: {},
  isAuthenticated: false,
  isLoading: false,
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
        firstname: action.data.firstname,
        lastname: action.data.lastname,
        avatar: action.data.avatar,
      };

    case LOG_IN_USER:
      return {
        ...state,
        isAuthenticated: true,
        email: '',
        password: '',
      };

    case LOG_OUT_USER:
      return {
        ...state,
        isAuthenticated: false,

      };

    case UPDATE_USER_IMAGE:
      return {
        ...state,
        avatar: action.data,
      };

    case LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case SIGN_IN:
      return {
        ...state,
        email: '',
        password: '',
      };

    default: return state;
  }
};

export default user;
