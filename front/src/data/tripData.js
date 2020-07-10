export default {

  id: '666',
  title: 'Exploration spatiale',
  image: 'https://unsplash.com/photos/kGtFjYdm7DI/download?force=true&w=1920',
  startDate: '01 janvier 2025',
  endDate: '31 décembre 2025',
  location: 'Mars',
  description: 'Hell-O ! Pour fêter nos 5 années de développement, je vous propose de se faire une petite virée sur Mars ! Prévoir quand même 180 jours pour le trajet. Et emporter vos maillots pour se baigner !',
  participants: [
    {
      id: 1,
      firstName: 'Elon',
      avatar: 'https://via.placeholder.com/100',
      disponibilities:
        {
          startDate: '11-02-2025',
          endDate: '27-02-2025',
        },
    },
    {
      id: 5,
      firstName: 'Musk',
      avatar: 'https://via.placeholder.com/100',
      disponibilities:
        {
          startDate: '05-03-2025',
          endDate: '28-12-2025',
        },
    },
  ],
  activities: [
    {
      id: 1,
      name: 'Randonnée',
      image: 'https://api.time.com/wp-content/uploads/2015/09/the-martian-mars-in-movies.jpg?quality=85&w=1012&h=569&crop=1',
      startDate: '27 mars 2025',
      endDate: '29 mars 2025',
    },
    {
      id: 2,
      name: 'Découverte inquiètante',
      image: 'https://pbs.twimg.com/media/ESvTZ6cXgAACQ4F.jpg',
      startDate: '01 avril 2025',
      endDate: '02 avril 2025',
    },
    {
      id: 3,
      name: 'Rencontre du 3e type',
      image: 'https://www.actugaming.net/wp-content/uploads/2019/06/doom-eternal-1-1.jpg',
      startDate: '03 avril 2025',
      endDate: '07 avril 2025',
    },
    {
      id: 4,
      name: 'Vite, dans le vaisseau !',
      image: 'https://1.bp.blogspot.com/-w0qjoss4w_M/VL5KCXcQJVI/AAAAAAAAOfg/VYGsP5BtgoI/s1600/Alien-DerelictShip.jpg',
      startDate: '15 avril 2025',
      endDate: '15 avril 2025',
    },
  ],
  suggestions: [
    {
      id: 1,
      firstName: 'Elon',
      avatar: 'https://via.placeholder.com/100',
      date: '11/02/2025 22:22',
      content: 'Je m\'occupe d\'ammener des jeux de sociétés ! J\'ai Cluedo, SOS Ouistiti, Monopoly Lovecraft, Mikado, Uno...',
    },
    {
      id: 2,
      firstName: 'Musk',
      avatar: 'https://via.placeholder.com/100',
      date: '02/01/2025 19:11',
      content: 'Quelqu\'un sait si on peut louer une jeep sur place ? Pas fan de la marche, mais si on peut faire un road trip j\'y suis à 200% !',
    },
  ],
};
