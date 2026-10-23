import type { Project } from '../../../types';

export const sigref: Project = {
  id: 'sigref',
  slug: 'sigref',
  title: 'SIGREF',
  shortDescription: 'Sistema de gestão educacional.',
  detailedDescription:
    'Sistema para organização de demandas escolares e processos administrativos da gerência regional.',
  description:
    'Sistema de gestão educacional para a Gerência Regional de Educação, com foco em organização de demandas escolares e processos administrativos.',
  image: '/images/fotos-projetos-reais/sigref/sigrefsemfundo.webp',
  detailPath: '/projetos/sigref',
  technologies: ['Django', 'MySQL', 'JavaScript'],
  stack: ['Python', 'Django', 'MySQL'],
  category: 'real',
  featured: true,
  privateCode: true,
  experienceId: 'gre-estagio',
  role: {
    title: 'Estagiário · desenvolvimento web',
    mine: [
      'Interfaces e funcionalidades em Python e Django',
      'Regras de negócio, gestão de usuários e refatoração',
      'Testes',
      'Organização das demandas do sistema',
      'Treinamento e suporte aos usuários',
    ],
  },
  metrics: [
    { value: '100+', label: 'escolas na abrangência da regional' },
    { value: '200+', label: 'usuários do sistema' },
  ],
  caseStudy: {
    overview: [
      'Sistema web para a Gerência Regional de Educação centralizar as demandas das escolas da regional e os processos administrativos que antes corriam de forma descentralizada e manual.',
    ],
    audiences: [
      { who: 'Escolas', goal: 'Registram demandas e acompanham o andamento.' },
      { who: 'Gerência regional', goal: 'Aprova e acompanha as demandas de todas as escolas num só lugar.' },
    ],
    challenge:
      'Reunir numa única plataforma as demandas de várias escolas, cada uma passando por fluxo de aprovação, e dar à gerência a visão do conjunto.',
    solution:
      'Sistema Django sob medida, com níveis de acesso por perfil, fluxos de aprovação, painéis administrativos e relatórios automatizados.',
    result:
      'Demandas das escolas e processos administrativos da regional concentrados num só sistema, com etapa de aprovação registrada e relatórios gerados pela plataforma.',
    features: [
      {
        items: [
          'Registro de demandas escolares',
          'Fluxos de aprovação',
          'Níveis de acesso por perfil',
          'Painéis administrativos',
          'Relatórios automatizados',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Interface', detail: 'Django Templates + JavaScript' },
        { icon: 'server', label: 'Aplicação', detail: 'Monolito Django' },
        { icon: 'database', label: 'Banco', detail: 'MySQL' },
        { icon: 'cloud', label: 'Servidor', detail: 'Linux com Nginx + Gunicorn' },
      ],
    },
    decisions: [
      {
        topic: 'Acesso',
        choice: 'Django Auth com níveis de acesso',
        why: 'Escola e gerência veem e fazem coisas diferentes dentro do mesmo sistema.',
      },
      {
        topic: 'Arquitetura',
        choice: 'Monolito Django',
        why: 'Admin, autenticação e ORM prontos para um sistema interno com poucas integrações.',
      },
      {
        topic: 'Banco',
        choice: 'MySQL',
        why: 'Escolas, demandas e aprovações são dados relacionais que pedem integridade referencial.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem' },
      { name: 'Django', role: 'Aplicação, autenticação e admin' },
      { name: 'MySQL', role: 'Banco relacional' },
      { name: 'JavaScript', role: 'Interações nas telas' },
      { name: 'Nginx', role: 'Proxy reverso' },
      { name: 'Gunicorn', role: 'Servidor WSGI' },
    ],
  },
};
