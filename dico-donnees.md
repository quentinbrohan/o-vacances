# Dictionnaire de données

## Utilisateur (`user`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de l'utilisateur|
|email|VARCHAR(128)|NOT NULL|Email de l'utilisateur|
|lastname|VARCHAR|NOT NULL|Le nom de l'utilisateur|
|firstname|VARCHAR|NOT NULL|Le prénom de l'utilisateur|
|password|VARCHAR|NOT NULL|Le mot de passe de connexion de l'utilisateur|
|avatar|VARCHAR|NULL, DEFAULT|L'avatar de l'utilisateur'|


## Voyage (`trip`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du voyage|
|title|VARCHAR(64)|NOT NULL|Le nom du voyage|
|start_date|TIMESTAMP|NULL|La date de début du voyage|
|end_date|TIMESTAMP|NULL|La date de fin du voyage|
|location|VARCHAR(255)|NULL|La localisation du voyage|
|user_id|INT|FOREIGN KEY, NOT NULL, UNSIGNED|L'identifiant de l'utilisateur créateur|
|picture|VARCHAR|NULL|Image du voyage que l'utilisateur peut ajouter|


## Activité (`activity`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du voyage|
|title|VARCHAR(64)|NOT NULL|Le nom de l'activité|
|description|TEXT|NULL|La description du voyage|
|category_id|INT|FOREIGN KEY, NOT NULL, UNSIGNED|L'id de la catégorie de l'activité'|
|start_date|VARCHAR|NULL|La date de début de l'activité|
|end_date|VARCHAR|NULL|La date de fin de l'activité|
|trip_id|INT|FOREIGN KEY, NOT NULL, UNSIGNED|L'id de la catégorie de l'activité'|
|user_id|INT|FOREIGN KEY, NOT NULL, UNSIGNED|L'identifiant de l'utilisateur|


## Disponibilité (`disponibility`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du voyage|
|user_id|INT|FOREIGN KEY, NOT NULL, UNSIGNED|L'identifiant de l'utilisateur|
|start_date|TIMESTAMP|NULL|La date de début de l'activité|
|end_date|TIMESTAMP|NULL|La date de fin de l'activité|
|trip_id|INT|FOREIGN KEY, NOT NULL, UNSIGNED|L'id de la catégorie de l'activité'|

## Suggestion (`suggestion`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du voyage|
|title|VARCHAR(64)|NOT NULL|Le nom de la suggestion|
|description|TEXT|NOT NULL|La descritption de la suggestion|

