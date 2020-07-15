/* eslint-disable react/no-array-index-key */
import React from 'react';

import './featuresSplit.scss';

const FeaturesSplit = () => (
  <section className="features-split" id="fonctionnalites">
    <h2 className="title">Le complexe rendu simple</h2>
    <p>Grâce à ses nombreuses fonctionnalités, O'Vacances m'aide tout au long de mon voyage.</p>
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
          <h3>Centralisation des informations</h3>
          <p>
            J'ai accès en un clic à toutes les informations de mon voyages et ce que je compte faire.
          </p>
        </div>
        <div className="split-item-image">
          <img src="https://via.placeholder.com/500x400" alt="" />
        </div>
      </div>

      <div className="split-item">
        <div className="split-item-content">
          <h3>Suivi des activités</h3>
          <p>Je peux consulter activité (date, lieu, description) et même en ajouter,
            ainsi que des suggestions possibles afin de ne rien oublier lors de mes vacances.
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
            chacun peut écrire ce qu'il compte emmener
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
            Car trouver et gérer son montant de dépenses parmi le groupe n'est pas toujours évident.
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
