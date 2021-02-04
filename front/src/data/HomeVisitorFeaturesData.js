import imgActAndSugg from 'src/assets/images/home-features/activites-and-suggestions.jpg';
import imgCalendar from 'src/assets/images/home-features/calendar.jpg';
import imgCentralised from 'src/assets/images/home-features/centralised-infos.jpg';
import imgPlaceholder from 'src/assets/images/placeholder.jpg';

export default [
  {
    title: 'Organisation simplifiée',
    description:
      "Une fois mon voyage créé, j'invite mes amis et ils indiquent leurs disponibilités.",
    image: imgCalendar,
    comingSoon: false,
  },
  {
    title: 'Centralisation des informations',
    description:
      "En un clic, j'ai accès à toutes les informations de mon voyage et de ce que je compte faire.",
    image: imgCentralised,
    comingSoon: false,
  },
  {
    title: 'Suivi des activités',
    description: `Je peux consulter mes activités (dates, lieu, description) et même en ajouter, ainsi que des suggestions
            possibles afin de ne rien oublier lors de mes vacances.`,
    image: imgActAndSugg,
    comingSoon: false,
  },
  {
    title: 'Qui amène quoi?',
    description: `Fini les listes papiers qui se perdent, chacun peut écrire ce qu'il compte amener (jeux de sociétés,
            matériels, nourriture...).`,
    image: imgPlaceholder,
    comingSoon: true,
  },
  {
    title: 'Gestion du budget',
    description:
      "Car trouver et gérer son montant de dépenses parmi le groupe n'est pas toujours évident.",
    image: imgPlaceholder,
    comingSoon: true,
  },
];
