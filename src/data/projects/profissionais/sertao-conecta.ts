import type { Project } from '../../../types';

export const sertaoConecta: Project = {
  id: 'sertao-conecta',
  slug: 'sertao-conecta',
  title: 'Sertão Conecta',
  shortDescription: 'Plataforma de cursos gamificada do IF Sertão-PE.',
  detailedDescription:
    'Plataforma de cursos online gratuitos do IF Sertão-PE Campus Floresta, com minijogos, gamificação e certificado digital verificável.',
  description:
    'Plataforma de cursos online gratuitos do IF Sertão-PE Campus Floresta, com minijogos, gamificação e certificado digital verificável.',
  image: '/images/fotos-projetos-reais/sertao-conecta/cover.webp',
  online: 'https://sertaoconecta.floresta.ifsertao-pe.edu.br/',
  detailPath: '/projetos/sertao-conecta',
  technologies: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Docker'],
  stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Docker'],
  category: 'real',
  status: 'production',
  privateCode: true,
  teamType: 'pair',
  experienceId: 'if-sertao',
  role: {
    title: 'Tech lead · aluno extensionista',
    mine: [
      'Definição da stack e da arquitetura',
      'Back-end e modelagem do banco',
      'Segurança: autorização por RLS, LGPD e auditoria',
      'Infraestrutura: migração para servidor próprio e CI/CD',
      'Gamificação e certificados no servidor',
    ],
    team: [
      'Giselle Novaes: aplicação React (telas de aluno e professor), motores dos minijogos, player de vídeo e parte das migrations e do certificado',
    ],
  },
  metrics: [
    { value: '16', label: 'Edge Functions no servidor' },
    { value: '212', label: 'migrations versionadas' },
    { value: '110', label: 'arquivos de teste (Vitest e Playwright)' },
  ],
  caseStudy: {
    overview: [
      'Plataforma de cursos online gratuitos do IF Sertão-PE Campus Floresta, instalável como app: trilhas, minijogos configurados pelo professor, gamificação com XP e ranking, e certificado digital com validação pública.',
      'Nasceu como projeto de extensão. Fui o tech lead — stack, back-end, banco, segurança e infraestrutura —, com a Giselle Novaes na aplicação React; os dois atuaram full stack, com focos diferentes.',
    ],
    audiences: [
      { who: 'Alunos', goal: 'Estudam pelo celular, jogam, sobem no ranking e emitem certificado.' },
      { who: 'Professores', goal: 'Montam cursos e configuram minijogos sem programar.' },
      { who: 'Administração', goal: 'Faz curadoria, auditoria e acompanha os indicadores.' },
    ],
    challenge:
      'Levar formação gratuita a um público que estuda pelo celular, muitas vezes com conexão fraca, com o que Moodle e Classroom não trazem prontos: gamificação nativa, minijogos que o professor configura, matrícula por ciclos que não apaga o progresso e certificado à prova de fraude.',
    solution:
      'SPA em React sobre Supabase auto-hospedado, com a autorização no próprio banco (RLS) e a lógica sensível em triggers e Edge Functions: o XP é concedido por trigger que impede ganho em dobro, e o certificado é gerado no servidor com código de validação pública.',
    result:
      'Plataforma em produção no domínio do IF Sertão-PE, rodando em servidor do próprio instituto com deploy automatizado — sem depender de nuvem de terceiros para os dados dos alunos.',
    features: [
      {
        title: 'Aprendizado',
        items: [
          'Vitrine de cursos e trilhas',
          'Matrícula por ciclos, com expiração automática',
          'Vídeo só conta como assistido com 98% visto, conferido no servidor',
          'Fórum em tempo real',
        ],
      },
      {
        title: 'Gamificação',
        items: [
          '6 minijogos: quiz, caça-palavras, cruzadinha, anagrama, lacunas e pares',
          'XP, moedas, missões, medalhas e ranking',
          'Configurador de jogos para o professor',
        ],
      },
      {
        title: 'Certificação e gestão',
        items: [
          'Certificado em PDF com validação pública do código',
          'Construtor de cursos',
          'Curadoria, auditoria, LGPD e analytics',
          'Instalável como app (PWA)',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'App', detail: 'React 19 + PWA' },
        { icon: 'api', label: 'Gateway', detail: 'Kong: Auth, REST e Realtime' },
        { icon: 'server', label: 'Funções', detail: 'Edge Functions em Deno' },
        { icon: 'database', label: 'Banco', detail: 'PostgreSQL com RLS e pg_cron' },
        { icon: 'cloud', label: 'Infra', detail: 'Servidor do instituto com Docker' },
      ],
      highlights: [
        'Sem back-end intermediário: o app fala com o Supabase por uma camada de serviços, e o banco decide quem pode o quê.',
        'Regras de pontuação e matrícula vivem no banco, em triggers e jobs agendados (pg_cron).',
        'Monitoramento com Sentry, Prometheus e Grafana.',
        'Workflows no GitHub Actions para testes, migrations, funções e deploy.',
      ],
    },
    decisions: [
      {
        topic: 'Autorização',
        choice: 'RLS-first',
        why: 'A regra de acesso fica no banco; nenhum ajuste no front-end expõe dado que não devia.',
      },
      {
        topic: 'Hospedagem',
        choice: 'Supabase auto-hospedado no instituto',
        why: 'Saiu de Vercel + Supabase Cloud por soberania dos dados dos alunos, LGPD, custo e independência de fornecedor.',
        tradeoff: 'Mudança de configuração do Supabase não tem deploy automático: é feita no servidor.',
      },
      {
        topic: 'Pontuação',
        choice: 'XP concedido por trigger',
        why: 'O cliente não decide quanto ganha, e um registro impede ganhar duas vezes pela mesma ação.',
      },
      {
        topic: 'Minijogos',
        choice: 'Configuração em JSONB',
        why: 'O professor monta cada jogo pelo painel, sem tabela nova nem deploy por tipo de conteúdo.',
      },
    ],
    stack: [
      { name: 'React', role: 'Interface (19)' },
      { name: 'TypeScript', role: 'Tipagem do front-end' },
      { name: 'Vite', role: 'Build e PWA' },
      { name: 'Tailwind CSS', role: 'Estilos' },
      { name: 'shadcn/ui', role: 'Componentes acessíveis (Radix)' },
      { name: 'Supabase', role: 'Auth, REST, Realtime e Storage, auto-hospedado' },
      { name: 'PostgreSQL', role: 'Banco com RLS, triggers e pg_cron' },
      { name: 'Docker', role: 'Execução no servidor' },
      { name: 'GitHub Actions', role: 'CI/CD' },
      { name: 'Vitest', role: 'Testes unitários' },
      { name: 'Playwright', role: 'Testes E2E' },
    ],
    quality: [
      '110 arquivos de teste (105 Vitest, 5 Playwright) e pentests de RLS em SQL — contagem de 23/10/2026',
      'CI: lint, testes, build e E2E; migrations; deploy das funções; revisão de segurança com gitleaks e cobertura de RLS',
      'Deploy por runner self-hosted no servidor do instituto',
      'Observabilidade com Sentry (só com consentimento), Prometheus e Grafana',
      'LGPD: exportação e exclusão de dados e auditoria das ações administrativas',
      '23 decisões registradas em ADR, com as alternativas consideradas',
    ],
  },
  screenshots: [
    '/images/fotos-projetos-reais/sertao-conecta/cover.webp',
    '/images/fotos-projetos-reais/sertao-conecta/1.webp',
    '/images/fotos-projetos-reais/sertao-conecta/2.webp',
    '/images/fotos-projetos-reais/sertao-conecta/3.webp',
  ],
};
