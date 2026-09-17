/* Tela inicial (/). */
import type base from '../pt-BR/home';

const home: typeof base = {
  hero: {
    role: 'Programador',
    tech: 'Full Stack',
    description:
      'Foco em desempenho e manutenção. Entrego software fiável para processos críticos, da regra de negócio ao deploy em produção.',
    cta: 'Conheça o meu percurso',
    cta2: 'Ver Projetos',
  },
  home: {
    featuredTitle: 'Projetos em Destaque',
    impactTitle: 'Em números',
    viewAllProjects: 'Ver todos os projetos',
    metrics: {
      projectsLabel: 'Projetos publicados',
      projectsContext: 'Cada um com estudo de caso: desafio, solução e stack',
      realLabel: 'Projetos profissionais',
      realContext: 'Feitos para empresas, organismos públicos e eventos',
      orgsLabel: 'Empresas e instituições',
      orgsContext: 'Startups, setor público e investigação financiada',
    },
    servicesSubtitle: 'Onde a lógica encontra o desempenho para criar valor.',
    featuredSubtitle: 'Projetos reais, com contexto, stack e resultado.',
    featuredCta: 'Ver estudo de caso',
    featuredTeam_one: 'A solo',
    featuredTeam_other: 'Equipa de {{count}}',
  },
};

export default home;
