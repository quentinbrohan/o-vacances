import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Menu as MenuIcon, X as CloseIcon } from 'react-feather';
import Button from 'src/components/elements/Button';

import './header.scss';

const Header = ({
  isLogged,
}) => {
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
              {isLogged ? (
                <>
                  <Link to="/mes-voyages" onClick={() => handleMenuState()}>Mes voyages</Link>
                  <Link to="/creer-un-voyage" onClick={() => handleMenuState()}>Créer un voyage</Link>
                  <Link to="/mon-profil" onClick={() => handleMenuState()}>Mon profil</Link>
                  <Link to="/contact" onClick={() => handleMenuState()}>Contact</Link>
                </>

              )
                : (
                  <Link to="/contact" onClick={() => handleMenuState()}>Contact</Link>
                )}

              <div className="connection-mobile">
                {isLogged ? (
                  <Button color="secondary" size="sm" haveClassName="button-header">
                    <Link to="/logout" onClick={() => handleMenuState()}>Déconnexion</Link>
                  </Button>
                )
                  : (
                    <>
                      <Button color="secondary" size="sm" haveClassName="button-header">
                        <Link to="/login" onClick={() => handleMenuState()}>Connexion</Link>
                      </Button>
                      <Button color="secondary" size="sm" haveClassName="button-header">
                        <Link to="/signin" onClick={() => handleMenuState()}>Inscription</Link>
                      </Button>
                    </>
                  )}
              </div>
            </Menu>
          </div>
          <div className="menu">
            {isLogged ? (
              <ul>
                <li><Link to="/mes-voyages">Mes voyages</Link></li>
                <li><Link to="/creer-un-voyage">Créer un voyage</Link></li>
                <li><Link to="/mon-profil">Mon profil</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            )
              : (
                <ul>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              )}
            <div className="connection">
              {isLogged ? (
                <button type="button" className="button-header">
                  <Link to="/logout">Déconnexion</Link>
                </button>
              )
                : (
                  <>
                    <Button color="secondary" haveClassName="button-header">
                      <Link to="/login">Connexion</Link>
                    </Button>
                    <Button color="secondary" haveClassName="button-header">
                      <Link to="/signin">Inscription</Link>
                    </Button>
                  </>
                )}
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
