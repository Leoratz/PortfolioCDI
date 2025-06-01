# PortfolioCDI

Ce projet a été réalisé par :
- Léora Chriqui
- Alyssia Lorsold Pradon
- Brunic Feyou
- Aurore Dimech

et comprend le travail effectué pour la matière Framework Fullstack.

## Prérequis & Installation

Il est conseillé d'avoir un logiciel permettant d'accéder à PHPMyAdmin, ou une autre base de données.

Pour mettre en place ce projet, veuillez suivre les étapes suivantes :
1. Cloner le projet (`git clone git@github.com:Leoratz/PortfolioCDI.git`)
2. Aller dans le dossier back du projet avec la commande `cd back`, et faire les actions suivantes :
    - copier le .env.example et le renommer en .env
    - remplir les informations du .env
    - `composer i` dans le terminal
    - `php bin/console d:d:c` dans le terminal - cela créera une base de données PHPMyAdmin appelée 'PortfolioCDI' ; si vous souhaitez utiliser une autre base de données, veuillez modifier le .env
    - `php bin/console make:migration`
    - `php bin/console doctrine:migrations:migrate`
    - `php bin/console lexik:jwt:generate-keypair`
    - `symfony server:start --no-tls`
3. Dans le dossier du projet, faire :
    - copier le .env.example et le renommer en .env
    - remplir les informations du .env - mettre dans la clef `JWT_SECRET` le contenu du fichier `back/config/jwt/privare.perm`
    - `npm i`
    - `npm run dev`


## Créations des premières données

Avant de pouvoir librement profiter de cette application, il est conseillé de faire les actions suivantes :

### 1. Ajouter un administrateur de base

La première étape est d'importer les utilisateurs de base avec la commande `php bin/console doctrine:fixtures:load --append`
Suite à cette commande, un nouvel utilisateur apparaitra dans votre base de données : un administrateur, avec l'email admin@email.fr, et le rôle d'administrateur (ROLE_ADMIN).

Il est possible de se connecter aux profils de cet utilisateur avec son adresse mail, et le mot de passe "admin".

### 2. Ajouter des projets de bases

Ensuite, il vous est conseillé d'importer dans votre base de données le jeu de données au format SQL présent ici (`portfoliocdi.sql`).

## Découverte du projet

Vous pouvez maintenant librement profiter de ce projet. Vous trouverez ci-dessous des parcours-type détaillés.

### 1. Parcours visiteur

Vous arrivez sur la page de base, et regardez les différents projets. L'un d'entre-eux vous intéresse, et vous cliquez sur le bouton "En savoir plus" afin de consulter la page du projet.
Vous trouvez sur celle-ci des informations relatives au projet.

Après avoir consulté tous les projets ayant capté votre attention, vous décidez de laisser vos contacts afin de demander des informations sur les modalités d'inscription au sein de l'école.
Pour cela, vous allez dans le footer et complétez et envoyez le formulaire.

### 2. Parcours administrateur

Vous arrivez sur la page de base, et cliquez sur 'Connexion'. Sur la page de login, vous remplissez vos informations de connexion (`admin@email.fr` pour l'email et `admin` pour le mot de passe par exemple). 

Une fois connecté, vous cliquez sur l'onglet 'Utilisateurs' puis sur 'Ajouter un administrateur' pour créer un nouvel utilisateur simple. Vous remplissez le formulaire puis le soummetez.

Vous allez sur la page des projets, et mettez le premier projet comme invisible.

Vous cliquez sur le bouton 'déconnection' de la navbar.

## 3. Parcours utilisateur

Vous arrivez sur la page de base, et cliquez sur 'Connexion'. Sur la page de login, vous remplissez vos informations de connexion (avec les identifiants créés par l'administrateur précédemment par exemple). 

Vous allez sur la page des projets et modifiez le titre de l'un des projets.

Ensuite, vous cliquez sur l'onglet 'Demande de contacts'.
Vous sélectionnez l'une des demandes avec une bordure verte, et la modifiez afin de passer son état en 'En cours'.
Vous sélectionnez une autre à la bordure rouge, et cliquez sur la poubelle pour la supprimer.

Vous cliquez sur le bouton 'déconnection' de la navbar.

## Informations supplémentaires

Un invité ne peut que remplir le formulaire de demande de contact, et n'a pas accès aux pages de création, modification et suppression des divers éléments (projets, demandes de contact, utilisateurs).

Un utilisateur peut créer des projets, les rendre invisible, et les supprimer. Il peut également modifier l'étape de traitement d'une demande de contact, ainsi que la supprimer.
Un administateur possède les mêmes droits qu'un utilisateur simple, en plus de pouvoir créer, modifier et supprimer des utilisateurs (ce que les utilisateurs et les invités ne peuvent pas faire).