import type { Project } from '../../../types';

export const suplastock: Project = {
  id: 'suplastock',
  slug: 'suplastock',
  title: 'SuplaStock',
  shortDescription: 'Versão produto de um sistema de gestão para lojas de suplementos.',
  detailedDescription:
    'Plataforma de gestão para lojas de suplementos, com landing pública, estoque, vendas e financeiro, desenvolvida em Django.',
  description:
    'Plataforma de gestão para lojas de suplementos, com landing pública, estoque, vendas e financeiro, desenvolvida em Django.',
  image: '/images/fotos-projetos-pessoais/suplastock/cover.webp',
  github: 'https://github.com/Victorkaue333/SuplaStock',
  detailPath: '/projetos/suplastock',
  technologies: ['Django', 'Python', 'PostgreSQL', 'Tailwind CSS', 'GSAP'],
  stack: ['Python', 'Django', 'PostgreSQL'],
  category: 'pessoal',
  teamSize: 1,
  caseStudy: {
    overview: [
      'Versão produto do sistema que desenvolvi para a VA Suplementos: o mesmo núcleo de estoque, vendas, fiado e financeiro, agora com marca própria, landing pública e fluxo de solicitação de acesso para outras lojas.',
      'O objetivo é transformar um sistema feito sob medida para um cliente num produto que possa ser oferecido a outras lojas do mesmo segmento.',
    ],
    audiences: [
      { who: 'Donos de loja', goal: 'Conhecem o sistema pela landing e pedem acesso.' },
      { who: 'Equipe da loja', goal: 'Controla estoque, vendas, fiado e financeiro no dia a dia.' },
    ],
    challenge:
      'Um sistema sob medida resolve um cliente; para virar produto, ele precisa se apresentar sozinho — explicar o que faz e levar o visitante até o pedido de acesso — sem mexer no núcleo que já funciona.',
    solution:
      'Uma camada de apresentação servida pelo próprio Django: landing em Tailwind com animações GSAP (hero em sequência, contadores, parallax e revelação ao rolar), mockup do painel feito em HTML e CSS, telas de login e recuperação de senha redesenhadas e uma rota de solicitação de acesso, por enquanto só registrada em log. O domínio de negócio veio do sistema da VA Suplementos sem alterações.',
    result:
      'Produto com vitrine pública sobre o mesmo núcleo de gestão da VA: estoque com validade e margem, vendas com carrinho, fiado com contas a receber e relatórios em PDF e Excel.',
    features: [
      {
        title: 'Apresentação',
        items: [
          'Landing pública com GSAP e ScrollTrigger',
          'Mockup do painel feito em HTML e CSS',
          'Login, recuperação e redefinição de senha redesenhados',
          'Tela de solicitação de acesso',
        ],
      },
      {
        title: 'Gestão',
        items: [
          'Estoque com validade, margem e alertas',
          'Vendas com carrinho e venda fiada',
          'Contas a receber e fluxo de caixa',
          'Relatórios em PDF e Excel',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Landing', detail: 'Tailwind + GSAP' },
        { icon: 'client', label: 'Sistema', detail: 'Django Templates + Bootstrap 5' },
        { icon: 'server', label: 'Aplicação', detail: 'Django 5.1: estoque, vendas e financeiro' },
        { icon: 'database', label: 'Banco', detail: 'PostgreSQL (SQLite local)' },
      ],
      highlights: [
        'A landing usa Tailwind e GSAP; as telas autenticadas seguem em Bootstrap, com estilos e estáticos separados.',
        'Deploy configurado para a Railway, com health check e Gunicorn.',
      ],
    },
    decisions: [
      {
        topic: 'Evolução',
        choice: 'Produto derivado do sistema do cliente',
        why: 'O núcleo já validado em uso real não precisa ser reescrito; o esforço vai para a apresentação.',
      },
      {
        topic: 'Animações',
        choice: 'GSAP + ScrollTrigger',
        why: 'Controle fino de sequência e rolagem sem adotar um framework de front-end.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem (3.11)' },
      { name: 'Django', role: 'Aplicação, autenticação e admin (5.1)' },
      { name: 'PostgreSQL', role: 'Banco em produção' },
      { name: 'Tailwind CSS', role: 'Estilos da landing' },
      { name: 'GSAP', role: 'Animações da landing' },
      { name: 'Bootstrap', role: 'Telas do sistema (5.3)' },
      { name: 'ReportLab', role: 'Relatórios em PDF' },
      { name: 'Chart.js', role: 'Gráficos do painel' },
    ],
    quality: [
      'Pré-deploy idempotente na Railway: migrações e dados iniciais sem duplicar',
      'Liveness (/healthz/) separado do check de banco, cache e storage',
      'Recebimentos com chave de idempotência e travas de linha no banco',
    ],
    limitations: [
      'Sem testes automatizados; o CI aponta para um app que não existe mais',
      'A solicitação de acesso não é salva nem notifica ninguém',
    ],
    roadmap: [
      'Salvar e notificar as solicitações de acesso',
      'Várias lojas na mesma instalação',
      'Números e depoimentos reais na landing',
    ],
  },
  screenshots: [
    '/images/fotos-projetos-pessoais/suplastock/tela-inicial.webp',
    '/images/fotos-projetos-pessoais/suplastock/1.webp',
    '/images/fotos-projetos-pessoais/suplastock/2.webp',
    '/images/fotos-projetos-pessoais/suplastock/3.webp',
  ],
};
