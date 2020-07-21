import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// principal reducer
import reducer from 'src/reducers';

import userMiddleware from 'src/middlewares/userMiddleware';
import tripMiddleware from 'src/middlewares/tripMiddleware';

const enhancers = composeWithDevTools(
  applyMiddleware(
    userMiddleware,
    tripMiddleware,
    // middleware
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;
