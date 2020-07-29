import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/elements/Button';
import { Helmet } from 'react-helmet';

import './contact.scss';

// component to contact form
const Contact = () => (
  <main className="contact">
    <Helmet>
      <title>Contact</title>
      <meta name="description" content="Contact" />
    </Helmet>
    <div className="connection-container" />
    <h1>Contactez-nous</h1>
    <div className="contact-text">
      <h3>
        Vous souhaitez nous faire part d'une remarque ? Vous avez besoin d'un renseignement ?
      </h3>
      <p>
        Vous pouvez joindre l'un des membres de l'équipe sur la page <Link to="/equipe">Qui sommes nous ?</Link>
      </p>
      <p>Nous nous ferons un plaisir de vous répondre via Linkedin,
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
        <Button color="primary" type="submit">
          Envoyer le message
        </Button>
      </form>
    </div>
  </main>
);

export default Contact;
