export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const SIGN_IN = 'SIGN_IN';
export const LOG_IN = 'LOG_IN';
export const SAVE_USER = 'SAVE_USER';
export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER_PROFIL = 'UPDATE_USER_PROFIL';
export const EDIT_USER = 'EDIT_USER';
export const CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const LOG_IN_USER = 'LOG_IN_USER';
export const EDIT_USER_IMAGE = 'EDIT_USER_IMAGE';
export const UPDATE_USER_IMAGE = 'UPDATE_USER_IMAGE';
export const LOADING = 'LOADING';

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

export const checkAuthentication = () => ({
  type: CHECK_AUTHENTICATION,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});

export const logInUser = () => ({
  type: LOG_IN_USER,
});

export const fetchUser = () => ({
  type: FETCH_USER,
});

export const updateUserProfil = (data) => ({
  type: UPDATE_USER_PROFIL,
  data,
});

export const editUser = () => ({
  type: EDIT_USER,
});

export const editUserImage = () => ({
  type: EDIT_USER_IMAGE,
});

export const updateUserImage = () => ({
  type: UPDATE_USER_IMAGE,
});

export const loading = (isLoading) => ({
  type: LOADING,
  isLoading,
});
