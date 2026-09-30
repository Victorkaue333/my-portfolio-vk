import type { Project } from '../../../types';

export const dataSertao: Project = {
  id: 'data-sertao',
  slug: 'data-sertao',
  title: 'DataSertão',
  shortDescription: 'Site do projeto de Machine Learning do IF Sertão-PE.',
  detailedDescription:
    'Landing page do DataSertão, projeto de ensino, pesquisa e extensão em Machine Learning do IF Sertão-PE Campus Floresta.',
  description:
    'Landing page do DataSertão, projeto de ensino, pesquisa e extensão em Machine Learning do IF Sertão-PE Campus Floresta.',
  image: '/images/fotos-projetos-reais/data-sertao/cover.webp',
  online: 'https://data-sertao-site-institucional.vercel.app/',
  detailPath: '/projetos/data-sertao',
  technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
  stack: ['HTML', 'CSS', 'JavaScript'],
  category: 'real',
  status: 'production',
  role: {
    title: 'Bolsista · desenvolvimento web',
    mine: [
      'Identidade visual em pixel art',
      'Site completo: estrutura, estilos e animações',
    ],
  },
  caseStudy: {
    overview: [
      'Landing page do DataSertão, projeto de ensino, pesquisa e extensão do IF Sertão-PE Campus Floresta que leva Machine Learning em Python a estudantes e profissionais de TI do semiárido.',
      'Fiz o site como bolsista do projeto, coordenado pelo Prof. João Vila Nova.',
    ],
    audiences: [
      { who: 'Estudantes de TI', goal: 'Conhecem o curso, os pilares e o cronograma da jornada.' },
      { who: 'Parceiros e comunidade', goal: 'Entendem a proposta e quem está por trás do projeto.' },
    ],
    challenge:
      'Apresentar um projeto acadêmico de dados e IA com identidade própria — que chame a atenção dos estudantes da região — numa página leve, sem build nem servidor.',
    solution:
      'Página única em HTML, CSS e JavaScript puros, com paisagem do Sertão em pixel art (SVG), estética de terminal e animações de rolagem com GSAP ScrollTrigger.',
    result:
      'Site publicado na Vercel com a proposta do projeto, os pilares, o cronograma da jornada 2026, a equipe e os parceiros.',
    features: [
      {
        title: 'Conteúdo',
        items: [
          'Manifesto do movimento',
          'Pilares: ecossistema Python, Machine Learning e extensão',
          'Cronograma da jornada 2026, de maio a outubro',
          'Equipe e parceiros',
        ],
      },
      {
        title: 'Visual',
        items: [
          'Paisagem do Sertão em pixel art (SVG)',
          'Tipografia de terminal',
          'Animações de rolagem (GSAP)',
          'Meta tags Open Graph para compartilhamento',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Página', detail: 'HTML, CSS e JavaScript puros' },
        { icon: 'integration', label: 'Animações', detail: 'GSAP + ScrollTrigger via CDN' },
        { icon: 'cloud', label: 'Hospedagem', detail: 'Vercel' },
      ],
    },
    decisions: [
      {
        topic: 'Stack',
        choice: 'HTML, CSS e JS sem build',
        why: 'Página única e informativa: nada para compilar, publicação direta.',
      },
      {
        topic: 'Visual',
        choice: 'Pixel art em SVG',
        why: 'Identidade própria com arquivos leves e nítidos em qualquer tela.',
      },
    ],
    stack: [
      { name: 'HTML5', role: 'Estrutura da página' },
      { name: 'CSS3', role: 'Tema escuro e pixel art' },
      { name: 'JavaScript', role: 'Interações' },
      { name: 'GSAP', role: 'Animações de rolagem com ScrollTrigger' },
      { name: 'Vercel', role: 'Hospedagem' },
    ],
    roadmap: ['Formulário de inscrição integrado à página'],
  },
  screenshots: [
    '/images/fotos-projetos-reais/data-sertao/cover.webp',
    '/images/fotos-projetos-reais/data-sertao/1.webp',
    '/images/fotos-projetos-reais/data-sertao/2.webp',
    '/images/fotos-projetos-reais/data-sertao/3.webp',
  ],
};
