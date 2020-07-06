import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';

import userMiddleware from 'src/middlewares/userMiddleware';

const enhancers = composeWithDevTools(
  applyMiddleware(
    userMiddleware,
    // middleware
  ),
);

const store = createStore(
  // reducer
  reducer,
  enhancers,
);

export default store;
