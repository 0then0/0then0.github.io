import type { ProjectTexts } from './types.ts';

export const ptBR: ProjectTexts = {
  spacemosaic: {
    task: 'Descubra o que ocupa espaço em uma pasta com um mapa de tamanhos, sem apagar nem alterar nada.',
    environment: 'App para desktop; APK para Android 8.0+; iOS exige sua própria assinatura',
    tagline: 'Um mapa de espaço somente leitura, pasta por pasta.',
    primary: 'Baixar o SpaceMosaic',
    downloadNote:
      'Os builds para iOS são publicados só para desenvolvedores: o build para dispositivo precisa ser assinado no Xcode, e o do simulador não roda em iPhone.',
    detail: {
      summary:
        'Escolha uma pasta e o SpaceMosaic mostra como seu tamanho se distribui: árvore, mapa de retângulos, maiores arquivos e resumo por tipo. Você pode reabrir resultados JSON salvos sem reler a pasta ou compará-los com uma nova análise. O aplicativo lê apenas metadados, nunca o conteúdo dos arquivos, e não oferece exclusão nem limpeza.',
      audience: [
        'Pessoas com pouco espaço em disco que querem localizar pastas grandes antes de decidir o que apagar.',
        'Quem precisa de um relatório do tamanho de uma pasta em JSON ou CSV.',
        'Quem desconfia de ferramentas de limpeza: nenhuma ação remove arquivos.',
      ],
      scenarios: [
        {
          title: 'Encontrar pastas grandes',
          text: 'Analise um projeto, Downloads ou uma pasta de mídia e siga os maiores retângulos. Um clique duplo amplia a pasta; os itens pequenos ficam em uma lista com busca.',
        },
        {
          title: 'Separar tamanho desconhecido de zero',
          text: 'Pastas ilegíveis e tamanhos desconhecidos aparecem como desconhecidos, não como 0 B. Tamanho lógico e espaço alocado são exibidos separadamente; uma análise parcial informa seu motivo.',
        },
        {
          title: 'Salvar e comparar resultados',
          text: 'Exporte JSON com versão do formato, reabra depois e compare a mesma pasta com uma nova análise. A comparação separa mudanças confirmadas das desconhecidas; renomeações aparecem como objetos ausentes e adicionados. Os relatórios contêm nomes e caminhos: revise antes de compartilhar.',
        },
      ],
      media: [
        {
          alt: 'SpaceMosaic no macOS após analisar node_modules: total de 165,4 MiB e 16 tamanhos desconhecidos, árvore ordenada por tamanho e mapa colorido com os maiores diretórios de pacotes.',
          caption: 'SpaceMosaic 0.1.2 no macOS analisando a pasta de dependências deste site. Captura feita para este catálogo.',
        },
      ],
      support: [
        {
          platform: 'macOS, Apple Silicon',
          note: 'O repositório registra uma verificação de execução no macOS arm64; ela não foi repetida nesta revisão do catálogo. Não há versão Intel.',
        },
        {
          platform: 'Android 8.0+',
          note: 'Um relato anterior descreve funcionamento relativamente estável em um Pixel 8 com Android 17. Assinatura, atualização sobre instalação existente, leitores de tela e todos os provedores de armazenamento não foram verificados em execução.',
        },
        {
          platform: 'Windows x86-64',
          note: 'Compila em CI. Uma versão alfa anterior foi testada no Windows 11; as correções posteriores ainda precisam de nova verificação nessa plataforma.',
        },
        {
          platform: 'Linux x86-64',
          note: 'Compilado no Ubuntu 24.04; a execução permanece experimental. Os arquivos portáteis precisam de bibliotecas de sistema compatíveis.',
        },
        {
          platform: 'iOS 16+',
          note: 'Somente uma compilação experimental sem assinatura para dispositivo e outra para simulador. Instalar no iPhone exige Xcode, uma equipe de desenvolvimento e assinatura.',
        },
      ],
      limitations: [
        'Mede a pasta escolhida, não o disco inteiro. O tamanho não garante espaço recuperável: links físicos, clones APFS e compressão interferem.',
        'No computador, a análise para em 500.000 objetos ou cerca de 256 MiB de metadados; no celular, em 100.000 objetos. O resultado passa a ser parcial.',
        'As versões Windows e macOS não têm certificado de editor; a do macOS usa assinatura ad-hoc e não é notarizada.',
        'Links simbólicos e pontos de nova análise do Windows não são seguidos.',
      ],
      firstRun: [
        'Instale a versão do seu sistema na seção de downloads.',
        'O macOS pode bloquear a primeira execução porque o app não é notarizado. Autorize em Ajustes do Sistema, Privacidade e Segurança.',
        'Escolha uma pasta pelo botão, arraste para a janela ou passe um caminho na linha de comando:',
        'Siga os maiores retângulos. Selecione um para ver os detalhes ou abra as listas de maiores arquivos e tipos de arquivo.',
      ],
      downloadSteps: {
        'macos-dmg': [
          'Abra o DMG e arraste SpaceMosaic.app para Aplicativos.',
          'Se o macOS bloquear a primeira execução, autorize em Ajustes do Sistema, Privacidade e Segurança.',
        ],
        'macos-zip': ['Extraia o arquivo e abra spacemosaic-darwin-arm64/SpaceMosaic.app.'],
        'windows-setup': [
          'Execute o instalador. Ele instala para o usuário atual sem direitos de administrador.',
          'O Windows pode avisar que o app é desconhecido porque o instalador não tem assinatura Authenticode.',
        ],
        'windows-zip': ['Extraia todo o arquivo e execute spacemosaic.exe.'],
        'linux-deb': ['Instale com apt para resolver as dependências: sudo apt install ./spacemosaic-linux-x86_64.deb'],
        'linux-tar': ['Extraia e execute spacemosaic. São necessárias bibliotecas de sistema compatíveis.'],
        'android-apk': [
          'Permita a instalação pelo navegador ou gerenciador de arquivos e abra o APK.',
          'Se você instalou um APK de depuração alpha.2 ou alpha.3 antes, desinstale primeiro: os certificados de assinatura são diferentes.',
        ],
        'ios-device': ['Não é um IPA instalável. Assine no Xcode com sua própria equipe de desenvolvimento.'],
        'ios-simulator': ['Somente para o simulador iOS em um Mac com Apple Silicon.'],
      },
    },
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
    detail: {
      summary:
        'Busque uma palavra ou expressão em inglês, escolha o significado, ouça a gravação americana ou britânica e salve em MP3. As palavras salvas formam uma pequena coleção offline que pode ser exportada como um baralho Anki com áudio. É uma ferramenta independente, não um produto oficial da Cambridge; o conteúdo do dicionário segue os termos do site Cambridge.',
      audience: [
        'Estudantes de inglês que criam seus próprios baralhos Anki.',
        'Professores que preparam material de escuta com variantes americanas e britânicas.',
        'Quem prefere uma pasta local de pronúncias a uma aba do navegador.',
      ],
      scenarios: [
        {
          title: 'Guardar palavras durante a leitura',
          text: 'Digite uma palavra, confira IPA e definição, ouça e salve o significado. Os dois sotaques podem ser salvos para a mesma palavra.',
        },
        {
          title: 'Criar um baralho Anki',
          text: 'Exporte a coleção para um arquivo .apkg com modelo de cartão, áudio e notas de origem. Uma nova exportação atualiza os cartões existentes em vez de duplicá-los.',
        },
        {
          title: 'Baixar áudio da página do dicionário',
          text: 'A extensão Chrome ou Firefox baixa a gravação da página do dicionário aberta, sem o aplicativo de computador.',
        },
      ],
      media: [
        {
          alt: 'Cambridge Dictionary Audio no macOS após buscar “lighthouse”: transcrição americana, dois significados de substantivo com o primeiro selecionado e botões de reprodução, edição da tradução e salvamento.',
          caption:
            'Aplicativo de computador no macOS, executado a partir do código da versão 1.0.1, após uma busca. Captura feita para este catálogo.',
        },
      ],
      support: [
        {
          platform: 'Windows 10+, macOS 14+, Linux x86-64 (glibc 2.34+)',
          note: 'Instaladores e versões portáteis de computador são gerados e verificados em CI. Não têm certificado de editor; as versões macOS não são notarizadas.',
        },
        {
          platform: 'CLI Python',
          note: 'Python de 3.10 a 3.15. Publicado no PyPI sem a interface gráfica de computador.',
        },
        {
          platform: 'Chrome e Firefox',
          note: 'Extensões ZIP para carregar descompactadas; não estão publicadas nas lojas dos navegadores.',
        },
        {
          platform: 'Android 9+',
          note: 'São publicados apenas um APK de depuração para testes e um APK sem assinatura. Não há registro de teste em dispositivo físico.',
        },
        {
          platform: 'iOS 17+',
          note: 'Arquivo sem assinatura para dispositivo e compilação para simulador. A instalação exige assinatura e provisionamento próprios.',
        },
      ],
      limitations: [
        'Gravações, IPA e definições vêm de dictionary.cambridge.org e seguem seus termos; a licença do projeto não cobre esse conteúdo.',
        'As traduções do dicionário estão disponíveis apenas em russo. A interface tem sete idiomas.',
        'A síntese de expressões junta gravações de palavras isoladas; não é uma gravação da expressão inteira.',
        'Nenhuma versão móvel está pronta para instalação comum.',
      ],
      firstRun: [
        'Instale a versão de computador para seu sistema. No macOS e Windows, confirme o aviso de app sem assinatura.',
        'Digite uma palavra ou expressão e inicie a busca. Escolha um significado e um sotaque, depois reproduza.',
        'Salve o significado. Os arquivos vão para “Cambridge Dictionary Audio” em Downloads, a menos que você escolha outra pasta.',
        'Para usar o terminal, instale a CLI e salve uma gravação com um comando:',
      ],
      downloadSteps: {
        'windows-setup': ['Execute o instalador. O Windows pode avisar sobre a falta de assinatura do editor.'],
        'windows-zip': ['Extraia o arquivo e execute o app na pasta extraída.'],
        'macos-arm-dmg': [
          'Abra o DMG e arraste o app para Aplicativos.',
          'A versão não é notarizada; autorize a primeira execução em Ajustes do Sistema, Privacidade e Segurança.',
        ],
        'macos-intel-dmg': [
          'Abra o DMG e arraste o app para Aplicativos.',
          'A versão não é notarizada; autorize a primeira execução em Ajustes do Sistema, Privacidade e Segurança.',
        ],
        'macos-arm-pkg': ['Abra o pacote e siga o instalador.'],
        'macos-intel-pkg': ['Abra o pacote e siga o instalador.'],
        'linux-deb': ['Instale pelo gerenciador de pacotes, por exemplo: sudo apt install ./cambridge-dictionary-audio_*_amd64.deb'],
        'linux-rpm': ['Instale pelo gerenciador de pacotes, por exemplo: sudo dnf install ./cambridge-dictionary-audio-*.x86_64.rpm'],
        'linux-tar': ['Extraia e execute o app na pasta extraída.'],
        chrome: ['Extraia o ZIP, abra chrome://extensions, ative o modo de desenvolvedor e escolha carregar sem compactação.'],
        firefox: [
          'Abra about:debugging, escolha carregar extensão temporária e selecione manifest.json. O Firefox remove extensões temporárias ao reiniciar.',
        ],
        'android-debug': ['Usa um certificado de desenvolvimento. Apenas para testes.'],
        'android-unsigned': ['Precisa ser assinado antes da instalação.'],
        'ios-device': ['Exige assinatura e perfil de provisionamento próprios.'],
        'ios-simulator': ['Funciona apenas no simulador iOS.'],
      },
    },
  },
  margincarry: {
    task: 'Leve seus destaques e sublinhados do Zotero para uma nova revisão do mesmo PDF, revisando cada um antes de gravar.',
    environment: 'Zotero 10.0.5 ou uma versão 10.0.x posterior (desktop)',
    tagline: 'Mantenha suas anotações quando um artigo ganha uma nova versão.',
    primary: 'Baixar o plugin do Zotero',
    detail: {
      summary:
        'Quando um preprint ou relatório é revisado, suas anotações ficam no PDF antigo. O MarginCarry encontra cada trecho destacado na nova versão, mostra as posições antiga e proposta lado a lado e grava apenas as que você aceita. Os originais não mudam e cada transferência pode ser desfeita.',
      audience: [
        'Pesquisadores e estudantes que anotam artigos no Zotero e recebem versões atualizadas.',
        'Revisores que precisam comparar suas notas com um manuscrito revisado.',
      ],
      scenarios: [
        {
          title: 'Mover destaques para a versão 2',
          text: 'Anexe o PDF novo ao mesmo item do Zotero, abra o MarginCarry e aceite as propostas adequadas. Comentários, cores e etiquetas acompanham a cópia.',
        },
        {
          title: 'Identificar mudanças',
          text: 'Uma citação que deixou de existir é indicada como não encontrada. Um número alterado de 41,0 para 41,2 não é movido para o número novo.',
        },
        {
          title: 'Desfazer uma transferência',
          text: 'Cada transferência é registrada localmente. Desfazer move para a lixeira do Zotero exatamente as cópias daquela transferência.',
        },
      ],
      media: [
        {
          alt: 'Janela de revisão do MarginCarry: lista de anotações com candidatos únicos, duvidosos e múltiplos, e prévias lado a lado das páginas PDF de origem e destino do destaque escolhido.',
          caption: 'Janela de revisão com um PDF de teste. Imagem do repositório MarginCarry (Apache-2.0).',
        },
      ],
      support: [
        {
          platform: 'Zotero 10.0.x no macOS',
          note: 'As verificações históricas no Zotero 10.0.7/macOS cobriram os sete idiomas de interface e 45 casos de PDFs reais em seis idiomas além do inglês. O código testado da v0.1.2 não publicada saiu na v0.2.0 com apenas a versão do manifesto alterada; o corpus fixo da v0.1.0 não foi executado novamente.',
        },
        {
          platform: 'Zotero 10.0.x no Windows e Linux',
          note: 'Espera-se que funcione como plugin Zotero, mas não foi verificado.',
        },
      ],
      limitations: [
        'Apenas destaques e sublinhados nativos em uma página. Tinta, imagem, nota e anotações de várias páginas não são transferidas.',
        'Somente bibliotecas pessoais e dois PDFs anexados ao mesmo item. Sem bibliotecas de grupo ou EPUB.',
        'A correspondência é exata, sem busca aproximada nem OCR. PDFs digitalizados sem camada de texto são identificados.',
        'Usa APIs internas do leitor Zotero; uma versão futura do Zotero pode exigir atualização.',
      ],
      firstRun: [
        'Baixe o arquivo .xpi. No Zotero, abra Ferramentas e Plugins; no menu da engrenagem, escolha instalar a partir de um arquivo e selecione-o.',
        'Adicione a nova versão do PDF ao mesmo item da antiga.',
        'Em Ferramentas, abra a transferência de anotações PDF do MarginCarry, confira os PDFs antigo e novo e busque propostas.',
        'Compare cada proposta, aceite ou ignore, aplique as selecionadas e confirme.',
      ],
      downloadSteps: {
        xpi: [
          'No Zotero: Ferramentas, Plugins, menu da engrenagem, instalar plugin a partir de arquivo.',
          'Reinicie o Zotero se solicitado.',
        ],
      },
    },
  },
  batterybridge: {
    task: 'Defina um limite de carga e uma agenda de cuidado da bateria do notebook quando o hardware permitir, e veja quais controles o seu aparelho suporta.',
    environment: 'Notebook com interface de controle de carga compatível; permissões de administrador para instalar o serviço',
    tagline: 'Limites de carga do seu jeito, dentro do que o hardware permite.',
    primary: 'Baixar o BatteryBridge',
    detail: {
      summary:
        'Muitos notebooks passam o dia na tomada a 100%. O BatteryBridge define um limite pela interface de controle de carga do notebook, mantém o ajuste com um serviço em segundo plano e informa funções sem suporte ou não verificadas no seu dispositivo.',
      audience: [
        'Donos de notebooks que ficam na tomada a maior parte do dia.',
        'Usuários Linux cujo kernel oferece limites de carga e que querem interface gráfica e horários.',
        'Quem quer conhecer os recursos do hardware antes de confiar o carregamento a uma ferramenta.',
      ],
      scenarios: [
        {
          title: 'Manter a bateria em 80%',
          text: 'Defina um limite e, se quiser, um nível para iniciar a carga; o serviço mantém os ajustes após reiniciar.',
        },
        {
          title: 'Completar a carga antes de viajar',
          text: 'Carregue temporariamente até 100% e depois retorne automaticamente ao limite salvo.',
        },
        {
          title: 'Verificar primeiro a compatibilidade',
          text: 'Consulte os recursos em modo somente leitura ou exporte um relatório de compatibilidade sem instalar o serviço.',
        },
      ],
      media: [
        {
          caption:
            'Comandos da documentação. capabilities indica cada função como suportada, experimental, não suportada ou desconhecida, com o motivo. A saída depende do dispositivo e por isso não aparece aqui. Ainda não há captura publicada do app atual.',
        },
      ],
      support: [
        {
          platform: 'Linux com limites de carga do kernel',
          note: 'Suporte genérico a sysfs charge_control_end_threshold, sem restrição de fabricante. Ainda não há relatórios de validação por dispositivo.',
        },
        {
          platform: 'macOS 11+ (Intel e Apple Silicon)',
          note: 'Monitoramento por IOKit. O controle de carga SMC é experimental; alguns modelos podem permitir apenas monitoramento.',
        },
        {
          platform: 'Windows 10/11',
          note: 'Monitoramento da bateria. Controle de carga apenas no modo de conservação Lenovo, fixo em 80%, experimental.',
        },
      ],
      limitations: [
        'Ainda não há registro de validação completa de gravação em dispositivos. Trate o controle de carga como experimental e acompanhe o primeiro ciclo.',
        'Os controles disponíveis dependem do driver do kernel, firmware e interface do fabricante. Controladores ASUS, Dell, HP, MSI e Acer ainda não foram implementados.',
        'Instaladores macOS e Windows não são assinados. Pacotes Linux exigem systemd e bibliotecas nativas OpenGL/EGL.',
      ],
      firstRun: [
        'Instale o pacote para seu sistema e confirme a solicitação de administrador. O instalador inicia o serviço em segundo plano.',
        'Abra o BatteryBridge e consulte os recursos do dispositivo para saber o que seu notebook oferece.',
        'Defina o limite de parada, por exemplo 80%, e aplique.',
        'Sem instalar nada, você pode compilar a CLI e inspecionar o dispositivo em modo somente leitura:',
      ],
      downloadSteps: {
        'macos-pkg': [
          'Abra o pacote; o macOS pode pedir permissão para um instalador sem assinatura.',
          'O instalador adiciona o app e o serviço. Desinstale pelo próprio app.',
        ],
        'windows-setup': [
          'Execute o instalador e confirme a solicitação de administrador. Ele registra uma tarefa em segundo plano como SYSTEM.',
        ],
        'linux-deb': ['sudo apt install ./BatteryBridge-linux-x86_64.deb', 'Sua conta deve pertencer ao grupo sudo para alterar ajustes.'],
        'linux-rpm': ['sudo dnf install ./BatteryBridge-linux-x86_64.rpm', 'Sua conta deve pertencer ao grupo wheel para alterar ajustes.'],
        'macos-tar': ['Somente binários; instale o serviço manualmente seguindo o guia do serviço.'],
        'windows-zip': ['Somente binários; instale o serviço manualmente seguindo o guia do serviço.'],
        'linux-tar': ['Somente binários; instale o serviço manualmente seguindo o guia do serviço.'],
      },
    },
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
    detail: {
      summary:
        'Defina um formulário por um esquema, publique uma versão imutável e receba respostas por uma página hospedada, iframe ou API pública. Cada entrega de webhook é assinada e registrada com tentativas e erros para acompanhar cada resposta. Os dados ficam no seu PostgreSQL.',
      audience: [
        'Equipes que querem formulários na própria infraestrutura em vez de um serviço SaaS.',
        'Desenvolvedores que precisam de entrega de webhooks com novas tentativas e diagnóstico.',
      ],
      scenarios: [
        {
          title: 'Receber inscrições no seu site',
          text: 'Incorpore um formulário publicado com altura automática ou envie do seu frontend para a API idempotente de respostas.',
        },
        {
          title: 'Alimentar outro sistema',
          text: 'Cada resposta segue por um webhook assinado em uma outbox transacional, com novas tentativas automáticas e recuperação manual.',
        },
        {
          title: 'Encerrar a coleta no prazo',
          text: 'Pause o formulário, defina horário de encerramento ou limite de respostas e mostre uma mensagem de fechamento própria.',
        },
      ],
      media: [
        {
          alt: 'Página inicial pública do Form Forge: o título “Forms with an inspectable delivery pipeline”, botões do espaço de trabalho e do código e três painéis de funções.',
          caption: 'Página inicial da versão pública vinculada pelo repositório, antes do login. Captura feita para este catálogo.',
        },
        {
          caption:
            'Configuração local do guia inicial. Exige PostgreSQL e um app GitHub OAuth; depois abra localhost:3000, entre e publique um formulário.',
        },
      ],
      support: [
        {
          platform: 'Hospedagem própria com Docker Compose',
          note: 'Guia de produção em deploy/README.md.',
        },
        {
          platform: 'Netlify',
          note: 'A versão pública vinculada pelo repositório funciona no Netlify.',
        },
        {
          platform: 'Respondentes',
          note: 'Formulários hospedados e incorporados abrem em um navegador moderno.',
        },
      ],
      limitations: [
        'Não é um SaaS hospedado: você opera PostgreSQL, app web e servidor de tarefas em segundo plano.',
        'O login usa OAuth do GitHub, Google ou GitLab; não há contas de e-mail e senha.',
        'Respostas incompletas não são coletadas, e os pacotes do espaço de trabalho não são publicados no npm.',
      ],
      firstRun: [
        'Instale Node.js (22.22.2+, 24.15.0+ ou 26+), pnpm 12.10.1 e PostgreSQL, e crie um app GitHub OAuth.',
        'Clone o repositório, configure apps/web/.env, execute as migrações e inicie o app:',
        'Inicie o servidor local de tarefas em segundo plano em outro terminal:',
        'Abra localhost:3000, crie e publique um formulário e envie uma resposta de teste.',
      ],
      downloadSteps: {
        source: ['Extraia e siga o guia inicial.'],
      },
    },
  },
  dbreduce: {
    task: 'Reduza um banco PostgreSQL às poucas linhas e tabelas que ainda reproduzem um teste com falha.',
    environment: 'Python 3.10–3.15; PostgreSQL 13–18 com pg_dump, pg_restore e psql da mesma versão',
    tagline: 'De um dump do tamanho da produção a um relato de bug que dá para anexar.',
    primary: 'Começar',
    detail: {
      summary:
        'Forneça ao DBReduce um PostgreSQL e um comando que falha por um defeito. Ele remove linhas seguindo chaves estrangeiras e relações declaradas, mantendo apenas candidatos com a mesma falha. Opcionalmente remove tabelas inteiras. O resultado é um pequeno arquivo SQL que reproduz o defeito.',
      audience: [
        'Desenvolvedores que precisam de um exemplo mínimo de falha dependente dos dados.',
        'Mantenedores que recebem relatos de erros que só ocorrem em uma base de outra pessoa.',
      ],
      scenarios: [
        {
          title: 'Reduzir um caso de teste com falha',
          text: 'Indique uma cópia da base e seu comando de teste. Identifique a falha pela saída ou por um veredito JSON para não aceitar um erro diferente.',
        },
        {
          title: 'Compartilhar um caso reproduzível',
          text: 'A saída é dbreduce.min.sql e um relatório com contagens de linhas e tempos, sem a saída bruta do teste.',
        },
      ],
      media: [
        {
          caption:
            'Exemplo do README: um oráculo pytest reconhecido pela mensagem de asserção e confirmado três vezes. Grava dbreduce.min.sql e dbreduce-report.json sem sobrescrever arquivos existentes.',
        },
        {
          caption:
            'Resultado do relatório de validação do projeto: um caso de erro Wagtail reduzido com um oráculo da aplicação no PostgreSQL 17 e redução opcional do esquema.',
        },
      ],
      support: [
        {
          platform: 'PostgreSQL 13–18',
          note: 'Isolamento por snapshot por padrão; o backend de clonagem é experimental e exige PostgreSQL 15+.',
        },
        {
          platform: 'Python 3.10–3.15',
          note: 'Instalado como ferramenta independente; sua aplicação pode usar qualquer linguagem.',
        },
      ],
      limitations: [
        'O oráculo usa uma cópia descartável, mas funções SQL, gatilhos e serviços externos ainda podem causar efeitos colaterais. Use comandos e dumps confiáveis.',
        'Precisa de um papel de banco de dados com CREATEDB.',
        'O DBReduce não promete mínimo global; os relatórios indicam quando não é possível afirmar irredutibilidade local.',
      ],
      firstRun: [
        'Instale a CLI como ferramenta independente:',
        'Confira se o teste lê a URL da base de DATABASE_URL ou DBREDUCE_DATABASE_URL.',
        'Execute dbreduce reduce com uma condição que identifique o defeito e anexe dbreduce.min.sql ao relato do erro.',
      ],
      downloadSteps: {},
    },
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
    task: 'Veja quais arquivos e intervalos de bytes o DuckDB lê de Parquet por HTTP e compare consultas ou estruturas.',
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
    task: 'Rastreie alterações de dependências, catálogos e patches do pnpm no grafo de dependências do workspace.',
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
    task: 'Compare execuções cron antes de mudar o mecanismo Python, sua versão ou sua base de fusos horários.',
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
    task: 'Teste atualizações e reversões do IndexedDB, inclusive com abas das versões antiga e nova abertas juntas.',
    environment: 'Node.js 24.22.1+ na linha 24.x, npm 11.19.1 e Playwright Chromium; executado a partir do código',
  },
  watchconverge: {
    task: 'Verifique se um observador de arquivos ou índice ainda corresponde ao disco após gravações atômicas, renomeações e exclusões.',
    environment: 'Node.js 22.18+; roda a partir do código',
  },
  overflowlens: {
    task: 'Calcule a taxa de erro possível quando o OpenTelemetry juntou atributos de requisições em uma série de overflow.',
    environment: 'App de navegador com processamento local; arquivo autônomo disponível',
    tagline: 'Limites exatos quando o estouro de cardinalidade oculta os resultados.',
    primary: 'Abrir app',
    secondary: [
      {
        label: 'Baixar arquivo autônomo',
        note: 'O app está disponível no navegador. O arquivo v0.2.1 também pode ser servido localmente.',
      },
    ],
    detail: {
      summary:
        'Importe um contador de requisições OpenTelemetry salvo e compare suas taxas de erro possíveis com seu limite. Delta analisa um intervalo de coleta; cumulativo compara snapshots correspondentes de antes e depois. Os arquivos são analisados localmente em um Web Worker; contagens e limites são calculados no navegador. O app hospedado baixa seus recursos; arquivos importados, limites e relatórios exportados não são enviados.',
      audience: ['Desenvolvedores que investigam taxas de erro após estouro de cardinalidade no SDK OpenTelemetry.'],
      scenarios: [
        {
          title: 'Entender um intervalo delta',
          text: 'Abra o exemplo incluído, confirme as premissas e veja por que limites de 0,1% a 10% não permitem decidir sobre um limite de 1%.',
        },
        {
          title: 'Comparar snapshots cumulativos',
          text: 'Escolha exportações de antes e depois de um mesmo histórico contínuo do contador. A distribuição de navegador inclui um par sintético do laboratório SDK.',
        },
      ],
      media: [
        {
          caption: 'Resultado documentado do exemplo sintético delta incluído com limite de 1%; não é uma medição de produção.',
        },
      ],
      support: [
        {
          platform: 'Navegador moderno',
          note: 'Aplicação estática no GitHub Pages; o arquivo autônomo exige um servidor HTTP, não file://.',
        },
      ],
      limitations: [
        'Aceita UTF-8 OTLP JSON sem compressão com contadores Sum inteiros e monótonos, até 5 MiB por arquivo. Não é backend de métricas ao vivo nem avaliador geral de SLO.',
        'Janelas cumulativas exigem snapshots completos correspondentes, atribuição estável e inícios conhecidos sem mudanças, sem reinícios nem contagens decrescentes.',
        'As premissas de origem precisam ser confirmadas. Um arquivo não prova que o processamento preservou todas as contagens e pontos de estouro.',
      ],
      firstRun: [
        'Abra o app e escolha o exemplo delta ou cumulativo. SDK e arquivos próprios não são necessários.',
        'Para a versão independente já publicada, baixe o ZIP, extraia e inicie um servidor HTTP estático dentro de overflowlens-0.2.1:',
        'Abra http://127.0.0.1:8080, escolha o modo, confirme as premissas de origem e defina a porcentagem máxima de erros. Exporte JSON para salvar a explicação.',
      ],
      downloadSteps: {
        standalone: ['Extraia o ZIP e sirva sua pasta por HTTP. Node.js e Go não são necessários.'],
      },
    },
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
