import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component,
  exact,
  isAuthenticated,
  path,
}) => (
  isAuthenticated
    ? (
      <Route
        path={path}
        exact={exact}
        component={component}
      />
    )
    : (<Redirect to="/login" />)
);

PrivateRoute.propTypes = {
  component: PropTypes.PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  exact: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

PrivateRoute.defaultProps = {
  exact: false,
};

export default PrivateRoute;
