import type { ProjectTexts } from './types.ts';

export const es: ProjectTexts = {
  spacemosaic: {
    task: 'Descubre qué ocupa espacio en una carpeta con un mapa de tamaños, sin borrar ni cambiar nada.',
    environment: 'App de escritorio; APK para Android 8.0+; iOS requiere tu propia firma',
    tagline: 'Un mapa de espacio de solo lectura, carpeta a carpeta.',
    primary: 'Descargar SpaceMosaic',
    downloadNote:
      'Las compilaciones de iOS se publican solo para desarrolladores: la del dispositivo debe firmarse en Xcode y la del simulador no funciona en un iPhone.',
    detail: {
      summary:
        'Elige una carpeta y SpaceMosaic muestra cómo se reparte su tamaño: un árbol, un mapa de rectángulos, los archivos más grandes y un resumen por tipo. Puedes abrir resultados JSON guardados sin volver a leer la carpeta o compararlos con un análisis nuevo. Solo lee metadatos, nunca el contenido de los archivos, y no incluye acciones de borrado o limpieza.',
      audience: [
        'Personas que se están quedando sin espacio y quieren localizar las carpetas grandes antes de decidir qué borrar.',
        'Quienes necesitan un informe del tamaño de una carpeta en JSON o CSV.',
        'Quienes desconfían de las herramientas de limpieza: ninguna acción elimina archivos.',
      ],
      scenarios: [
        {
          title: 'Localizar las carpetas grandes',
          text: 'Analiza un proyecto, Descargas o una carpeta multimedia y sigue los rectángulos más grandes del mapa. Haz doble clic en una carpeta para ampliarla; los elementos pequeños se agrupan en una lista con búsqueda.',
        },
        {
          title: 'Distinguir lo desconocido del tamaño cero',
          text: 'Las carpetas ilegibles y los tamaños desconocidos se indican como desconocidos, no como 0 B. El tamaño lógico y el espacio asignado aparecen por separado; los análisis parciales explican por qué lo son.',
        },
        {
          title: 'Guardar y comparar resultados',
          text: 'Exporta JSON con versión de formato, ábrelo después y compara la misma carpeta con un análisis nuevo. Las comparaciones separan los cambios confirmados de los desconocidos; los cambios de nombre aparecen como elementos ausentes y añadidos. Los informes contienen nombres y rutas: revísalos antes de compartirlos.',
        },
      ],
      media: [
        {
          alt: 'SpaceMosaic en macOS tras analizar node_modules: un total de 165,4 MiB y 16 tamaños desconocidos, un árbol ordenado por tamaño y un mapa de colores con rectángulos para las carpetas de paquetes más grandes.',
          caption: 'SpaceMosaic 0.1.2 en macOS, analizando las dependencias de este sitio. Captura realizada para este catálogo.',
        },
      ],
      support: [
        {
          platform: 'macOS, Apple Silicon',
          note: 'El repositorio recoge una comprobación de ejecución en macOS arm64; no se repitió al revisar este catálogo. No hay versión para Intel.',
        },
        {
          platform: 'Android 8.0+',
          note: 'Un informe anterior de un usuario describe un funcionamiento relativamente estable en un Pixel 8 con Android 17. No se han comprobado en ejecución la firma, las actualizaciones sobre una instalación existente, los lectores de pantalla ni todos los proveedores de almacenamiento.',
        },
        {
          platform: 'Windows x86-64',
          note: 'Se compila en CI. Una versión alfa anterior se probó en Windows 11; las correcciones posteriores aún requieren comprobación allí.',
        },
        {
          platform: 'Linux x86-64',
          note: 'Compilado en Ubuntu 24.04; su ejecución sigue siendo experimental. Los archivos portátiles requieren bibliotecas del sistema compatibles.',
        },
        {
          platform: 'iOS 16+',
          note: 'Solo hay una compilación experimental sin firma para dispositivos y otra para el simulador. Instalarla en un iPhone requiere Xcode, un equipo de desarrollo y firma.',
        },
      ],
      limitations: [
        'Mide la carpeta elegida, no todo el disco. El tamaño no garantiza cuánto espacio se recuperaría al borrarla: influyen los enlaces duros, los clones APFS y la compresión.',
        'En escritorio, el análisis se detiene en 500.000 objetos o unos 256 MiB de metadatos; en móvil, en 100.000 objetos. El resultado queda marcado como parcial.',
        'Las versiones de Windows y macOS no llevan certificado de editor; la de macOS usa firma ad-hoc y no está notarizada.',
        'No se siguen enlaces simbólicos ni puntos de reanálisis de Windows.',
      ],
      firstRun: [
        'Instala la versión de tu sistema desde la sección de descargas.',
        'macOS puede bloquear el primer inicio porque la aplicación no está notarizada. Autorízalo en Ajustes del Sistema, Privacidad y seguridad.',
        'Elige una carpeta con el botón, arrástrala a la ventana o pasa una ruta por la línea de comandos:',
        'Sigue los rectángulos más grandes. Selecciona uno para ver sus detalles o abre las secciones de archivos más grandes y tipos de archivo.',
      ],
      downloadSteps: {
        'macos-dmg': [
          'Abre el DMG y arrastra SpaceMosaic.app a Aplicaciones.',
          'Si macOS bloquea el primer inicio, autorízalo en Ajustes del Sistema, Privacidad y seguridad.',
        ],
        'macos-zip': ['Extrae el archivo y abre spacemosaic-darwin-arm64/SpaceMosaic.app.'],
        'windows-setup': [
          'Ejecuta el instalador. Instala para el usuario actual sin permisos de administrador.',
          'Windows puede advertir que la aplicación es desconocida porque el instalador no tiene firma Authenticode.',
        ],
        'windows-zip': ['Extrae todo el archivo y ejecuta spacemosaic.exe.'],
        'linux-deb': ['Instala con apt para resolver las dependencias: sudo apt install ./spacemosaic-linux-x86_64.deb'],
        'linux-tar': ['Extrae el archivo y ejecuta spacemosaic. Se necesitan bibliotecas del sistema compatibles.'],
        'android-apk': [
          'Permite instalar desde el navegador o gestor de archivos y abre el APK.',
          'Si antes instalaste un APK de depuración alpha.2 o alpha.3, desinstálalo primero: los certificados de firma son distintos.',
        ],
        'ios-device': ['No es un IPA instalable. Firma la compilación en Xcode con tu propio equipo de desarrollo.'],
        'ios-simulator': ['Solo para el simulador de iOS en un Mac con Apple Silicon.'],
      },
    },
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
    detail: {
      summary:
        'Busca una palabra o expresión inglesa, elige su significado, escucha la grabación estadounidense o británica y guárdala como MP3. Las palabras guardadas forman una pequeña colección sin conexión que puedes exportar a Anki como un mazo con audio. Es una herramienta independiente, no un producto oficial de Cambridge; el contenido del diccionario está sujeto a las condiciones de su sitio.',
      audience: [
        'Estudiantes de inglés que crean sus propios mazos de Anki.',
        'Docentes que preparan material de escucha con variantes estadounidenses y británicas.',
        'Quienes prefieren una carpeta local con pronunciaciones a una pestaña del navegador.',
      ],
      scenarios: [
        {
          title: 'Guardar palabras al leer',
          text: 'Introduce una palabra, comprueba la transcripción IPA y la definición, escúchala y guarda el significado. Puedes guardar ambos acentos de una misma palabra.',
        },
        {
          title: 'Crear un mazo de Anki',
          text: 'Exporta la colección a un archivo .apkg con plantilla de tarjeta, audio y notas sobre la fuente. Una nueva exportación actualiza las tarjetas existentes en vez de duplicarlas.',
        },
        {
          title: 'Descargar audio desde el diccionario',
          text: 'La extensión de Chrome o Firefox descarga la grabación de la página del diccionario abierta, sin la aplicación de escritorio.',
        },
      ],
      media: [
        {
          alt: 'Cambridge Dictionary Audio en macOS tras buscar «lighthouse»: transcripción estadounidense, dos acepciones de sustantivo con la primera seleccionada y botones para reproducir, editar la traducción y guardar el significado.',
          caption:
            'Aplicación de escritorio en macOS, ejecutada desde el código de la versión 1.0.1, después de buscar una palabra. Captura realizada para este catálogo.',
        },
      ],
      support: [
        {
          platform: 'Windows 10+, macOS 14+, Linux x86-64 (glibc 2.34+)',
          note: 'Los instaladores y versiones portátiles de escritorio se generan y comprueban en CI. No tienen certificado de editor; las compilaciones de macOS no están notarizadas.',
        },
        {
          platform: 'CLI de Python',
          note: 'Python de 3.10 a 3.15. Publicado en PyPI sin interfaz gráfica de escritorio.',
        },
        {
          platform: 'Chrome y Firefox',
          note: 'Extensiones en ZIP para cargar sin empaquetar; no están publicadas en las tiendas de los navegadores.',
        },
        {
          platform: 'Android 9+',
          note: 'Solo se publican un APK de depuración para pruebas y un APK sin firma. No consta una prueba en un dispositivo físico.',
        },
        {
          platform: 'iOS 17+',
          note: 'Archivo sin firma para dispositivos y compilación para simulador. Instalar requiere firma y aprovisionamiento propios.',
        },
      ],
      limitations: [
        'Las grabaciones, transcripciones IPA y definiciones proceden de dictionary.cambridge.org y están sujetas a sus condiciones; la licencia del proyecto no cubre ese contenido.',
        'Las traducciones del diccionario solo están disponibles en ruso. La interfaz tiene siete idiomas.',
        'La síntesis de expresiones une grabaciones de palabras sueltas; no es una grabación de la expresión completa.',
        'Aún no hay una versión móvil lista para una instalación normal.',
      ],
      firstRun: [
        'Instala la versión de escritorio para tu sistema. En macOS y Windows, confirma el aviso de aplicación sin firma.',
        'Escribe una palabra o expresión y pulsa Buscar. Elige un significado y un acento, y pulsa Reproducir.',
        'Pulsa Guardar significado. Los archivos van a «Cambridge Dictionary Audio» en Descargas, salvo que elijas otra carpeta.',
        'Si prefieres la terminal, instala la CLI y guarda una grabación con un comando:',
      ],
      downloadSteps: {
        'windows-setup': ['Ejecuta el instalador. Windows puede advertir que no tiene firma de editor.'],
        'windows-zip': ['Extrae el archivo y ejecuta la aplicación desde la carpeta extraída.'],
        'macos-arm-dmg': [
          'Abre el DMG y arrastra la aplicación a Aplicaciones.',
          'La compilación no está notarizada; autoriza el primer inicio en Ajustes del Sistema, Privacidad y seguridad.',
        ],
        'macos-intel-dmg': [
          'Abre el DMG y arrastra la aplicación a Aplicaciones.',
          'La compilación no está notarizada; autoriza el primer inicio en Ajustes del Sistema, Privacidad y seguridad.',
        ],
        'macos-arm-pkg': ['Abre el paquete y sigue el instalador.'],
        'macos-intel-pkg': ['Abre el paquete y sigue el instalador.'],
        'linux-deb': ['Instala con el gestor de paquetes, por ejemplo: sudo apt install ./cambridge-dictionary-audio_*_amd64.deb'],
        'linux-rpm': ['Instala con el gestor de paquetes, por ejemplo: sudo dnf install ./cambridge-dictionary-audio-*.x86_64.rpm'],
        'linux-tar': ['Extrae el archivo y ejecuta la aplicación desde la carpeta extraída.'],
        chrome: ['Extrae el ZIP, abre chrome://extensions, activa el modo de desarrollador y elige Cargar descomprimida.'],
        firefox: [
          'Abre about:debugging, elige Cargar complemento temporal y selecciona manifest.json. Firefox elimina los complementos temporales al reiniciarse.',
        ],
        'android-debug': ['Usa un certificado de desarrollo. Solo para pruebas.'],
        'android-unsigned': ['Debe firmarse antes de instalarlo.'],
        'ios-device': ['Requiere firma y perfil de aprovisionamiento propios.'],
        'ios-simulator': ['Solo funciona en el simulador de iOS.'],
      },
    },
  },
  margincarry: {
    task: 'Lleva tus resaltados y subrayados de Zotero a una nueva revisión del mismo PDF, revisando cada uno antes de escribirlo.',
    environment: 'Zotero 10.0.5 o una versión 10.0.x posterior (escritorio)',
    tagline: 'Conserva tus notas de lectura cuando un artículo tiene una nueva versión.',
    primary: 'Descargar el complemento de Zotero',
    detail: {
      summary:
        'Cuando se revisa un preprint o informe, las anotaciones quedan en el PDF antiguo. MarginCarry busca cada pasaje resaltado en la nueva versión, muestra juntas las posiciones antiguas y propuestas y solo escribe las que aceptas. Los originales no se modifican y cada transferencia se puede deshacer.',
      audience: [
        'Investigadores y estudiantes que anotan artículos en Zotero y reciben versiones actualizadas.',
        'Revisores que necesitan contrastar sus notas con un manuscrito revisado.',
      ],
      scenarios: [
        {
          title: 'Pasar los resaltados a la versión 2',
          text: 'Adjunta el nuevo PDF al mismo elemento de Zotero, abre MarginCarry y acepta las propuestas que correspondan. Los comentarios, colores y etiquetas acompañan a la copia.',
        },
        {
          title: 'Detectar los cambios',
          text: 'Una cita que ya no existe se indica como no encontrada. Un número cambiado de 41,0 a 41,2 no se traslada al número nuevo.',
        },
        {
          title: 'Deshacer una transferencia',
          text: 'Cada transferencia se registra localmente. Deshacer envía a la papelera de Zotero solo las copias de esa transferencia.',
        },
      ],
      media: [
        {
          alt: 'Ventana de revisión de MarginCarry: lista de anotaciones con candidatos únicos, dudosos y múltiples; vistas de las páginas PDF de origen y destino una junto a otra para el resaltado seleccionado.',
          caption: 'Ventana de revisión con un PDF de prueba. Imagen del repositorio de MarginCarry (Apache-2.0).',
        },
      ],
      support: [
        {
          platform: 'Zotero 10.0.x en macOS',
          note: 'Las comprobaciones históricas en Zotero 10.0.7/macOS cubrieron los siete idiomas de interfaz y 45 casos de PDF reales en seis idiomas distintos del inglés. El código probado de la v0.1.2 no publicada llegó a v0.2.0 cambiando solo la versión del manifiesto; no se repitió el corpus fijado de v0.1.0.',
        },
        {
          platform: 'Zotero 10.0.x en Windows y Linux',
          note: 'Se espera que funcione como complemento de Zotero, pero no se ha comprobado.',
        },
      ],
      limitations: [
        'Solo resaltados y subrayados nativos contenidos en una página. No transfiere tinta, imágenes, notas ni anotaciones de varias páginas.',
        'Solo bibliotecas personales y dos PDF adjuntos al mismo elemento. Sin bibliotecas de grupo ni EPUB.',
        'La coincidencia es exacta, sin búsqueda aproximada ni OCR. Los PDF escaneados sin capa de texto se identifican como tales.',
        'Usa API internas del lector de Zotero; una versión futura de Zotero puede requerir una actualización.',
      ],
      firstRun: [
        'Descarga el archivo .xpi. En Zotero, abre Herramientas y Complementos; en el menú del engranaje elige instalar desde un archivo y selecciónalo.',
        'Añade la nueva versión del PDF al mismo elemento que la anterior.',
        'En Herramientas, abre MarginCarry para transferir anotaciones PDF, comprueba el PDF antiguo y el nuevo y busca propuestas.',
        'Compara cada propuesta, acéptala u omítela, aplica las seleccionadas y confirma.',
      ],
      downloadSteps: {
        xpi: [
          'En Zotero: Herramientas, Complementos, menú del engranaje, instalar complemento desde archivo.',
          'Reinicia Zotero si lo solicita.',
        ],
      },
    },
  },
  batterybridge: {
    task: 'Fija un límite de carga y un calendario de cuidado de la batería del portátil donde el hardware lo permita, y ve qué controles admite tu equipo.',
    environment: 'Portátil con una interfaz de control de carga compatible; permisos de administrador para instalar el servicio',
    tagline: 'Límites de carga a tu manera, dentro de lo que permite tu hardware.',
    primary: 'Descargar BatteryBridge',
    detail: {
      summary:
        'Muchos portátiles pasan el día enchufados al 100%. BatteryBridge fija un límite de carga mediante la interfaz que ofrece el portátil, lo mantiene con un servicio en segundo plano e indica si una función no está admitida o no se ha comprobado en tu dispositivo.',
      audience: [
        'Personas que dejan el portátil enchufado la mayor parte del día.',
        'Usuarios de Linux cuyo núcleo ofrece umbrales de carga y que quieren una interfaz gráfica y horarios.',
        'Quienes quieren conocer las capacidades del equipo antes de confiar el control de carga a una herramienta.',
      ],
      scenarios: [
        {
          title: 'Mantener la batería al 80%',
          text: 'Fija un límite y, si quieres, un umbral de inicio; el servicio los mantiene después de reiniciar.',
        },
        {
          title: 'Cargar antes de un viaje',
          text: 'Carga temporalmente al 100% y vuelve después al límite guardado de forma automática.',
        },
        {
          title: 'Comprobar primero la compatibilidad',
          text: 'Consulta las capacidades sin escribir cambios o exporta un informe de compatibilidad sin instalar el servicio.',
        },
      ],
      media: [
        {
          caption:
            'Comandos de la documentación. capabilities indica si cada función está admitida, es experimental, no está admitida o es desconocida, y explica el motivo. La salida depende del dispositivo, por eso no se muestra. Aún no hay una captura publicada de la aplicación actual.',
        },
      ],
      support: [
        {
          platform: 'Linux con umbrales de carga del núcleo',
          note: 'Compatibilidad genérica con sysfs charge_control_end_threshold, sin restricción de fabricante. Aún no hay informes de validación en dispositivos concretos.',
        },
        {
          platform: 'macOS 11+ (Intel y Apple Silicon)',
          note: 'Monitorización mediante IOKit. El control de carga SMC es experimental; algunos modelos pueden permitir solo monitorización.',
        },
        {
          platform: 'Windows 10/11',
          note: 'Monitorización de batería. El control de carga es experimental y solo cubre el modo de conservación de Lenovo, fijo al 80%.',
        },
      ],
      limitations: [
        'Aún no consta una validación completa de escritura en dispositivos. Trata el control de carga como experimental y observa el primer ciclo.',
        'Los controles disponibles dependen del controlador del núcleo, el firmware y la interfaz del fabricante. Aún no se han implementado controladores ASUS, Dell, HP, MSI o Acer.',
        'Los instaladores de macOS y Windows no tienen firma. Los paquetes de Linux requieren systemd y bibliotecas nativas OpenGL/EGL.',
      ],
      firstRun: [
        'Instala el paquete de tu sistema y confirma el aviso de administrador. El instalador inicia el servicio en segundo plano.',
        'Abre BatteryBridge y consulta las capacidades del dispositivo para saber qué admite tu portátil.',
        'Fija el límite de carga, por ejemplo al 80%, y aplícalo.',
        'Sin instalar nada, puedes compilar la CLI e inspeccionar el dispositivo sin escribir cambios:',
      ],
      downloadSteps: {
        'macos-pkg': [
          'Abre el paquete; macOS puede pedir permiso para un instalador sin firma.',
          'El instalador añade la aplicación y el servicio. La desinstalación se hace desde la aplicación.',
        ],
        'windows-setup': ['Ejecuta el instalador y confirma el aviso de administrador. Registra una tarea en segundo plano como SYSTEM.'],
        'linux-deb': ['sudo apt install ./BatteryBridge-linux-x86_64.deb', 'Tu cuenta debe pertenecer al grupo sudo para cambiar ajustes.'],
        'linux-rpm': [
          'sudo dnf install ./BatteryBridge-linux-x86_64.rpm',
          'Tu cuenta debe pertenecer al grupo wheel para cambiar ajustes.',
        ],
        'macos-tar': ['Solo binarios; instala el servicio manualmente siguiendo su guía.'],
        'windows-zip': ['Solo binarios; instala el servicio manualmente siguiendo su guía.'],
        'linux-tar': ['Solo binarios; instala el servicio manualmente siguiendo su guía.'],
      },
    },
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
    detail: {
      summary:
        'Define un formulario mediante un esquema, publica una versión inmutable y recoge respuestas en una página alojada, un iframe o la API pública. Cada entrega de webhook se firma y registra con sus intentos y errores para poder seguir cada respuesta. Los datos permanecen en tu base PostgreSQL.',
      audience: [
        'Equipos que quieren formularios en su infraestructura en lugar de un servicio SaaS.',
        'Desarrolladores que necesitan entrega de webhooks con reintentos y diagnóstico.',
      ],
      scenarios: [
        {
          title: 'Recoger inscripciones en tu sitio',
          text: 'Incrusta un formulario publicado con altura automática o envía respuestas desde tu interfaz a la API de envío idempotente.',
        },
        {
          title: 'Enviar respuestas a otro sistema',
          text: 'Cada respuesta llega como webhook firmado a través de un outbox transaccional, con reintentos automáticos y recuperación manual.',
        },
        {
          title: 'Cerrar la recepción a tiempo',
          text: 'Pausa el formulario, fija una hora de cierre o un límite de respuestas y muestra un mensaje de cierre propio.',
        },
      ],
      media: [
        {
          alt: 'Página inicial pública de Form Forge: el título “Forms with an inspectable delivery pipeline”, botones para abrir el espacio de trabajo y el código y tres paneles de funciones.',
          caption:
            'Página inicial de la versión pública enlazada desde el repositorio, antes de iniciar sesión. Captura realizada para este catálogo.',
        },
        {
          caption:
            'Configuración local de la guía de inicio. Requiere PostgreSQL y una aplicación GitHub OAuth; después abre localhost:3000, inicia sesión y publica un formulario.',
        },
      ],
      support: [
        {
          platform: 'Servidor propio con Docker Compose',
          note: 'Guía de producción en deploy/README.md.',
        },
        {
          platform: 'Netlify',
          note: 'La versión pública enlazada desde el repositorio funciona en Netlify.',
        },
        {
          platform: 'Participantes',
          note: 'Los formularios alojados e incrustados se abren en un navegador moderno.',
        },
      ],
      limitations: [
        'No es un SaaS alojado: tú mantienes PostgreSQL, la aplicación web y el servidor de tareas en segundo plano.',
        'El acceso usa OAuth de GitHub, Google o GitLab; no hay cuentas de correo y contraseña.',
        'No se recogen respuestas sin terminar y los paquetes del espacio de trabajo no se publican en npm.',
      ],
      firstRun: [
        'Instala Node.js (22.22.2+, 24.15.0+ o 26+), pnpm 12.10.1 y PostgreSQL, y crea una aplicación GitHub OAuth.',
        'Clona el repositorio, configura apps/web/.env, ejecuta las migraciones e inicia la aplicación:',
        'Inicia el servidor local de tareas en segundo plano en otra terminal:',
        'Abre localhost:3000, crea y publica un formulario y envía una respuesta de prueba.',
      ],
      downloadSteps: {
        source: ['Extrae el archivo y sigue la guía de inicio.'],
      },
    },
  },
  dbreduce: {
    task: 'Reduce una base de datos PostgreSQL a las pocas filas y tablas que todavía reproducen una prueba fallida.',
    environment: 'Python 3.10–3.15; PostgreSQL 13–18 con pg_dump, pg_restore y psql de la misma versión',
    tagline: 'De un volcado del tamaño de producción a un informe de error adjuntable.',
    primary: 'Empezar',
    detail: {
      summary:
        'Proporciona a DBReduce una base PostgreSQL y un comando que falle por un defecto. Elimina filas siguiendo las claves foráneas y las relaciones que declares, y conserva solo los candidatos con el mismo fallo. También puede eliminar tablas completas. El resultado es un archivo SQL pequeño que reproduce el defecto.',
      audience: [
        'Desarrolladores que necesitan un caso mínimo para un fallo dependiente de los datos.',
        'Mantenedores que reciben informes de errores que solo ocurren en una base ajena.',
      ],
      scenarios: [
        {
          title: 'Reducir un caso de prueba fallido',
          text: 'Indica una copia de la base y el comando de prueba. Reconoce el fallo por su salida o por un veredicto JSON para no aceptar otro error distinto.',
        },
        {
          title: 'Compartir un caso reproducible',
          text: 'Produce dbreduce.min.sql y un informe con números de filas y tiempos, sin la salida original de la prueba.',
        },
      ],
      media: [
        {
          caption:
            'Ejemplo del README: un oráculo pytest reconocido por su mensaje de aserción y confirmado tres veces. Escribe dbreduce.min.sql y dbreduce-report.json sin sobrescribir archivos existentes.',
        },
        {
          caption:
            'Resultado del informe de validación del proyecto: un caso de error de Wagtail reducido con un oráculo de aplicación en PostgreSQL 17 y la reducción opcional del esquema.',
        },
      ],
      support: [
        {
          platform: 'PostgreSQL 13–18',
          note: 'Aislamiento mediante instantáneas por defecto; el backend de clonación es experimental y requiere PostgreSQL 15+.',
        },
        {
          platform: 'Python 3.10–3.15',
          note: 'Se instala como herramienta independiente; tu aplicación puede usar cualquier lenguaje.',
        },
      ],
      limitations: [
        'El oráculo usa una copia desechable, pero las funciones SQL, los disparadores y los servicios externos aún pueden tener efectos secundarios. Usa comandos y volcados de confianza.',
        'Necesita un rol de base de datos con CREATEDB.',
        'DBReduce no promete un mínimo global; los informes indican cuándo no puede afirmarse la irreducibilidad local.',
      ],
      firstRun: [
        'Instala la CLI como herramienta independiente:',
        'Comprueba que la prueba lea la URL de la base de DATABASE_URL o DBREDUCE_DATABASE_URL.',
        'Ejecuta dbreduce reduce con una condición que identifique el error y adjunta dbreduce.min.sql al informe del fallo.',
      ],
      downloadSteps: {},
    },
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
    task: 'Ve qué archivos y rangos de bytes lee DuckDB de Parquet por HTTP y compara consultas o estructuras.',
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
    task: 'Sigue los cambios de dependencias, catálogos y parches de pnpm por el grafo de dependencias del workspace.',
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
    task: 'Compara ejecuciones cron antes de cambiar el motor de Python, su versión o su base de zonas horarias.',
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
    task: 'Comprueba actualizaciones y reversiones de IndexedDB, incluso con pestañas de la app antigua y nueva abiertas a la vez.',
    environment: 'Node.js 24.22.1+ de la rama 24.x, npm 11.19.1 y Playwright Chromium; se ejecuta desde el código',
  },
  watchconverge: {
    task: 'Comprueba si un vigilante de archivos o un índice sigue coincidiendo con el disco tras guardados atómicos, renombrados y borrados.',
    environment: 'Node.js 22.18+; se ejecuta desde el código',
  },
  overflowlens: {
    task: 'Calcula la tasa de error posible cuando OpenTelemetry ha fusionado atributos de peticiones en una serie de desbordamiento.',
    environment: 'App para navegador con procesamiento local; publicación pendiente, archivo autónomo disponible',
    tagline: 'Límites exactos cuando el desbordamiento de cardinalidad oculta los resultados.',
    primary: 'Abrir app (publicación pendiente)',
    secondary: [
      {
        label: 'Descargar archivo autónomo',
        note: 'La URL de la app pública está preparada, pero aún no está publicada. El archivo v0.2.1 publicado ya se puede servir en local.',
      },
    ],
    detail: {
      summary:
        'Importa un contador de solicitudes OpenTelemetry guardado y compara sus tasas de error posibles con tu umbral. Delta analiza un intervalo de recopilación; acumulativo compara instantáneas coincidentes de antes y después. Los archivos se analizan localmente en un Web Worker; los recuentos y límites se calculan en el navegador. La aplicación alojada descarga sus recursos; no sube archivos importados, umbrales ni informes exportados.',
      audience: ['Desarrolladores que investigan tasas de error tras el desbordamiento de cardinalidad del SDK OpenTelemetry.'],
      scenarios: [
        {
          title: 'Entender un intervalo delta',
          text: 'Abre el ejemplo incluido, confirma sus supuestos y observa por qué unos límites del 0,1% al 10% no permiten decidir un umbral del 1%.',
        },
        {
          title: 'Comparar instantáneas acumulativas',
          text: 'Elige exportaciones de antes y después de un mismo historial continuo del contador. La distribución de navegador preparada incluye una pareja sintética del laboratorio SDK.',
        },
      ],
      media: [
        {
          caption: 'Resultado documentado del ejemplo sintético delta incluido, con un umbral del 1%; no es una medición de producción.',
        },
      ],
      support: [
        {
          platform: 'Navegador moderno',
          note: 'Aplicación estática. La publicación en GitHub Pages está pendiente; el archivo requiere un servidor HTTP, no file://.',
        },
      ],
      limitations: [
        'Acepta UTF-8 OTLP JSON sin comprimir con contadores Sum enteros y monótonos, hasta 5 MiB por archivo. No es un backend de métricas en vivo ni un evaluador general de SLO.',
        'Las ventanas acumulativas requieren instantáneas completas coincidentes, atribución estable e inicios conocidos sin cambios, sin reinicios ni recuentos decrecientes.',
        'Hay que confirmar los supuestos sobre el origen. Un archivo no demuestra que el procesamiento haya conservado todos los recuentos y puntos de desbordamiento.',
      ],
      firstRun: [
        'Tras la publicación, abre la aplicación y elige el ejemplo delta o acumulativo. No necesitas SDK ni archivos propios.',
        'Para la versión independiente ya publicada, descarga el ZIP, extráelo e inicia un servidor HTTP estático dentro de overflowlens-0.2.1:',
        'Abre http://127.0.0.1:8080, elige un modo, confirma los supuestos de procedencia y fija el porcentaje máximo de errores. Exporta JSON para guardar la explicación.',
      ],
      downloadSteps: {
        standalone: ['Extrae el ZIP y sirve su carpeta por HTTP. No se necesitan Node.js ni Go.'],
      },
    },
  },
  agentkcal: {
    task: 'Guarda un historial local y privado del uso de agentes de IA para programar, con estimaciones de energía que puedes revisar.',
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
