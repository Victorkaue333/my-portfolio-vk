import type { Project } from '../../../types';

export const agendeaqui: Project = {
  id: 'agendeaqui',
  slug: 'agendeaqui',
  title: 'AgendeAqui',
  shortDescription: 'Reserva de salas e laboratórios com fluxo de aprovação.',
  detailedDescription:
    'Aplicação web desenvolvida em Django para autenticar usuários, organizar horários e centralizar o fluxo de agendamentos.',
  description:
    'Plataforma web desenvolvida em Django para gestão de agendamentos, autenticação de usuários e organização de horários e espaços.',
  image: '/images/fotos-projetos-pessoais/agendeaqui/agendeaqui.webp',
  github: 'https://github.com/Victorkaue333/AgendeAqui',
  detailPath: '/projetos/agendeaqui',
  technologies: ['Django', 'PostgreSQL', 'Redis', 'Docker', 'Bootstrap'],
  stack: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'Bootstrap'],
  category: 'pessoal',
  status: 'delivered',
  teamSize: 1,
  duration: 'nov 2025 – jan 2026',
  caseStudy: {
    overview: [
      'Sistema de reservas de salas, laboratórios e auditórios para instituições de ensino: o professor pede, a coordenação aprova ou reprova com justificativa, e cada perfil acompanha o próprio fluxo.',
      'Foi o trabalho de conclusão do curso FIC de Desenvolvimento Web com Django — construído com filas assíncronas, CI e ambiente completo em containers.',
    ],
    audiences: [
      { who: 'Professores', goal: 'Solicitam reservas, acompanham o status e cancelam quando preciso.' },
      { who: 'Coordenação', goal: 'Aprova ou reprova pedidos com justificativa e acompanha o uso das salas.' },
      { who: 'Administração', goal: 'Cadastra blocos, salas, recursos e usuários.' },
    ],
    challenge:
      'Dar a cada perfil só o que lhe cabe — quem pede não aprova, quem aprova não mexe no cadastro de salas — sem deixar a tela esperando o envio de e-mail.',
    solution:
      'Monolito Django com três perfis e fluxo Pendente → Aprovado/Reprovado. E-mails e lembretes saem por Celery com Redis, fora do ciclo da requisição, e as ações de gestão de usuários ficam em log de auditoria.',
    result:
      'Fluxo de reserva completo, do pedido à aprovação, com calendário, dashboards por perfil e relatórios em CSV — e um pipeline de CI com lint, testes com cobertura e análise de segurança.',
    features: [
      {
        title: 'Reservas',
        items: [
          'Pedido com status Pendente, Aprovado ou Reprovado',
          'Cancelamento pelo solicitante, com 24 h de antecedência',
          'Calendário de ocupação (FullCalendar)',
          'Salas por bloco, com recursos vinculados',
        ],
      },
      {
        title: 'Gestão',
        items: [
          'Dashboard por perfil com gráficos',
          'Top 5 salas e usuários e taxa de aprovação',
          'Relatórios com exportação CSV',
          'Log de auditoria da gestão de usuários',
        ],
      },
      {
        title: 'Notificações',
        items: [
          'E-mails de aprovação, reprovação, cancelamento e boas-vindas',
          'Até 3 novas tentativas quando o envio falha',
          'Lembrete diário e limpeza de pendentes agendados no Celery',
          'Notificações dentro do sistema',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Interface', detail: 'Django Templates + Bootstrap 5' },
        { icon: 'server', label: 'Aplicação', detail: 'Django 5 com Gunicorn atrás do Nginx' },
        { icon: 'queue', label: 'Tarefas', detail: 'Celery worker e beat, fila no Redis' },
        { icon: 'database', label: 'Banco', detail: 'PostgreSQL 15 (SQLite em dev)' },
      ],
      highlights: [
        'Sete apps Django com responsabilidades separadas, renderizados no servidor.',
        'Docker Compose sobe web, PostgreSQL, Redis, worker e beat do Celery, Nginx e Certbot.',
        'GitHub Actions roda lint, pytest com cobertura, Bandit e Safety e gera a imagem Docker.',
      ],
    },
    decisions: [
      {
        topic: 'Permissões',
        choice: 'Três perfis com papéis separados',
        why: 'Quem pede não aprova; quem aprova não altera o cadastro de salas.',
      },
      {
        topic: 'Tarefas lentas',
        choice: 'Celery + Redis',
        why: 'E-mail e lembrete não seguram a resposta da página, e uma falha de envio é repetida sem o usuário perceber.',
      },
      {
        topic: 'Senhas',
        choice: 'Hash Argon2',
        why: 'Algoritmo que exige memória, mais resistente a força bruta do que o hasher padrão do Django.',
      },
      {
        topic: 'Banco',
        choice: 'SQLite em dev, PostgreSQL em produção',
        why: 'Desenvolvimento sem setup; no servidor, concorrência e integridade de um banco completo.',
      },
      {
        topic: 'Deploy',
        choice: 'Docker Compose + Nginx',
        why: 'O mesmo ambiente sobe em qualquer servidor Linux, com HTTPS via Certbot.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem (3.11)' },
      { name: 'Django', role: 'Aplicação, ORM, autenticação e admin (5.0)' },
      { name: 'PostgreSQL', role: 'Banco em produção' },
      { name: 'Redis', role: 'Broker do Celery e cache' },
      { name: 'Celery', role: 'E-mails assíncronos e tarefas agendadas' },
      { name: 'Bootstrap', role: 'Interface responsiva (5.3)' },
      { name: 'Docker', role: 'Ambiente completo com Compose' },
      { name: 'Nginx', role: 'Proxy reverso com HTTPS' },
      { name: 'GitHub Actions', role: 'CI: lint, testes, segurança e deploy' },
    ],
    quality: [
      '19 testes com pytest (modelos, usuários e cadastro)',
      'CI com lint, cobertura, Bandit e Safety — hoje informativos, sem bloquear o build',
      'Senhas com Argon2 e middleware de acesso por perfil',
    ],
    limitations: [
      'A validação de conflito entre reservas aprovadas existia na primeira versão e foi removida no branch atual',
      'O agendador do Celery beat está desabilitado nas settings: lembrete e limpeza não rodam como estão',
      'As configurações do Nginx e do Certbot não estão no repositório',
      'Relatórios só em CSV (o PDF previsto nos requisitos não foi feito)',
    ],
  },
  screenshots: [
    '/images/fotos-projetos-pessoais/agendeaqui/agendeaqui.webp',
    '/images/fotos-projetos-pessoais/agendeaqui/1.webp',
    '/images/fotos-projetos-pessoais/agendeaqui/2.webp',
    '/images/fotos-projetos-pessoais/agendeaqui/3.webp',
    '/images/fotos-projetos-pessoais/agendeaqui/4.webp',
    '/images/fotos-projetos-pessoais/agendeaqui/5.webp',
    '/images/fotos-projetos-pessoais/agendeaqui/6.webp',
    '/images/fotos-projetos-pessoais/agendeaqui/7.webp',
  ],
  // Galeria: as telas na ordem acima e o modelo conceitual que está no repositório.
  media: [
    ...[0, 1, 2, 3, 4, 5, 6, 7].map((n) => ({
      src: n === 0
        ? '/images/fotos-projetos-pessoais/agendeaqui/agendeaqui.webp'
        : `/images/fotos-projetos-pessoais/agendeaqui/${n}.webp`,
      type: 'screenshot' as const,
      alt: '',
    })),
    {
      src: '/images/fotos-projetos-pessoais/agendeaqui/diagrama-er.webp',
      type: 'diagram',
      alt: 'Diagrama entidade-relacionamento: Usuário solicita Agendamento; Sala recebe Agendamento, pertence a um Bloco e possui Recursos',
      caption: 'Modelo conceitual do banco (documentação do projeto)',
    },
  ],
};
