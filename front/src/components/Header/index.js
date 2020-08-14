import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Menu as MenuIcon, X as CloseIcon } from 'react-feather';
import Button from 'src/components/elements/Button';
import { ReactComponent as Logo } from 'src/assets/svg/logo.svg';

import './header.scss';

const Header = ({
  isAuthenticated,
  handleLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Handle BurgerMenu close onClick
  useEffect(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleMenuState = () => {
    setIsOpen(!isOpen);
  };

  const manageLogout = () => {
    handleLogout();
  };

  const manageLogoutMobile = () => {
    setIsOpen(false);
    handleLogout();
  };

  return (
    <header>
      <div className="header-container">

        <Link to="/" className="logo">
          <Logo alt="Logo" />
        </Link>
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
              {isAuthenticated ? (
                <>
                  <NavLink to="/mes-voyages" onClick={() => handleMenuState()} activeClassName="nav--active">Mes voyages</NavLink>
                  <NavLink to="/creer-un-voyage" onClick={() => handleMenuState()} activeClassName="nav--active">Créer un voyage</NavLink>
                  <NavLink to="/mon-profil" onClick={() => handleMenuState()} activeClassName="nav--active">Mon profil</NavLink>
                  <NavLink to="/contact" onClick={() => handleMenuState()} activeClassName="nav--active">Contact</NavLink>
                </>

              )
                : (
                  <>
                    <NavLink to="/equipe" activeClassName="nav--active">Équipe</NavLink>
                    <NavLink to="/contact" onClick={() => handleMenuState()} activeClassName="nav--active">Contact</NavLink>
                  </>
                )}

              <div className="connection-mobile">
                {isAuthenticated ? (
                  <Button
                    color="secondary"
                    size="sm"
                    haveClassName="button-header"
                    onClick={() => manageLogoutMobile()}
                  >
                    Déconnexion
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
            {isAuthenticated ? (
              <ul>
                <li><NavLink to="/mes-voyages" activeClassName="nav--active">Mes voyages</NavLink></li>
                <li><NavLink to="/creer-un-voyage" activeClassName="nav--active">Créer un voyage</NavLink></li>
                <li><NavLink to="/mon-profil" activeClassName="nav--active">Mon profil</NavLink></li>
                <li><NavLink to="/contact" activeClassName="nav--active">Contact</NavLink></li>
              </ul>
            )
              : (
                <ul>
                  <li><NavLink to="/equipe" activeClassName="nav--active">Équipe</NavLink></li>
                  <li><NavLink to="/contact" activeClassName="nav--active">Contact</NavLink></li>
                </ul>
              )}
            <div className="connection">
              {isAuthenticated ? (
                <Button
                  color="secondary"
                  size="sm"
                  haveClassName="button-header"
                  onClick={() => manageLogout()}
                >
                  Déconnexion
                </Button>
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
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
