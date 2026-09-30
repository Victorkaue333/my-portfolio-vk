import type { Project } from '../../../types';

export const meuPortfolio: Project = {
  id: 'meu-portfolio',
  slug: 'meu-portfolio',
  title: 'Portfólio Web Pessoal',
  shortDescription: 'SPA em React 19 e TypeScript, publicada em 4 idiomas.',
  detailedDescription:
    'Projeto desenvolvido para apresentar meu trabalho, projetos e posicionamento profissional como desenvolvedor full-stack.',
  description:
    'Projeto desenvolvido para apresentar meu trabalho, projetos e posicionamento profissional como desenvolvedor full-stack.',
  image: '/images/fotos-projetos-pessoais/vk-portifolio/logotipo-vk.webp',
  github: 'https://github.com/Victorkaue333/meu_portifolio',
  online: 'https://victor-kaue.vercel.app/',
  detailPath: '/projetos/meu-portfolio',
  technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
  stack: ['React', 'TypeScript', 'Vite', 'CSS'],
  category: 'pessoal',
  status: 'production',
  teamSize: 1,
  caseStudy: {
    overview: [
      'Uma SPA estática que é, ao mesmo tempo, vitrine e prova técnica: o código que roda aqui demonstra o que o portfólio afirma — conteúdo tipado, i18n em 4 idiomas, performance medida e deploy contínuo.',
      'Não há banco nem API própria. Projetos, experiências e certificados vivem como módulos TypeScript em src/data/, validados pelo compilador no build. A única função serverless (Now Playing do Spotify) é opcional: sem ela, o site funciona igual.',
    ],
    audiences: [
      { who: 'Recrutadores', goal: 'Avaliam trajetória, stack e projetos em poucos minutos e baixam o CV em PDF.' },
      { who: 'Clientes', goal: 'Conhecem os serviços e abrem conversa direta pelo WhatsApp.' },
      { who: 'Comunidade técnica', goal: 'Exploram cada projeto: desafio, arquitetura e decisões.' },
    ],
    challenge:
      'Mostrar capacidade técnica de forma verificável — deixar quem avalia ver o trabalho rodando, não só ler uma lista de tecnologias — sem pagar o custo de manter servidor, banco ou CMS para um site de conteúdo.',
    solution:
      'SPA com rotas lazy, conteúdo como código tipado e textos por tela em i18next. O build (tsc + Vite + prerender de <head> por rota) barra dado inconsistente antes da produção, e cada decisão técnica fica registrada em ADR no repositório.',
    result:
      'Em produção na Vercel, em 4 idiomas, com deploy automático a cada push. Atualizar o portfólio é editar um arquivo .ts e fazer push — sem painel, sem banco e sem custo de infraestrutura.',
    features: [
      {
        title: 'Navegação e experiência',
        items: [
          'Transições animadas entre rotas',
          'Rotas lazy com prefetch no hover',
          'Fundo animado em Canvas 2D, fora do caminho crítico',
          'Tema claro/escuro persistido',
          'Terminal interativo com comandos em lista fechada',
        ],
      },
      {
        title: 'Conteúdo e idiomas',
        items: [
          'pt-BR, pt-PT, EN e ES com detecção e persistência',
          'Catálogo de projetos com filtro por categoria e tecnologia',
          'Estudo de caso por projeto',
          'Certificados com PDF e link de verificação',
          'Currículo em PDF para download',
        ],
      },
      {
        title: 'Conversão',
        items: [
          'Formulário que vira mensagem pronta no WhatsApp',
          'GitHub, LinkedIn, e-mail e WhatsApp no rodapé de todas as páginas',
        ],
      },
      {
        title: 'SEO e performance',
        items: [
          '<head> e sitemap gerados por rota no build',
          'Imagens .webp responsivas geradas por script',
          'Fonte self-hosted e CSS crítico inline',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'storage', label: 'Conteúdo', detail: 'Módulos TypeScript em src/data/' },
        { icon: 'server', label: 'Build', detail: 'tsc + Vite + prerender de <head>' },
        { icon: 'cloud', label: 'Vercel', detail: 'CDN + fallback SPA' },
        { icon: 'client', label: 'Navegador', detail: 'React 19 + rotas lazy' },
      ],
      highlights: [
        'Sem banco e sem API própria: hospedagem estática e superfície de ataque mínima.',
        'Conteúdo como código: erro de contrato em src/data/ quebra o build, nunca a produção.',
        'Contato sem servidor: o formulário monta um deep-link wa.me com a mensagem pronta.',
        'React, framer-motion e i18next em chunks próprios, para o cache sobreviver entre deploys.',
      ],
    },
    decisions: [
      {
        topic: 'Conteúdo',
        choice: 'Módulos TypeScript em vez de CMS',
        why: 'Tipagem no build e histórico no git. O custo: mudar um texto exige rebuild.',
      },
      {
        topic: 'Contato',
        choice: 'Deep-link do WhatsApp',
        why: 'Entrega a mensagem sem servidor de e-mail nem anti-spam. Depende de o visitante ter WhatsApp.',
      },
      {
        topic: 'Fundo animado',
        choice: 'Canvas 2D no lugar de three.js',
        why: 'Mesmo efeito visual com cerca de 1 MB a menos de WebGL no bundle.',
      },
      {
        topic: 'Ícones',
        choice: 'react-icons resolvido por nome',
        why: 'Substituiu o font-icon devicon (~1,5 MB): só os SVGs usados entram no bundle.',
      },
      {
        topic: 'Idiomas',
        choice: 'i18next com um arquivo por tela',
        why: 'Chave faltando em qualquer um dos 4 idiomas quebra o tsc, não a página.',
      },
      {
        topic: 'Credibilidade',
        choice: 'Só dado verificável',
        why: 'Número sem origem e depoimento placeholder derrubam a confiança. Bloco sem dado real não aparece.',
      },
    ],
    stack: [
      { name: 'React', role: 'Interface e componentes (v19)' },
      { name: 'TypeScript', role: 'Tipagem strict do código e do conteúdo' },
      { name: 'Vite', role: 'Dev server, build e code-splitting' },
      { name: 'React Router', role: 'Rotas da SPA com carregamento lazy' },
      { name: 'Tailwind CSS', role: 'Utilitários, somados a CSS por componente e design tokens' },
      { name: 'Framer Motion', role: 'Transições de página e lupa das screenshots' },
      { name: 'i18next', role: '4 idiomas com detecção e persistência' },
      { name: 'Playwright', role: 'Smoke E2E de rotas, fonte e tema' },
      { name: 'Vercel', role: 'Hospedagem, deploy por push e Analytics' },
    ],
    roadmap: [
      'Ampliar os testes E2E além do smoke de rotas',
      'Testes unitários com Vitest',
      'Conteúdo dos projetos também em EN e ES (hoje só pt-BR)',
    ],
  },
  screenshots: [
    '/images/fotos-projetos-pessoais/vk-portifolio/logotipo-vk.webp',
    '/images/fotos-projetos-pessoais/vk-portifolio/victor_kaue.webp',
  ],
};
