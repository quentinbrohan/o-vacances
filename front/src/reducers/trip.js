import {
  UPDATE_SUGGESTION_FIELD,
  ADD_SUGGESTION,
  SAVE_TRIPS,
  SAVE_TRIP,
  UPDATE_ACTIVITY_FIELD,
  CLEAR_SUGGESTION_FIELD,
  SAVE_SUGGESTIONS,
  UPDATE_USER_DISPONIBILITIES,
  UPDATE_TRIP_FORM_FIELD,
  REMOVE_TRIP,
  SAVE_TRIP_EDIT,
  UPDATE_TRIP_EDIT_FIELD,
  SAVE_DISPONIBILITIES,
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
  userDisponibilities: [],
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  password: '',
  location: '',
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
          ...state.trip,
          suggestion: action.suggestion,
        },
      };

    case UPDATE_USER_DISPONIBILITIES:
      return {
        ...state,
        userDisponibilities: {
          ...state.userDisponibilities,
          [action.name]: action.newValue,
        },
      };

    case UPDATE_TRIP_FORM_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
      };

    case UPDATE_ACTIVITY_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
      };

    case REMOVE_TRIP:
      return {
        ...state,
        trip: undefined,
      };

    case UPDATE_TRIP_EDIT_FIELD:
      return {
        ...state,
        trip: {
          ...state.trip,
          [action.name]: action.newValue,
        },
      };

    case SAVE_TRIP_EDIT:
      return {
        ...state,
        isLoading: false,
        isCreator: action.isCreator,
        tripPassword: action.trip.password,
        title: action.trip.title,
        description: action.trip.description,
        startDate: action.trip.startDate,
        endDate: action.trip.endDate,
        password: action.trip.password,
        location: action.trip.location,
        image: action.trip.image,
      };

    case SAVE_DISPONIBILITIES:
      return {
        ...state,
        isLoading: false,
        trip: {
          ...state.trip,
          disponibility: action.disponibilities,
        },
      };

    default: return state;
  }
};

export default trip;
