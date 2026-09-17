/* Tela Sobre (/sobre), incluindo a atividade no GitHub. Base de tipos: os outros idiomas seguem este formato. */

const sobre = {
  about: {
    title: 'Sobre',
    subtitle: 'Desenvolvedor Full Stack',
    terminalLabel: 'Sessão de terminal com o resumo técnico',
    intro:
      'Sou desenvolvedor com foco em backend e sistemas web, formado em Desenvolvimento de Sistemas e graduando em Gestão da Tecnologia da Informação. Atuo no desenvolvimento de APIs, regras de negócio, modelagem de dados, interface web e deploy, com foco em arquitetura limpa, segurança e valor de negócio.',
    highlights: {
      title: 'Diferenciais',
      backend: 'Backend Especializado',
      backendDesc: 'Regras de negócio consistentes, autenticação segura e modelagem de dados orientada à escala.',
      api: 'APIs Escaláveis',
      apiDesc: 'Desenvolvimento de APIs REST com foco em performance, integração e manutenção de longo prazo.',
      enterprise: 'Sistemas Empresariais',
      enterpriseDesc: 'Experiência em projetos reais com entrega ponta a ponta, do planejamento ao deploy em produção.',
    },
    skillsLabel: 'Stacks utilizadas',
  },
  expertise: {
    title: 'Expertise técnica',
    subtitle: 'Minha stack técnica e competências.',
  },
  github: {
    title: 'Atividade no GitHub',
    contributions: {
      title: 'Contribuições no último ano',
      alt: 'Gráfico de contribuições de Victor Kauê no GitHub no último ano',
      error: 'Não foi possível carregar o gráfico de contribuições.',
      errorLink: 'Ver no GitHub',
      loading: 'Carregando contribuições no GitHub…',
      total_one: '{{formatted}} contribuição no último ano',
      total_other: '{{formatted}} contribuições no último ano',
      tooltip_zero: 'Nenhuma contribuição em {{date}}',
      tooltip_one: '{{count}} contribuição em {{date}}',
      tooltip_other: '{{count}} contribuições em {{date}}',
      less: 'Menos',
      more: 'Mais',
    },
    repos: {
      title: 'Repositórios recentes',
      loading: 'Carregando repositórios recentes…',
      noDescription: 'Sem descrição.',
      stars_one: '{{count}} estrela',
      stars_other: '{{count}} estrelas',
      updated: 'Atualizado {{when}}',
    },
    fallback: {
      text: 'Não deu para carregar minha atividade agora. Confira direto no meu perfil:',
      cta: 'Ver GitHub',
    },
    viewAll: 'Ver todos os repositórios',
  },
  spotify: {
    title: 'Spotify',
    nowPlaying: 'Tocando agora',
    lastPlayed: 'Última faixa que ouvi',
    playlist: 'O que estou ouvindo',
    open: 'Abrir no Spotify',
    error: 'Não deu para falar com o Spotify agora.',
  },
};

export default sobre;
