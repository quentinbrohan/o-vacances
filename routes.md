| URL | HTTP Method | Controller | Method | Title | Content | Comment |
|--|--|--|--|--|--|--|
| `/` | `GET` | `MainController` | `home` | Accueil | Presentation and fonctionalities of the application | - |
| `/legals-mentions` | `GET` | `MainController` | `legalMentions` | Mentions légales | A long text which is never read, Privacy policies, Abuse or complaints contact information, Terms and conditions of use, Copyrights notice |  |
| `/about` | `GET` | `MainController` | `about` | A propos | About the team | - |
| `/login` | `POST` | `UserController` | `login` | Connexion | User loging | - |
| `/login` | `GET` | `UserController` | `login` | Connexion | User loging | - |
| `/logout` | `POST` | `UserController` | `logout` | Déconnexion | User logout | - |
| `/signin` | `POST` | `UserController` | `signin` | Inscription | User inscription | - |
| `/signin` | `GET` | `UserController` | `signin` | Inscription | User inscription | - |
| `/user/[i:idUser]` | `GET` | `UserController` | `settings` | Profil Utilisateur | User profil | idUser is the id of the user |
| `/user/[i:idUser]` | `PATCH` | `UserController` | `settings` | Profil Utilisateur | User profil | idUser is the id of the user |
| `/trip/home` | `GET` | `TripController` | `view` | Mes Voyages | list of user's trips | - |
| `/trip/[i:idTrip]` | `GET` | `TripController` | `view` | [name:nameTrip] | Trip Informations | idTrip is the id of the trip, nameTrip is the name of the trip|
| `/trip/[i:idTrip]` | `PATCH` | `TripController` | `update` | Modification du voyage | Trip Update | idTrip is the id of the trip, nameTrip is the name of the trip|
| `/trip/[i:idTrip]` | `DELETE` | `TripController` | `delete` | Suppression du voyage | Trip Delete | idTrip is the id of the trip, nameTrip is the name of the trip|
| `/trip/create` | `POST` | `TripController` | `create` | Creation du voyage | Trip Creation | - |
| `/contact` | `GET` | `MainController` | `contact` | formulaire de contact | contact form | - |
| `/error` | `GET` | `MainController` | `error` | page d'erreur | error page | - |
