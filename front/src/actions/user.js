export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const SIGN_IN = 'SIGN_IN';
export const LOG_IN = 'LOG_IN';
export const SAVE_USER = 'SAVE_USER';

export const updateUserField = (newValue, name) => ({
  type: UPDATE_USER_FIELD,
  newValue,
  name,
});

export const signIn = () => ({
  type: SIGN_IN,
});

export const logIn = () => ({
  type: LOG_IN,
});

export const saveUser = (data, isAuthenticated) => ({
  type: SAVE_USER,
  data,
  isAuthenticated,
});
