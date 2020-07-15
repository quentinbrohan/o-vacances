import { combineReducers } from 'redux';

import userReducer from './user';
import settingsReducer from './settings';
import tripReducer from './trip';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  trip: tripReducer,
});

export default rootReducer;
