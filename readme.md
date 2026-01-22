# 🚀 INITIAL LANGUAGE (InitiaL)

![Logo](icons/il.ico)

**Initial Language** (ou **InitiaL**) est un langage de programmation académique conçu spécifiquement pour initier les débutants francophones aux concepts fondamentaux de l'informatique.

En utilisant une syntaxe intuitive basée sur la langue française, il permet de se concentrer sur la logique algorithmique sans être freiné par la barrière de la langue anglaise.

---

## 🌟 Points Forts

- **🗣️ Syntaxe en Français** : Utilisez des mots-clés simples comme `si`, `alors`, `boucler`, `fonction`, etc.
- **⚙️ Puissance Under-the-hood** : Traduit instantanément le code en **AutoHotkey (AHK)** pour une exécution fluide sur Windows.
- **🛠️ Environnement Complet** : Intégration prévue avec Notepad++ pour une coloration syntaxique et une auto-complétion optimales.
- **📦 Compilation Facile** : Transformez vos scripts `.il` en exécutables `.exe` autonomes.

---

## 🛠️ Stack Technique

Le projet repose sur plusieurs technologies clés :

- **Node.js (v12+)** : Le moteur de l'interpréteur/traducteur (écrit en JavaScript).
- **AutoHotkey (v1.8)** : Le langage cible utilisé pour l'exécution finale.
- **Moo.js** : Utilisé pour la tokenisation et l'analyse lexicale.
- **Notepad++ & SciTE4AutoHotkey** : Outils recommandés pour le développement.

---

## 📦 Installation

Le projet inclut un installeur (`Setup.exe`) qui configure automatiquement l'environnement :

1. Lancez `Setup.exe`.
2. L'installeur vérifiera et installera si nécessaire :
   - Node.js v12
   - AutoHotkey
   - Notepad++ (v7.8) avec les configurations InitiaL.
3. Les fichiers du langage seront installés dans `C:\Initial_Language\`.

---

## 💻 Exemple de Code

Voici à quoi ressemble un programme simple en **InitiaL** :

```initial
#mode console
#identation non

DEBUTPROGRAMME: 'DEMO_INITIAL'

    fonction PRINCIPAL fait
        ecrire: 'Bienvenue dans Initial Language !';

        var chaine nom eg ''
        lire: nom, 'Veuillez entrer votre nom : ';

        si nom dif '' alors
            ecrire: "Bonjour " + nom;
        fsi

        boucler 5 fois
            ecrire: "Compteur : " + IC_index;
        fboucle
    ff

    pause, 0

FINPROGRAMME
```

---

## 🚀 Utilisation

Une fois installé, vous pouvez interagir avec vos fichiers `.il` via le menu contextuel (clic droit) :

- **Exécuter le programme** : Lance directement votre script.
- **Compiler le programme** : Génère un fichier `.exe` via le compilateur AHK.
- **Editer le programme** : Ouvre le fichier dans Notepad++ avec la coloration syntaxique.

### Ligne de Commande

Vous pouvez également lancer manuellement le traducteur :

```bash
node modules\main.js <chemin_du_fichier>.il [noComp|yesComp]
```

---

## 📂 Structure du Projet

- `modules/` : Cœur de l'interpréteur (syntax checker, translater, etc.).
- `exemples/` : Collection de scripts pour apprendre les bases.
- `configs/` : Fichiers de configuration du système.
- `icons/` : Ressources graphiques.
- `doc/` : Documentation supplémentaire.
- `syntax/` : Fichiers de définition pour la coloration syntaxique (Notepad++).

---

## 📝 Crédits & Licence

Développé par **Ether Solutions** (Copyright 2020).
_Conçu pour l'éducation et l'apprentissage de l'algorithmique._
