import type { ProjectTexts } from './types.ts';

export const de: ProjectTexts = {
  spacemosaic: {
    task: 'Sehen, was in einem Ordner Platz belegt – als Größenkarte, ohne etwas zu löschen oder zu ändern.',
    environment: 'Desktop-App; APK für Android 8.0+; iOS erfordert eine eigene Signatur',
    tagline: 'Eine Speicherkarte nur zum Lesen, Ordner für Ordner.',
    primary: 'SpaceMosaic herunterladen',
    downloadNote:
      'iOS-Builds sind nur für Entwickler veröffentlicht: Der Geräte-Build muss in Xcode signiert werden, der Simulator-Build läuft nicht auf einem iPhone.',
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
  },
  margincarry: {
    task: 'Zotero-Hervorhebungen und Unterstreichungen in eine neue Fassung desselben PDF übernehmen und jede vor dem Schreiben prüfen.',
    environment: 'Zotero 10.0.5 oder eine neuere 10.0.x-Version (Desktop)',
    tagline: 'Lesenotizen behalten, wenn ein Artikel eine neue Fassung bekommt.',
    primary: 'Zotero-Plugin herunterladen',
  },
  batterybridge: {
    task: 'Ladegrenze und Akkupflege-Zeitplan für den Laptop festlegen, soweit die Hardware es erlaubt, und sehen, welche Funktionen das Gerät unterstützt.',
    environment: 'Laptop mit unterstützter Ladesteuerung; Administratorrechte für die Installation des Dienstes',
    tagline: 'Ladegrenzen nach Ihren Regeln – im Rahmen Ihrer Hardware.',
    primary: 'BatteryBridge herunterladen',
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
  },
  dbreduce: {
    task: 'Eine PostgreSQL-Datenbank auf die wenigen Zeilen und Tabellen verkleinern, mit denen ein Test weiterhin fehlschlägt.',
    environment: 'Python 3.10–3.15; PostgreSQL 13–18 mit passenden pg_dump, pg_restore und psql',
    tagline: 'Vom Dump in Produktionsgröße zum Fehlerbericht zum Anhängen.',
    primary: 'Loslegen',
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
    task: 'Prüfen, ob benötigter Text, Tabellenzeilen und Links einen HTML-zu-PDF-Export überstehen.',
    environment: 'Eigenständige Desktop-App (mit Chromium); nicht signiert',
  },
  txnstage: {
    task: 'Echte SQLite-Transaktionen auf mehreren Verbindungen schrittweise ausführen und sehen, wo sie blockieren oder Daten verlieren.',
    environment: 'Einzelne ausführbare Datei mit lokaler Weboberfläche; macOS-Binärdateien nicht signiert',
  },
  collationdelta: {
    task: 'Änderungen an Sortierung und Gleichheit von Zeichenketten erkennen, bevor ICU, Python oder Node.js aktualisiert werden.',
    environment: 'Python-CLI; Aufnahmen aus Python- oder Node.js-Vergleichern',
  },
  parquetscope: {
    task: 'Sehen, welche Byte-Bereiche DuckDB über HTTP aus einer Parquet-Datei liest und wie das Dateilayout sie verändert.',
    environment: 'Python 3.10+; Wheel aus GitHub Releases',
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
    task: 'Erklären, welche Änderungen am pnpm-Lockfile aus den tatsächlich geänderten Abhängigkeiten folgen.',
    environment: 'CLI für Node.js 22.12+, Installation aus dem Release-Archiv',
  },
  cursorproof: {
    task: 'Die Cursor-Paginierung einer REST-API auf übersprungene, doppelte oder falsch sortierte Datensätze testen.',
    environment: 'Python-CLI',
  },
  cancellens: {
    task: 'Abbruchfehler in asyncio in wiederholbare Tests verwandeln, die prüfen, ob Ressourcen freigegeben werden.',
    environment: 'Python-Bibliothek und pytest-Plugin',
  },
  crondelta: {
    task: 'Vor einem Wechsel vergleichen, wann zwei Python-Cron-Bibliotheken oder -Versionen einen Zeitplan auslösen.',
    environment: 'Python-CLI',
  },
  stalefill: {
    task: 'Cache-Aside-Wettläufe reproduzieren, bei denen veraltete Daten nach einem Update in Redis oder Valkey wieder auftauchen.',
    environment: 'CLI-Binärdateien; braucht ein Wegwerf-Redis oder -Valkey',
  },
  exitscope: {
    task: 'Prüfen, ob ein Wrapper oder Task-Runner sauber beendet: keine überlebenden Kindprozesse, keine offenen Pipes.',
    environment: 'Nur Linux; Build mit Cargo',
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
    environment: 'CLI-Binärdateien für macOS arm64 und Linux arm64; Go-Quellcode',
  },
  idbshift: {
    task: 'Testen, ob IndexedDB-Daten ein App-Update, einen Rollback und ein zweites Update überstehen.',
    environment: 'Node.js mit Playwright Chromium; Start aus dem Quellcode',
  },
  watchconverge: {
    task: 'Prüfen, ob ein Dateiwächter oder Index nach atomarem Speichern, Umbenennen und Löschen noch zur Festplatte passt.',
    environment: 'Node.js 22.18+; Start aus dem Quellcode',
  },
  overflowlens: {
    task: 'Die mögliche Fehlerrate berechnen, wenn OpenTelemetry Anfrageattribute in eine Overflow-Reihe zusammengefasst hat.',
    environment: 'Statische Browser-App, lokal ausgeliefert; Dateien bleiben auf Ihrem Rechner',
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
    environment: 'React-Native-App; dieser Fork hat keine veröffentlichte Version',
    forkNote: 'Fork mit zusätzlichen Funktionen; hier wird kein Build veröffentlicht.',
  },
};
