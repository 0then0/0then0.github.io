import type { ProjectTexts } from './types.ts';

export const fr: ProjectTexts = {
  spacemosaic: {
    task: 'Voir ce qui occupe de la place dans un dossier grâce à une carte des tailles, sans rien supprimer ni modifier.',
    environment: 'Application de bureau ; APK pour Android 8.0+ ; iOS nécessite votre propre signature',
    tagline: 'Une carte de l’espace disque en lecture seule, dossier par dossier.',
    primary: 'Télécharger SpaceMosaic',
    downloadNote:
      'Les versions iOS sont publiées pour les développeurs uniquement : la version pour appareil doit être signée dans Xcode et celle pour simulateur ne fonctionne pas sur iPhone.',
  },
  'cambridge-dictionary-audio': {
    task: 'Enregistrer la prononciation américaine et britannique de mots anglais en MP3, avec l’API, les définitions et l’export vers Anki.',
    environment: 'Application de bureau, application en terminal, extension Chrome/Firefox, CLI Python',
    tagline: 'Des enregistrements de prononciation pour les cartes mémoire et l’écoute.',
    primary: 'Télécharger l’application de bureau',
    secondary: [{ label: 'Installer la CLI depuis PyPI' }],
    forkNote:
      'Fork indépendant avec un développement propre important : les applications de bureau, en terminal et mobiles, les extensions de navigateur et l’export vers Anki y ont été ajoutés.',
    downloadNote:
      'Les versions Android et iOS sont publiées pour les tests et le développement uniquement : les APK Android sont une version de débogage et une version non signée, et les archives iOS exigent votre propre signature. Elles ne sont pas proposées ici comme installation classique.',
  },
  margincarry: {
    task: 'Reporter vos surlignages et soulignements Zotero sur une nouvelle révision du même PDF, en vérifiant chacun avant l’écriture.',
    environment: 'Zotero 10.0.5 ou une version 10.0.x ultérieure (bureau)',
    tagline: 'Gardez vos notes de lecture quand un article change de version.',
    primary: 'Télécharger l’extension Zotero',
  },
  batterybridge: {
    task: 'Définir une limite de charge et un calendrier d’entretien de la batterie d’un portable quand le matériel le permet, et voir quelles commandes votre appareil prend en charge.',
    environment: 'Portable avec une interface de contrôle de charge compatible ; droits d’administrateur pour installer le service',
    tagline: 'Des limites de charge selon vos règles, dans les limites de votre matériel.',
    primary: 'Télécharger BatteryBridge',
  },
  'form-forge': {
    task: 'Faire tourner votre propre service de formulaires : publier des formulaires versionnés, collecter les réponses dans PostgreSQL et les livrer à des webhooks signés.',
    environment: 'Auto-hébergé : Node.js, PostgreSQL, Inngest ; Docker Compose ou Netlify',
    tagline: 'Une plateforme de formulaires auto-hébergée avec des livraisons vérifiables.',
    primary: 'Commencer',
    secondary: [
      {
        label: 'Ouvrir l’instance publique',
        note: 'Connexion requise avec GitHub, Google ou GitLab. Aucun niveau de service n’est publié.',
      },
    ],
  },
  dbreduce: {
    task: 'Réduire une base PostgreSQL aux quelques lignes et tables qui reproduisent encore un test en échec.',
    environment: 'Python 3.10–3.15 ; PostgreSQL 13–18 avec pg_dump, pg_restore et psql de même version',
    tagline: 'D’un dump de la taille de la production à un rapport de bogue joignable.',
    primary: 'Commencer',
  },
  lanpair: {
    task: 'Comprendre pourquoi deux appareils du même réseau ne se voient pas, à partir de données collectées des deux côtés.',
    environment: 'À lancer sur les deux appareils ; versions de bureau non signées, Android en test uniquement, iOS depuis les sources',
  },
  cineclue: {
    task: 'Jeu de déduction quotidien sur le cinéma : devinez un film grâce aux personnes, lieux et studios qu’il partage.',
    environment: 'Navigateur web',
  },
  harmonia: {
    task: 'Importer des playlists de Spotify, YouTube Music ou Yandex Music, rapprocher les titres entre catalogues et créer des playlists à partir de règles sur votre propre serveur.',
    environment: 'Auto-hébergé : Python 3.10–3.15 avec PostgreSQL et Redis',
  },
  printwitness: {
    task: 'Vérifier que le texte, les lignes de tableau et les liens nécessaires survivent à un export HTML vers PDF.',
    environment: 'Application de bureau autonome (Chromium intégré) ; non signée',
  },
  txnstage: {
    task: 'Exécuter pas à pas de vraies transactions SQLite sur plusieurs connexions et voir où elles se bloquent ou perdent des données.',
    environment: 'Un seul exécutable avec interface web locale ; binaires macOS non signés',
  },
  collationdelta: {
    task: 'Détecter les changements de tri et d’égalité des chaînes avant de mettre à jour ICU, Python ou Node.js.',
    environment: 'CLI Python ; captures depuis des comparateurs Python ou Node.js',
  },
  parquetscope: {
    task: 'Voir quelles plages d’octets DuckDB lit dans un fichier Parquet via HTTP et comment la structure du fichier les modifie.',
    environment: 'Python 3.10+ ; wheel depuis GitHub Releases',
  },
  'gha-cache-audit': {
    task: 'Repérer les clés de cache et préfixes de restauration GitHub Actions susceptibles de réutiliser des fichiers incompatibles.',
    environment: 'CLI Python 3.11+, analyse statique uniquement',
  },
  samebyte: {
    task: 'Vérifier qu’un workflow GitHub Actions teste, analyse et déploie exactement les mêmes octets d’image de conteneur.',
    environment: 'CLI Node.js 22+, installée depuis l’archive de la version',
  },
  lockcone: {
    task: 'Expliquer quels changements du lockfile pnpm découlent des dépendances que vous avez réellement modifiées.',
    environment: 'CLI Node.js 22.12+, installée depuis l’archive de la version',
  },
  cursorproof: {
    task: 'Tester la pagination par curseur d’une API REST : enregistrements sautés, répétés ou mal ordonnés.',
    environment: 'CLI Python',
  },
  cancellens: {
    task: 'Transformer les bogues d’annulation asyncio en tests rejouables qui vérifient la libération des ressources.',
    environment: 'Bibliothèque Python et extension pytest',
  },
  crondelta: {
    task: 'Comparer, avant de changer, quand deux bibliothèques cron Python ou deux versions déclencheraient une planification.',
    environment: 'CLI Python',
  },
  stalefill: {
    task: 'Reproduire les courses cache-aside où des données périmées réapparaissent dans Redis ou Valkey après une mise à jour.',
    environment: 'Binaires CLI ; nécessite un Redis ou Valkey jetable',
  },
  exitscope: {
    task: 'Vérifier qu’un wrapper ou lanceur de tâches s’arrête proprement : aucun processus enfant restant, aucun tube ouvert.',
    environment: 'Linux uniquement ; compilation avec Cargo',
  },
  unpackproof: {
    task: 'Tests de régression des commandes d’extraction TAR dans des conteneurs Docker jetables.',
    environment: 'CLI Go ; nécessite Docker',
  },
  bindwitness: {
    task: 'Vérifier quelle bibliothèque partagée fournit réellement vos symboles natifs sous Linux.',
    environment: 'Linux avec glibc ; binaires amd64 et arm64',
  },
  protocarry: {
    task: 'Vérifier qu’une ancienne application conserve les nouveaux champs Protobuf lorsqu’elle lit puis écrit un message.',
    environment: 'Binaires CLI pour macOS arm64 et Linux arm64 ; sources Go',
  },
  idbshift: {
    task: 'Tester si les données IndexedDB survivent à une mise à jour de l’application, un retour arrière et une seconde mise à jour.',
    environment: 'Node.js avec Playwright Chromium ; lancement depuis les sources',
  },
  watchconverge: {
    task: 'Vérifier qu’un observateur de fichiers ou un index correspond encore au disque après enregistrements atomiques, renommages et suppressions.',
    environment: 'Node.js 22.18+ ; lancement depuis les sources',
  },
  overflowlens: {
    task: 'Calculer le taux d’erreur possible quand OpenTelemetry a fusionné des attributs de requêtes dans une série de débordement.',
    environment: 'Application statique pour navigateur servie en local ; les fichiers restent sur votre ordinateur',
  },
  agentkcal: {
    task: 'Garder un historique local et privé de l’usage des agents d’IA pour coder, avec des estimations d’énergie transparentes.',
    environment: 'CLI Node.js 24.12+',
  },
  'ultimate-geography': {
    name: 'Ultimate Geography (fork RU/EN)',
    task: 'Apprendre la géographie mondiale dans Anki avec des paquets en sept langues, des corrections sourcées et des aides à la prononciation.',
    environment: 'Paquets de cartes Anki',
    forkNote: 'Fork du paquet communautaire Ultimate Geography avec des éditions localisées et des corrections.',
  },
  'breathly-app': {
    name: 'Breathly (fork)',
    task: 'Exercices de respiration sur Android ; ce fork ajoute des préréglages, un délai de démarrage et l’export vers Health Connect.',
    environment: 'Application React Native ; aucune version publiée dans ce fork',
    forkNote: 'Fork avec des fonctions supplémentaires ; aucune version n’est publiée ici.',
  },
};
