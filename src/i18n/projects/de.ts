import type { ProjectTexts } from './types.ts';

export const de: ProjectTexts = {
  spacemosaic: {
    task: 'Sehen, was in einem Ordner Platz belegt – als Größenkarte, ohne etwas zu löschen oder zu ändern.',
    environment: 'Desktop-App; APK für Android 8.0+; iOS erfordert eine eigene Signatur',
    tagline: 'Eine Speicherkarte nur zum Lesen, Ordner für Ordner.',
    primary: 'SpaceMosaic herunterladen',
    downloadNote:
      'iOS-Builds sind nur für Entwickler veröffentlicht: Der Geräte-Build muss in Xcode signiert werden, der Simulator-Build läuft nicht auf einem iPhone.',
    detail: {
      summary:
        'Wähle einen Ordner: SpaceMosaic zeigt seine Größenverteilung als Baum, Rechteckkarte, Liste der größten Dateien und Übersicht nach Dateityp. Gespeicherte JSON-Ergebnisse lassen sich ohne erneutes Einlesen öffnen oder mit einem neuen Scan vergleichen. Die Anwendung liest nur Metadaten, keine Dateiinhalte, und bietet weder Lösch- noch Aufräumaktionen.',
      audience: [
        'Menschen mit knappem Speicherplatz, die große Ordner finden möchten, bevor sie etwas löschen.',
        'Alle, die einen Größenbericht für einen Ordner als JSON oder CSV benötigen.',
        'Menschen, die Aufräumprogrammen misstrauen: Hier gibt es keine Aktion, die Dateien löscht.',
      ],
      scenarios: [
        {
          title: 'Große Ordner finden',
          text: 'Scanne ein Projekt, Downloads oder eine Mediensammlung und folge den größten Rechtecken. Ein Doppelklick vergrößert einen Ordner; kleine Einträge erscheinen in einer durchsuchbaren Liste.',
        },
        {
          title: 'Unbekannt bleibt unbekannt',
          text: 'Unlesbare Ordner und unbekannte Größen werden als unbekannt statt als 0 B angezeigt. Logische Größe und belegter Speicher stehen getrennt; bei einem unvollständigen Scan wird der Grund genannt.',
        },
        {
          title: 'Ergebnisse speichern und vergleichen',
          text: 'Exportiere JSON mit Formatversion, öffne es später und vergleiche denselben Ordner mit einem neuen Scan. Bestätigte Änderungen werden von unbekannten getrennt; Umbenennungen erscheinen als fehlende und hinzugefügte Objekte. Exporte enthalten Dateinamen und Pfade: Prüfe sie vor dem Teilen.',
        },
      ],
      media: [
        {
          alt: 'SpaceMosaic unter macOS nach einem Scan von node_modules: insgesamt 165,4 MiB und 16 unbekannte Größen, ein nach Größe sortierter Ordnerbaum und eine farbige Karte mit Rechtecken für die größten Paketordner.',
          caption: 'SpaceMosaic 0.1.2 unter macOS beim Scannen der Abhängigkeiten dieser Website. Aufnahme für diesen Katalog.',
        },
      ],
      support: [
        {
          platform: 'macOS, Apple Silicon',
          note: 'Das Repository dokumentiert einen Laufzeittest unter macOS arm64; bei dieser Katalogprüfung wurde er nicht wiederholt. Es gibt keinen Intel-Build.',
        },
        {
          platform: 'Android 8.0+',
          note: 'Ein früherer Nutzerbericht beschreibt einen relativ stabilen Betrieb auf einem Pixel 8 mit Android 17. Signierung, Updates über eine bestehende Installation, Screenreader und sämtliche Speicheranbieter sind nicht zur Laufzeit geprüft.',
        },
        {
          platform: 'Windows x86-64',
          note: 'Wird in CI gebaut. Eine frühere Alpha wurde unter Windows 11 ausprobiert; spätere Korrekturen müssen dort erneut geprüft werden.',
        },
        {
          platform: 'Linux x86-64',
          note: 'Unter Ubuntu 24.04 gebaut; der Betrieb bleibt experimentell. Portable Archive benötigen kompatible Systembibliotheken.',
        },
        {
          platform: 'iOS 16+',
          note: 'Nur ein experimenteller, unsignierter Geräte-Build und ein Simulator-Build. Die Installation auf einem iPhone erfordert Xcode, ein Entwicklungsteam und eine Signatur.',
        },
      ],
      limitations: [
        'Gemessen wird der gewählte Ordner, nicht die ganze Festplatte. Seine Größe garantiert keinen freigebbaren Speicher: Hardlinks, APFS-Klone und Kompression spielen eine Rolle.',
        'Scans verwenden ein automatisches Speicherbudget oder manuell 16–4096 MiB. Speicherdruck oder das Budget können einen Scan mit einem Teilergebnis beenden; dies garantiert keinen Schutz vor Speichermangel.',
        'Windows- und macOS-Builds haben kein Herausgeberzertifikat; macOS ist ad-hoc-signiert und nicht notarisiert.',
        'Symbolischen Links und Windows-Reparse-Points wird nicht gefolgt.',
      ],
      firstRun: [
        'Installiere den Build für dein System aus dem Downloadbereich.',
        'macOS kann den ersten Start wegen fehlender Notarisierung blockieren. Erlaube ihn in den Systemeinstellungen unter Datenschutz & Sicherheit.',
        'Wähle einen Ordner über die Schaltfläche, ziehe ihn ins Fenster oder übergib einen Pfad in der Befehlszeile:',
        'Folge den größten Rechtecken. Wähle eines für Details oder öffne die Bereiche für größte Dateien und Dateitypen.',
      ],
      downloadSteps: {
        'macos-dmg': [
          'Öffne das DMG und ziehe SpaceMosaic.app nach Programme.',
          'Wenn macOS den ersten Start blockiert, erlaube ihn in den Systemeinstellungen unter Datenschutz & Sicherheit.',
        ],
        'macos-zip': ['Entpacke das Archiv und öffne spacemosaic-darwin-arm64/SpaceMosaic.app.'],
        'windows-setup': [
          'Starte das Installationsprogramm. Es installiert für den aktuellen Benutzer ohne Administratorrechte.',
          'Windows kann vor einer unbekannten App warnen, da der Installer keine Authenticode-Signatur hat.',
        ],
        'windows-zip': ['Entpacke das gesamte Archiv und starte spacemosaic.exe.'],
        'linux-deb': ['Installiere mit apt, damit Abhängigkeiten aufgelöst werden: sudo apt install ./spacemosaic-linux-x86_64.deb'],
        'linux-tar': ['Entpacke das Archiv und starte spacemosaic. Kompatible Systembibliotheken sind erforderlich.'],
        'android-apk': [
          'Erlaube Installationen aus deinem Browser oder Dateimanager und öffne das APK.',
          'Falls du zuvor ein Debug-APK von alpha.2 oder alpha.3 installiert hast, deinstalliere es zuerst: Die Signaturzertifikate unterscheiden sich.',
        ],
        'ios-device': ['Kein installierbares IPA. Signiere den Build in Xcode mit deinem eigenen Entwicklungsteam.'],
        'ios-simulator': ['Nur für den iOS-Simulator auf einem Mac mit Apple Silicon.'],
      },
    },
  },
  'cambridge-dictionary-audio': {
    task: 'Amerikanische und britische Aussprache englischer Wörter als MP3 speichern, mit IPA, Definitionen und Anki-Export.',
    environment: 'Desktop-App, Terminal-App, Chrome-/Firefox-Erweiterung, Python-CLI',
    tagline: 'Ausspracheaufnahmen für Karteikarten und Hörübungen.',
    primary: 'Desktop-App herunterladen',
    secondary: [{ label: 'CLI über PyPI installieren' }],
    forkNote:
      'Eigenständiger Fork mit umfangreicher eigener Entwicklung: Desktop-, Terminal- und Mobil-Apps, Browsererweiterungen und Anki-Export kamen hier hinzu.',
    downloadNote:
      'Android- und iOS-Builds sind nur für Tests und Entwicklung veröffentlicht: Die Android-APKs sind ein Debug-Build und ein nicht signierter Build, die iOS-Archive brauchen eine eigene Signatur. Als reguläre Installation werden sie hier nicht angeboten.',
    detail: {
      summary:
        'Suche ein englisches Wort oder eine Wendung, wähle die Bedeutung, höre die amerikanische oder britische Aufnahme und speichere sie als MP3. Gespeicherte Wörter bilden eine kleine Offline-Sammlung, die sich als fertiges Anki-Deck mit Audio exportieren lässt. Das Werkzeug ist unabhängig und kein offizielles Cambridge-Produkt; für Wörterbuchinhalte gelten die Bedingungen der Cambridge-Website.',
      audience: [
        'Englischlernende, die eigene Anki-Decks erstellen.',
        'Lehrkräfte, die Hörmaterial mit amerikanischen und britischen Varianten vorbereiten.',
        'Alle, die einen lokalen Ordner mit Aussprachedateien statt eines Browser-Tabs möchten.',
      ],
      scenarios: [
        {
          title: 'Beim Lesen Wörter sammeln',
          text: 'Gib ein Wort ein, prüfe IPA und Definition, höre es an und speichere die Bedeutung. Für dasselbe Wort lassen sich beide Akzente speichern.',
        },
        {
          title: 'Ein Anki-Deck erstellen',
          text: 'Exportiere die Sammlung in eine .apkg-Datei mit Kartenvorlage, Audio und Quellenangaben. Ein erneuter Export aktualisiert vorhandene Karten, statt Duplikate anzulegen.',
        },
        {
          title: 'Audio von der Wörterbuchseite laden',
          text: 'Die Chrome- oder Firefox-Erweiterung lädt die Aufnahme von der geöffneten Wörterbuchseite ohne Desktop-App herunter.',
        },
      ],
      media: [
        {
          alt: 'Cambridge Dictionary Audio unter macOS nach der Suche nach „lighthouse“: amerikanische Lautschrift, zwei Substantivbedeutungen mit ausgewählter erster Bedeutung sowie Schaltflächen für Wiedergabe, Übersetzung und Speichern.',
          caption:
            'Desktop-App unter macOS, aus den Quellen von Version 1.0.1 gestartet, nach einer Wortsuche. Aufnahme für diesen Katalog.',
        },
      ],
      support: [
        {
          platform: 'Windows 10+, macOS 14+, Linux x86-64 (glibc 2.34+)',
          note: 'Desktop-Installer und portable Builds werden in CI erstellt und geprüft. Sie haben kein Herausgeberzertifikat; macOS-Builds sind nicht notarisiert.',
        },
        {
          platform: 'Python-CLI',
          note: 'Python 3.10 bis 3.15. Auf PyPI ohne Desktop-Oberfläche veröffentlicht.',
        },
        {
          platform: 'Chrome und Firefox',
          note: 'ZIP-Erweiterungen zum entpackten Laden; nicht in den Browser-Stores veröffentlicht.',
        },
        {
          platform: 'Android 9+',
          note: 'Nur ein Debug-Test-APK und ein unsigniertes APK sind veröffentlicht. Tests auf physischen Geräten sind nicht dokumentiert.',
        },
        {
          platform: 'iOS 17+',
          note: 'Unsigniertes Gerätearchiv und Simulator-Build. Für die Installation sind eigene Signierung und Provisionierung nötig.',
        },
      ],
      limitations: [
        'Aufnahmen, IPA und Definitionen stammen von dictionary.cambridge.org und unterliegen dessen Bedingungen; die Projektlizenz deckt diese Inhalte nicht ab.',
        'Wörterbuchübersetzungen gibt es nur auf Russisch. Die Oberfläche bietet sieben Sprachen.',
        'Die Phrasensynthese verbindet Einzelwortaufnahmen; sie ist keine Aufnahme der ganzen Wendung.',
        'Noch kein mobiler Build ist für eine reguläre Installation bereit.',
      ],
      firstRun: [
        'Installiere den Desktop-Build für dein System. Bestätige unter macOS und Windows den Hinweis auf die unsignierte App.',
        'Gib ein Wort oder eine Wendung ein und starte die Suche. Wähle Bedeutung und Akzent und starte die Wiedergabe.',
        'Speichere die Bedeutung. Die Dateien landen unter „Cambridge Dictionary Audio“ in Downloads, sofern du keinen anderen Ordner wählst.',
        'Für die Arbeit im Terminal installiere die CLI und speichere eine Aufnahme mit einem Befehl:',
      ],
      downloadSteps: {
        'windows-setup': ['Starte das Installationsprogramm. Windows kann wegen der fehlenden Herausgebersignatur warnen.'],
        'windows-zip': ['Entpacke das Archiv und starte die App aus dem entpackten Ordner.'],
        'macos-arm-dmg': [
          'Öffne das DMG und ziehe die App nach Programme.',
          'Der Build ist nicht notarisiert; erlaube den ersten Start in den Systemeinstellungen unter Datenschutz & Sicherheit.',
        ],
        'macos-intel-dmg': [
          'Öffne das DMG und ziehe die App nach Programme.',
          'Der Build ist nicht notarisiert; erlaube den ersten Start in den Systemeinstellungen unter Datenschutz & Sicherheit.',
        ],
        'macos-arm-pkg': ['Öffne das Paket und folge dem Installationsprogramm.'],
        'macos-intel-pkg': ['Öffne das Paket und folge dem Installationsprogramm.'],
        'linux-deb': ['Installiere mit dem Paketmanager, zum Beispiel: sudo apt install ./cambridge-dictionary-audio_*_amd64.deb'],
        'linux-rpm': ['Installiere mit dem Paketmanager, zum Beispiel: sudo dnf install ./cambridge-dictionary-audio-*.x86_64.rpm'],
        'linux-tar': ['Entpacke das Archiv und starte die App aus dem entpackten Ordner.'],
        chrome: ['Entpacke das ZIP, öffne chrome://extensions, aktiviere den Entwicklermodus und lade die entpackte Erweiterung.'],
        firefox: [
          'Öffne about:debugging, wähle das Laden eines temporären Add-ons und manifest.json. Firefox entfernt temporäre Add-ons beim Neustart.',
        ],
        'android-debug': ['Verwendet ein Entwicklungszertifikat. Nur für Tests.'],
        'android-unsigned': ['Muss vor der Installation signiert werden.'],
        'ios-device': ['Erfordert eigene Signierung und ein Provisionierungsprofil.'],
        'ios-simulator': ['Läuft nur im iOS-Simulator.'],
      },
    },
  },
  margincarry: {
    task: 'Zotero-Hervorhebungen und Unterstreichungen in eine neue Fassung desselben PDF übernehmen und jede vor dem Schreiben prüfen.',
    environment: 'Zotero 10.0.5 oder eine neuere 10.0.x-Version (Desktop)',
    tagline: 'Lesenotizen behalten, wenn ein Artikel eine neue Fassung bekommt.',
    primary: 'Zotero-Plugin herunterladen',
    detail: {
      summary:
        'Wird ein Preprint oder Bericht überarbeitet, bleiben deine Anmerkungen im alten PDF. MarginCarry findet jede markierte Passage in der neuen Fassung, zeigt alte und vorgeschlagene Positionen nebeneinander und schreibt nur angenommene Vorschläge. Originale bleiben unverändert, und jeder Transfer lässt sich rückgängig machen. Außerdem lässt sich eine untergeordnete Zotero-Notiz kopieren und ihre bestätigten Annotationslinks auf das neue PDF umstellen. Die ursprüngliche Notiz bleibt erhalten.',
      audience: [
        'Forschende und Studierende, die Artikel in Zotero kommentieren und aktualisierte Fassungen erhalten.',
        'Gutachtende, die ihre Notizen mit einem überarbeiteten Manuskript vergleichen müssen.',
      ],
      scenarios: [
        {
          title: 'Markierungen in Version 2 übertragen',
          text: 'Hänge das neue PDF an denselben Zotero-Eintrag, öffne MarginCarry und nimm passende Vorschläge an. Kommentare, Farben und Tags werden mitkopiert.',
        },
        {
          title: 'Änderungen erkennen',
          text: 'Eine verschwundene Textstelle wird als nicht gefunden gemeldet. Eine von 41,0 auf 41,2 geänderte Zahl wird nicht auf die neue Zahl übertragen.',
        },
        {
          title: 'Einen Transfer rückgängig machen',
          text: 'Jeder Transfer wird lokal protokolliert. Rückgängig verschiebt genau dessen Kopien in den Zotero-Papierkorb.',
        },
      ],
      media: [
        {
          alt: 'MarginCarry-Prüffenster: Anmerkungsliste mit eindeutigen, unsicheren und mehreren Kandidaten sowie nebeneinander angezeigte Quell- und Ziel-PDF-Seiten der ausgewählten Markierung.',
          caption: 'Prüffenster mit einem Test-PDF. Bild aus dem MarginCarry-Repository (Apache-2.0).',
        },
      ],
      support: [
        {
          platform: 'Zotero 10.0.x unter macOS',
          note: 'Historische Prüfungen unter Zotero 10.0.7/macOS umfassten alle sieben Oberflächensprachen und 45 Fälle mit echten PDFs in sechs nichtenglischen Sprachen. Der getestete Code der unveröffentlichten v0.1.2 erschien in v0.2.0 nur mit geänderter Manifestversion; der eingefrorene v0.1.0-Korpus wurde nicht erneut ausgeführt.',
        },
        {
          platform: 'Zotero 10.0.x unter Windows und Linux',
          note: 'Der Betrieb als Zotero-Plugin wird erwartet, ist aber nicht geprüft.',
        },
      ],
      limitations: [
        'Nur native Markierungen und Unterstreichungen auf einer Seite. Freihand-, Bild-, Notiz- und mehrseitige Anmerkungen werden nicht übertragen.',
        'Nur persönliche Bibliotheken und zwei PDF-Anhänge desselben Eintrags. Keine Gruppenbibliotheken oder EPUBs.',
        'Exakter Abgleich ohne unscharfe Suche oder OCR. Gescannte PDFs ohne Textebene werden entsprechend gemeldet.',
        'Verwendet interne Zotero-Reader-APIs; eine künftige Zotero-Version kann ein Update erfordern.',
      ],
      firstRun: [
        'Lade die .xpi-Datei herunter. Öffne in Zotero die Erweiterungsverwaltung unter Extras, wähle im Zahnradmenü die Installation aus einer Datei und öffne sie.',
        'Füge die neue PDF-Fassung demselben Eintrag wie die alte hinzu.',
        'Öffne unter Extras den PDF-Anmerkungstransfer von MarginCarry, prüfe altes und neues PDF und suche Vorschläge.',
        'Vergleiche jeden Vorschlag, nimm ihn an oder überspringe ihn, wende die Auswahl an und bestätige.',
      ],
      downloadSteps: {
        xpi: [
          'In Zotero: Extras, Erweiterungsverwaltung, Zahnradmenü, Erweiterung aus Datei installieren.',
          'Starte Zotero neu, falls du dazu aufgefordert wirst.',
        ],
      },
    },
  },
  batterybridge: {
    task: 'Ladegrenze und Akkupflege-Zeitplan für den Laptop festlegen, soweit die Hardware es erlaubt, und sehen, welche Funktionen das Gerät unterstützt.',
    environment: 'Laptop mit unterstützter Ladesteuerung; Administratorrechte für die Installation des Dienstes',
    tagline: 'Ladegrenzen nach Ihren Regeln – im Rahmen Ihrer Hardware.',
    primary: 'BatteryBridge herunterladen',
    detail: {
      summary:
        'Viele Laptops bleiben den ganzen Tag bei 100 % am Ladegerät. BatteryBridge setzt über die Ladeschnittstelle des Laptops eine Grenze, hält sie mit einem Hintergrunddienst ein und meldet nicht unterstützte oder ungeprüfte Funktionen auf deinem Gerät.',
      audience: [
        'Laptopbesitzer, deren Gerät die meiste Zeit am Ladegerät hängt.',
        'Linux-Nutzer mit Ladegrenzen im Kernel, die eine Oberfläche und Zeitpläne wünschen.',
        'Menschen, die ihre Hardwarefähigkeiten kennen möchten, bevor sie einem Ladewerkzeug vertrauen.',
      ],
      scenarios: [
        {
          title: 'Die Batterie bei 80 % halten',
          text: 'Setze eine Grenze, optional mit Startschwelle. Der Dienst behält sie nach Neustarts bei.',
        },
        {
          title: 'Vor einer Reise voll laden',
          text: 'Lade vorübergehend auf 100 % und kehre danach automatisch zur gespeicherten Grenze zurück.',
        },
        {
          title: 'Zuerst die Kompatibilität prüfen',
          text: 'Prüfe die Fähigkeiten schreibgeschützt oder exportiere einen Kompatibilitätsbericht, ohne den Dienst zu installieren.',
        },
      ],
      media: [
        {
          caption:
            'Befehle aus der Projektdokumentation. capabilities meldet Funktionen als unterstützt, experimentell, nicht unterstützt oder unbekannt und nennt den Grund. Die Ausgabe hängt vom Gerät ab und wird hier daher nicht gezeigt. Ein Screenshot der aktuellen App ist noch nicht veröffentlicht.',
        },
      ],
      support: [
        {
          platform: 'Linux mit Ladegrenzen im Kernel',
          note: 'Allgemeine Unterstützung für sysfs charge_control_end_threshold ohne Herstellerbeschränkung. Gerätebezogene Validierungsberichte sind noch nicht dokumentiert.',
        },
        {
          platform: 'macOS 11+ (Intel und Apple Silicon)',
          note: 'Batterieüberwachung über IOKit. SMC-Ladesteuerung ist experimentell; manche Modelle erlauben möglicherweise nur Überwachung.',
        },
        {
          platform: 'Windows 10/11',
          note: 'Batterieüberwachung. Ladesteuerung nur für Lenovos Erhaltungsmodus mit festen 80 %, experimentell.',
        },
      ],
      limitations: [
        'Eine abgeschlossene Schreibvalidierung auf einem Gerät ist noch nicht dokumentiert. Behandle die Ladesteuerung als experimentell und beobachte den ersten Ladezyklus.',
        'Verfügbare Einstellungen hängen von Kerneltreiber, Firmware und Herstellerschnittstelle ab. ASUS-, Dell-, HP-, MSI- und Acer-Controller sind noch nicht implementiert.',
        'macOS- und Windows-Installer sind unsigniert. Linux-Pakete brauchen systemd und native OpenGL/EGL-Bibliotheken.',
      ],
      firstRun: [
        'Installiere das Paket für dein System und bestätige die Administratorabfrage. Der Installer startet den Hintergrunddienst.',
        'Öffne BatteryBridge und prüfe die Gerätefähigkeiten, um die Unterstützung deines Laptops zu sehen.',
        'Setze die Ladegrenze etwa auf 80 % und wende sie an.',
        'Ohne Installation kannst du die CLI bauen und dein Gerät schreibgeschützt untersuchen:',
      ],
      downloadSteps: {
        'macos-pkg': [
          'Öffne das Paket; macOS fragt möglicherweise nach Erlaubnis für einen unsignierten Installer.',
          'Der Installer fügt App und Hintergrunddienst hinzu. Deinstalliere aus der App heraus.',
        ],
        'windows-setup': [
          'Starte den Installer und bestätige die Administratorabfrage. Er registriert eine Hintergrundaufgabe unter SYSTEM.',
        ],
        'linux-deb': [
          'sudo apt install ./BatteryBridge-linux-x86_64.deb',
          'Dein Konto muss zur Gruppe sudo gehören, um Einstellungen zu ändern.',
        ],
        'linux-rpm': [
          'sudo dnf install ./BatteryBridge-linux-x86_64.rpm',
          'Dein Konto muss zur Gruppe wheel gehören, um Einstellungen zu ändern.',
        ],
        'macos-tar': ['Nur Binärdateien; installiere den Dienst gemäß Dienstanleitung manuell.'],
        'windows-zip': ['Nur Binärdateien; installiere den Dienst gemäß Dienstanleitung manuell.'],
        'linux-tar': ['Nur Binärdateien; installiere den Dienst gemäß Dienstanleitung manuell.'],
      },
    },
  },
  'form-forge': {
    task: 'Eigenen Formulardienst betreiben: versionierte Formulare veröffentlichen, Antworten in PostgreSQL sammeln und an signierte Webhooks liefern.',
    environment: 'Selbst gehostet: Node.js, PostgreSQL, Inngest; Docker Compose oder Netlify',
    tagline: 'Eine selbst gehostete Formularplattform mit nachvollziehbarer Zustellung.',
    primary: 'Loslegen',
    secondary: [
      {
        label: 'Öffentliche Instanz öffnen',
        note: 'Anmeldung mit GitHub, Google oder GitLab nötig. Für sie ist kein Service-Level veröffentlicht.',
      },
    ],
    detail: {
      summary:
        'Definiere ein Formular als Schema, veröffentliche eine unveränderliche Version und sammle Antworten über eine gehostete Seite, ein iframe oder die öffentliche API. Jede Webhook-Zustellung wird signiert und mit Versuchen und Fehlern protokolliert, damit sich jede Antwort verfolgen lässt. Daten bleiben in deiner PostgreSQL-Datenbank.',
      audience: [
        'Teams, die Formulare auf eigener Infrastruktur statt bei einem SaaS-Anbieter betreiben möchten.',
        'Entwickler, die Webhook-Zustellung mit Wiederholungen und Diagnose benötigen.',
      ],
      scenarios: [
        {
          title: 'Anmeldungen auf der Website sammeln',
          text: 'Bette ein veröffentlichtes Formular mit automatischer Höhe ein oder sende aus deinem Frontend an die idempotente Einreichungs-API.',
        },
        {
          title: 'Ein anderes System versorgen',
          text: 'Jede Antwort wird als signierter Webhook über eine transaktionale Outbox zugestellt, mit automatischen Wiederholungen und manueller Wiederaufnahme.',
        },
        {
          title: 'Die Annahme rechtzeitig schließen',
          text: 'Pausiere ein Formular, lege eine Schließzeit oder ein Antwortlimit fest und zeige einen eigenen Schließhinweis.',
        },
      ],
      media: [
        {
          alt: 'Startseite der öffentlichen Form-Forge-Installation: Überschrift “Forms with an inspectable delivery pipeline”, Schaltflächen für Arbeitsbereich und Quellcode sowie drei Funktionsfelder.',
          caption: 'Startseite der im Repository verlinkten öffentlichen Installation vor der Anmeldung. Aufnahme für diesen Katalog.',
        },
        {
          caption:
            'Lokale Einrichtung aus der Einstiegsanleitung. Erfordert PostgreSQL und eine GitHub-OAuth-App; öffne dann localhost:3000, melde dich an und veröffentliche ein Formular.',
        },
      ],
      support: [
        {
          platform: 'Selbst gehostet mit Docker Compose',
          note: 'Produktionsanleitung in deploy/README.md.',
        },
        {
          platform: 'Netlify',
          note: 'Die im Repository verlinkte öffentliche Installation läuft auf Netlify.',
        },
        {
          platform: 'Teilnehmende',
          note: 'Gehostete und eingebettete Formulare öffnen sich in einem modernen Browser.',
        },
      ],
      limitations: [
        'Kein gehosteter SaaS: Du betreibst PostgreSQL, Web-App und Hintergrundaufgabenserver selbst.',
        'Die Anmeldung nutzt GitHub-, Google- oder GitLab-OAuth; es gibt keine Konten mit E-Mail und Passwort.',
        'Unfertige Antworten werden nicht erfasst, und Workspace-Pakete werden nicht auf npm veröffentlicht.',
      ],
      firstRun: [
        'Installiere Node.js (22.22.2+, 24.15.0+ oder 26+), pnpm 12.17.0 und PostgreSQL und erstelle eine GitHub-OAuth-App.',
        'Klone das Repository, konfiguriere apps/web/.env und exportiere vor den Migrationen dieselbe DATABASE_URL im Terminal. Starte danach die App:',
        'Starte den lokalen Hintergrundaufgabenserver in einem zweiten Terminal:',
        'Öffne localhost:3000, erstelle und veröffentliche ein Formular und sende eine Testantwort.',
      ],
      downloadSteps: {
        source: ['Entpacke das Archiv und folge der Einstiegsanleitung.'],
      },
    },
  },
  dbreduce: {
    task: 'Eine PostgreSQL-Datenbank auf die wenigen Zeilen und Tabellen verkleinern, mit denen ein Test weiterhin fehlschlägt.',
    environment: 'Python 3.10–3.15; PostgreSQL 13–18 mit passenden pg_dump, pg_restore und psql',
    tagline: 'Vom Dump in Produktionsgröße zum Fehlerbericht zum Anhängen.',
    primary: 'Loslegen',
    detail: {
      summary:
        'Gib DBReduce eine PostgreSQL-Datenbank und einen Befehl, der wegen eines Fehlers scheitert. Das Werkzeug entfernt Zeilen unter Beachtung von Fremdschlüsseln und angegebenen Beziehungen und behält nur Kandidaten mit demselben Fehler. Optional entfernt es auch ganze Tabellen. Das Ergebnis ist eine kleine SQL-Datei, die den Fehler reproduziert.',
      audience: [
        'Entwickler, die einen minimalen Reproduktionsfall für einen datenabhängigen Fehler brauchen.',
        'Maintainer, die Fehlerberichte erhalten, die nur mit einer fremden Datenbank scheitern.',
      ],
      scenarios: [
        {
          title: 'Einen fehlgeschlagenen Testfall verkleinern',
          text: 'Gib eine Datenbankkopie und deinen Testbefehl an. Erkenne den Fehler an seiner Ausgabe oder einem JSON-Urteil, damit andere Fehler nicht zählen.',
        },
        {
          title: 'Einen Reproduktionsfall teilen',
          text: 'Ausgabe sind dbreduce.min.sql und ein Bericht mit Zeilenzahlen und Laufzeiten, ohne rohe Testausgabe.',
        },
      ],
      media: [
        {
          caption:
            'Aufruf aus dem README: ein pytest-Orakel, anhand seiner Assertion-Meldung erkannt und dreimal bestätigt. Schreibt dbreduce.min.sql und dbreduce-report.json, ohne vorhandene Dateien zu überschreiben.',
        },
        {
          caption:
            'Ergebnis aus dem Praxisbericht des Projekts: Ein Wagtail-Reproduktionsfall wurde mit einem Anwendungsorakel unter PostgreSQL 17 und optionaler Schemareduktion verkleinert.',
        },
      ],
      support: [
        {
          platform: 'PostgreSQL 13–18',
          note: 'Standardmäßig Snapshot-Isolation; das experimentelle Klon-Backend benötigt PostgreSQL 15+.',
        },
        {
          platform: 'Python 3.10–3.15',
          note: 'Wird als eigenständiges Werkzeug installiert; deine Anwendung kann jede Sprache verwenden.',
        },
      ],
      limitations: [
        'Das Orakel läuft gegen eine Wegwerfkopie, doch SQL-Funktionen, Trigger und externe Dienste können weiterhin Nebenwirkungen haben. Verwende vertrauenswürdige Befehle und Dumps.',
        'Benötigt eine Datenbankrolle mit CREATEDB.',
        'DBReduce garantiert kein globales Minimum; Berichte geben an, wenn lokale Irreduzibilität nicht behauptet werden kann.',
      ],
      firstRun: [
        'Installiere die CLI als eigenständiges Werkzeug:',
        'Stelle sicher, dass der Test die Datenbank-URL aus DATABASE_URL oder DBREDUCE_DATABASE_URL liest.',
        'Führe dbreduce reduce mit einer Bedingung aus, die den Fehler erkennt, und hänge dbreduce.min.sql an den Fehlerbericht.',
      ],
      downloadSteps: {},
    },
  },
  lanpair: {
    task: 'Herausfinden, warum sich zwei Geräte im selben Netz nicht sehen – mit Daten, die auf beiden Seiten gesammelt werden.',
    environment: 'Läuft auf beiden Geräten; Desktop-Builds nicht signiert, Android nur Test-Builds, iOS aus dem Quellcode',
  },
  cineclue: {
    task: 'Tägliches Film-Ratespiel: einen Film über gemeinsame Personen, Orte und Studios erraten.',
    environment: 'Webbrowser',
  },
  harmonia: {
    task: 'Playlists aus Spotify, YouTube Music oder Yandex Music importieren, Titel katalogübergreifend zuordnen und regelbasierte Playlists auf dem eigenen Server erstellen.',
    environment: 'Selbst gehostet: Python 3.10–3.15 mit PostgreSQL und Redis',
  },
  printwitness: {
    task: 'Benötigte HTML-Texte, Tabellenzeilen und Links mit einem exportierten oder vorhandenen PDF abgleichen.',
    environment: 'Eigenständige Desktop-App (mit Chromium); nicht signiert',
  },
  txnstage: {
    task: 'Echte SQLite-Transaktionen auf getrennten Verbindungen schrittweise ausführen und Sperren, Datenerhalt sowie Wiederherstellung nach Prozessabstürzen prüfen.',
    environment: 'Einzelne ausführbare Datei mit lokaler Weboberfläche; macOS- und Windows-Binärdateien nicht signiert',
  },
  collationdelta: {
    task: 'Änderungen an Sortierung und Gleichheit von Zeichenketten vor einem Update von ICU, Node.js, Browsern oder PostgreSQL erkennen.',
    environment:
      'CLI für Python 3.10+; Erfassung mit Node.js, Browser und PostgreSQL 15–18; Adapterausführung unter Windows nicht unterstützt',
  },
  parquetscope: {
    task: 'Prüfe, welche Dateien und Bytebereiche DuckDB aus Parquet über HTTP liest, und vergleiche Abfragen oder Dateistrukturen.',
    environment: 'CLI für Python 3.10+ mit lokaler Browseroberfläche; einmalige Einrichtung von DuckDB httpfs erforderlich',
  },
  'gha-cache-audit': {
    task: 'Cache-Schlüssel und Wiederherstellungspräfixe in GitHub Actions finden, die inkompatible Dateien wiederverwenden können.',
    environment: 'CLI für Python 3.11+, nur statische Analyse',
  },
  samebyte: {
    task: 'Prüfen, ob ein GitHub-Actions-Workflow dieselben Bytes eines Container-Images testet, scannt und ausliefert.',
    environment: 'CLI für Node.js 22+, Installation aus dem Release-Archiv',
  },
  lockcone: {
    task: 'pnpm-Lockfile-Änderungen zwischen Git-Commits prüfen und Abhängigkeiten, Kataloge, Patches, Overrides und Peer-Kontexte verfolgen.',
    environment: 'CLI für Node.js 22.12+, Installation aus dem Release-Archiv',
  },
  cursorproof: {
    task: 'Die Cursor-Paginierung einer REST-API auf übersprungene, doppelte oder falsch sortierte Datensätze testen.',
    environment: 'CLI für Python 3.10+',
  },
  cancellens: {
    task: 'Abbruchfehler in asyncio in wiederholbare Tests verwandeln, die prüfen, ob Ressourcen freigegeben werden.',
    environment: 'Bibliothek für CPython 3.10–3.14 für asyncio-Tests; kein pytest-Plugin erforderlich',
  },
  crondelta: {
    task: 'Cron-Ausführungen vor dem Wechsel einer Python- oder JavaScript-Engine, ihrer Version oder Zeitzonendatenbank vergleichen.',
    environment: 'CLI für Python 3.10–3.15 mit uv; JavaScript-Vergleiche benötigen auch Node.js und cron-parser',
  },
  stalefill: {
    task: 'Cache-Aside-Wettläufe reproduzieren, bei denen veraltete Daten nach einem Update in Redis oder Valkey wieder auftauchen.',
    environment: 'CLI-Binärdateien; braucht ein Wegwerf-Redis oder -Valkey',
  },
  exitscope: {
    task: 'Prüfen, ob ein Wrapper oder Task-Runner sauber beendet: keine überlebenden Kindprozesse, keine offenen Pipes.',
    environment: 'Linux 5.14+ mit cgroup v2 und delegiertem Schreibzugriff; Build mit Cargo',
  },
  unpackproof: {
    task: 'Regressionstests für TAR-Entpackbefehle in Wegwerf-Containern von Docker.',
    environment: 'Go-CLI; braucht Docker',
  },
  bindwitness: {
    task: 'Prüfen, welche Shared Library unter Linux Ihre nativen Symbole tatsächlich bereitstellt.',
    environment: 'Linux mit glibc; Binärdateien für amd64 und arm64',
  },
  protocarry: {
    task: 'Prüfen, ob eine ältere Anwendung neuere Protobuf-Felder beim Lesen und Schreiben einer Nachricht erhält.',
    environment: 'Eigenständige CLI-Binärdateien für macOS und Linux, arm64 und x86-64; Go-Quellcode',
  },
  idbshift: {
    task: 'IndexedDB-Upgrades, Rollbacks und die Wiederherstellung nach abgebrochenen Migrationen testen, auch bei gleichzeitig geöffneten alten und neuen Anwendungstabs.',
    environment: 'Node.js 24.22.1+ innerhalb von 24.x, npm 11.19.1 und Playwright Chromium; Ausführung aus dem Quellcode',
  },
  watchconverge: {
    task: 'Prüfen, ob ein Dateiindex nach Speichern, Umbenennen und Löschen zur Festplatte passt, und Fehler auf wiederholbare Szenarien verkleinern.',
    environment: 'Node.js 22.18+; lokale Weboberfläche und CLI, Start aus dem Quellcode',
  },
  overflowlens: {
    task: 'Mögliche Fehlerquoten und Anteile langsamer Anfragen berechnen, wenn OpenTelemetry Anfrageattribute durch Kardinalitätsüberlauf verliert.',
    environment: 'Browser-App mit lokaler Dateiverarbeitung; eigenständiges Archiv verfügbar',
    tagline: 'Exakte Grenzen, wenn Kardinalitätsüberlauf Anfrageergebnisse verbirgt.',
    primary: 'App öffnen',
    secondary: [
      {
        label: 'Eigenständiges Archiv herunterladen',
        note: 'Die App ist im Browser verfügbar. Das Release-Archiv lässt sich auch lokal bereitstellen.',
      },
    ],
    detail: {
      summary:
        'Importiere gespeicherte OpenTelemetry-Anfragezähler oder HTTP-Dauerhistogramme und vergleiche mögliche Fehlerquoten oder Anteile langsamer Anfragen mit deinem Grenzwert. Zähler und HTTP-5xx-Histogramme unterstützen Delta-Intervalle und kumulative Fenster; Grenzen für langsame Anfragen einer Route verwenden Delta-Histogramme. Dateien werden lokal in einem Web Worker eingelesen; importierte Dateien, Grenzwerte und exportierte Berichte werden nicht hochgeladen.',
      audience: ['Entwickler, die Fehlerraten nach einem Kardinalitätsüberlauf im OpenTelemetry-SDK untersuchen.'],
      scenarios: [
        {
          title: 'Ein Delta-Intervall verstehen',
          text: 'Öffne das enthaltene Beispiel, bestätige die Annahmen und sieh, warum Grenzen von 0,1 % bis 10 % keine Entscheidung über einen Grenzwert von 1 % erlauben.',
        },
        {
          title: 'Kumulative Snapshots vergleichen',
          text: 'Wähle Vorher- und Nachher-Exporte derselben durchgängigen Zählerhistorie. Die Browser-Distribution enthält ein synthetisches Paar aus dem SDK-Labor.',
        },
      ],
      media: [
        {
          caption: 'Dokumentiertes Ergebnis des synthetischen Delta-Beispiels bei 1 % Grenzwert; keine Messung eines Produktivsystems.',
        },
      ],
      support: [
        {
          platform: 'Moderner Webbrowser',
          note: 'Statische Anwendung auf GitHub Pages; das eigenständige Archiv erfordert einen HTTP-Server statt file://.',
        },
      ],
      limitations: [
        'Akzeptiert unkomprimiertes UTF-8-OTLP-JSON mit monotonen ganzzahligen Sum-Zählern und unterstützten HTTP-Dauerhistogrammen mit expliziten Bucket-Grenzen, bis 5 MiB pro Datei. Kein Backend für Live-Metriken und keine allgemeine SLO-Auswertung.',
        'Kumulative Fenster erfordern passende vollständige Snapshots mit stabiler Zuordnung, bekannten unveränderten Startzeiten, ohne Resets oder fallende Zähler.',
        'Annahmen zur Herkunft müssen bestätigt werden. Eine Datei beweist nicht, dass die Verarbeitung alle Zählwerte und Überlaufpunkte erhalten hat.',
      ],
      firstRun: [
        'Öffne die App und wähle das Delta- oder kumulative Beispiel. SDK und eigene Dateien sind nicht nötig.',
        'Lade für einen eigenständigen Build das Release-ZIP herunter, entpacke es und starte einen statischen HTTP-Server im Verzeichnis overflowlens-<version>:',
        'Öffne http://127.0.0.1:8080, wähle den Modus, bestätige die Herkunftsannahmen und setze den maximalen Fehlerprozentsatz. Exportiere JSON, um die Erklärung zu speichern.',
      ],
      downloadSteps: {
        standalone: ['Entpacke das ZIP und stelle seinen Ordner per HTTP bereit. Node.js und Go sind nicht nötig.'],
      },
    },
  },
  colophon: {
    task: 'Eine Buchbibliothek, Leseliste, Lesehistorie und Statistiken in gewöhnlichen Obsidian-Notizen führen.',
    environment: 'Obsidian 1.9.10+ und Dataview mit JavaScript-Abfragen; unter macOS getestet',
  },
  inkdoze: {
    task: 'Bilder lokal im Browser in Ruhebildschirme für E-Reader zuschneiden und umwandeln, mit Installationshinweisen für jedes Modell.',
    environment: 'Moderner Browser; Bildverarbeitung bleibt auf dem Gerät; eigene Ruhebildschirme hängen von Gerät und Firmware ab',
  },
  rangeprobe: {
    task: 'HTTP-Antworten auf Bytebereichsanfragen prüfen und Teil-Downloads mit einer lokalen Datei vergleichen, um Fehler beim Springen und Fortsetzen zu finden.',
    environment: 'Eigenständige CLI für macOS, Linux und Windows (amd64/arm64); Browserseite über einen lokalen Server',
  },
  agentkcal: {
    task: 'Einen privaten, lokalen Verlauf der Nutzung von KI-Coding-Agenten führen, mit nachvollziehbaren Energieschätzungen.',
    environment: 'CLI für Node.js 24.12+',
  },
  'ultimate-geography': {
    name: 'Ultimate Geography (RU/EN-Fork)',
    task: 'Weltgeografie in Anki lernen: Stapel in sieben Sprachen, belegte Korrekturen und Ausspracheangaben.',
    environment: 'Anki-Stapelpakete',
    forkNote: 'Fork des Community-Stapels Ultimate Geography mit lokalisierten Ausgaben und Korrekturen.',
  },
  'breathly-app': {
    name: 'Breathly (Fork)',
    task: 'Atemübungen unter Android; dieser Fork ergänzt Vorlagen, eine Startverzögerung und den Export nach Health Connect.',
    environment: 'Test-APK für Android 8.0+ (2.3.0-rc.1); keine stabile Version in diesem Fork',
    forkNote: 'Fork mit zusätzlichen Funktionen; ein signierter Android-Release-Kandidat ist zum Testen veröffentlicht.',
  },
};
