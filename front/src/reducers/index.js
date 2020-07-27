import { combineReducers } from 'redux';
import { toastsReducer as toasts } from 'react-toastify-redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './user';
import settingsReducer from './settings';
import tripReducer from './trip';
import errorReducer from './error';

const rootReducer = (history) => combineReducers({
  user: userReducer,
  settings: settingsReducer,
  trip: tripReducer,
  error: errorReducer,
  toasts,
  router: connectRouter(history),
});

export default rootReducer;
