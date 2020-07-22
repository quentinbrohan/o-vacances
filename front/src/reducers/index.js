import { combineReducers } from 'redux';
import {toastsReducer as toasts} from 'react-toastify-redux';

import userReducer from './user';
import settingsReducer from './settings';
import tripReducer from './trip';
import errorReducer from './error';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  trip: tripReducer,
  error: errorReducer,
  toasts,

});

export default rootReducer;
