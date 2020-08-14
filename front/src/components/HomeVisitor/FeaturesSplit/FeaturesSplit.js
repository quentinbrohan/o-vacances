/* eslint-disable react/no-array-index-key */
import React from 'react';

// Features IMG
import imgCalendar from 'src/assets/images/home-features/calendar.jpg';
import imgActAndSugg from 'src/assets/images/home-features/activites-and-suggestions.jpg';
import imgCentralised from 'src/assets/images/home-features/centralised-infos.jpg';
import imgPlaceholder from 'src/assets/images/home-features/placeholder.jpg';

import './featuresSplit.scss';

const FeaturesSplit = () => (
  <section className="features-split" id="fonctionnalites">
    <h2 className="title">Le complexe rendu simple</h2>
    <p>Grâce à ses nombreuses fonctionnalités, O'Vacances m'aide tout au long de mon voyage.</p>
    <div className="split">

      <div className="split-item">
        <div className="split-item-content">
          <h3>Organisation simplifiée</h3>
          <p>Une fois mon voyage créé, j'invite mes amis et ils indiquent leurs disponibilités.</p>
        </div>
        <div className="split-item-image">
          <img src={imgCalendar} alt="Calendrier" />
        </div>
      </div>

      <div className="split-item-inverted">
        <div className="split-item-content">
          <h3>Centralisation des informations</h3>
          <p>
            J'ai accès en un clic à toutes les informations de mon voyage
            et ce que je compte faire.
          </p>
        </div>
        <div className="split-item-image">
          <img src={imgCentralised} alt="Centralisation des infos" />
        </div>
      </div>

      <div className="split-item">
        <div className="split-item-content">
          <h3>Suivi des activités</h3>
          <p>Je peux consulter mes activités (dates, lieu, description) et même en ajouter,
            ainsi que des suggestions possibles afin de ne rien oublier lors de mes vacances.
          </p>
        </div>
        <div className="split-item-image">
          <img src={imgActAndSugg} alt="Activités et suggestions" />
        </div>
      </div>

      <div className="split-item-inverted">
        <div className="split-item-content">
          <h3>"Qui amène quoi ?"</h3>
          <p className="coming-soon">Prochainement</p>
          <p>Fini les listes papiers qui se perdent,
            chacun peut écrire ce qu'il compte amener
            (jeux de sociétés, matériels, nourriture...).
          </p>
        </div>
        <div className="split-item-image">
          <img src={imgPlaceholder} alt="Prochainement: `Qui amène quoi ?`" />
        </div>
      </div>

      <div className="split-item">
        <div className="split-item-content">
          <h3>Gestion du budget</h3>
          <p className="coming-soon">Prochainement</p>

          <p>
            Car trouver et gérer son montant de dépenses parmi le groupe n'est pas toujours évident.
          </p>
        </div>
        <div className="split-item-image">
          <img src={imgPlaceholder} alt="Prochainement: Gestion du budget" />
        </div>
      </div>

    </div>

  </section>
);
export default FeaturesSplit;
