// == Import npm
import React from 'react';

// == Import
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

import './styles.scss';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <div className="container">
    </div>
    <Footer />
  </div>
);

// == Export
export default App;
