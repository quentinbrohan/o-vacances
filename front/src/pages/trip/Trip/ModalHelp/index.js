import React from 'react';
import { Link } from 'react-router-dom';
import ModalWrapper from 'src/components/ModalWrapper';

const ModalHelp = () => (
  <ModalWrapper iconType="HELP" title="Aide" isEditMode={false}>
    <div className="trip-help">
      <h2>Besoin d'aide?</h2>
      <div>
        <p>
          Le mot de passe donne accès au voyage, il est nécessaire lors de la première connexion
          pour s'authentifier au voyage uniquement, et n'est modifiable que par le créateur du
          voyage.
          <hr />
          Le bouton "Modifier mes disponibilités" apparaît uniquement pour l'utilisateur connecté
          quand celui-ci est selectionné dans la liste.
          <hr />
          Pour changer ses disponibilités en un clic, il suffit de changer ses disponibilités dans
          le calendrier, ce dernier se ferme une fois avoir choisi 2 dates. Cliquer maintenant sur
          "Modifier mes disponibilités".
          <hr />
          La suppression d'un voyage ne peut se faire que par un utilisateur ayant le rôle
          "créateur" (le créateur du voyage). Autrement, le voyage n'est pas supprimé mais vous n'y
          aurez plus accès.
          <hr />
          Tout le monde peut proposer une activité ainsi qu'une suggestion.
          <hr />
          Des idées pour améliorer O'vacances? Fais-nous en part grâce à notre{' '}
          <Link to="/contact">page contact</Link>!
        </p>
      </div>
    </div>
  </ModalWrapper>
);

export default ModalHelp;
