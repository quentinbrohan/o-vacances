import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Menu as MenuIcon, X as CloseIcon } from 'react-feather';

import './header.scss';

const Header = ({
  isLogged,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isLogged);

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
              <Link to="/mes-voyages" onClick={() => handleMenuState()}>Mes voyages</Link>
              <Link to="/creer-un-voyage" onClick={() => handleMenuState()}>Créer un voyage</Link>
              <Link to="/mon-profil" onClick={() => handleMenuState()}>Mon profil</Link>

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
              <li><Link to="/mes-voyages">Mes voyages</Link></li>
              <li><Link to="/creer-un-voyage">Créer un voyage</Link></li>
              <li><Link to="/mon-profil">Mon profil</Link></li>
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

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default Header;
