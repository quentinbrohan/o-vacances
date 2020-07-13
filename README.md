# O'Vacances - Back

## pour installer symfony
Installer Symfony CLI via la commande
```
wget https://get.symfony.com/cli/installer -O - | bash
```
Puis rendre l'installation globale
```
mv /home/etudiant/.symfony/bin/symfony /usr/local/bin/symfony
```

Dans le dossier `o-vacances/back`, installer les dépendances via le terminal
```
composer install
```

## pour avoir la BDD penser à créer le fichier .env.local à la racine du dossier `back` en modifiant les informations user - password et db_name de la commande suivante, correspondant à votre accès adminer/PhpMyAdmin
### Fichier .env.local
`DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7`

## Puis dans le terminal

### Création de la BDD: 
```
php bin/console doctrine:database:create
```

### Conception des tables:
```
php bin/console doctrine:migrations:migrate
```

### Si la migration ne fonctionne pas faire les démarches suivantes
Dans le fichier:
    `vendor\doctrine\migrations\lib\Doctrine\Migrations\Metadata\Storage\TableMetadataStorage.php`
    
**Commenter les lignes 191->195**

## Faire la migration:
```
php bin/console doctrine:migrations:migrate
```
Puis decommenter les lignes précédentes (191->195)

### Chargements des fixtures 
```
php bin/console doctrine:fixtures:load
```

### Lancement du serveur
Toujours dans le dossier "back":
```
symfony server:start
```
