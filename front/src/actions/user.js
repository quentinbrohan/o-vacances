export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const SIGN_IN = 'SIGN_IN';

export const updateUserField = (newValue, name) => ({
  type: UPDATE_USER_FIELD,
  newValue,
  name,
});

export const signIn = () => ({
  type: SIGN_IN,
});
