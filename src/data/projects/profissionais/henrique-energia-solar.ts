import type { Project } from '../../../types';

export const henriqueEnergiaSolar: Project = {
  id: 'henrique-energia-solar',
  slug: 'henrique-energia-solar',
  title: 'Henrique Energia Solar',
  shortDescription: 'Site institucional com simulador de economia solar.',
  detailedDescription:
    'Site institucional de uma empresa de energia solar de Glória-BA, com simulador de economia, portfólio e contato direto pelo WhatsApp.',
  description:
    'Site institucional de uma empresa de energia solar de Glória-BA, com simulador de economia, portfólio e contato direto pelo WhatsApp.',
  image: '/images/fotos-projetos-reais/henrique-energia-solar/cover.webp',
  online: 'https://henrique-energia-solar.vercel.app/',
  detailPath: '/projetos/henrique-energia-solar',
  technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vercel'],
  stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  category: 'real',
  status: 'production',
  teamSize: 1,
  privateCode: true,
  experienceId: 'henrique-energia-solar',
  metrics: [
    { value: '73', label: 'Performance (Lighthouse mobile)' },
    { value: '97', label: 'Acessibilidade' },
    { value: '100', label: 'Boas práticas' },
    { value: '100', label: 'SEO' },
  ],
  caseStudy: {
    overview: [
      'Site institucional de uma empresa de energia solar de Glória-BA, feito para transformar visita em pedido de orçamento: simulador de economia, portfólio de instalações e WhatsApp a um clique em todas as páginas.',
      'Projeto freelancer, do briefing ao deploy.',
    ],
    audiences: [
      { who: 'Residências', goal: 'Simulam a economia na conta de luz e pedem orçamento.' },
      { who: 'Comércios e propriedades rurais', goal: 'Veem projetos parecidos com o seu e falam com a equipe.' },
    ],
    challenge:
      'A empresa dependia de indicação e não tinha um canal próprio para captar e qualificar clientes. Quem chegasse pelo site precisava entender a economia e falar com alguém sem atrito.',
    solution:
      'SPA em React sem servidor: o simulador estima a economia e já monta a mensagem para o WhatsApp, os formulários validam os dados antes do envio, e o analytics só coleta com consentimento.',
    result:
      'Site no ar com 10 páginas, simulador de economia, portfólio com filtro, depoimentos e blog — abaixo, a auditoria Lighthouse mobile de 31/05/2026, feita num build local (vite preview).',
    features: [
      {
        title: 'Conversão',
        items: [
          'Simulador de economia que monta a mensagem para o WhatsApp',
          'Botão de WhatsApp em todas as páginas',
          'Formulários com validação (React Hook Form + Zod)',
        ],
      },
      {
        title: 'Conteúdo',
        items: [
          'Portfólio de instalações com filtro',
          'Depoimentos em carrossel',
          'Blog',
          '10 páginas',
        ],
      },
      {
        title: 'SEO e medição',
        items: [
          'Dados estruturados (JSON-LD), sitemap e robots',
          'GA4 com consentimento negado por padrão',
          'Instalável como app (PWA)',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'cloud', label: 'Vercel', detail: 'Arquivos estáticos na CDN' },
        { icon: 'client', label: 'Site', detail: 'React 18 + Vite (SPA)' },
        { icon: 'storage', label: 'Conteúdo', detail: 'Sanity CMS para o blog' },
        { icon: 'integration', label: 'Contato', detail: 'WhatsApp e EmailJS' },
      ],
      highlights: [
        'Sem back-end: todas as integrações rodam no navegador.',
        'Sem o Sanity configurado, o blog usa posts de reserva do próprio código.',
        'Animações com GSAP e rolagem suave com Lenis.',
      ],
    },
    decisions: [
      {
        topic: 'Renderização',
        choice: 'SPA sem SSR',
        why: 'Site institucional sem custo de servidor.',
      },
      {
        topic: 'Blog',
        choice: 'Sanity CMS',
        why: 'O cliente publica sem depender de um novo deploy.',
      },
      {
        topic: 'Formulários',
        choice: 'EmailJS',
        why: 'Envio de e-mail sem manter back-end próprio.',
      },
      {
        topic: 'Contato',
        choice: 'WhatsApp como chamada principal',
        why: 'É o canal que o público da região prefere.',
      },
      {
        topic: 'Analytics',
        choice: 'GA4 com consentimento negado por padrão',
        why: 'Só mede quem aceita, em linha com a LGPD.',
      },
    ],
    stack: [
      { name: 'React', role: 'Interface (18)' },
      { name: 'TypeScript', role: 'Tipagem' },
      { name: 'Vite', role: 'Build e PWA' },
      { name: 'Tailwind CSS', role: 'Estilos' },
      { name: 'GSAP', role: 'Animações' },
      { name: 'Sanity', role: 'CMS do blog' },
      { name: 'EmailJS', role: 'Envio de formulários por e-mail' },
      { name: 'Vercel', role: 'Hospedagem' },
    ],
    quality: [
      'ESLint com zero avisos permitidos e Prettier',
      'Testes com Vitest no simulador de economia e na página 404',
      '8 decisões registradas em ADR, com alternativas e consequências',
    ],
    limitations: [
      'Sem pipeline de CI',
      'Performance 73 no Lighthouse mobile, abaixo da meta de 90 do próprio projeto',
      'SPA sem pré-renderização por rota, o que limita o SEO das páginas internas',
    ],
    roadmap: [
      'Ativar o Sanity para o cliente publicar no blog',
      'Ativar o envio dos formulários por e-mail',
      'Apontar o domínio próprio da empresa',
    ],
  },
  screenshots: [
    '/images/fotos-projetos-reais/henrique-energia-solar/cover.webp',
    '/images/fotos-projetos-reais/henrique-energia-solar/1.webp',
    '/images/fotos-projetos-reais/henrique-energia-solar/2.webp',
    '/images/fotos-projetos-reais/henrique-energia-solar/3.webp',
  ],
};
