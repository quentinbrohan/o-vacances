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
          <Link to="/team">Qui sommes nous ?</Link>

        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
