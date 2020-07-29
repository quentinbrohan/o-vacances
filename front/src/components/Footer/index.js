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
        <li className="footer-nav-item copyright">
          &copy; O'vacances
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
