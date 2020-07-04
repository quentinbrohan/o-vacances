# o-vacances


## pour avoir la BDD penser à creer le .env.local  en modifiant les informations sur user - password - db_name  et faire la commande en LDC ci-dessous
.env.local
DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7


commande ldc : 
php bin/console doctrine:migrations:migrate
