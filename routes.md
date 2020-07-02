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
| `/trip/home` | `GET` | `TripController` | `read` | Mes Voyages | list of user's trips | - |
| `/trip/[i:idTrip]` | `GET` | `TripController` | `read` | [name:nameTrip] | Trip Informations | idTrip is the id of the trip, nameTrip is the name of the trip|
| `/trip/[i:idTrip]/update` | `PATCH` | `TripController` | `update` | Modification du voyage | Trip Update | idTrip is the id of the trip|
| `/trip/[i:idTrip]/delete` | `DELETE` | `TripController` | `delete` | Suppression du voyage | Trip Delete | idTrip is the id of the trip|
| `/trip/create` | `GET` | `TripController` | `create` | Creation du voyage | Trip Creation | - |
| `/trip/create` | `POST` | `TripController` | `create` | Creation du voyage | Trip Creation | - |
| `/trip/activities` | `GET` | `TripController` | `read` | liste des activité | Activity list | - |
| `/trip/activities/create` | `GET` | `TripController` | `create` | Creation d'une activité | Activity Creation | - |
| `/trip/activities/create` | `POST` | `TripController` | `create` | Creation d'une activité | Activity Creation | - |
| `/trip/activities/[i:idActivity]/update` | `PATCH` | `TripController` | `update` | Modification d'une activité | Activity Update | idActivity is the id of the activity |
| `/trip/activities/[i:idActivity]/delete` | `DELETE` | `TripController` | `delete` | Suppression d'une activité | Activity Delete | idActivity is the id of the activity |
| `/contact` | `GET` | `MainController` | `contact` | formulaire de contact | contact form | - |
| `/error` | `GET` | `MainController` | `error` | page d'erreur | error page | - |