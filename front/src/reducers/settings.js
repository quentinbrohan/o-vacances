import { DELETE_DISABLED_INPUT, ADD_IMAGE_PREVIEW } from 'src/actions/settings';

const initialState = {
  // ici l'état initial
  isDisabled: true,
  file: {},
  name: '',
  imagePreviewUrl: '',
};

const settings = (state = initialState, action = {}) => {
  switch (action.type) {
    case DELETE_DISABLED_INPUT:
      return {
        ...state,
        isDisabled: action.status,
      };

    case ADD_IMAGE_PREVIEW:
      return {
        ...state,
        file: action.url,
      };

    default: return state;
  }
};

export default settings;
