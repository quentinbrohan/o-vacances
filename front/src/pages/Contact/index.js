import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from 'src/components/elements/Button';
import FormInput from 'src/components/FormInput';
import {
  rulesContactMessage, rulesEmail, rulesLastname,
} from 'src/utils/form';
import './contact.scss';

const Contact = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (formValues) => {
    console.log({ formValues });
  };

  return (
    <main className="contact">
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Contact" />
      </Helmet>
      <h1>Contactez-nous</h1>
      <div className="contact-text">
        <h3>
          Vous souhaitez nous faire part d'une remarque? Vous avez besoin d'un renseignement?
        </h3>
        <p>
          Vous pouvez joindre l'un des membres de l'équipe sur la page{' '}
          <Link to="/equipe">Qui sommes nous?</Link>
        </p>
        <p>
          Nous nous ferons un plaisir de vous répondre via Linkedin, en attendant de vous proposer
          un formulaire de contact opérationnel.
        </p>
      </div>
      <div className="contact-form">
        <form id="rhf-form" className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Nom"
            placeholder="Nom"
            register={register(rulesLastname)}
            error={errors.name}
          />

          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            register={register(rulesEmail)}
            error={errors.email}
          />

          <FormInput
            id="message"
            name="message"
            type="textarea"
            label="Message"
            placeholder="Message"
            register={register(rulesContactMessage)}
            error={errors.message}
          />

          <Button color="primary" type="submit">
            Envoyer
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
