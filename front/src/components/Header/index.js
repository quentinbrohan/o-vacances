import React from 'react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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
        <Button>Se connecter</Button>
        <Button>Sinscrire</Button>
      </div>
    </nav>
  </header>
);

export default Header;
