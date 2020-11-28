import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

import Button from 'src/components/elements/Button';
import './contact.scss';

// component to contact form
const Contact = () => {
  const {
    register, handleSubmit, watch, errors,
  } = useForm();
  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <main className="contact">
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Contact" />
      </Helmet>
      <div className="connection-container" />
      <h1>Contactez-nous</h1>
      <div className="contact-text">
        <h3>
          Vous souhaitez nous faire part d'une remarque ? Vous avez besoin d'un
          renseignement ?
        </h3>
        <p>
          Vous pouvez joindre l'un des membres de l'équipe sur la page{' '}
          <Link to="/equipe">Qui sommes nous ?</Link>
        </p>
        <p>
          Nous nous ferons un plaisir de vous répondre via Linkedin, en attendant
          de vous proposer un beau formulaire de contact.
        </p>
      </div>
      <div className="contact-form">
        <form className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Nom"
              ref={register({
                required: 'Requis',
              })}
            />
            {errors.name && (
            <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              ref={register({
                required: 'Requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide.',
                },
              })}
            />
            {errors.email && (
            <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Votre message."
              ref={register({
                required: 'Message requis.',
                minLength: {
                  value: 20,
                  message: '20 caractères minimum.',
                },
              })}
            />
            {errors.message && (
            <p className="error-message">{errors.message.message}</p>
            )}
          </div>

          <Button color="primary" type="submit">
            S'inscrire
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
