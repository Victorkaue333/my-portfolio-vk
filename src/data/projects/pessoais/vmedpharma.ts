import type { Project } from '../../../types';

export const vmedpharma: Project = {
  id: 'vmedpharma',
  slug: 'vmedpharma',
  title: 'VMED Pharma',
  shortDescription: 'Protótipo de app de farmácia em React Native.',
  detailedDescription:
    'Protótipo navegável de um app de farmácia em React Native com Expo, do login ao rastreamento da entrega.',
  description:
    'Protótipo navegável de um app de farmácia em React Native com Expo, do login ao rastreamento da entrega.',
  image: '/images/fotos-projetos-pessoais/vmedpharma/cover.webp',
  github: 'https://github.com/Victorkaue333/VMEDPharma',
  detailPath: '/projetos/vmedpharma',
  technologies: ['React Native', 'Expo', 'JavaScript'],
  stack: ['React Native', 'Expo', 'JavaScript'],
  category: 'pessoal',
  teamSize: 1,
  caseStudy: {
    overview: [
      'Protótipo navegável de um app de farmácia feito em React Native com Expo: do login ao rastreamento da entrega, passando por início, produto, carrinho, pagamento e perfil.',
    ],
    challenge:
      'Desenhar a jornada completa de compra num app mobile e validar a navegação entre as telas antes de existir back-end.',
    solution:
      'Onze telas num Stack Navigator, com carrinho em estado local (somar, diminuir, remover e total) e dados de exemplo no próprio código.',
    result:
      'Protótipo que percorre o fluxo inteiro do app. Login, busca e rastreamento são simulados, e ainda não há API.',
    features: [
      {
        items: [
          'Abertura, login e cadastro',
          'Início com destaques, promoções e mais vendidos',
          'Página de produto',
          'Carrinho com quantidade, remoção e total',
          'Pagamento e rastreamento do pedido',
          'Perfil com histórico e suporte',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'device', label: 'App', detail: 'React Native + Expo' },
        { icon: 'client', label: 'Navegação', detail: 'Stack Navigator com 11 telas' },
        { icon: 'storage', label: 'Dados', detail: 'Estado local + dados de exemplo' },
      ],
    },
    decisions: [
      {
        topic: 'Plataforma',
        choice: 'Expo',
        why: 'Roda no celular e no navegador sem configurar build nativo.',
      },
      {
        topic: 'Dados',
        choice: 'Mock no código',
        why: 'Valida a navegação e o layout antes de existir API.',
      },
    ],
    stack: [
      { name: 'React Native', role: 'Interface mobile (0.76)' },
      { name: 'Expo', role: 'Execução e build (SDK 52)' },
      { name: 'JavaScript', role: 'Linguagem' },
      { name: 'React Navigation', role: 'Navegação em pilha' },
    ],
    roadmap: ['Back-end com autenticação e catálogo real', 'Busca funcionando'],
  },
  screenshots: [
    '/images/fotos-projetos-pessoais/vmedpharma/cover.webp',
    '/images/fotos-projetos-pessoais/vmedpharma/1.webp',
    '/images/fotos-projetos-pessoais/vmedpharma/2.webp',
  ],
};
