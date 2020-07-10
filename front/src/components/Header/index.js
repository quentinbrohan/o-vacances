import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Menu as MenuIcon, X as CloseIcon } from 'react-feather';

import './header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle BurgerMenu close onClick
  useEffect(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleMenuState = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="header-container">

        <a href="/">LOGO</a>
        <nav className="navigation">
          <div className="mobile">
            <Menu
              right
              noOverlay
              className="bm-menu"
              isOpen={isOpen}
              customBurgerIcon={<MenuIcon />}
              customCrossIcon={<CloseIcon />}
            >
              <Link to="/" onClick={() => handleMenuState()}>Mes voyages</Link>
              <Link to="/trip-form" onClick={() => handleMenuState()}>Créer un voyage</Link>
              <Link to="/" onClick={() => handleMenuState()}>Mon profil</Link>

              <div className="connection-mobile">
                <button type="button">
                  <Link to="/login" onClick={() => handleMenuState()}>Connexion</Link>
                </button>
                <button type="button">
                  <Link to="/logout" onClick={() => handleMenuState()}>Déconnexion</Link>

                </button>
                <button type="button">
                  <Link to="/signin" onClick={() => handleMenuState()}>Inscription</Link>
                </button>
              </div>
            </Menu>
          </div>
          <div className="menu">
            <ul>
              <li><Link to="/">Mes voyages</Link></li>
              <li><Link to="/trip-form">Créer un voyage</Link></li>
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
};

export default Header;
