/* Tela Sobre (/sobre), incluindo a atividade no GitHub. */
import type base from '../pt-BR/sobre';

const sobre: typeof base = {
  about: {
    title: 'Sobre',
    subtitle: 'Programador Full Stack',
    terminalLabel: 'Sessão de terminal com o resumo técnico',
    intro:
      'Sou programador com foco em backend e sistemas web, formado em Desenvolvimento de Sistemas e a frequentar a licenciatura em Gestão de Tecnologias da Informação. Trabalho no desenvolvimento de APIs, regras de negócio, modelação de dados, interface web e deploy, com foco em arquitetura limpa, segurança e valor de negócio.',
    highlights: {
      title: 'Diferenciais',
      backend: 'Backend Especializado',
      backendDesc: 'Regras de negócio consistentes, autenticação segura e modelação de dados orientada à escala.',
      api: 'APIs Escaláveis',
      apiDesc: 'Desenvolvimento de APIs REST com foco em desempenho, integração e manutenção a longo prazo.',
      enterprise: 'Sistemas Empresariais',
      enterpriseDesc: 'Experiência em projetos reais com entrega de ponta a ponta, do planeamento ao deploy em produção.',
    },
    skillsLabel: 'Stacks utilizadas',
  },
  expertise: {
    title: 'Competências técnicas',
    subtitle: 'A minha stack técnica e competências.',
  },
  github: {
    title: 'Atividade no GitHub',
    contributions: {
      title: 'Contribuições no último ano',
      alt: 'Gráfico de contribuições de Victor Kauê no GitHub no último ano',
      error: 'Não foi possível carregar o gráfico de contribuições.',
      errorLink: 'Ver no GitHub',
      loading: 'A carregar contribuições no GitHub…',
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
      loading: 'A carregar repositórios recentes…',
      noDescription: 'Sem descrição.',
      stars_one: '{{count}} estrela',
      stars_other: '{{count}} estrelas',
      updated: 'Atualizado {{when}}',
    },
    fallback: {
      text: 'Não foi possível carregar a minha atividade agora. Veja diretamente no meu perfil:',
      cta: 'Ver GitHub',
    },
    viewAll: 'Ver todos os repositórios',
  },
};

export default sobre;
