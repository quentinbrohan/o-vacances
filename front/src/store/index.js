import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from 'src/reducers';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [applyMiddleware(thunk)],
  devTools: process.env.NODE_ENV === 'development',
});
