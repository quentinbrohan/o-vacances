// == Import npm
import React from 'react';

// == Import
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Team from 'src/components/Team';

import Persons from 'src/assets/data/teamData';

import './styles.scss';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <div className="container">
      <Team persons={Persons} />
    </div>
    <Footer />
  </div>
);

// == Export
export default App;
