import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/">Mes voyages</Link>
            <Link to="/">Créer un voyage</Link>
            <Link to="/">Mon profil</Link>

            <div className="connection-mobile">
              <button type="button">
                <Link to="/login">Connexion</Link>
              </button>
              <button type="button">
                <Link to="/logout">Déconnexion</Link>

              </button>
              <button type="button">
                <Link to="/signin">Inscription</Link>
              </button>
            </div>
          </Menu>
        </div>
        <div className="menu">
          <ul>
            <li><Link to="/">Mes voyages</Link></li>
            <li><Link to="/">Créer un voyage</Link></li>
            <li><Link to="/">Mon profil</Link></li>
          </ul>
          <div className="connection">
            <button type="button">
              <Link to="/login">Connexion</Link>
            </button>
            <button type="button">
              <Link to="/logout">Déconnexion</Link>

            </button>
            <button type="button">
              <Link to="/signin">Inscription</Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
