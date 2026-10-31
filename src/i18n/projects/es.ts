import type { ProjectTexts } from './types.ts';

export const es: ProjectTexts = {
  spacemosaic: {
    task: 'Descubre qué ocupa espacio en una carpeta con un mapa de tamaños, sin borrar ni cambiar nada.',
    environment: 'App de escritorio; APK para Android 8.0+; iOS requiere tu propia firma',
    tagline: 'Un mapa de espacio de solo lectura, carpeta a carpeta.',
    primary: 'Descargar SpaceMosaic',
    downloadNote:
      'Las compilaciones de iOS se publican solo para desarrolladores: la del dispositivo debe firmarse en Xcode y la del simulador no funciona en un iPhone.',
  },
  'cambridge-dictionary-audio': {
    task: 'Guarda la pronunciación estadounidense y británica de palabras inglesas en MP3, con AFI, definiciones y exportación a Anki.',
    environment: 'App de escritorio, app de terminal, extensión de Chrome/Firefox, CLI de Python',
    tagline: 'Audios de pronunciación para tarjetas y práctica auditiva.',
    primary: 'Descargar la app de escritorio',
    secondary: [{ label: 'Instalar la CLI desde PyPI' }],
    forkNote:
      'Fork independiente con mucho desarrollo propio: aquí se añadieron las apps de escritorio, terminal y móviles, las extensiones del navegador y la exportación a Anki.',
    downloadNote:
      'Las compilaciones de Android e iOS se publican solo para pruebas y desarrollo: los APK de Android son una compilación de depuración y otra sin firmar, y los archivos de iOS requieren tu propia firma. Aquí no se ofrecen como instalación normal.',
  },
  margincarry: {
    task: 'Lleva tus resaltados y subrayados de Zotero a una nueva revisión del mismo PDF, revisando cada uno antes de escribirlo.',
    environment: 'Zotero 10.0.5 o una versión 10.0.x posterior (escritorio)',
    tagline: 'Conserva tus notas de lectura cuando un artículo tiene una nueva versión.',
    primary: 'Descargar el complemento de Zotero',
  },
  batterybridge: {
    task: 'Fija un límite de carga y un calendario de cuidado de la batería del portátil donde el hardware lo permita, y ve qué controles admite tu equipo.',
    environment: 'Portátil con una interfaz de control de carga compatible; permisos de administrador para instalar el servicio',
    tagline: 'Límites de carga a tu manera, dentro de lo que permite tu hardware.',
    primary: 'Descargar BatteryBridge',
  },
  'form-forge': {
    task: 'Ejecuta tu propio servicio de formularios: publica formularios con versiones, guarda respuestas en PostgreSQL y envíalas a webhooks firmados.',
    environment: 'Autoalojado: Node.js, PostgreSQL, Inngest; Docker Compose o Netlify',
    tagline: 'Una plataforma de formularios autoalojada con entregas que se pueden inspeccionar.',
    primary: 'Empezar',
    secondary: [
      {
        label: 'Abrir la instancia pública',
        note: 'Requiere iniciar sesión con GitHub, Google o GitLab. No hay un nivel de servicio publicado.',
      },
    ],
  },
  dbreduce: {
    task: 'Reduce una base de datos PostgreSQL a las pocas filas y tablas que todavía reproducen una prueba fallida.',
    environment: 'Python 3.10–3.15; PostgreSQL 13–18 con pg_dump, pg_restore y psql de la misma versión',
    tagline: 'De un volcado del tamaño de producción a un informe de error adjuntable.',
    primary: 'Empezar',
  },
  lanpair: {
    task: 'Averigua por qué dos dispositivos de la misma red no se ven, con datos recogidos en ambos lados.',
    environment: 'Se ejecuta en ambos dispositivos; escritorio sin firmar, Android solo de prueba, iOS desde el código',
  },
  cineclue: {
    task: 'Juego diario de deducción sobre cine: adivina una película por las personas, lugares y estudios que comparte.',
    environment: 'Navegador web',
  },
  harmonia: {
    task: 'Importa listas de Spotify, YouTube Music o Yandex Music, empareja canciones entre catálogos y crea listas por reglas en tu propio servidor.',
    environment: 'Autoalojado: Python 3.10–3.15 con PostgreSQL y Redis',
  },
  printwitness: {
    task: 'Comprueba que el texto, las filas de tablas y los enlaces necesarios sobreviven a una exportación de HTML a PDF.',
    environment: 'App de escritorio independiente (incluye Chromium); sin firmar',
  },
  txnstage: {
    task: 'Avanza paso a paso por transacciones reales de SQLite en varias conexiones y observa dónde se bloquean o pierden datos.',
    environment: 'Un único ejecutable con interfaz web local; binarios de macOS sin firmar',
  },
  collationdelta: {
    task: 'Detecta cambios en la ordenación y la igualdad de cadenas antes de actualizar ICU, Python o Node.js.',
    environment: 'CLI de Python; capturas de comparadores de Python o Node.js',
  },
  parquetscope: {
    task: 'Mira qué rangos de bytes lee DuckDB de un archivo Parquet por HTTP y cómo cambian según la estructura del archivo.',
    environment: 'Python 3.10+; wheel desde GitHub Releases',
  },
  'gha-cache-audit': {
    task: 'Encuentra claves de caché y prefijos de restauración de GitHub Actions que pueden reutilizar archivos incompatibles.',
    environment: 'CLI de Python 3.11+, solo análisis estático',
  },
  samebyte: {
    task: 'Comprueba que un workflow de GitHub Actions prueba, analiza y despliega exactamente los mismos bytes de la imagen de contenedor.',
    environment: 'CLI de Node.js 22+, instalada desde el archivo de la versión',
  },
  lockcone: {
    task: 'Explica qué cambios del lockfile de pnpm se deben a las dependencias que realmente cambiaste.',
    environment: 'CLI de Node.js 22.12+, instalada desde el archivo de la versión',
  },
  cursorproof: {
    task: 'Prueba la paginación por cursor de una API REST en busca de registros omitidos, repetidos o desordenados.',
    environment: 'CLI de Python',
  },
  cancellens: {
    task: 'Convierte errores de cancelación de asyncio en pruebas reproducibles que comprueban que se liberan los recursos.',
    environment: 'Biblioteca de Python y complemento de pytest',
  },
  crondelta: {
    task: 'Compara cuándo dispararían una programación dos bibliotecas cron de Python, o dos versiones, antes de cambiar.',
    environment: 'CLI de Python',
  },
  stalefill: {
    task: 'Reproduce carreras de cache-aside en las que datos obsoletos reaparecen en Redis o Valkey tras una actualización.',
    environment: 'Binarios CLI; necesita un Redis o Valkey desechable',
  },
  exitscope: {
    task: 'Comprueba que un envoltorio o ejecutor de tareas se cierra limpiamente: sin procesos hijos vivos ni tuberías abiertas.',
    environment: 'Solo Linux; compilación con Cargo',
  },
  unpackproof: {
    task: 'Pruebas de regresión de comandos de extracción TAR en contenedores Docker desechables.',
    environment: 'CLI de Go; necesita Docker',
  },
  bindwitness: {
    task: 'Verifica qué biblioteca compartida proporciona realmente tus símbolos nativos en Linux.',
    environment: 'Linux con glibc; binarios para amd64 y arm64',
  },
  protocarry: {
    task: 'Comprueba que una aplicación antigua conserva los campos nuevos de Protobuf al leer y escribir un mensaje.',
    environment: 'Binarios CLI para macOS arm64 y Linux arm64; código en Go',
  },
  idbshift: {
    task: 'Comprueba si los datos de IndexedDB sobreviven a una actualización de la app, una reversión y una segunda actualización.',
    environment: 'Node.js con Playwright Chromium; se ejecuta desde el código',
  },
  watchconverge: {
    task: 'Comprueba si un vigilante de archivos o un índice sigue coincidiendo con el disco tras guardados atómicos, renombrados y borrados.',
    environment: 'Node.js 22.18+; se ejecuta desde el código',
  },
  overflowlens: {
    task: 'Calcula la tasa de error posible cuando OpenTelemetry ha fusionado atributos de peticiones en una serie de desbordamiento.',
    environment: 'App estática para el navegador servida en local; los archivos no salen de tu equipo',
  },
  agentkcal: {
    task: 'Guarda un historial local y privado del uso de agentes de IA para programar, con estimaciones de energía transparentes.',
    environment: 'CLI de Node.js 24.12+',
  },
  'ultimate-geography': {
    name: 'Ultimate Geography (fork RU/EN)',
    task: 'Estudia geografía mundial en Anki con mazos en siete idiomas, correcciones con fuentes y guías de pronunciación.',
    environment: 'Paquetes de mazos de Anki',
    forkNote: 'Fork del mazo comunitario Ultimate Geography con ediciones localizadas y correcciones.',
  },
  'breathly-app': {
    name: 'Breathly (fork)',
    task: 'Ejercicios de respiración en Android, con ajustes predefinidos, retardo de inicio y exportación a Health Connect añadidos en este fork.',
    environment: 'App de React Native; este fork no tiene versiones publicadas',
    forkNote: 'Fork con funciones adicionales; aquí no se publica ninguna compilación.',
  },
};
