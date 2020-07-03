// == Import npm
import React from 'react';

// == Import
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Team from 'src/components/Team';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <Team />
    <Footer />
  </div>
);

// == Export
export default App;
