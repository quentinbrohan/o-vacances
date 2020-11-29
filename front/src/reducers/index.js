// import { combineReducers } from 'redux';
// import { toastsReducer as toasts } from 'react-toastify-redux';

// import userReducer from './user';
// import settingsReducer from './settings';
// import tripReducer from './trip';
// import errorReducer from './error';

// const rootReducer = (history) => combineReducers({
//   user: userReducer,
//   settings: settingsReducer,
//   trip: tripReducer,
//   error: errorReducer,
//   toasts,
//   router: connectRouter(history),
// });

// export default rootReducer;

//
// RTK
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { toastsReducer as toasts } from 'react-toastify-redux';

import userReducer from 'src/features/user';
import tripReducer from 'src/features/trip';

// import notesReducer from "../features/notes/notesSlice";

const rootReducer = (history) => combineReducers({
  user: userReducer,
  trip: tripReducer,
  // settings: settingsReducer,
  toasts,
  router: connectRouter(history),
});

export default rootReducer;
