export const SUCCESS_MESSAGE = 'SUCCESS_MESSAGE';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const ERROR_PAGE = 'ERROR_PAGE';

export const successMessage = () => ({
  type: SUCCESS_MESSAGE,
});

export const errorMessage = (error) => ({
  type: ERROR_MESSAGE,
  error,
});
