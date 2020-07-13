export const UPDATE_SUGGESTION_FIELD = 'UPDATE_SUGGESTION_FIELD';
export const ADD_SUGGESTION = 'ADD_SUGGESTION';

export const updateSuggestionField = (newValue) => ({
  type: UPDATE_SUGGESTION_FIELD,
  newValue,
});

export const addSuggestion = () => ({
  type: ADD_SUGGESTION,
});
