import React from 'react';

import './header.scss';

const Header = () => (
  <header>
    <a href="/">LOGO</a>
    <nav className="navigation">
      <ul>
        <li><a href="">Mes voyages</a></li>
        <li><a href="">Créer un voyage</a></li>
        <li><a href="">Mon profil</a></li>
      </ul>
      <div className="connection">
        <button type="button">Connexion</button>
        <button type="button">Déconnexion</button>
      </div>
    </nav>
  </header>
);

export default Header;
