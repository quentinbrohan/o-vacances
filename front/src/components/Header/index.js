import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Menu as MenuIcon, X as CloseIcon } from 'react-feather';

import './header.scss';

const Header = () => (
  <header>
    <div className="header-container">

      <a href="/">LOGO</a>
      <nav className="navigation">
        <div className="mobile">
          <Menu
            right
            noOverlay
            className="bm-menu"
            customBurgerIcon={<MenuIcon />}
            customCrossIcon={<CloseIcon />}
          >
            <a href="">Mes voyages</a>
            <a href="">Créer un voyage</a>
            <a href="">Mon profil</a>

            <div className="connection-mobile">
              <button type="button">
                <a href="/">Connexion</a>
              </button>
              <button type="button">
                <a href="/">Déconnexion</a>
              </button>
              <button type="button">
                <a href="/">Inscription</a>
              </button>
            </div>
          </Menu>
        </div>
        <div className="menu">
          <ul>
            <li><a href="">Mes voyages</a></li>
            <li><a href="">Créer un voyage</a></li>
            <li><a href="">Mon profil</a></li>
          </ul>
          <div className="connection">
            <button type="button">
              <a href="/">Connexion</a>
            </button>
            <button type="button">
              <a href="/">Déconnexion</a>
            </button>
            <button type="button">
              <a href="/">Inscription</a>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
