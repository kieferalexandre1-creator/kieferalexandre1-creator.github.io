# Portfolio — Alexandre Kiefer

Site statique, prêt pour GitHub Pages.

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil (projets, parcours, compétences, contact) |
| `projet-cesam.html` | Détail : modernisation CESAM SEED |
| `projet-aegis.html` | Détail : Aegis Infra Lab |
| `projet-borealis.html` | Détail : Borealis Linux Lab |
| `style.css` | Tout le style (couleurs en haut du fichier) |
| `main.js` | Thème sombre, menu mobile, animations, formulaire |

## Mettre à jour le site existant

Le dépôt `kieferalexandre1-creator.github.io` existe déjà :

1. Sur GitHub, ouvrez le dépôt puis **Add file → Upload files**.
2. Déposez tous les fichiers du zip ci-dessus (l'ancien `index.html` sera remplacé). Le zip contient aussi `CV-Alexandre-Kiefer-clair.pdf`, `CV-Alexandre-Kiefer-sombre.pdf` et `photo-alexandre.jpg`, et ne supprimez pas les `logo-*.png` : le site les utilise.
3. Facultatif : ajoutez une `photo.jpg` (portrait, format vertical) — elle remplacera les initiales « AK ».
4. **Commit changes**. Le site est à jour en une à deux minutes sur https://kieferalexandre1-creator.github.io

Astuce : avant de remplacer, téléchargez l'ancien `index.html` pour le garder en sauvegarde.

## Ajouter un projet

1. Dupliquez une page `projet-xxx.html` et modifiez les textes, le schéma et les étapes.
2. Dans `index.html`, copiez un bloc `<a class="project" …>` de la section Projets et changez son lien.
3. Mettez à jour le lien « Projet suivant » en bas de la page précédente.

## Formulaire de contact

Sans configuration, le bouton « Envoyer » ouvre la messagerie avec le message prérempli. Pour recevoir les messages directement :

1. Créez un compte gratuit sur formspree.io et un formulaire.
2. Remplacez `https://formspree.io/f/VOTRE_ID` dans `index.html` par l'adresse fournie.
