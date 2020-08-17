# O'Vacances - Plan your trip with friends !


## Symfony installation
Install Symfony CLI from terminal:
```
wget https://get.symfony.com/cli/installer -O - | bash
```
For global installation:
```
mv /home/yourusername/.symfony/bin/symfony /usr/local/bin/symfony
```

From terminal, move to **o-vacances/back**, install dependancies
```
composer install
```
## You need to create a file .env.local at root of back folder to have access to database ! Change user, password and db_name with your own adminer/PhpMyAdmin credentials.
### .env.local
`DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7`

## Then, still in terminal

### Creating the database: 
```
php bin/console doctrine:database:create
```

### Conception of tables:
```
php bin/console doctrine:migrations:migrate
```

### If migration doesn't work, follow this next steps
From "o-vacances/back" folder, looks for file:
    `vendor\doctrine\migrations\lib\Doctrine\Migrations\Metadata\Storage\TableMetadataStorage.php`
    
**Comment ligns 191 -> 195**

Redo last command:
```
php bin/console doctrine:migrations:migrate
```
Then uncomment previous ligns (191->195)

### Fixtures loading
```
php bin/console doctrine:fixtures:load
```

## LexikJWTAuthenticationBundle (JWT)
```composer install ``` pour install the bundle
or
```
php composer.phar require "lexik/jwt-authentication-bundle"
```

https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/index.md#getting-started

For installion JWT folder and have tokens, 3 steps (terminal):

```
mkdir -p config/jwt  (création du dossier JWT dans config)
```

```
openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
```
(A password is asked twice. It's located in the .env file at the root of "back" folder. Lign 38: 'lexik/jwt-authentication-bundle', next to JWT_PASSPHRASE )
```
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
```
(asking for password, use the same one)

If everything's good, 2 files containing a hashed key got created inside the JWT folder which contains.

### Start Symfony server
In "back" folder:
```
symfony server:start
```
