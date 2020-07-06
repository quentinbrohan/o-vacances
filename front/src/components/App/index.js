// == Import npm
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

// == Import
// Layout
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Team from 'src/components/Team';

// Pages
import Contact from 'src/components/Contact';
import HomeVisitor from '../HomeVisitor';


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
      </Switch>
    </div>
    <Footer />
  </div>
);

// == Export
export default App;
