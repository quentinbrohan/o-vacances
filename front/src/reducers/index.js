import { combineReducers } from 'redux';

import userReducer from './user';
import settingsReducer from './settings';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
});

export default rootReducer;
