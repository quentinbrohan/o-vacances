export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const addError = (error) => ({
  type: ADD_ERROR,
  error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
