# Vocal Coach

Un coach vocal intelligent pour vous aider à éliminer définitivement les insultes de votre langage.

## 🎯 Fonctionnalités

### Détection d'Insultes
- Détection en temps réel des insultes françaises et anglaises
- Reconnaissance des variantes, fautes d'orthographe et abréviations
- Détection dans des phrases complexes
- Sensibilité configurable

### Coaching Vocal
- IA de coaching avec réponses naturelles variées
- Suggestions de reformulation respectueuses
- Persistance : l'IA insiste jusqu'à la reformulation correcte
- Explications pédagogiques sur l'amélioration du langage

### Modes de Fonctionnement
- **Mode Normal** : Coaching équilibré
- **Mode Strict** : Intervention immédiate et refus de continuer
- **Mode Entraînement** : Pratique progressive
- **Mode Enfant** : Approche douce et éducative
- **Mode Adulte** : Coaching mature et sophistiqué

### Tableau de Bord
- Score de politesse (/100)
- Nombre d'insultes aujourd'hui et total
- Série de jours sans insulte
- Temps sans insulte et record personnel
- Graphiques de progression
- Statistiques détaillées

### Système de Progression
- Niveaux et XP
- 25 badges à débloquer
- Défis quotidiens, hebdomadaires et mensuels
- Récompenses et accomplissements

### Paramètres Personnalisables
- Choix de la voix, volume, vitesse
- Langue et sensibilité
- Mots interdits personnalisés
- Thèmes clair/sombre
- Notifications et sons
- Raccourcis clavier

### PWA (Progressive Web App)
- Installation possible sur desktop et mobile
- Fonctionne hors ligne
- Notifications push
- Interface native

## 🚀 Installation

### Prérequis
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Accès au microphone
- JavaScript activé

### Installation Locale
1. Clonez ou téléchargez le projet
2. Ouvrez le fichier `index.html` dans votre navigateur
3. Autorisez l'accès au microphone
4. Commencez à utiliser l'application

### Installation PWA
1. Ouvrez l'application dans votre navigateur
2. Cliquez sur le bouton d'installation du navigateur
3. Suivez les instructions pour installer l'application

## 📖 Utilisation

### Démarrage
1. Lancez l'application
2. Autorisez l'accès au microphone
3. Cliquez sur le bouton du microphone pour commencer l'écoute
4. Parlez naturellement

### Coaching
- Dès qu'une insulte est détectée, l'IA intervient
- L'IA demande une reformulation
- Des suggestions sont proposées
- L'IA insiste jusqu'à une reformulation correcte

### Navigation
- **Tableau de bord** : Vue d'ensemble de vos progrès
- **Coaching** : Zone de conversation avec l'IA
- **Statistiques** : Graphiques et analyses détaillées
- **Badges** : Vos accomplissements et défis
- **Historique** : Historique complet de vos sessions
- **Paramètres** : Configuration de l'application

## 🎮 Raccourcis Clavier

- `Ctrl + M` : Activer/Désactiver le microphone
- `Ctrl + Shift + M` : Changer de mode

## 📊 Statistiques

L'application suit :
- Le nombre d'insultes détectées
- Le nombre de reformulations réussies
- Le score de politesse
- La série de jours sans insulte
- Le temps sans insulte
- La progression quotidienne, hebdomadaire et mensuelle

## 🏆 Badges

25 badges à débloquer dans les catégories :
- Progression
- Série (streak)
- Politesse
- Niveau
- Défis
- Spécial
- Social
- Vocabulaire

## 🔧 Personnalisation

### Mots Personnalisés
Ajoutez vos propres mots interdits ou exceptions dans les paramètres.

### Paramètres Vocaux
- Choisissez parmi les voix disponibles
- Ajustez le volume, la vitesse et le ton
- Sélectionnez la langue de reconnaissance

### Apparence
- Thème clair ou sombre
- Animations activables/désactivables
- Sons activables/désactivables

## 💾 Sauvegarde et Export

### Export de Données
- Export JSON complet
- Export CSV de l'historique
- Export PDF de l'historique

### Import de Données
- Restauration depuis un fichier JSON

## 🔒 Confidentialité

- Toutes les données sont stockées localement
- Aucune donnée n'est envoyée à un serveur
- Fonctionne entièrement hors ligne
- Vous contrôlez vos données

## 🌐 Compatibilité

### Navigateurs Supportés
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fonctionnalités Requises
- Web Speech API (reconnaissance vocale)
- Web Speech API (synthèse vocale)
- LocalStorage
- Service Worker (pour PWA)

## 📱 PWA

L'application est une PWA complète :
- Installation sur desktop et mobile
- Icône personnalisée
- Écran de démarrage
- Mode plein écran
- Fonctionnement hors ligne

## 🛠️ Développement

### Structure du Projet
```
vocal-coach/
├── index.html              # Page principale
├── style.css               # Styles et design
├── script.js               # Logique principale
├── storage.js              # Gestion du stockage
├── insult-detection.js     # Détection d'insultes
├── reformulation.js        # Suggestions de reformulation
├── voice.js                # Reconnaissance et synthèse vocale
├── ai.js                   # IA de coaching
├── statistics.js           # Gestion des statistiques
├── achievements.js         # Système de badges et défis
├── notifications.js        # Système de notifications
├── settings.js             # Gestion des paramètres
├── ui.js                   # Gestion de l'interface
├── manifest.json           # Manifest PWA
├── service-worker.js       # Service Worker PWA
├── README.md               # Documentation
└── assets/                # Ressources
    ├── icons/             # Icônes de l'application
    ├── sounds/            # Sons de notification
    └── fonts/             # Polices personnalisées
```

### Technologies Utilisées
- HTML5
- CSS3 (avec Glassmorphism)
- JavaScript ES6+
- Web Speech API
- Service Workers
- LocalStorage

## 🤝 Contribution

Ce projet est open source. Les contributions sont les bienvenues !

## 📝 Licence

Ce projet est sous licence MIT.

## 🎓 Objectif Pédagogique

Le véritable objectif de cette application n'est pas seulement de détecter les insultes, mais de modifier durablement les habitudes de langage. L'IA vous apprend progressivement à :
- Parler plus calmement
- Reformuler naturellement
- Utiliser un vocabulaire plus riche
- Remplacer les insultes par des expressions plus adaptées

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur le dépôt GitHub.

---

**Développé avec ❤️ pour vous aider à améliorer votre langage**
