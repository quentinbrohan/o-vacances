import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => (
  <footer>
    <div className="footer-container">
      <ul className="footer-nav">
        <li className="footer-nav-item">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="footer-nav-item">
          <Link to="/equipe">L'équipe</Link>
        </li>
        <li className="footer-nav-item">
          <Link to="/mentions-legales">Mentions Légales</Link>
        </li>
      </ul>
      <div className="copyright">&copy; O'Vacances</div>
    </div>
  </footer>
);

export default Footer;
