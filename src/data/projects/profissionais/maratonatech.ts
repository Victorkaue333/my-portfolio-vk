import type { Project } from '../../../types';

export const maratonatech: Project = {
  id: 'maratonatech',
  slug: 'maratonatech',
  title: 'MaratonaTech',
  shortDescription: 'Gestão de eventos de pitch e votação online.',
  detailedDescription:
    'Plataforma para cadastro de apresentações, acompanhamento de rodadas e votação digital.',
  description:
    'Plataforma web para gestão de eventos de pitch, incluindo cadastro de apresentações e sistema de votação online.',
  image: '/images/fotos-projetos-reais/maratonatech/MaratonaTech.webp',
  detailPath: '/projetos/maratonatech',
  technologies: ['Python', 'Django', 'Eventos'],
  stack: ['Python', 'Django'],
  features: ['Cadastro de pitch', 'Gestão de eventos', 'Votação online'],
  category: 'real',
  featured: true,
  summary: {
    problema: 'Dificuldade em organizar votações e pitches em tempo real em eventos',
    solucao: 'Plataforma digital para cadastro de apresentações e sistema de votação online',
    stack: 'Python e Django',
  },
  detailed_info: {
    desafio: 'Processar centenas de votos simultâneos durante a SNCT sem perda de dados ou lentidão.',
    solucao: 'Arquitetura Django otimizada com cache de vanguarda e validação de duplicidade de votos.',
    impacto: 'Agilidade na apuração dos resultados e interação em tempo real com o público do evento.',
    arquitetura: {
      frontend: 'Django + CSS Customizado',
      api: 'Processamento Síncrono/Assíncrono',
      banco: 'PostgreSQL estruturado',
    },
    decisoes: {
      autenticacao: 'Validadores de sessão por dispositivo',
      backend: 'Django Framework',
      deploy: 'Cloud para suporte a picos de tráfego',
      banco: 'PostgreSQL pela confiabilidade',
    },
    tech_v2: [
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'Django', icon: 'devicon-django-plain colored' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'Git', icon: 'devicon-git-plain colored' },
    ],
  },
};
