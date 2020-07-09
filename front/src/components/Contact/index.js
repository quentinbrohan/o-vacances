import React from 'react';

import { Link } from 'react-router-dom';

import './contact.scss';

// component to contact form
const Contact = () => (
  <div className="contact">
    <h2>Contactez-nous</h2>
    <div className="contact-text">
      <h3>Vous souhaitez nous faire part d'une remarque? Vous avez besoin d'un renseignement? </h3>
      <p>
        Vous pouvez joindre l'un des membres de l'équipe sur la page <Link to="/qui-sommes-nous">Qui sommes nous ?</Link>
      </p>
      <p>Nous nous ferons un plaisir de vous répondre via Linkedin
        en attendant de vous proposer un beau formulaire de contact.
      </p>
    </div>
    <div className="contact-form">
      <form action="/page-contact" method="post">
        <div>
          <input type="text" id="name" name="visitor-name" placeholder="Nom" />
        </div>
        <div>
          <input type="email" id="mail" name="visitor-mail" placeholder="Email" />
        </div>
        <div>
          <textarea id="msg" name="visitor-message" placeholder="Commentaire" />
        </div>
        <div className="button">
          <button type="submit">Envoyer le message</button>
        </div>
      </form>
    </div>
  </div>
);

export default Contact;
