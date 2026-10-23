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
  technologies: ['Python', 'Django', 'Docker', 'Eventos'],
  stack: ['Python', 'Django', 'SQLite', 'Docker'],
  category: 'real',
  status: 'delivered',
  featured: true,
  privateCode: true,
  teamType: 'team',
  experienceId: 'if-sertao',
  role: {
    title: 'Desenvolvedor Full Stack · extensionista',
    mine: [
      'Levantamento de requisitos e definição da arquitetura',
      'Sistema de votação com voto único e rastreabilidade',
      'Interfaces e integração entre front-end e back-end',
      'Empacotamento em Docker para o deploy',
      'Apoio técnico à equipe',
    ],
    team: ['Outros três contribuidores no histórico original do repositório (nov/2025–abr/2026)'],
  },
  caseStudy: {
    overview: [
      'Plataforma criada para conduzir a votação de um evento de pitch da SNCT (Semana Nacional de Ciência e Tecnologia): cadastro das startups, abertura e encerramento das rodadas pelo organizador e voto do público pelo celular.',
      'O foco é a regra de negócio da votação: cada pessoa vota uma vez por sessão, a sessão só aceita voto dentro da janela definida e o pódio sai calculado quando ela encerra.',
      'A plataforma — chamada Maratona Pitch — foi usada na edição 2025 do evento e está encerrada desde dezembro de 2025.',
    ],
    audiences: [
      { who: 'Organização', goal: 'Cadastra startups, abre e encerra sessões e acompanha o painel.' },
      { who: 'Público', goal: 'Vota na startup favorita durante a janela da sessão.' },
      { who: 'Startups', goal: 'Têm equipe, categoria, problema e diferencial apresentados.' },
    ],
    challenge:
      'Votação ao vivo não admite erro: um voto duplicado ou um pódio errado na frente da plateia derruba a credibilidade do evento — e a janela para corrigir é de minutos.',
    solution:
      'Sessões de votação com estado (agendada, aberta, encerrada), janela de horário e voto único por pessoa e sessão, garantido pelo banco e não só pela tela. O Top 3 é calculado automaticamente no encerramento.',
    result:
      'O organizador abre, encerra e apura cada rodada pelo painel, sem planilha: o pódio sai no fechamento da sessão, com auditoria das ações de cada sessão, IP e horário de cada voto e histórico de alterações das startups.',
    features: [
      {
        title: 'Votação',
        items: [
          'Sessões agendadas, abertas ou encerradas, com janela de horário',
          'Voto único por pessoa e sessão, com IP registrado',
          'Top 3 automático no encerramento (desempate alfabético)',
        ],
      },
      {
        title: 'Evento',
        items: [
          'Cadastro de startups com equipe, categoria, problema e diferencial',
          'Cadastro de jurados',
          'Painel administrativo do evento',
        ],
      },
      {
        title: 'Controle',
        items: [
          'Auditoria das ações de sessão: criar, abrir, encerrar',
          'Histórico de alterações das startups',
          'Endpoints JSON para abrir, encerrar e apurar a votação',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'device', label: 'Votante', detail: 'Navegador no celular' },
        { icon: 'server', label: 'Aplicação', detail: 'Django 5.1: votação, rankings e dashboard' },
        { icon: 'database', label: 'Banco', detail: 'SQLite' },
        { icon: 'cloud', label: 'Execução', detail: 'Container Docker com Gunicorn' },
      ],
      highlights: [
        'Monolito Django dividido em apps: administração, votação, rankings e dashboard.',
        'Voto duplicado barrado em três camadas: botão desabilitado, inserção atômica e restrição única no banco.',
        'Imagem Docker multi-stage com Gunicorn e WhiteNoise para os estáticos.',
      ],
    },
    decisions: [
      {
        topic: 'Voto único',
        choice: 'Restrição única no banco (pessoa + sessão)',
        why: 'A tela pode falhar ou ser burlada; o banco simplesmente não aceita o segundo registro.',
      },
      {
        topic: 'Apuração',
        choice: 'Top 3 calculado no encerramento',
        why: 'O resultado sai na hora, sem contagem manual.',
        tradeoff: 'O desempate ficou só alfabético; a regra configurável por sessão não chegou a ser usada.',
      },
      {
        topic: 'Sessões',
        choice: 'Estados agendada → aberta → encerrada',
        why: 'Deixa explícito quando a votação aceita voto, e o organizador controla cada rodada.',
      },
      {
        topic: 'API',
        choice: 'JsonResponse do Django, sem DRF',
        why: 'Poucos endpoints internos; o Django puro resolve sem dependência extra.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem (3.11)' },
      { name: 'Django', role: 'Aplicação, ORM, autenticação e admin (5.1)' },
      { name: 'SQLite', role: 'Banco padrão (DATABASE_URL para produção)' },
      { name: 'Docker', role: 'Imagem multi-stage para deploy' },
      { name: 'Gunicorn', role: 'Servidor WSGI' },
    ],
    limitations: [
      'Sistema encerrado no código desde dezembro de 2025',
      'Sem suíte de testes automatizados (só scripts manuais)',
      'Pontuação técnica dos jurados não implementada: o voto do jurado vale como os demais',
    ],
    roadmap: [
      'Nova geração planejada em ADRs: Next.js, NestJS, Prisma e PostgreSQL (ainda não implementada)',
      'Suíte de testes automatizados',
    ],
  },
};
