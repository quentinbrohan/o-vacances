# o-vacances

## pour installer symfony 
en ldc dans le dossier "ovacances/back" : composer install

## pour avoir la BDD penser à créer le .env.local  en modifiant les informations sur user - password - db_name  et faire les commandes en LDC ci-dessous
### .env.local
DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7

### Création de la BDD : 
en LDC : php bin/console doctrine:database:create

### Conception des tables: 
php bin/console doctrine:migrations:migrate

### Si la migration ne fonctionne pas faire les demarches suivantes
Dans le fichier :
    vendor\doctrine\migrations\lib\Doctrine\Migrations\Metadata\Storage\TableMetadataStorage.php
commenter les lignes 191->195
faire la migration en LDC : php bin/console doctrine:migrations:migrate
puis decommenter les lignes précédentes (191->195)

### chargements des fixtures 
en LDC :
php bin/console doctrine:fixtures:load