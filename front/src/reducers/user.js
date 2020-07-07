import { UPDATE_USER_FIELD, SAVE_USER } from 'src/actions/user';

const initialState = {
  // ici l'état initial
  email: '',
  password: '',
  info: {},
  isLogged: false,
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

    default: return state;
  }
};

export default user;
