import {
  UPDATE_SUGGESTION_FIELD,
  ADD_SUGGESTION,
  SAVE_TRIPS,
  SAVE_TRIP,
  UPDATE_ACTIVITY_FIELD,
  CLEAR_SUGGESTION_FIELD,
  SAVE_SUGGESTIONS,
  UPDATE_USER_DISPONIBILITIES,
} from 'src/actions/trip';

const initialState = {
  // ici l'état initial
  trips: [],
  trip: [],
  suggestionDescription: '',
  suggestionTitle: '',
  isLoading: true,
  isCreator: false,
  isOwnUser: false,
  activityTilte: '',
  activityDescription: '',
  activityStartDate: '',
  activityEndDate: '',
  activityCategory: '',
  tripPassword: '',
  userDisponibilities: {},
};

const trip = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_SUGGESTION_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
      };

    case ADD_SUGGESTION:
      return {
        ...state,
        suggestionContent: '',
      };

    case SAVE_TRIPS:
      return {
        ...state,
        trips: action.trips,
        isLoading: false,
      };

    case SAVE_TRIP:
      return {
        ...state,
        trip: action.trip,
        isLoading: false,
        isCreator: action.isCreator,
        tripPassword: action.trip.password,
        userDisponibilities: action.userDisponibilities,
      };

    case CLEAR_SUGGESTION_FIELD:
      return {
        ...state,
        suggestionTitle: '',
        suggestionDescription: '',
      };

    case SAVE_SUGGESTIONS:
      return {
        ...state,
        trip: {
          ...state,
          suggestion: action.suggestion,
        },
      };
    case UPDATE_USER_DISPONIBILITIES:
      console.log(action);
      return {
        ...state,
        userDisponibilities: {
          startDate: action.startDate,
          endDate: action.endDate,
        },
      };

    case UPDATE_ACTIVITY_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
      };

    default: return state;
  }
};

export default trip;
