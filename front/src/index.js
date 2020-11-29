// RTK
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import App from 'src/containers/App';
import rootReducer from './reducers';

const history = createBrowserHistory();

const store = configureStore({
  reducer: rootReducer(history),
  middleware: [routerMiddleware(history)],
  enhancers: [
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
  ],
  devTools: process.env.NODE_ENV === 'development',
});

const rootReactElement = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

const target = document.getElementById('root');
render(rootReactElement, target);
