import type { Project } from '../../../types';

export const oliveiraKids: Project = {
  id: 'oliveira-kids',
  slug: 'oliveira-kids',
  title: 'Oliveira Kids',
  shortDescription: 'Cronometragem de carrinhos elétricos com painel em tempo real.',
  detailedDescription:
    'Sistema para controlar tempo de uso de carrinhos elétricos com operação visual, reduzindo erros em atendimento presencial.',
  description:
    'Sistema desenvolvido para controlar de forma simples, rápida e visual o tempo de uso de carrinhos elétricos e a operação do atendimento.',
  image: '/images/fotos-projetos-pessoais/oliveira-kids/oliveira-kids.webp',
  github: 'https://github.com/Victorkaue333/OliveiraKids',
  detailPath: '/projetos/oliveira-kids',
  technologies: ['Python', 'Django', 'HTMX', 'Bootstrap'],
  stack: ['Python', 'Django', 'HTMX', 'SQLite'],
  category: 'pessoal',
  caseStudy: {
    overview: [
      'Sistema que substitui o cronômetro do celular no aluguel de carrinhos elétricos infantis: o operador inicia a sessão com tempo definido, e o painel mostra por cor quais carrinhos estão livres, rodando ou com o tempo esgotado.',
      'Feito para o balcão da Oliveira Kids — cards grandes e legíveis em tablet ou celular, num ambiente de movimento, com vários carrinhos na pista ao mesmo tempo.',
    ],
    audiences: [
      { who: 'Operadores', goal: 'Iniciam e encerram sessões e acompanham o painel.' },
      { who: 'Administração', goal: 'Gerencia carrinhos e usuários e consulta o histórico completo.' },
    ],
    challenge:
      'Com vários carrinhos rodando juntos, controlar o tempo de cada um no celular gera esquecimento e erro. O controle precisava ser visual, confiável e mostrar o mesmo tempo em mais de um aparelho.',
    solution:
      'Django com HTMX: o painel se atualiza a cada 2 segundos sem recarregar a página, e o cronômetro regressivo é calculado pelo horário do servidor. Status por cor — amarelo livre, verde rodando, vermelho encerrado.',
    result:
      'A operação do aluguel num painel único, com alerta visual quando o tempo acaba e histórico de cada sessão: início, fim, duração prevista e real, operador e carrinho.',
    features: [
      {
        title: 'Operação',
        items: [
          'Sessões de 5, 10, 15, 20 ou 30 minutos',
          'Cronômetro regressivo em tempo real',
          'Card pulsa em vermelho quando o tempo acaba',
          'Status por cor: livre, em uso, encerrado',
        ],
      },
      {
        title: 'Gestão',
        items: [
          'Cadastro, edição e exclusão de carrinhos',
          'Perfis de operador e administrador',
          'Histórico de sessões com filtros',
          'Admin do Django personalizado',
        ],
      },
      {
        title: 'Instalação',
        items: [
          'Scripts para instalar e iniciar no Windows e no Linux',
          'Dados de teste para demonstração',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'device', label: 'Balcão', detail: 'Tablet ou celular no navegador' },
        { icon: 'client', label: 'Interface', detail: 'Templates + Bootstrap 5 + HTMX' },
        { icon: 'server', label: 'Aplicação', detail: 'Django 5: carrinhos, sessões e dashboard' },
        { icon: 'database', label: 'Banco', detail: 'SQLite local, PostgreSQL em produção' },
      ],
      highlights: [
        'Polling do HTMX a cada 2 segundos troca só os cards, sem recarregar a página.',
        'Tempo restante calculado pelo horário do servidor, não pelo relógio do aparelho.',
        'Apps separados por domínio: contas, carrinhos, sessões, dashboard e notificações.',
      ],
    },
    decisions: [
      {
        topic: 'Tempo real',
        choice: 'HTMX com polling',
        why: 'Atualização ao vivo sem SPA nem WebSocket; o HTML continua vindo do Django.',
      },
      {
        topic: 'Relógio',
        choice: 'Horário do servidor',
        why: 'Todos os aparelhos do balcão mostram o mesmo tempo, mesmo com relógios diferentes.',
      },
      {
        topic: 'Leitura',
        choice: 'Status por cor e cronômetro grande',
        why: 'O operador entende o painel de longe, sem parar o atendimento.',
      },
      {
        topic: 'Acesso',
        choice: 'Django Auth com dois perfis',
        why: 'O operador opera; cadastro de carrinhos e histórico geral ficam com a administração.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem' },
      { name: 'Django', role: 'Aplicação, autenticação e admin (5.0)' },
      { name: 'HTMX', role: 'Atualização dos cards sem recarregar (django-htmx)' },
      { name: 'Bootstrap', role: 'Interface responsiva (5)' },
      { name: 'SQLite', role: 'Banco local' },
      { name: 'PostgreSQL', role: 'Banco em produção' },
    ],
    roadmap: ['App de notificações, já previsto na estrutura do projeto'],
  },
  screenshots: [
    '/images/fotos-projetos-pessoais/oliveira-kids/oliveira-kids.webp',
    '/images/fotos-projetos-pessoais/oliveira-kids/1.webp',
    '/images/fotos-projetos-pessoais/oliveira-kids/2.webp',
    '/images/fotos-projetos-pessoais/oliveira-kids/3.webp',
    '/images/fotos-projetos-pessoais/oliveira-kids/4.webp',
    '/images/fotos-projetos-pessoais/oliveira-kids/5.webp',
    '/images/fotos-projetos-pessoais/oliveira-kids/6.webp',
    '/images/fotos-projetos-pessoais/oliveira-kids/7.webp',
    '/images/fotos-projetos-pessoais/oliveira-kids/8.webp',
  ],
};
