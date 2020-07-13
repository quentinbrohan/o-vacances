/* eslint-disable react/no-array-index-key */
import React from 'react';

import './featuresSplit.scss';

const FeaturesSplit = () => (
  <section className="features-split" id="fonctionnalites">
    <h2 className="title">Le complexe rendu simple</h2>
    <p>Grâce à ses nombreuses fonctionnalités, O'Vacances vous aides dans vos démarches.</p>
    <div className="split">

      <div className="split-item">
        <div className="split-item-content">
          <h3>Organisation simplifiée</h3>
          <p>Une fois mon voyage créé, j'invite mes amis et eux indiquent leurs disponibilités.</p>
        </div>
        <div className="split-item-image">
          <img src="https://via.placeholder.com/500x400" alt="" />
        </div>
      </div>

      <div className="split-item-inverted">
        <div className="split-item-content">
          <h3>Organisation simplifiée</h3>
          <p>
            Une fois mon voyage créé, j'invite mes amis et eux indiquent leurs disponibilités.
          </p>
        </div>
        <div className="split-item-image">
          <img src="https://via.placeholder.com/500x400" alt="" />
        </div>
      </div>

      <div className="split-item">
        <div className="split-item-content">
          <h3>Suivi des activités</h3>
          <p>Centralisation des activités prévus,
            suggestions possibles afin de ne rien oublier lors de mes vacances.
          </p>
        </div>
        <div className="split-item-image">
          <img src="https://via.placeholder.com/500x400" alt="" />
        </div>
      </div>

      <div className="split-item-inverted">
        <div className="split-item-content">
          <h3>"Qui amène quoi ?" (prochainement)</h3>
          <p>Fini les listes papiers qui se perdent,
            chacun peut écrire ce qu'ils comptent emmener
            (jeux de sociétés, matériels, nourriture...).
          </p>
        </div>
        <div className="split-item-image">
          <img src="https://via.placeholder.com/500x400" alt="" />
        </div>
      </div>

      <div className="split-item">
        <div className="split-item-content">
          <h3>Gestion du budget (prochainement)</h3>
          <p>
            Trouver et gérer votre montant de dépenses parmi votre groupe.
          </p>
        </div>
        <div className="split-item-image">
          <img src="https://via.placeholder.com/500x400" alt="" />
        </div>
      </div>

    </div>

  </section>
);
export default FeaturesSplit;
