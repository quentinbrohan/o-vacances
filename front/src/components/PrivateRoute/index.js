import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loading from 'src/components/Loading';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  // Prevent first render and redirect while authentication isn't checked
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => (isAuthenticated ? (
        <Component {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
