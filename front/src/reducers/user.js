import {
  UPDATE_USER_FIELD,
} from 'src/actions/user';

const initialState = {
  // ici l'état initial
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  info: {},
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
      };

    default: return state;
  }
};

export default user;
