import type { Project } from '../../../types';

export const vaSuplementos: Project = {
  id: 'va-suplementos',
  slug: 'va-suplementos',
  title: 'VA Suplementos',
  shortDescription: 'Estoque, vendas e fiado de uma loja de suplementos.',
  detailedDescription:
    'Aplicação de controle operacional para fluxo de estoque e vendas no contexto de suplementos.',
  description: 'Sistema web para controle de estoque e gestão de vendas de suplementos.',
  image: '/images/fotos-projetos-reais/va_suplementos/cover.webp',
  detailPath: '/projetos/va-suplementos',
  technologies: ['Django', 'PostgreSQL', 'Bootstrap', 'Controle de Estoque'],
  stack: ['Python', 'Django', 'PostgreSQL'],
  category: 'real',
  experienceId: 'va-suplementos',
  privateCode: true,
  caseStudy: {
    overview: [
      'Sistema de gestão sob medida para uma loja de suplementos em Itacuruba-PE: estoque com validade e margem, vendas com carrinho, venda fiada com contas a receber e relatórios financeiros.',
      'Desenvolvido pela VK Software, cobre o ciclo inteiro da loja — da entrada do produto ao recebimento do fiado.',
    ],
    audiences: [
      { who: 'Administração', goal: 'Acompanha dashboards financeiros, fluxo de caixa e relatórios.' },
      { who: 'Operação', goal: 'Registra vendas, consulta estoque e cobra contas em aberto.' },
    ],
    challenge:
      'Unificar estoque, vendas e contas a receber de um varejo pequeno — incluindo a venda fiada, em que o produto sai na hora e o pagamento chega depois, às vezes em parcelas.',
    solution:
      'Monolito Django em cinco módulos (usuários, estoque, vendas, financeiro e gestão). A venda fiada baixa o estoque na hora e gera a conta a receber; pagamentos parciais abatem o saldo até a venda ficar quitada.',
    result:
      'A loja inteira num só sistema: alertas de estoque mínimo e validade, nota simplificada em PDF, fluxo de caixa, ranking de clientes e relatórios em PDF e Excel — com deploy configurado na Railway.',
    features: [
      {
        title: 'Estoque',
        items: [
          'Categoria, fornecedor, custo e preço sugerido',
          'Margem calculada automaticamente',
          'Alertas de estoque mínimo e de validade',
        ],
      },
      {
        title: 'Vendas',
        items: [
          'Carrinho com vários itens por transação',
          'Venda fiada com conta a receber',
          'Pagamentos parciais e tela de cobrança',
          'Nota simplificada em PDF',
        ],
      },
      {
        title: 'Gestão',
        items: [
          'Dashboards operacional e financeiro',
          'Fluxo de caixa',
          'Relatórios em PDF e Excel',
          'Ranking de clientes',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Interface', detail: 'Django Templates + Bootstrap 5' },
        { icon: 'server', label: 'Aplicação', detail: 'Django 5.1 em 5 apps + buscas internas' },
        { icon: 'database', label: 'Banco', detail: 'PostgreSQL (SQLite local)' },
        { icon: 'cloud', label: 'Deploy', detail: 'Railway: Gunicorn + WhiteNoise' },
      ],
      highlights: [
        'O pré-deploy roda as migrações e comandos idempotentes que garantem categorias padrão e usuários iniciais.',
        'Health check em /healthz/ e reinício automático em caso de falha.',
        'Relatórios gerados no servidor: PDF com ReportLab, planilhas com openpyxl.',
      ],
    },
    decisions: [
      {
        topic: 'Venda fiada',
        choice: 'Baixa de estoque na venda, não no pagamento',
        why: 'O produto sai da prateleira na hora; o estoque precisa refletir isso mesmo com a conta em aberto.',
      },
      {
        topic: 'Deploy',
        choice: 'Comandos idempotentes no pré-deploy',
        why: 'Cada deploy cria o que falta (categorias, admin, perfis) sem duplicar o que já existe.',
      },
      {
        topic: 'Banco',
        choice: 'PostgreSQL em produção, SQLite local',
        why: 'Desenvolvimento sem setup; em produção, banco gerenciado pela Railway via DATABASE_URL.',
      },
      {
        topic: 'Relatórios',
        choice: 'PDF e Excel gerados no servidor',
        why: 'O arquivo sai pronto para imprimir ou enviar, igual em qualquer navegador.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem (3.11)' },
      { name: 'Django', role: 'Aplicação, ORM, autenticação e admin (5.1)' },
      { name: 'PostgreSQL', role: 'Banco em produção' },
      { name: 'Bootstrap', role: 'Interface (5)' },
      { name: 'ReportLab', role: 'Nota simplificada e relatórios em PDF' },
      { name: 'openpyxl', role: 'Exportação para Excel' },
      { name: 'Gunicorn', role: 'Servidor WSGI' },
      { name: 'Railway', role: 'Hospedagem e deploy' },
    ],
    roadmap: [
      'Permissões por perfil mais rígidas, validação e testes com CI',
      'Camada de serviços, fim de consultas N+1 e paginação',
      'Monitoramento, cache e tarefas assíncronas',
    ],
  },
};
