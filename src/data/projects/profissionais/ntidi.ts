import type { Project } from '../../../types';

export const ntidi: Project = {
  id: 'ntidi',
  slug: 'ntidi',
  title: 'NTIDI',
  shortDescription: 'Ecossistema web institucional e interno.',
  detailedDescription:
    'Conjunto de páginas e sistemas internos desenvolvidos para a operação digital da empresa.',
  description:
    'Ecossistema web da empresa NTIDI, incluindo site institucional e sistemas internos desenvolvidos com Django.',
  image: '/images/fotos-projetos-reais/ntidi/NTIDI.webp',
  online: 'https://www.ntidi.com.br/',
  detailPath: '/projetos/ntidi',
  technologies: ['Django', 'Bootstrap', 'SEO'],
  stack: ['Python', 'Django', 'Bootstrap', 'Docker'],
  category: 'real',
  status: 'production',
  featured: true,
  privateCode: true,
  teamType: 'team',
  experienceId: 'ntidi',
  role: {
    title: 'Desenvolvedor Full Stack',
    mine: [
      'Back-end em Python e Django',
      'APIs e integrações',
      'Desenvolvimento web',
      'Infraestrutura e deploy: Linux, Docker, Gunicorn e Nginx',
    ],
    team: ['Demais módulos e produtos da empresa: equipe NTIDI'],
  },
  caseStudy: {
    overview: [
      'Ecossistema web da NTIDI: site institucional com SEO técnico e, por trás dele, sistemas internos em Django para gestão de leads e de processos da empresa.',
    ],
    audiences: [
      { who: 'Visitantes e clientes', goal: 'Conhecem a empresa pelo site e entram em contato.' },
      { who: 'Equipe interna', goal: 'Organiza leads e processos no painel administrativo.' },
    ],
    challenge:
      'Dar à empresa uma presença digital sólida e, ao mesmo tempo, ferramentas internas para tratar os contatos e processos que chegam por ela.',
    solution:
      'Site institucional renderizado no servidor, com SEO técnico, e painel administrativo Django customizado para os sistemas internos de leads e processos.',
    result:
      'Site institucional no ar e sistemas internos no mesmo ecossistema Django: a presença digital e a operação que ela gera ficam na mesma base.',
    features: [
      {
        title: 'Site institucional',
        items: ['Páginas institucionais responsivas', 'SEO técnico'],
      },
      {
        title: 'Sistemas internos',
        items: [
          'Painel administrativo Django customizado',
          'Gestão de leads',
          'Gestão de processos internos',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Site', detail: 'HTML5/CSS3 + Bootstrap 5' },
        { icon: 'server', label: 'Aplicação', detail: 'Django: site e painel interno' },
        { icon: 'database', label: 'Banco', detail: 'PostgreSQL' },
        { icon: 'cloud', label: 'Execução', detail: 'Docker' },
      ],
    },
    decisions: [
      {
        topic: 'Back-end',
        choice: 'Django',
        why: 'Admin pronto e personalizável para os sistemas internos, com autenticação e ORM de fábrica.',
      },
      {
        topic: 'SEO',
        choice: 'Páginas renderizadas no servidor',
        why: 'O conteúdo chega indexável, sem depender de JavaScript no navegador.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem' },
      { name: 'Django', role: 'Site, painel e sistemas internos' },
      { name: 'Bootstrap', role: 'Interface responsiva (5)' },
      { name: 'PostgreSQL', role: 'Banco de dados' },
      { name: 'Docker', role: 'Empacotamento e execução' },
      { name: 'SEO', role: 'Estrutura técnica para indexação' },
    ],
  },
  screenshots: [
    '/images/fotos-projetos-reais/ntidi/NTIDI.webp',
    '/images/fotos-projetos-reais/ntidi/1-sem-fundo.webp',
    '/images/fotos-projetos-reais/ntidi/2.webp',
    '/images/fotos-projetos-reais/ntidi/3.webp',
    '/images/fotos-projetos-reais/ntidi/4.webp',
    '/images/fotos-projetos-reais/ntidi/5.webp',
    '/images/fotos-projetos-reais/ntidi/6.webp',
    '/images/fotos-projetos-reais/ntidi/7.webp',
    '/images/fotos-projetos-reais/ntidi/8.webp',
    '/images/fotos-projetos-reais/ntidi/9.webp',
    '/images/fotos-projetos-reais/ntidi/10.webp',
    '/images/fotos-projetos-reais/ntidi/11.webp',
    '/images/fotos-projetos-reais/ntidi/12.webp',
    '/images/fotos-projetos-reais/ntidi/13.webp',
    '/images/fotos-projetos-reais/ntidi/14.webp',
    '/images/fotos-projetos-reais/ntidi/15.webp',
    '/images/fotos-projetos-reais/ntidi/16.webp',
  ],
};
