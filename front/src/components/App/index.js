// == Import npm
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

// == Import
// Layout
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
// Pages
import Contact from 'src/components/Contact';
import HomeVisitor from 'src/components/HomeVisitor';
import Signin from 'src/containers/Signin';
import Team from 'src/components/Team';
import Login from 'src/containers/Login';

// Data
import persons from 'src/data/teamData';

import './styles.scss';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          component={HomeVisitor}
        />
        <Route
          path="/contact"
          component={Contact}
        />
        <Route
          path="/team"
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
      </Switch>
    </div>
    <Footer />
  </div>
);

// == Export
export default App;
