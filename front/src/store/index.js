import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

// principal reducer
import reducer from 'src/reducers';

import userMiddleware from 'src/middlewares/userMiddleware';
import tripMiddleware from 'src/middlewares/tripMiddleware';

export const history = createBrowserHistory();

const enhancers = composeWithDevTools(
  applyMiddleware(
    userMiddleware,
    tripMiddleware,
    routerMiddleware(history),
    // middleware
  ),
);

const store = createStore(
  // reducer
  reducer(history),
  // enhancer
  enhancers,
);

export default store;
