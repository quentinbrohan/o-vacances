export default [
  // Visitor
  {
    name: 'visitor',
    path: '/',
    component: '',
    authority: ['ROLE_VISITOR'],
    routes: [
      {
        name: '/',
        path: '/',
        component: '/pages/HomeVisitor',
      },
      {
        name: 'login',
        path: '/login',
        component: '/pages/Login',
      },
      {
        name: 'signin',
        path: '/signin',
        component: '/pages/Signin',
      },
      {
        name: 'contact',
        path: '/contact',
        component: '/pages/Contact',
      },
      {
        name: 'team',
        path: '/equipe',
        component: '/pages/Team',
      },
      {
        name: 'legacy-mentions',
        path: '/mentions-legales',
        component: '/pages/LegacyMentions',
      },
    ],
  },
  // User
  {
    name: 'user',
    path: '',
    component: '',
    authority: ['ROLE_USER'],
    routes: [
      {
        name: '/',
        path: '/',
        component: '/pages/HomeUser',
      },
      {
        name: 'profile',
        path: '/mon-profil',
        component: '/pages/user/Profile',
      },
      {
        name: 'trip',
        path: '/voyage/:id',
        component: '/pages/Trip',
      },
      {
        name: 'trip-activities',
        path: '/voyage/:id/activites',
        component: '/pages/trip/Activities',
      },
      {
        name: 'trip-add',
        path: '/creer-un-voyage',
        component: '/pages/trip/TripForm',
      },
      {
        name: 'trip-edit',
        path: '/modifier-un-voyage/:id',
        component: '/pages/trip/TripForm',
      },
    ],
  },
  // NoMatch
  {
    name: 'noMatch',
    path: '',
    component: '/pages/NoMatch',
  },
];
