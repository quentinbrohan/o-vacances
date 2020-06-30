| URL | HTTP Method | Controller | Method | Title | Content | Comment |
|--|--|--|--|--|--|--|
| `/` | `GET` | `MainController` | `home` | Accueil | Presentation and fonctionalities of the application | - |
| `/mentions-legales` | `GET` | `MainController` | `legalMentions` | Mentions légales | A long text which is never read, Privacy policies, Abuse or complaints contact information, Terms and conditions of use, Copyrights notice |  |
| `/a-propos` | `GET` | `MainController` | `about` | A propos | About the team | - |
| `/login` | `POST` | `UserController` | `login` | Connexion | User loging | - |
| `/login` | `GET` | `UserController` | `login` | Connexion | User loging | - |
| `/logout` | `POST` | `UserController` | `logout` | Déconnexion | User logout | - |
| `/signin` | `POST` | `UserController` | `signin` | Inscription | User inscription | - |
| `/signin` | `GET` | `UserController` | `signin` | Inscription | User inscription | - |
| `/user/[i:idUser]` | `GET` | `UserController` | `settings` | Profil Utilisateur | User profil | idUser is the id of the user |
