import type { Project } from '../../../types';

export const touchSpeaker: Project = {
  id: 'touch-speaker',
  slug: 'touch-speaker',
  title: 'Touch Speaker',
  shortDescription: 'Ditado por voz para Windows e macOS, direto no cursor.',
  detailedDescription:
    'App de bandeja em Electron que transcreve a fala com Whisper (via Groq) e cola o texto no aplicativo em foco.',
  description:
    'App de bandeja para Windows e macOS: segure uma tecla, fale e o texto transcrito aparece no cursor de qualquer aplicativo.',
  image: '/images/fotos-projetos-pessoais/touch-speaker/cover.webp',
  github: 'https://github.com/Victorkaue333/touch-speaker',
  detailPath: '/projetos/touch-speaker',
  technologies: ['TypeScript', 'Electron', 'Whisper', 'SQLite', 'GitHub Actions'],
  stack: ['TypeScript', 'Electron', 'Node.js', 'SQLite'],
  category: 'pessoal',
  status: 'mvp',
  teamSize: 1,
  duration: 'out 2026',
  role: {
    title: 'Desenvolvedor (projeto individual)',
    mine: [
      'Planejamento, arquitetura e implementação de ponta a ponta',
      '13 decisões técnicas registradas em ADR',
      'Pipeline de release para Windows e macOS no GitHub Actions',
    ],
  },
  caseStudy: {
    overview: [
      'Ditado por voz para o desktop: com a tecla Ctrl direito pressionada, o app grava, transcreve com o Whisper (pela API da Groq) e cola o texto no cursor do aplicativo em foco — editor de código, navegador, WhatsApp ou qualquer outro.',
      'Começou como ferramenta para o meu próprio uso: escrever em português, com termos técnicos em inglês, mais rápido do que digitando.',
    ],
    audiences: [
      { who: 'Desenvolvedores', goal: 'Ditam mensagens, prompts e textos sem sair do editor.' },
      { who: 'Quem escreve muito no computador', goal: 'Trocam parte da digitação pela fala, em qualquer aplicativo.' },
    ],
    challenge:
      'O ditado nativo do Windows lida mal com português técnico e pontuação, e as alternativas prontas são pagas e passam o áudio por servidor próprio. O texto precisava cair no aplicativo em foco, com acentos, sem roubar o foco da janela.',
    solution:
      'App Electron sem servidor próprio: um hook global de teclado detecta quando a tecla é pressionada e solta, o áudio é gravado no renderer e enviado à Groq (Whisper large-v3-turbo); o texto volta, passa por filtros contra alucinação e é colado via área de transferência com Ctrl+V simulado, restaurando o conteúdo anterior.',
    result:
      'MVP com instalador Windows e build macOS gerados pelo CI e publicados em GitHub Releases (v0.1.2), histórico local das transcrições e a chave de API do próprio usuário guardada no cofre do sistema operacional.',
    features: [
      {
        title: 'Ditado',
        items: [
          'Segurar para falar, toque para mãos livres e Esc para cancelar',
          'Pílula flutuante de status que não rouba o foco',
          'Gravação limitada a 5 minutos',
        ],
      },
      {
        title: 'Transcrição e inserção',
        items: [
          'Whisper large-v3-turbo via Groq, em pt-BR',
          'Filtros para áudio curto e silêncio (sem texto inventado)',
          'Colagem em qualquer aplicativo, com a área de transferência preservada',
          'Se o aplicativo bloquear a colagem, o texto fica copiado',
        ],
      },
      {
        title: 'Janela principal',
        items: [
          'Histórico local com busca, cópia e exclusão',
          'Retenção configurável do histórico',
          'Temas claro e escuro e início com o sistema',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'device', label: 'Entrada', detail: 'Hook global de teclado + microfone' },
        { icon: 'client', label: 'Renderers', detail: 'Pílula de gravação e janela principal' },
        { icon: 'server', label: 'Processo principal', detail: 'Electron: sessão, inserção e histórico' },
        { icon: 'ai', label: 'Transcrição', detail: 'Groq · Whisper large-v3-turbo' },
        { icon: 'database', label: 'Local', detail: 'SQLite (node:sqlite) e credencial cifrada' },
      ],
      highlights: [
        'Sem backend: o único serviço externo é a API da Groq, com a chave de cada usuário.',
        'Preloads isolados expõem ao renderer só uma API mínima por IPC.',
        'A lógica pura conversa com o Electron por portas, então os testes rodam sem abrir o app.',
        'O histórico guarda só o texto ditado, nunca o áudio.',
      ],
    },
    decisions: [
      {
        topic: 'Atalho',
        choice: 'uiohook-napi em vez de globalShortcut',
        why: 'O globalShortcut não informa quando a tecla é solta nem aceita um modificador sozinho.',
      },
      {
        topic: 'Inserção',
        choice: 'Área de transferência + Ctrl+V simulado',
        why: 'Digitar caractere por caractere é lento e quebra o autocompletar; colar é instantâneo e mantém os acentos.',
      },
      {
        topic: 'Transcrição',
        choice: 'Groq Whisper, áudio inteiro ao soltar a tecla',
        why: 'Rápido e com camada gratuita; streaming exigiria um servidor WebSocket próprio.',
      },
      {
        topic: 'Credencial',
        choice: 'Chave guardada com safeStorage',
        why: 'O app instalado não tem .env; a chave fica cifrada pelo sistema operacional.',
        tradeoff: 'A proteção é por usuário do sistema, não por aplicativo.',
      },
      {
        topic: 'Histórico',
        choice: 'node:sqlite em vez de better-sqlite3',
        why: 'Nenhum binário nativo de terceiros para recompilar a cada versão do Electron.',
        tradeoff: 'A API do node:sqlite ainda é release candidate.',
      },
    ],
    stack: [
      { name: 'TypeScript', role: 'Linguagem (strict), compilada com tsc' },
      { name: 'Electron', role: 'App de bandeja, janelas e IPC (v44)' },
      { name: 'Whisper', role: 'Transcrição via API da Groq' },
      { name: 'SQLite', role: 'Histórico local (node:sqlite)' },
      { name: 'Node.js', role: 'Runtime e testes (node:test)' },
      { name: 'GitHub Actions', role: 'Build, testes e release Windows/macOS' },
    ],
    quality: [
      '22 arquivos de teste com node:test, rodando sem o Electron',
      'Release no GitHub Actions: typecheck, testes, empacotamento, verificação e publicação com SHA256',
      'Verificação do pacote barra .env, logs e a chave de API dentro do instalador',
      'Log local só com metadados — nunca texto, áudio ou chave',
      'Electron Fuses ativados e preloads com contextIsolation',
    ],
    limitations: [
      'Binários sem assinatura: Windows e macOS exibem aviso na instalação',
      'Build macOS gerado no CI, mas ainda não testado num Mac',
      'Sem atualização automática',
      'Latência p50/p95 ainda não medida (só duas medições pontuais)',
    ],
    roadmap: [
      'Limpeza do texto com IA e dicionário de termos',
      'Contexto do aplicativo em foco e tradução',
      'Instalador assinado e atualização automática',
    ],
  },
  media: [
    {
      src: '/images/fotos-projetos-pessoais/touch-speaker/inicio.webp',
      type: 'screenshot',
      alt: 'Tela inicial do Touch Speaker com instruções de ditado, status e ditados recentes',
      caption: 'Janela principal: como ditar, status e uso recente',
    },
    {
      src: '/images/fotos-projetos-pessoais/touch-speaker/1.webp',
      type: 'screenshot',
      alt: 'Tela de histórico do Touch Speaker com busca e lista de transcrições',
      caption: 'Histórico local com busca, cópia e exclusão',
    },
  ],
};
