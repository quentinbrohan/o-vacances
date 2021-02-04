// RTK
import { toastsReducer as toasts } from 'react-toastify-redux';
import { combineReducers } from 'redux';
import tripReducer from 'src/features/trip';
import userReducer, { LOG_OUT_USER } from 'src/features/user';
import { tripApi } from 'src/services/trip';
import { userApi } from 'src/services/user';

const appReducer = combineReducers({
  trip: tripReducer,
  user: userReducer,
  [tripApi.reducerPath]: tripApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  toasts,
});

const rootReducer = (state, action) => {
  // Reset whole app state/Clear RTK Query cache
  if (action.type.match(LOG_OUT_USER)) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
