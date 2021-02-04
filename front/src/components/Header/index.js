import React, { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Menu as MenuIcon, X as CloseIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from 'src/assets/svg/logo.svg';
import Button from 'src/components/elements/Button';
import { logOutUser } from 'src/features/user';
import './header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [isOpen, isAuthenticated]);

  const handleMenuState = () => {
    setIsOpen(!isOpen);
  };

  const manageLogout = () => {
    dispatch(logOutUser());
  };

  const manageLogoutMobile = () => {
    setIsOpen(false);
    dispatch(logOutUser());
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
                  <NavLink
                    to="/creer-un-voyage"
                    onClick={() => handleMenuState()}
                    activeClassName="nav--active"
                  >
                    Créer un voyage
                  </NavLink>
                  <NavLink
                    to="/mon-profil"
                    onClick={() => handleMenuState()}
                    activeClassName="nav--active"
                  >
                    Mon profil
                  </NavLink>
                  <NavLink
                    to="/contact"
                    onClick={() => handleMenuState()}
                    activeClassName="nav--active"
                  >
                    Contact
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/contact"
                    onClick={() => handleMenuState()}
                    activeClassName="nav--active"
                  >
                    Contact
                  </NavLink>
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
                ) : (
                  <>
                    <Button color="secondary" size="sm" haveClassName="button-header">
                      <Link to="/login" onClick={() => handleMenuState()}>
                        Connexion
                      </Link>
                    </Button>
                    <Button color="secondary" size="sm" haveClassName="button-header">
                      <Link to="/signin" onClick={() => handleMenuState()}>
                        Inscription
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </Menu>
          </div>
          <div className="menu">
            {isAuthenticated ? (
              <ul>
                <li>
                  <NavLink to="/creer-un-voyage" activeClassName="nav--active">
                    Créer un voyage
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mon-profil" activeClassName="nav--active">
                    Mon profil
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" activeClassName="nav--active">
                    Contact
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink to="/contact" activeClassName="nav--active">
                    Contact
                  </NavLink>
                </li>
              </ul>
            )}
            <div className="connection">
              {isAuthenticated ? (
                <Button
                  color="secondary"
                  haveClassName="button-header"
                  onClick={() => manageLogout()}
                >
                  <a>Déconnexion</a>
                </Button>
              ) : (
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

export default Header;
