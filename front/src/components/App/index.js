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
// import TripForm from 'src/components/TripForm';
import Activities from 'src/components/Activities';

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
        <Route
          path="/mon-profil"
          component={Profile}
        />
        <Route
          exact
          path="/voyage/:id"
          component={Trip}
        />
        <Route
          exact
          path="/voyage/:id/activites"
          component={Activities}
        />
        <Route
          path="/mes-voyages"
          component={HomeUser}
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
