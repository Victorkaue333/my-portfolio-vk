import type { Project } from '../../../types';

export const aniversarioNamoro: Project = {
  id: 'aniversario-namoro',
  slug: 'aniversario-namoro',
  title: 'Site de 1 Ano de Namoro',
  shortDescription: 'Site-presente de cinco páginas para um ano de namoro.',
  detailedDescription:
    'Site-presente em HTML, CSS e JavaScript para comemorar um ano de namoro, com linha do tempo, galeria e contagem regressiva.',
  description:
    'Site-presente em HTML, CSS e JavaScript para comemorar um ano de namoro, com linha do tempo, galeria e contagem regressiva.',
  image: '/images/fotos-projetos-pessoais/aniversario-namoro/cover.webp',
  github: 'https://github.com/Victorkaue333/Aniversario_de_1_Ano_de_Namoro_23_09_2025_',
  online: 'https://aniversario-de-1-ano-de-namoro.vercel.app/',
  detailPath: '/projetos/aniversario-namoro',
  technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
  stack: ['HTML', 'CSS', 'JavaScript'],
  category: 'pessoal',
  status: 'production',
  teamSize: 1,
  caseStudy: {
    overview: [
      'Um presente em forma de site: cinco páginas para comemorar um ano de namoro, com linha do tempo, galeria de fotos, uma lista de motivos e os planos para o futuro.',
      'Projeto pessoal, feito para uma pessoa só — e onde testei animações em CSS puro, efeito de digitação e contagem regressiva.',
    ],
    challenge:
      'Transformar lembranças numa experiência navegável e emotiva, que funcionasse bem no celular e estivesse pronta na data certa.',
    solution:
      'Site estático em HTML, CSS e JavaScript puros: variáveis CSS para a paleta, keyframes para as entradas, efeito de máquina de escrever na dedicatória e contagem regressiva com setInterval até o dia do aniversário.',
    result:
      'Site publicado na Vercel, responsivo em quatro breakpoints, com cinco páginas e 28 fotos organizadas em capítulos.',
    features: [
      {
        title: 'Páginas',
        items: [
          'Início com contadores e dedicatória',
          'Nossa História: linha do tempo com 5 marcos',
          'Galeria com 28 fotos em 3 seções',
          'Por que eu te amo: lista animada',
          'Nosso Futuro: sonhos e cápsula do tempo',
        ],
      },
      {
        title: 'Interação',
        items: [
          'Efeito de máquina de escrever',
          'Contagem regressiva até a data',
          'Legenda e zoom ao passar o mouse',
          'Parallax e rolagem suave',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Páginas', detail: '5 arquivos HTML' },
        { icon: 'storage', label: 'Estilos', detail: 'CSS com variáveis e keyframes' },
        { icon: 'cloud', label: 'Hospedagem', detail: 'Vercel' },
      ],
    },
    decisions: [
      {
        topic: 'Stack',
        choice: 'HTML, CSS e JS puros',
        why: 'Site pequeno e pessoal: sem build, sem dependência, pronto para publicar.',
      },
      {
        topic: 'Animações',
        choice: 'CSS em vez de biblioteca',
        why: 'Keyframes e animation-delay resolvem as entradas sem carregar JavaScript extra.',
      },
    ],
    stack: [
      { name: 'HTML5', role: 'Estrutura das páginas' },
      { name: 'CSS3', role: 'Layout, animações e responsividade' },
      { name: 'JavaScript', role: 'Digitação e contagem regressiva' },
      { name: 'Vercel', role: 'Hospedagem' },
    ],
  },
  screenshots: [
    '/images/fotos-projetos-pessoais/aniversario-namoro/cover.webp',
    '/images/fotos-projetos-pessoais/aniversario-namoro/1.webp',
  ],
};
