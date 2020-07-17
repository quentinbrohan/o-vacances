import {
  UPDATE_USER_FIELD,
  SAVE_USER,
  UPDATE_USER_PROFIL,
} from 'src/actions/user';

const initialState = {
  // ici l'état initial
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  info: {},
  isLogged: true,
  role: [],
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
        isLogged: action.isLogged,
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
      };

    default: return state;
  }
};

export default user;
