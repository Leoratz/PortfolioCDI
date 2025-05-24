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
    - `symfony serve`
3. Dans le dossier du projet, faire :
    - copier le .env.example et le renommer en .env
    - remplir les informations du .env - mettre dans la clef `JWT_SECRET` le contenu du fichier `back/config/jwt/privare.perm`
    - `npm i`
    - `npm run dev`