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
  technologies: ['Django', 'MySQL', 'SaaS'],
  stack: ['Python', 'Django', 'MySQL'],
  features: ['Gestão escolar', 'Fluxo administrativo', 'Sistema web corporativo'],
  category: 'real',
  featured: true,
  summary: {
    problema: 'Processos administrativos escolares descentralizados e manuais',
    solucao: 'Sistema web centralizado para gestão de demandas e fluxos educacionais',
    stack: 'Python, Django e MySQL',
  },
  detailed_info: {
    desafio: 'Centralizar a gestão de demandas de diversas escolas em uma única plataforma regional com fluxos de aprovação.',
    solucao: 'Desenvolvimento de um sistema SaaS sob medida com painéis administrativos e relatórios automatizados.',
    impacto: 'Otimização do tempo de resposta da gerência regional e maior transparência nos processos escolares.',
    arquitetura: {
      frontend: 'Django Templates + JavaScript',
      api: 'Monolito Django',
      banco: 'MySQL para dados relacionais',
    },
    decisoes: {
      autenticacao: 'Django Auth com níveis de acesso',
      backend: 'Django Framework',
      deploy: 'Servidor Linux com Nginx/Gunicorn',
      banco: 'MySQL pela robustez corporativa',
    },
    tech_v2: [
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'Django', icon: 'devicon-django-plain colored' },
      { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
      { name: 'Git', icon: 'devicon-git-plain colored' },
    ],
  },
};
