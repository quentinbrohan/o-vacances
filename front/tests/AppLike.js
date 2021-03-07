import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router } from 'umi';


const defaultHistoryMock = createBrowserHistory();

const AppLike = ({ children, initialStoreContent = {}, mockHistory }) => {
  const mockStore = createStore((state) => state, initialStoreContent);

  return (
    <Router history={mockHistory || defaultHistoryMock}>
      <Provider store={mockStore}>
          {children}
      </Provider>
    </Router>
  );
};

export default AppLike;
