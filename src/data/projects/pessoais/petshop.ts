import type { Project } from '../../../types';

export const petshop: Project = {
  id: 'ecommerce-petshop',
  slug: 'ecommerce-petshop',
  title: 'E-commerce PetShop',
  shortDescription: 'E-commerce de pet shop com painel admin em Laravel.',
  detailedDescription:
    'Loja virtual de pet shop em Laravel, com vitrine, carrinho, checkout em etapas e painel administrativo.',
  description:
    'Loja virtual de pet shop em Laravel, com vitrine, carrinho, checkout em etapas e painel administrativo.',
  image: '/images/fotos-projetos-pessoais/petshop/cover.webp',
  github: 'https://github.com/Victorkaue333/E-commerce_PetShop',
  detailPath: '/projetos/ecommerce-petshop',
  technologies: ['Laravel', 'PHP', 'Bootstrap', 'Chart.js'],
  stack: ['PHP', 'Laravel', 'Bootstrap'],
  category: 'pessoal',
  teamSize: 1,
  caseStudy: {
    overview: [
      'Loja virtual de pet shop em Laravel, com vitrine, carrinho, checkout em etapas e painel administrativo com relatórios financeiros.',
      'Projeto de estudo para praticar um e-commerce de ponta a ponta — do catálogo ao pós-venda.',
    ],
    audiences: [
      { who: 'Clientes', goal: 'Buscam produtos, montam o carrinho e fecham o pedido.' },
      { who: 'Administração', goal: 'Gerencia catálogo, cupons, pedidos e o financeiro.' },
    ],
    challenge:
      'Fechar um pedido sem inconsistência: baixar estoque, aplicar cupom e registrar o pagamento precisam acontecer juntos — ou nada acontece.',
    solution:
      'Serviços separados para carrinho, pedido e pagamento. O pedido nasce numa única transação no banco, que copia o endereço, baixa o estoque, contabiliza o cupom e cria o pagamento; cancelar devolve o estoque.',
    result:
      'Loja com catálogo, avaliações, cupons, checkout com CEP automático e painel admin com gráficos e exportação em CSV. O pagamento é simulado, sem gateway real.',
    features: [
      {
        title: 'Loja',
        items: [
          'Busca, filtro por preço, ordenação e categorias',
          'Promoções e avaliações de 1 a 5',
          'Carrinho salvo no banco, com cupom de desconto',
        ],
      },
      {
        title: 'Checkout',
        items: [
          'Endereço → pagamento → confirmação',
          'CEP preenchido pelo ViaCEP',
          'Pix, boleto e cartão simulados',
          'E-mails de pedido criado e pago',
        ],
      },
      {
        title: 'Admin',
        items: [
          'Dashboard e financeiro com gráficos',
          'Produtos com galeria, categorias e cupons',
          'Gestão de pedidos e usuários',
          'Exportação em CSV',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Loja e admin', detail: 'Blade + Bootstrap 5' },
        { icon: 'server', label: 'Aplicação', detail: 'Laravel 11: controllers + services' },
        { icon: 'integration', label: 'Externos', detail: 'ViaCEP' },
        { icon: 'database', label: 'Banco', detail: 'SQLite (MySQL suportado)' },
      ],
      highlights: [
        'Regras de negócio em services (Cart, Order, Payment), com controllers finos.',
        'Middlewares separam o acesso de administrador e de usuário ativo.',
      ],
    },
    decisions: [
      {
        topic: 'Pedido',
        choice: 'Uma transação para tudo',
        why: 'Estoque, cupom e pagamento não ficam pela metade se algo falhar no meio.',
      },
      {
        topic: 'Endereço',
        choice: 'Copiado para o pedido',
        why: 'Mudar o endereço do cliente depois não altera pedidos antigos.',
      },
      {
        topic: 'Pagamento',
        choice: 'Simulado',
        why: 'Permite exercitar o fluxo completo sem credencial de gateway.',
      },
    ],
    stack: [
      { name: 'PHP', role: 'Linguagem (8.2)' },
      { name: 'Laravel', role: 'Framework (11), com Breeze e Sanctum' },
      { name: 'Bootstrap', role: 'Interface (5.3)' },
      { name: 'Chart.js', role: 'Gráficos do painel' },
      { name: 'SQLite', role: 'Banco em desenvolvimento' },
    ],
    roadmap: [
      'Gateway de pagamento real (Mercado Pago)',
      'Frete pelos Correios',
      'Lista de desejos e autenticação em dois fatores',
      'Testes automatizados e CI/CD',
    ],
  },
};
