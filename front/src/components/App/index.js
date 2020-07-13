// == Import npm
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import
// Layout
import Footer from 'src/components/Footer';
import Header from 'src/containers/Header';
import PrivateRoute from 'src/utils/PrivateRoute';
// Pages
import Contact from 'src/components/Contact';
import HomeVisitor from 'src/components/HomeVisitor';
import Signin from 'src/containers/Signin';
import Team from 'src/components/Team';
import Login from 'src/containers/Login';
import Profile from 'src/containers/Profile';
import Trip from 'src/containers/Trip';
import ErrorPage from 'src/components/ErrorPage';
import HomeUser from 'src/components/HomeUser';
import Activities from 'src/components/Activities';
import TripForm from 'src/containers/TripForm';
import TripEdit from 'src/containers/TripEdit';

// Data
import persons from 'src/data/teamData';

import './styles.scss';

// == Composant
const App = ({ isLogged }) => (
  <div className="app">
    <Header />
    <div className="container">
      <Switch>
        {isLogged
          ? (
            <Route
              exact
              path="/"
              component={HomeUser}
            />
          )
          : (
            <Route
              exact
              path="/"
              component={HomeVisitor}
            />
          )}
        <Route
          path="/contact"
          component={Contact}
        />
        <Route
          path="/qui-sommes-nous"
          render={() => <Team persons={persons} />}
        />
        <Route
          path="/signin"
          component={Signin}
        />
        <Route
          path="/login"
          component={Login}
        />
        <PrivateRoute
          exact
          path="/mon-profil"
          component={Profile}
          isLogged={isLogged}
        />
        <PrivateRoute
          exact
          path="/voyage/:id"
          component={Trip}
          isLogged={isLogged}
        />
        <PrivateRoute
          exact
          path="/voyage/:id/activites"
          component={Activities}
          isLogged={isLogged}
        />
        <PrivateRoute
          path="/mes-voyages"
          component={HomeUser}
          isLogged={isLogged}
        />
        <PrivateRoute
          path="/creer-un-voyage"
          component={TripForm}
          isLogged={isLogged}
        />
        <PrivateRoute
          path="/modifier-un-voyage"
          component={TripEdit}
          isLogged={isLogged}
        />
        <Route component={ErrorPage} />
      </Switch>
    </div>
    <Footer />
  </div>
);

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

// == Export
export default App;
