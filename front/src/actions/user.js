export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const SIGN_IN = 'SIGN_IN';
export const LOG_IN = 'LOG_IN';
export const SAVE_USER = 'SAVE_USER';
export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER_PROFIL = 'UPDATE_USER_PROFIL';

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

export const saveUser = (data, isLogged) => ({
  type: SAVE_USER,
  data,
  isLogged,
});

export const fetchUser = () => ({
  type: FETCH_USER,
});

export const updateUserProfil = (data) => ({
  type: UPDATE_USER_PROFIL,
  data,
});
