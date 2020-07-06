// == Import npm
import React from 'react';

// == Import
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

import Contact from 'src/components/Contact';

import './styles.scss';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <div className="container">
      <Contact />
    </div> />
    <Footer />
  </div>
);

// == Export
export default App;
