import type { ProjectTexts } from './types.ts';

export const fr: ProjectTexts = {
  spacemosaic: {
    task: 'Voir ce qui occupe de la place dans un dossier grâce à une carte des tailles, sans rien supprimer ni modifier.',
    environment: 'Application de bureau ; APK pour Android 8.0+ ; iOS nécessite votre propre signature',
    tagline: 'Une carte de l’espace disque en lecture seule, dossier par dossier.',
    primary: 'Télécharger SpaceMosaic',
    downloadNote:
      'Les versions iOS sont publiées pour les développeurs uniquement : la version pour appareil doit être signée dans Xcode et celle pour simulateur ne fonctionne pas sur iPhone.',
    detail: {
      summary:
        'Choisissez un dossier : SpaceMosaic affiche la répartition de sa taille sous forme d’arbre, de carte en rectangles, de liste des plus gros fichiers et de résumé par type. Vous pouvez rouvrir un résultat JSON enregistré sans relire le dossier, ou le comparer à une nouvelle analyse. L’application ne lit que les métadonnées, jamais le contenu des fichiers, et ne propose aucune suppression ni aucun nettoyage.',
      audience: [
        'Les personnes qui manquent d’espace et veulent repérer les dossiers volumineux avant de décider quoi supprimer.',
        'Les personnes qui ont besoin d’un rapport de taille d’un dossier en JSON ou CSV.',
        'Les utilisateurs qui se méfient des outils de nettoyage : aucune action ne supprime de fichiers.',
      ],
      scenarios: [
        {
          title: 'Repérer les gros dossiers',
          text: 'Analysez un projet, le dossier Téléchargements ou une médiathèque et suivez les plus grands rectangles. Un double clic agrandit un dossier ; les petits éléments sont regroupés dans une liste avec recherche.',
        },
        {
          title: 'Distinguer une taille inconnue de zéro',
          text: 'Les dossiers illisibles et les tailles inconnues sont signalés comme inconnus, et non comme 0 octet. La taille logique et l’espace alloué sont séparés ; une analyse partielle en indique la raison.',
        },
        {
          title: 'Enregistrer et comparer les résultats',
          text: 'Exportez un JSON avec version de format, rouvrez-le plus tard et comparez le même dossier à une nouvelle analyse. Les changements confirmés sont séparés des inconnus ; un renommage apparaît comme un objet disparu et un objet ajouté. Les exports contiennent des noms et des chemins : relisez-les avant de les partager.',
        },
      ],
      media: [
        {
          alt: 'SpaceMosaic sur macOS après l’analyse de node_modules : un total de 165,4 Mio et 16 tailles inconnues, un arbre trié par taille et une carte colorée des plus gros dossiers de paquets.',
          caption: 'SpaceMosaic 0.1.2 sur macOS, pendant l’analyse des dépendances de ce site. Capture réalisée pour ce catalogue.',
        },
      ],
      support: [
        {
          platform: 'macOS, Apple Silicon',
          note: 'Le dépôt consigne une vérification à l’exécution sur macOS arm64 ; elle n’a pas été répétée lors de cette révision du catalogue. Il n’y a pas de version Intel.',
        },
        {
          platform: 'Android 8.0+',
          note: 'Un ancien retour utilisateur décrit un fonctionnement relativement stable sur Pixel 8 avec Android 17. La signature, les mises à jour sur une installation existante, les lecteurs d’écran et tous les fournisseurs de stockage n’ont pas été vérifiés à l’exécution.',
        },
        {
          platform: 'Windows x86-64',
          note: 'Compilation en CI. Une ancienne alpha a été essayée sur Windows 11 ; les correctifs suivants restent à y vérifier.',
        },
        {
          platform: 'Linux x86-64',
          note: 'Compilé sur Ubuntu 24.04 ; l’exécution reste expérimentale. Les archives portables nécessitent des bibliothèques système compatibles.',
        },
        {
          platform: 'iOS 16+',
          note: 'Seulement une compilation expérimentale non signée pour appareil et une pour simulateur. L’installation sur iPhone demande Xcode, une équipe de développement et une signature.',
        },
      ],
      limitations: [
        'La mesure porte sur le dossier choisi, pas sur tout le disque. La taille ne garantit pas l’espace récupérable : liens physiques, clones APFS et compression interviennent.',
        'Sur ordinateur, l’analyse s’arrête à 500 000 objets ou environ 256 Mio de métadonnées ; sur mobile, à 100 000 objets. Le résultat est alors marqué partiel.',
        'Les versions Windows et macOS n’ont pas de certificat d’éditeur ; celle de macOS porte une signature ad-hoc sans notarisation.',
        'Les liens symboliques et les points de réanalyse Windows ne sont pas suivis.',
      ],
      firstRun: [
        'Installez la version de votre système depuis la section des téléchargements.',
        'macOS peut bloquer le premier lancement faute de notarisation. Autorisez-le dans Réglages Système, Confidentialité et sécurité.',
        'Choisissez un dossier avec le bouton, glissez-le dans la fenêtre ou passez un chemin en ligne de commande :',
        'Suivez les plus grands rectangles. Sélectionnez un élément pour ses détails ou ouvrez les rubriques des plus gros fichiers et des types de fichiers.',
      ],
      downloadSteps: {
        'macos-dmg': [
          'Ouvrez le DMG et glissez SpaceMosaic.app dans Applications.',
          'Si macOS bloque le premier lancement, autorisez-le dans Réglages Système, Confidentialité et sécurité.',
        ],
        'macos-zip': ['Extrayez l’archive et ouvrez spacemosaic-darwin-arm64/SpaceMosaic.app.'],
        'windows-setup': [
          'Exécutez l’installateur. Il installe pour l’utilisateur actuel sans droits administrateur.',
          'Windows peut signaler une application inconnue, car l’installateur n’a pas de signature Authenticode.',
        ],
        'windows-zip': ['Extrayez toute l’archive et lancez spacemosaic.exe.'],
        'linux-deb': ['Installez avec apt pour résoudre les dépendances : sudo apt install ./spacemosaic-linux-x86_64.deb'],
        'linux-tar': ['Extrayez l’archive et lancez spacemosaic. Des bibliothèques système compatibles sont nécessaires.'],
        'android-apk': [
          'Autorisez l’installation depuis le navigateur ou le gestionnaire de fichiers, puis ouvrez l’APK.',
          'Si vous aviez installé un APK de débogage alpha.2 ou alpha.3, désinstallez-le d’abord : les certificats diffèrent.',
        ],
        'ios-device': ['Ce n’est pas un IPA installable. Signez la compilation dans Xcode avec votre équipe de développement.'],
        'ios-simulator': ['Uniquement pour le simulateur iOS sur Mac avec Apple Silicon.'],
      },
    },
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
    detail: {
      summary:
        'Cherchez un mot ou une expression en anglais, choisissez le sens, écoutez l’enregistrement américain ou britannique et enregistrez-le en MP3. Les mots sauvegardés forment une petite collection hors ligne exportable en paquet Anki avec audio. Cet outil est indépendant de Cambridge ; le contenu du dictionnaire reste soumis aux conditions du site Cambridge.',
      audience: [
        'Les personnes qui apprennent l’anglais et créent leurs propres paquets Anki.',
        'Les enseignants qui préparent des supports audio avec des variantes américaines et britanniques.',
        'Les personnes qui préfèrent un dossier local de prononciations à un onglet de navigateur.',
      ],
      scenarios: [
        {
          title: 'Collecter des mots en lisant',
          text: 'Saisissez un mot, vérifiez la transcription IPA et la définition, écoutez-le et enregistrez le sens. Les deux accents peuvent être sauvegardés pour un même mot.',
        },
        {
          title: 'Créer un paquet Anki',
          text: 'Exportez la collection dans un fichier .apkg avec modèle de carte, audio et notes de source. Une nouvelle exportation met à jour les cartes au lieu de les dupliquer.',
        },
        {
          title: 'Télécharger le son depuis le dictionnaire',
          text: 'L’extension Chrome ou Firefox télécharge l’enregistrement de la page du dictionnaire ouverte, sans l’application de bureau.',
        },
      ],
      media: [
        {
          alt: 'Cambridge Dictionary Audio sur macOS après la recherche de « lighthouse » : transcription américaine, deux sens du nom dont le premier est sélectionné, et boutons de lecture, de modification de traduction et d’enregistrement du sens.',
          caption:
            'Application de bureau sur macOS, lancée depuis les sources de la version 1.0.1 après une recherche. Capture réalisée pour ce catalogue.',
        },
      ],
      support: [
        {
          platform: 'Windows 10+, macOS 14+, Linux x86-64 (glibc 2.34+)',
          note: 'Les installateurs et versions portables de bureau sont produits et vérifiés en CI. Ils n’ont pas de certificat d’éditeur ; les versions macOS ne sont pas notarisées.',
        },
        {
          platform: 'CLI Python',
          note: 'Python de 3.10 à 3.15. Publié sur PyPI sans interface graphique de bureau.',
        },
        {
          platform: 'Chrome et Firefox',
          note: 'Extensions ZIP à charger décompressées ; non publiées dans les boutiques des navigateurs.',
        },
        {
          platform: 'Android 9+',
          note: 'Seuls un APK de débogage pour tests et un APK non signé sont publiés. Aucun test sur appareil physique n’est consigné.',
        },
        {
          platform: 'iOS 17+',
          note: 'Archive non signée pour appareil et compilation pour simulateur. L’installation exige votre signature et votre profil de provisionnement.',
        },
      ],
      limitations: [
        'Les enregistrements, transcriptions IPA et définitions viennent de dictionary.cambridge.org selon ses conditions ; la licence du projet ne couvre pas ce contenu.',
        'Les traductions du dictionnaire ne sont disponibles qu’en russe. L’interface propose sept langues.',
        'La synthèse d’expressions assemble des enregistrements de mots isolés ; ce n’est pas un enregistrement de l’expression entière.',
        'Aucune version mobile n’est encore prête pour une installation courante.',
      ],
      firstRun: [
        'Installez la version de bureau pour votre système. Sur macOS et Windows, confirmez l’avertissement d’application non signée.',
        'Saisissez un mot ou une expression et lancez la recherche. Choisissez un sens et un accent, puis lancez la lecture.',
        'Enregistrez le sens. Sauf choix d’un autre dossier, les fichiers vont dans « Cambridge Dictionary Audio » sous Téléchargements.',
        'Pour travailler au terminal, installez la CLI et enregistrez un son en une commande :',
      ],
      downloadSteps: {
        'windows-setup': ['Exécutez l’installateur. Windows peut avertir de l’absence de signature d’éditeur.'],
        'windows-zip': ['Extrayez l’archive et lancez l’application depuis le dossier extrait.'],
        'macos-arm-dmg': [
          'Ouvrez le DMG et glissez l’application dans Applications.',
          'La compilation n’est pas notarisée ; autorisez le premier lancement dans Réglages Système, Confidentialité et sécurité.',
        ],
        'macos-intel-dmg': [
          'Ouvrez le DMG et glissez l’application dans Applications.',
          'La compilation n’est pas notarisée ; autorisez le premier lancement dans Réglages Système, Confidentialité et sécurité.',
        ],
        'macos-arm-pkg': ['Ouvrez le paquet et suivez l’installateur.'],
        'macos-intel-pkg': ['Ouvrez le paquet et suivez l’installateur.'],
        'linux-deb': [
          'Installez avec votre gestionnaire de paquets, par exemple : sudo apt install ./cambridge-dictionary-audio_*_amd64.deb',
        ],
        'linux-rpm': [
          'Installez avec votre gestionnaire de paquets, par exemple : sudo dnf install ./cambridge-dictionary-audio-*.x86_64.rpm',
        ],
        'linux-tar': ['Extrayez l’archive et lancez l’application depuis le dossier extrait.'],
        chrome: ['Extrayez le ZIP, ouvrez chrome://extensions, activez le mode développeur et chargez l’extension non empaquetée.'],
        firefox: [
          'Ouvrez about:debugging, choisissez le chargement d’un module temporaire et sélectionnez manifest.json. Firefox retire les modules temporaires au redémarrage.',
        ],
        'android-debug': ['Utilise un certificat de développement. Pour les tests uniquement.'],
        'android-unsigned': ['Doit être signé avant installation.'],
        'ios-device': ['Nécessite votre signature et votre profil de provisionnement.'],
        'ios-simulator': ['Fonctionne uniquement dans le simulateur iOS.'],
      },
    },
  },
  margincarry: {
    task: 'Reporter vos surlignages et soulignements Zotero sur une nouvelle révision du même PDF, en vérifiant chacun avant l’écriture.',
    environment: 'Zotero 10.0.5 ou une version 10.0.x ultérieure (bureau)',
    tagline: 'Gardez vos notes de lecture quand un article change de version.',
    primary: 'Télécharger l’extension Zotero',
    detail: {
      summary:
        'Quand un préprint ou un rapport est révisé, les annotations restent sur l’ancien PDF. MarginCarry retrouve chaque passage surligné dans la nouvelle version, affiche côte à côte les positions anciennes et proposées, puis écrit uniquement celles que vous acceptez. Les originaux ne changent pas et chaque transfert peut être annulé.',
      audience: [
        'Les chercheurs et étudiants qui annotent des articles dans Zotero et reçoivent des versions mises à jour.',
        'Les relecteurs qui doivent confronter leurs notes à un manuscrit révisé.',
      ],
      scenarios: [
        {
          title: 'Transférer les surlignages à la version 2',
          text: 'Joignez le nouveau PDF au même élément Zotero, ouvrez MarginCarry et acceptez les propositions pertinentes. Commentaires, couleurs et marqueurs accompagnent la copie.',
        },
        {
          title: 'Repérer les changements',
          text: 'Une citation disparue est signalée comme introuvable. Un nombre passé de 41,0 à 41,2 n’est pas déplacé sur le nouveau nombre.',
        },
        {
          title: 'Annuler un transfert',
          text: 'Chaque transfert est consigné localement. L’annulation place dans la corbeille Zotero exactement les copies de ce transfert.',
        },
      ],
      media: [
        {
          alt: 'Fenêtre de révision MarginCarry : liste d’annotations avec candidats uniques, douteux ou multiples, et aperçus côte à côte des pages PDF source et cible pour le surlignage sélectionné.',
          caption: 'Fenêtre de révision avec un PDF de test. Image du dépôt MarginCarry (Apache-2.0).',
        },
      ],
      support: [
        {
          platform: 'Zotero 10.0.x sur macOS',
          note: 'Les vérifications historiques sous Zotero 10.0.7/macOS couvraient les sept langues d’interface et 45 cas avec de vrais PDF en six langues autres que l’anglais. Le code testé de la v0.1.2 non publiée a été livré en v0.2.0 avec le seul numéro du manifeste changé ; le corpus figé de v0.1.0 n’a pas été réexécuté.',
        },
        {
          platform: 'Zotero 10.0.x sur Windows et Linux',
          note: 'Le fonctionnement comme extension Zotero est attendu, mais non vérifié.',
        },
      ],
      limitations: [
        'Seulement les surlignages et soulignements natifs contenus sur une page. Les tracés, images, notes et annotations multipages ne sont pas transférés.',
        'Seulement les bibliothèques personnelles et deux PDF joints au même élément. Pas de bibliothèques de groupe ni d’EPUB.',
        'La correspondance est exacte, sans recherche approximative ni OCR. Les PDF scannés sans couche de texte sont signalés.',
        'Utilise des API internes du lecteur Zotero ; une future version de Zotero peut demander une mise à jour.',
      ],
      firstRun: [
        'Téléchargez le fichier .xpi. Dans Zotero, ouvrez Outils et les extensions, puis choisissez l’installation depuis un fichier dans le menu de la roue dentée.',
        'Ajoutez la nouvelle version du PDF au même élément que l’ancienne.',
        'Dans Outils, ouvrez le transfert d’annotations PDF de MarginCarry, vérifiez l’ancien et le nouveau PDF, puis recherchez des propositions.',
        'Comparez chaque proposition, acceptez-la ou ignorez-la, appliquez la sélection et confirmez.',
      ],
      downloadSteps: {
        xpi: ['Dans Zotero : Outils, extensions, menu de la roue dentée, installation depuis un fichier.', 'Redémarrez Zotero si demandé.'],
      },
    },
  },
  batterybridge: {
    task: 'Définir une limite de charge et un calendrier d’entretien de la batterie d’un portable quand le matériel le permet, et voir quelles commandes votre appareil prend en charge.',
    environment: 'Portable avec une interface de contrôle de charge compatible ; droits d’administrateur pour installer le service',
    tagline: 'Des limites de charge selon vos règles, dans les limites de votre matériel.',
    primary: 'Télécharger BatteryBridge',
    detail: {
      summary:
        'De nombreux portables restent branchés toute la journée à 100 %. BatteryBridge fixe une limite via l’interface de charge du portable, la maintient avec un service en arrière-plan et signale les fonctions non prises en charge ou non vérifiées sur votre appareil.',
      audience: [
        'Les propriétaires de portables branchés la majeure partie de la journée.',
        'Les utilisateurs Linux dont le noyau expose des seuils de charge et qui souhaitent une interface graphique et des horaires.',
        'Les personnes qui veulent connaître les capacités de leur matériel avant de confier sa charge à un outil.',
      ],
      scenarios: [
        {
          title: 'Maintenir la batterie à 80 %',
          text: 'Fixez une limite et, si besoin, un seuil de début de charge ; le service les conserve après les redémarrages.',
        },
        {
          title: 'Faire le plein avant un voyage',
          text: 'Chargez temporairement à 100 %, puis revenez automatiquement à la limite enregistrée.',
        },
        {
          title: 'Vérifier la compatibilité d’abord',
          text: 'Consultez les capacités en lecture seule ou exportez un rapport de compatibilité sans installer le service.',
        },
      ],
      media: [
        {
          caption:
            'Commandes de la documentation du projet. capabilities indique chaque fonction comme prise en charge, expérimentale, non prise en charge ou inconnue, avec le motif. La sortie dépend de l’appareil et n’est donc pas montrée ici. Aucune capture de l’application actuelle n’est encore publiée.',
        },
      ],
      support: [
        {
          platform: 'Linux avec seuils de charge du noyau',
          note: 'Prise en charge générique de sysfs charge_control_end_threshold, sans restriction de fabricant. Aucun rapport de validation par appareil n’est encore consigné.',
        },
        {
          platform: 'macOS 11+ (Intel et Apple Silicon)',
          note: 'Surveillance par IOKit. Le contrôle de charge SMC est expérimental ; certains modèles peuvent se limiter à la surveillance.',
        },
        {
          platform: 'Windows 10/11',
          note: 'Surveillance de la batterie. Le contrôle de charge est expérimental et limité au mode conservation de Lenovo, fixé à 80 %.',
        },
      ],
      limitations: [
        'Aucune validation complète d’écriture sur un appareil n’est encore consignée. Considérez le contrôle comme expérimental et observez le premier cycle de charge.',
        'Les réglages disponibles dépendent du pilote du noyau, du firmware et de l’interface du fabricant. Les contrôleurs ASUS, Dell, HP, MSI et Acer ne sont pas encore implémentés.',
        'Les installateurs macOS et Windows ne sont pas signés. Les paquets Linux nécessitent systemd et des bibliothèques natives OpenGL/EGL.',
      ],
      firstRun: [
        'Installez le paquet pour votre système et confirmez la demande administrateur. L’installateur démarre le service en arrière-plan.',
        'Ouvrez BatteryBridge et consultez les capacités de l’appareil pour savoir ce que votre portable prend en charge.',
        'Fixez la limite d’arrêt de charge, par exemple à 80 %, puis appliquez-la.',
        'Sans rien installer, vous pouvez compiler la CLI et examiner l’appareil en lecture seule :',
      ],
      downloadSteps: {
        'macos-pkg': [
          'Ouvrez le paquet ; macOS peut demander d’autoriser un installateur non signé.',
          'L’installateur ajoute l’application et le service. Désinstallez depuis l’application.',
        ],
        'windows-setup': [
          'Lancez l’installateur et confirmez la demande administrateur. Il enregistre une tâche en arrière-plan sous SYSTEM.',
        ],
        'linux-deb': [
          'sudo apt install ./BatteryBridge-linux-x86_64.deb',
          'Votre compte doit appartenir au groupe sudo pour modifier les réglages.',
        ],
        'linux-rpm': [
          'sudo dnf install ./BatteryBridge-linux-x86_64.rpm',
          'Votre compte doit appartenir au groupe wheel pour modifier les réglages.',
        ],
        'macos-tar': ['Binaires seuls ; installez le service manuellement selon son guide.'],
        'windows-zip': ['Binaires seuls ; installez le service manuellement selon son guide.'],
        'linux-tar': ['Binaires seuls ; installez le service manuellement selon son guide.'],
      },
    },
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
    detail: {
      summary:
        'Définissez un formulaire par un schéma, publiez une version immuable et recueillez les réponses sur une page hébergée, dans un iframe ou par l’API publique. Chaque livraison de webhook est signée et enregistrée avec ses tentatives et erreurs pour suivre chaque réponse. Les données restent dans votre base PostgreSQL.',
      audience: [
        'Les équipes qui veulent des formulaires sur leur infrastructure plutôt qu’un service SaaS.',
        'Les développeurs qui ont besoin d’une livraison de webhooks avec nouvelles tentatives et diagnostic.',
      ],
      scenarios: [
        {
          title: 'Recueillir des inscriptions sur votre site',
          text: 'Intégrez un formulaire publié à hauteur automatique ou envoyez les réponses depuis votre interface à l’API d’envoi idempotente.',
        },
        {
          title: 'Alimenter un autre système',
          text: 'Chaque réponse est transmise par webhook signé via une outbox transactionnelle, avec nouvelles tentatives automatiques et reprise manuelle.',
        },
        {
          title: 'Fermer la collecte à temps',
          text: 'Mettez un formulaire en pause, fixez une heure de clôture ou un nombre maximal de réponses et affichez votre message de fermeture.',
        },
      ],
      media: [
        {
          alt: 'Page d’accueil du déploiement public de Form Forge : titre “Forms with an inspectable delivery pipeline”, boutons vers l’espace de travail et le code source, et trois panneaux de fonctions.',
          caption: 'Page initiale du déploiement public lié depuis le dépôt, avant connexion. Capture réalisée pour ce catalogue.',
        },
        {
          caption:
            'Configuration locale du guide de démarrage. Requiert PostgreSQL et une application GitHub OAuth ; ouvrez ensuite localhost:3000, connectez-vous et publiez un formulaire.',
        },
      ],
      support: [
        {
          platform: 'Auto-hébergement avec Docker Compose',
          note: 'Guide de production dans deploy/README.md.',
        },
        {
          platform: 'Netlify',
          note: 'Le déploiement public lié depuis le dépôt fonctionne sur Netlify.',
        },
        {
          platform: 'Répondants',
          note: 'Les formulaires hébergés et intégrés s’ouvrent dans un navigateur moderne.',
        },
      ],
      limitations: [
        'Ce n’est pas un SaaS hébergé : vous exploitez PostgreSQL, l’application web et le serveur de tâches en arrière-plan.',
        'La connexion passe par OAuth GitHub, Google ou GitLab ; il n’y a pas de comptes avec adresse mail et mot de passe.',
        'Les réponses inachevées ne sont pas collectées et les paquets de l’espace de travail ne sont pas publiés sur npm.',
      ],
      firstRun: [
        'Installez Node.js (22.22.2+, 24.15.0+ ou 26+), pnpm 12.10.1 et PostgreSQL, et créez une application GitHub OAuth.',
        'Clonez le dépôt, configurez apps/web/.env, exécutez les migrations et lancez l’application :',
        'Dans un autre terminal, démarrez le serveur local de tâches en arrière-plan :',
        'Ouvrez localhost:3000, créez et publiez un formulaire, puis envoyez une réponse de test.',
      ],
      downloadSteps: {
        source: ['Extrayez l’archive et suivez le guide de démarrage.'],
      },
    },
  },
  dbreduce: {
    task: 'Réduire une base PostgreSQL aux quelques lignes et tables qui reproduisent encore un test en échec.',
    environment: 'Python 3.10–3.15 ; PostgreSQL 13–18 avec pg_dump, pg_restore et psql de même version',
    tagline: 'D’un dump de la taille de la production à un rapport de bogue joignable.',
    primary: 'Commencer',
    detail: {
      summary:
        'Donnez à DBReduce une base PostgreSQL et une commande qui échoue à cause d’un bogue. Il retire des lignes en suivant les clés étrangères et les relations déclarées, et ne garde que les candidats qui reproduisent le même échec. Il peut aussi supprimer des tables entières. Le résultat est un petit fichier SQL reproduisant le bogue.',
      audience: [
        'Les développeurs qui cherchent un cas minimal pour un bogue dépendant des données.',
        'Les mainteneurs qui reçoivent des signalements ne se reproduisant que sur une base externe.',
      ],
      scenarios: [
        {
          title: 'Réduire un cas de test en échec',
          text: 'Indiquez une copie de la base et votre commande de test. Reconnaissez l’échec par sa sortie ou un verdict JSON pour ne pas compter une autre erreur.',
        },
        {
          title: 'Partager un cas reproductible',
          text: 'Produit dbreduce.min.sql et un rapport avec nombres de lignes et durées, sans la sortie brute du test.',
        },
      ],
      media: [
        {
          caption:
            'Exemple du README : oracle pytest reconnu par son message d’assertion et confirmé trois fois. Il écrit dbreduce.min.sql et dbreduce-report.json sans écraser de fichier existant.',
        },
        {
          caption:
            'Résultat du rapport de validation du projet : un cas de bogue Wagtail réduit avec un oracle applicatif sur PostgreSQL 17 et la réduction optionnelle du schéma.',
        },
      ],
      support: [
        {
          platform: 'PostgreSQL 13–18',
          note: 'Isolation par instantané par défaut ; le moteur de clonage est expérimental et nécessite PostgreSQL 15+.',
        },
        {
          platform: 'Python 3.10–3.15',
          note: 'Installé comme outil autonome ; votre application peut utiliser n’importe quel langage.',
        },
      ],
      limitations: [
        'L’oracle utilise une copie jetable, mais les fonctions SQL, déclencheurs et services externes peuvent toujours avoir des effets de bord. Utilisez des commandes et des dumps de confiance.',
        'Nécessite un rôle de base de données avec CREATEDB.',
        'DBReduce ne promet pas de minimum global ; les rapports précisent quand l’irréductibilité locale ne peut pas être affirmée.',
      ],
      firstRun: [
        'Installez la CLI comme outil autonome :',
        'Vérifiez que le test lit l’URL de base dans DATABASE_URL ou DBREDUCE_DATABASE_URL.',
        'Lancez dbreduce reduce avec un critère identifiant le bogue, puis joignez dbreduce.min.sql au signalement.',
      ],
      downloadSteps: {},
    },
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
    task: 'Observez les fichiers et plages d’octets que DuckDB lit dans Parquet via HTTP et comparez les requêtes ou les structures.',
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
    task: 'Suivez les changements de dépendances, catalogues et correctifs pnpm dans le graphe de dépendances du workspace.',
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
    task: 'Comparez les exécutions cron avant de changer de moteur Python, de version ou de base de fuseaux horaires.',
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
    task: 'Testez les mises à niveau et retours en arrière d’IndexedDB, y compris avec les anciennes et nouvelles versions ouvertes ensemble.',
    environment: 'Node.js 24.22.1+ dans la branche 24.x, npm 11.19.1 et Playwright Chromium ; exécution depuis les sources',
  },
  watchconverge: {
    task: 'Vérifier qu’un observateur de fichiers ou un index correspond encore au disque après enregistrements atomiques, renommages et suppressions.',
    environment: 'Node.js 22.18+ ; lancement depuis les sources',
  },
  overflowlens: {
    task: 'Calculer le taux d’erreur possible quand OpenTelemetry a fusionné des attributs de requêtes dans une série de débordement.',
    environment: 'Application web avec traitement local ; archive autonome disponible',
    tagline: 'Des bornes exactes quand le dépassement de cardinalité masque les résultats.',
    primary: 'Ouvrir l’application',
    secondary: [
      {
        label: 'Télécharger l’archive autonome',
        note: 'L’application est disponible dans le navigateur. L’archive v0.2.1 peut aussi être servie en local.',
      },
    ],
    detail: {
      summary:
        'Importez un compteur de requêtes OpenTelemetry enregistré et comparez les taux d’erreur possibles à votre seuil. Le mode delta analyse un intervalle de collecte ; le mode cumulatif compare des instantanés correspondants avant et après. Les fichiers sont analysés localement dans un Web Worker ; comptes et bornes sont calculés dans le navigateur. L’application hébergée télécharge ses ressources ; les fichiers importés, seuils et rapports exportés ne sont pas envoyés.',
      audience: ['Les développeurs qui examinent les taux d’erreur après un dépassement de cardinalité du SDK OpenTelemetry.'],
      scenarios: [
        {
          title: 'Comprendre un intervalle delta',
          text: 'Ouvrez l’exemple inclus, confirmez ses hypothèses et voyez pourquoi des bornes de 0,1 % à 10 % ne permettent pas de décider pour un seuil de 1 %.',
        },
        {
          title: 'Comparer des instantanés cumulatifs',
          text: 'Choisissez les exports avant et après d’un même historique continu de compteur. La distribution de navigateur inclut une paire synthétique issue du laboratoire SDK.',
        },
      ],
      media: [
        {
          caption: 'Résultat documenté de l’exemple synthétique delta inclus au seuil de 1 % ; ce n’est pas une mesure de production.',
        },
      ],
      support: [
        {
          platform: 'Navigateur moderne',
          note: 'Application statique sur GitHub Pages ; l’archive autonome nécessite un serveur HTTP, pas file://.',
        },
      ],
      limitations: [
        'Accepte du UTF-8 OTLP JSON non compressé avec compteurs Sum entiers et monotones, jusqu’à 5 Mio par fichier. Ce n’est ni un serveur de métriques en direct ni un évaluateur général de SLO.',
        'Les fenêtres cumulatives exigent des instantanés complets correspondants, une attribution stable, des débuts connus inchangés, sans remise à zéro ni baisse des comptes.',
        'Les hypothèses de provenance doivent être confirmées. Un fichier ne prouve pas que le traitement a préservé tous les comptes et points de dépassement.',
      ],
      firstRun: [
        'Ouvrez l’application et choisissez l’exemple delta ou cumulatif. Ni SDK ni fichiers personnels ne sont nécessaires.',
        'Pour la version autonome déjà publiée, téléchargez le ZIP, extrayez-le et démarrez un serveur HTTP statique dans overflowlens-0.2.1 :',
        'Ouvrez http://127.0.0.1:8080, choisissez un mode, confirmez les hypothèses de provenance et fixez le pourcentage maximal d’erreurs. Exportez le JSON pour conserver l’explication.',
      ],
      downloadSteps: {
        standalone: ['Extrayez le ZIP et servez son dossier par HTTP. Node.js et Go ne sont pas nécessaires.'],
      },
    },
  },
  agentkcal: {
    task: 'Garder un historique local et privé de l’usage des agents d’IA pour coder, avec des estimations d’énergie que vous pouvez vérifier.',
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
