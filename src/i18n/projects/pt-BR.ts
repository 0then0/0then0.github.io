import type { ProjectTexts } from './types.ts';

export const ptBR: ProjectTexts = {
  spacemosaic: {
    task: 'Descubra o que ocupa espaço em uma pasta com um mapa de tamanhos, sem apagar nem alterar nada.',
    environment: 'App para desktop; APK para Android 8.0+; iOS exige sua própria assinatura',
    tagline: 'Um mapa de espaço somente leitura, pasta por pasta.',
    primary: 'Baixar o SpaceMosaic',
    downloadNote:
      'Os builds para iOS são publicados só para desenvolvedores: o build para dispositivo precisa ser assinado no Xcode, e o do simulador não roda em iPhone.',
  },
  'cambridge-dictionary-audio': {
    task: 'Salve a pronúncia americana e britânica de palavras em inglês como MP3, com IPA, definições e exportação para o Anki.',
    environment: 'App para desktop, app de terminal, extensão do Chrome/Firefox, CLI em Python',
    tagline: 'Áudios de pronúncia para flashcards e prática de escuta.',
    primary: 'Baixar o app para desktop',
    secondary: [{ label: 'Instalar a CLI pelo PyPI' }],
    forkNote:
      'Fork independente com bastante desenvolvimento próprio: os apps para desktop, terminal e celular, as extensões de navegador e a exportação para o Anki foram adicionados aqui.',
    downloadNote:
      'Os builds para Android e iOS são publicados só para testes e desenvolvimento: os APKs do Android são um build de depuração e um sem assinatura, e os arquivos do iOS exigem sua própria assinatura. Eles não são oferecidos aqui como instalação comum.',
  },
  margincarry: {
    task: 'Leve seus destaques e sublinhados do Zotero para uma nova revisão do mesmo PDF, revisando cada um antes de gravar.',
    environment: 'Zotero 10.0.5 ou uma versão 10.0.x posterior (desktop)',
    tagline: 'Mantenha suas anotações quando um artigo ganha uma nova versão.',
    primary: 'Baixar o plugin do Zotero',
  },
  batterybridge: {
    task: 'Defina um limite de carga e uma agenda de cuidado da bateria do notebook quando o hardware permitir, e veja quais controles o seu aparelho suporta.',
    environment: 'Notebook com interface de controle de carga compatível; permissões de administrador para instalar o serviço',
    tagline: 'Limites de carga do seu jeito, dentro do que o hardware permite.',
    primary: 'Baixar o BatteryBridge',
  },
  'form-forge': {
    task: 'Rode seu próprio serviço de formulários: publique formulários versionados, guarde as respostas no PostgreSQL e entregue-as a webhooks assinados.',
    environment: 'Auto-hospedado: Node.js, PostgreSQL, Inngest; Docker Compose ou Netlify',
    tagline: 'Uma plataforma de formulários auto-hospedada com entregas que dá para inspecionar.',
    primary: 'Começar',
    secondary: [
      {
        label: 'Abrir a instância pública',
        note: 'Exige login com GitHub, Google ou GitLab. Não há nível de serviço publicado.',
      },
    ],
  },
  dbreduce: {
    task: 'Reduza um banco PostgreSQL às poucas linhas e tabelas que ainda reproduzem um teste com falha.',
    environment: 'Python 3.10–3.15; PostgreSQL 13–18 com pg_dump, pg_restore e psql da mesma versão',
    tagline: 'De um dump do tamanho da produção a um relato de bug que dá para anexar.',
    primary: 'Começar',
  },
  lanpair: {
    task: 'Descubra por que dois dispositivos na mesma rede não se enxergam, com dados coletados dos dois lados.',
    environment: 'Roda nos dois dispositivos; desktop sem assinatura, Android só para testes, iOS a partir do código',
  },
  cineclue: {
    task: 'Jogo diário de dedução sobre cinema: adivinhe um filme pelas pessoas, lugares e estúdios em comum.',
    environment: 'Navegador',
  },
  harmonia: {
    task: 'Importe playlists do Spotify, YouTube Music ou Yandex Music, relacione faixas entre catálogos e crie playlists por regras no seu próprio servidor.',
    environment: 'Auto-hospedado: Python 3.10–3.15 com PostgreSQL e Redis',
  },
  printwitness: {
    task: 'Verifique se o texto, as linhas de tabela e os links necessários sobrevivem a uma exportação de HTML para PDF.',
    environment: 'App para desktop independente (com Chromium embutido); sem assinatura',
  },
  txnstage: {
    task: 'Execute passo a passo transações reais do SQLite em várias conexões e veja onde elas travam ou perdem dados.',
    environment: 'Um único executável com interface web local; binários para macOS sem assinatura',
  },
  collationdelta: {
    task: 'Detecte mudanças na ordenação e na igualdade de strings antes de atualizar ICU, Python ou Node.js.',
    environment: 'CLI em Python; capturas de comparadores em Python ou Node.js',
  },
  parquetscope: {
    task: 'Veja quais faixas de bytes o DuckDB lê de um arquivo Parquet via HTTP e como a estrutura do arquivo as altera.',
    environment: 'Python 3.10+; wheel do GitHub Releases',
  },
  'gha-cache-audit': {
    task: 'Encontre chaves de cache e prefixos de restauração do GitHub Actions que podem reutilizar arquivos incompatíveis.',
    environment: 'CLI em Python 3.11+, só análise estática',
  },
  samebyte: {
    task: 'Verifique se um workflow do GitHub Actions testa, analisa e publica exatamente os mesmos bytes da imagem de contêiner.',
    environment: 'CLI em Node.js 22+, instalada pelo arquivo da versão',
  },
  lockcone: {
    task: 'Explique quais mudanças no lockfile do pnpm vêm das dependências que você realmente alterou.',
    environment: 'CLI em Node.js 22.12+, instalada pelo arquivo da versão',
  },
  cursorproof: {
    task: 'Teste a paginação por cursor de uma API REST em busca de registros pulados, repetidos ou fora de ordem.',
    environment: 'CLI em Python',
  },
  cancellens: {
    task: 'Transforme bugs de cancelamento no asyncio em testes repetíveis que verificam a liberação de recursos.',
    environment: 'Biblioteca Python e plugin do pytest',
  },
  crondelta: {
    task: 'Compare quando duas bibliotecas cron do Python, ou duas versões, disparariam um agendamento antes de trocar.',
    environment: 'CLI em Python',
  },
  stalefill: {
    task: 'Reproduza condições de corrida no cache-aside em que dados antigos reaparecem no Redis ou Valkey após uma atualização.',
    environment: 'Binários CLI; precisa de um Redis ou Valkey descartável',
  },
  exitscope: {
    task: 'Verifique se um wrapper ou executor de tarefas encerra direito: sem processos filhos restantes nem pipes abertos.',
    environment: 'Só Linux; compilação com Cargo',
  },
  unpackproof: {
    task: 'Testes de regressão de comandos de extração TAR em contêineres Docker descartáveis.',
    environment: 'CLI em Go; precisa do Docker',
  },
  bindwitness: {
    task: 'Verifique qual biblioteca compartilhada fornece de fato seus símbolos nativos no Linux.',
    environment: 'Linux com glibc; binários para amd64 e arm64',
  },
  protocarry: {
    task: 'Verifique se uma aplicação antiga mantém os campos novos do Protobuf ao ler e gravar uma mensagem.',
    environment: 'Binários CLI para macOS arm64 e Linux arm64; código em Go',
  },
  idbshift: {
    task: 'Teste se os dados do IndexedDB sobrevivem a uma atualização do app, um rollback e uma segunda atualização.',
    environment: 'Node.js com Playwright Chromium; roda a partir do código',
  },
  watchconverge: {
    task: 'Verifique se um observador de arquivos ou índice ainda corresponde ao disco após gravações atômicas, renomeações e exclusões.',
    environment: 'Node.js 22.18+; roda a partir do código',
  },
  overflowlens: {
    task: 'Calcule a taxa de erro possível quando o OpenTelemetry juntou atributos de requisições em uma série de overflow.',
    environment: 'App estático para navegador servido localmente; os arquivos ficam no seu computador',
  },
  agentkcal: {
    task: 'Mantenha um histórico local e privado do uso de agentes de IA para programar, com estimativas de energia que você pode conferir.',
    environment: 'CLI em Node.js 24.12+',
  },
  'ultimate-geography': {
    name: 'Ultimate Geography (fork RU/EN)',
    task: 'Estude geografia mundial no Anki com baralhos em sete idiomas, correções com fontes e guias de pronúncia.',
    environment: 'Pacotes de baralhos do Anki',
    forkNote: 'Fork do baralho comunitário Ultimate Geography com edições localizadas e correções.',
  },
  'breathly-app': {
    name: 'Breathly (fork)',
    task: 'Exercícios de respiração no Android; este fork adiciona predefinições, atraso de início e exportação para o Health Connect.',
    environment: 'App em React Native; este fork não tem versões publicadas',
    forkNote: 'Fork com recursos adicionais; nenhum build é publicado aqui.',
  },
};
