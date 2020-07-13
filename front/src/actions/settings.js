export const DELETE_DISABLED_INPUT = 'DELETE_DISABLED_INPUT';
export const ADD_IMAGE_PREVIEW = 'ADD_IMAGE_PREVIEW';

export const deleteDisabledInput = (status) => ({
  type: DELETE_DISABLED_INPUT,
  status,
});

export const addImagePreview = (url) => ({
  type: ADD_IMAGE_PREVIEW,
  url,
});
