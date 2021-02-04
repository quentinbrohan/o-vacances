import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from 'src/components/App';
import { store } from 'src/store';

// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();

const rootReactElement = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

const target = document.getElementById('root');
render(rootReactElement, target);
