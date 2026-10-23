import type { Project } from '../../../types';

export const queelvra: Project = {
  id: 'queelvra',
  slug: 'queelvra',
  title: 'Queelvra',
  shortDescription: 'Landing page orientada à conversão.',
  detailedDescription:
    'Página comercial com foco em performance, design objetivo e captura de leads.',
  description: 'Landing page de alta conversão para divulgação de serviços.',
  image: '/images/fotos-projetos-reais/queelvra/queelvra.webp',
  detailPath: '/projetos/queelvra',
  technologies: ['Landing Page', 'Front-end', 'Conversão'],
  stack: ['HTML', 'CSS', 'JavaScript'],
  category: 'real',
  privateCode: true,
  experienceId: 'ntidi',
  caseStudy: {
    overview: [
      'Landing page da Queelvra para divulgar serviços e transformar visitantes em contatos: leve, direta e construída em torno da copy comercial e das chamadas para ação.',
    ],
    challenge:
      'Transmitir autoridade logo na primeira dobra e conduzir o visitante até o contato, numa página que carregue rápido.',
    solution:
      'HTML semântico e CSS puros, com animações sutis e seções organizadas a partir da copy comercial. O formulário de contato envia os dados por integração via API.',
    result:
      'Página enxuta, sem framework nem banco de dados, com CTAs posicionados ao longo do fluxo de leitura e captação de leads pelo formulário.',
    features: [
      {
        items: [
          'Copy comercial estruturada por seções',
          'CTAs ao longo da página',
          'Formulário de contato integrado via API',
          'Animações sutis',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Página', detail: 'HTML5 semântico + CSS3' },
        { icon: 'integration', label: 'Formulário', detail: 'Envio de leads via API' },
      ],
    },
    decisions: [
      {
        topic: 'Stack',
        choice: 'HTML e CSS puros',
        why: 'Menos peso, carregamento imediato e nada para manter em servidor.',
      },
      {
        topic: 'Estrutura',
        choice: 'Seções guiadas pela copy',
        why: 'A ordem da página segue o argumento de venda, não o contrário.',
      },
    ],
    stack: [
      { name: 'HTML5', role: 'Estrutura semântica' },
      { name: 'CSS3', role: 'Layout e animações' },
      { name: 'JavaScript', role: 'Interações e envio do formulário' },
    ],
  },
};
