import type { Project } from '../../../types';

export const mavImob: Project = {
  id: 'mav-imob',
  slug: 'mav-imob',
  title: 'Mav Imob',
  shortDescription: 'Plataforma de imobiliária digital com parceiras.',
  detailedDescription:
    'Plataforma da Mav Imob, imobiliária digital da AEX Hub: recebe imóveis de imobiliárias parceiras, controla vendas e calcula repasses de comissão.',
  description:
    'Plataforma da Mav Imob, imobiliária digital da AEX Hub: recebe imóveis de imobiliárias parceiras, controla vendas e calcula repasses de comissão.',
  image: '/images/fotos-projetos-reais/mav-imob/cover.webp',
  detailPath: '/projetos/mav-imob',
  technologies: ['NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Redis'],
  stack: ['NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Redis'],
  category: 'real',
  experienceId: 'mavis-imob',
  status: 'mvp',
  privateCode: true,
  teamType: 'team',
  role: {
    title: 'Líder técnico',
    mine: [
      'Arquitetura da API e dos dois front-ends',
      'Integração com o Mavis OS por webhook assinado',
      'Regras de comissão, vendas e repasses',
      'Testes unitários e E2E',
      'Imagens Docker e pipeline de CI',
    ],
  },
  caseStudy: {
    overview: [
      'Plataforma da Mav Imob, imobiliária digital da AEX Hub que funciona sem loja física: imobiliárias parceiras enviam imóveis pelo Mavis OS, a Mav anuncia e vende com equipe própria, e a comissão de cada venda é dividida entre as duas.',
      'Sou o líder técnico do projeto, ainda em MVP e sem deploy em produção.',
    ],
    audiences: [
      { who: 'Equipe da Mav', goal: 'Gerencia imóveis, vendas, repasses e o resultado financeiro.' },
      { who: 'Corretores e captadores', goal: 'Trabalham os imóveis recebidos das parceiras.' },
      { who: 'Imobiliárias parceiras', goal: 'Acompanham imóveis enviados, vendas e repasses.' },
    ],
    challenge:
      'Dinheiro de terceiro não admite erro de centavo: cada venda divide a comissão entre a Mav e a parceira, e a soma das partes precisa fechar sempre — do cálculo ao repasse.',
    solution:
      'API NestJS com a regra de comissão numa função única, valores em Decimal e arredondamento half-even; a parte da Mav é o resto da subtração, então a soma sempre fecha. O recebimento de imóveis do Mavis OS por webhook com assinatura HMAC está pronto e testado contra um simulador; um worker em fila sincroniza os imóveis na vitrine.',
    result:
      'MVP com painel administrativo e portal do parceiro lendo a API real, vendas, repasses com pagamento idempotente, DRE e ranking de parceiras, coberto por testes unitários e E2E. Ainda sem deploy em produção.',
    features: [
      {
        title: 'Imóveis',
        items: [
          'Recebimento de imóveis por webhook assinado',
          'Sincronização dos imóveis na vitrine por worker em fila',
          'Fotos enviadas direto ao storage por URL assinada',
          'Cadastro da equipe e das parceiras, com senha temporária e troca obrigatória',
        ],
      },
      {
        title: 'Financeiro',
        items: [
          'Vendas com divisão de comissão',
          'Repasses com pagamento idempotente',
          'DRE e visão geral',
          'Ranking de parceiras',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'integration', label: 'Mavis OS', detail: 'Webhooks com assinatura HMAC' },
        { icon: 'client', label: 'Front-ends', detail: 'React: admin e portal do parceiro' },
        { icon: 'server', label: 'API', detail: 'NestJS com guards de acesso' },
        { icon: 'queue', label: 'Fila', detail: 'BullMQ no Redis' },
        { icon: 'database', label: 'Banco', detail: 'PostgreSQL 17 + Prisma' },
      ],
      highlights: [
        'O login vai direto ao Supabase Auth; a API só valida o JWT pelas chaves públicas (JWKS).',
        'Guards em sequência: limite de requisições, autenticação e escopo por perfil.',
        'Um teste quebra o CI se os valores da divisão de comissão aparecerem fora da função oficial.',
      ],
    },
    decisions: [
      {
        topic: 'Comissão',
        choice: 'Uma única função de cálculo',
        why: 'Regra de dinheiro espalhada vira divergência; um teste garante que ninguém a duplica.',
      },
      {
        topic: 'Arredondamento',
        choice: 'Decimal, half-even e parte da Mav por subtração',
        why: 'Arredondar as duas partes separadamente faria a soma não fechar em parte dos casos.',
      },
      {
        topic: 'Autenticação',
        choice: 'Supabase Auth + validação por JWKS',
        why: 'A API não guarda senha nem sessão; só confere a assinatura do token.',
      },
      {
        topic: 'Integração',
        choice: 'Webhook com assinatura HMAC',
        why: 'A Mav só aceita imóvel que de fato veio do Mavis OS.',
      },
      {
        topic: 'Repasses',
        choice: 'Pagamento idempotente',
        why: 'Repetir a mesma requisição não paga a parceira duas vezes.',
      },
    ],
    stack: [
      { name: 'TypeScript', role: 'Linguagem da API e dos front-ends' },
      { name: 'NestJS', role: 'API (v11)' },
      { name: 'React', role: 'Admin e portal do parceiro' },
      { name: 'Vite', role: 'Build dos front-ends' },
      { name: 'PostgreSQL', role: 'Banco de dados (17)' },
      { name: 'Prisma', role: 'ORM' },
      { name: 'Redis', role: 'Fila de jobs (BullMQ)' },
      { name: 'Supabase', role: 'Autenticação' },
      { name: 'Vitest', role: 'Testes unitários' },
      { name: 'Playwright', role: 'Testes E2E' },
    ],
    quality: [
      '98 arquivos de teste: Vitest na API (unitário e e2e) e Playwright nos dois front-ends',
      'CI no GitHub Actions: build e testes da API, qualidade dos front-ends e imagens Docker',
      'Teste-guardião que quebra o CI se a divisão da comissão for calculada fora da função oficial',
      'Guards globais de rate limit (Redis), autenticação e escopo, com isolamento por tenant',
    ],
    limitations: [
      'Sem deploy em produção',
      'O envio de imóveis pelo lado do Mavis OS ainda não foi implementado',
      'Os testes e2e da API ainda não rodam no CI',
    ],
    roadmap: ['Deploy em produção', 'Vitrine pública de imóveis', 'Login único com o Mavis OS'],
  },
};
