// == Import npm
import React, { lazy, Suspense, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify-redux';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'src/components/Loading';
import PrivateRoute from 'src/components/PrivateRoute';
import { logInUser, logOutUser } from 'src/features/user';
import BasicLayout from 'src/layouts/BasicLayout';
import Contact from 'src/pages/Contact';
import LegacyMentions from 'src/pages/LegacyMentions';
import Login from 'src/pages/Login';
import NoMatch from 'src/pages/NoMatch';
import Signin from 'src/pages/Signin';
import Trip from 'src/pages/trip/Trip';
import TripAuth from 'src/pages/trip/Trip/TripAuth';
import Profile from 'src/pages/user/Profile';
import LocalStorageUtil from 'src/utils/LocalStorageUtil';
import { isAuthTokenStillValid } from 'src/utils/user';

const HomeUser = lazy(() => import('src/pages/HomeUser'));
const HomeVisitor = lazy(() => import('src/pages/HomeVisitor'));
const Activities = lazy(() => import('src/pages/trip/Trip/Activities'));
const TripForm = lazy(() => import('src/pages/trip/TripForm'));
const Team = lazy(() => import('src/pages/Team'));

export const localStorageUtil = new LocalStorageUtil();

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const loading = useRef(true);

  const token = localStorageUtil.getFromLocalStorage('authToken');
  if (isAuthTokenStillValid(token)) {
    dispatch(logInUser());
    loading.current = false;
  } else {
    dispatch(logOutUser());
    loading.current = false;
  }
  if (loading.current) {
    return <Loading />;
  }

  return (
    <BasicLayout>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? (
              <PrivateRoute
                path="/"
                component={HomeUser}
                isAuthenticated={isAuthenticated}
              />
            ) : (
              <HomeVisitor />
            )}
          </Route>
          <Route path="/tripAuth" component={TripAuth} />
          <Route path="/contact" component={Contact} />
          <Route path="/loading" component={Loading} />
          <Route path="/equipe" component={Team} />
          <Route path="/mentions-legales" component={LegacyMentions} />
          <Route path="/signin" component={Signin} />
          <Route path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/mon-profil"
            component={Profile}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/voyage/:id"
            component={Trip}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/voyage/:id/activites"
            component={Activities}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/creer-un-voyage"
            component={TripForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/modifier-un-voyage/:id"
            component={TripForm}
            isAuthenticated={isAuthenticated}
          />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </BasicLayout>
  );
};

export default App;
