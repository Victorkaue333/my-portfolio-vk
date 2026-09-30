import type { Project } from '../../../types';

export const peNaEstrada: Project = {
  id: 'pe-na-estrada',
  slug: 'pe-na-estrada',
  title: 'Pé na Estrada',
  shortDescription: 'Venda de passagens de ônibus em PHP puro.',
  detailedDescription:
    'Site de venda de passagens de ônibus em PHP puro, com busca de rotas, checkout e área do passageiro.',
  description:
    'Site de venda de passagens de ônibus em PHP puro, com busca de rotas, checkout e área do passageiro.',
  image: '/images/fotos-projetos-pessoais/pe-na-estrada/cover.webp',
  github: 'https://github.com/Victorkaue333/Pe-na-Estrada',
  detailPath: '/projetos/pe-na-estrada',
  technologies: ['PHP', 'SQLite', 'Bootstrap', 'JavaScript'],
  stack: ['PHP', 'SQLite', 'Bootstrap'],
  category: 'pessoal',
  teamSize: 1,
  caseStudy: {
    overview: [
      'Site de venda de passagens de ônibus em PHP puro: busca por origem, destino e data, compra com escolha de pagamento e histórico de compras do passageiro.',
      'Começou como trabalho da disciplina de Desenvolvimento Web e depois foi refatorado com foco em segurança e organização do código.',
    ],
    challenge:
      'Montar um fluxo de compra completo — busca, cadastro, checkout e histórico — sem framework, cuidando por conta própria de roteamento, sessão e segurança.',
    solution:
      'Front controller com lista fechada de páginas, PDO com prepared statements, token CSRF, senhas com password_hash e sessão regenerada no login. O banco SQLite se cria sozinho na primeira execução, já com rotas de exemplo.',
    result:
      'Aplicação completa em PHP 8.2 sem framework, com as URLs da versão antiga redirecionando para as rotas novas depois da refatoração.',
    features: [
      {
        title: 'Passagens',
        items: [
          'Busca por origem, destino e data',
          'Lista de rotas e detalhe da passagem',
          'Checkout com Pix, transferência ou cartão (simulado)',
          'Minhas compras',
        ],
      },
      {
        title: 'Conta e segurança',
        items: [
          'Cadastro com validação de CPF, UF e senha',
          'Token CSRF e cookie httponly com SameSite',
          'Proteção contra redirecionamento aberto',
          'SQL com prepared statements',
        ],
      },
      {
        title: 'Interface',
        items: [
          'Animações de entrada e efeito ripple',
          'Mostrar senha com atributos de acessibilidade',
          'Validação de formulário no navegador',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Interface', detail: 'Bootstrap 5 + JavaScript puro' },
        { icon: 'server', label: 'Roteador', detail: 'index.php?page= com lista fechada' },
        { icon: 'api', label: 'Núcleo', detail: 'Classes Security e Database' },
        { icon: 'database', label: 'Banco', detail: 'SQLite via PDO' },
      ],
    },
    decisions: [
      {
        topic: 'Roteamento',
        choice: 'Front controller com lista fechada',
        why: 'Página fora da lista cai no 404; nenhum arquivo é incluído a partir da URL.',
      },
      {
        topic: 'Banco',
        choice: 'SQLite criado na primeira execução',
        why: 'Roda em qualquer máquina com PHP, sem instalar servidor de banco.',
      },
      {
        topic: 'Cartão',
        choice: 'Só os 4 últimos dígitos',
        why: 'O sistema não guarda dado de cartão que não precisa.',
      },
      {
        topic: 'Refatoração',
        choice: 'Redirecionar as URLs antigas',
        why: 'Links da versão anterior continuam funcionando.',
      },
    ],
    stack: [
      { name: 'PHP', role: 'Linguagem (8.2)' },
      { name: 'SQLite', role: 'Banco via PDO' },
      { name: 'Bootstrap', role: 'Interface (5.3)' },
      { name: 'JavaScript', role: 'Animações e validação' },
    ],
  },
};
