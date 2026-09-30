import type { Project } from '../../../types';

export const saberesInterculturais: Project = {
  id: 'saberes-interculturais',
  slug: 'saberes-interculturais',
  title: 'Saberes Interculturais de Itaparica',
  shortDescription: 'Site de pesquisa e extensão sobre saberes indígenas.',
  detailedDescription:
    'Site de extensão voltado a saberes interculturais e valorização cultural dos povos indígenas de Itaparica.',
  description:
    'Site de divulgação de projeto de extensão voltado aos saberes interculturais, práticas corporais e valorização cultural dos povos indígenas de Itaparica.',
  image: '/images/fotos-projetos-pessoais/saberes-interculturais/saberes-interculturais.webp',
  github: 'https://github.com/Victorkaue333/saberes-interculturais-itaparica',
  detailPath: '/projetos/saberes-interculturais',
  technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'GSAP'],
  stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  category: 'pessoal',
  role: {
    title: 'Bolsista CNPq · desenvolvimento web',
    mine: [
      'Estrutura e front-end do site',
      'Arquitetura de CSS em camadas e JavaScript em módulos',
      'Animações de rolagem com respeito a movimento reduzido',
    ],
  },
  caseStudy: {
    overview: [
      'Site do projeto de pesquisa e extensão do IF Sertão-PE, com fomento do CNPq, que registra e divulga saberes tradicionais dos povos indígenas de Itaparica (Itacuruba-PE), com foco em práticas corporais no ensino de Educação Física.',
      'Desenvolvi o site como bolsista do projeto: conteúdo acadêmico e cultural organizado numa página leve, sem backend para manter.',
    ],
    audiences: [
      { who: 'Comunidade acadêmica', goal: 'Consulta a produção científica, a equipe e as instituições envolvidas.' },
      { who: 'Instituições parceiras', goal: 'Conhecem o território, os saberes registrados e o contato do projeto.' },
      { who: 'Público em geral', goal: 'Conhece o Toré, os jogos e os rituais documentados pela pesquisa.' },
    ],
    challenge:
      'Apresentar um acervo cultural e acadêmico denso — território, rituais, jogos, produção científica — de forma respeitosa e navegável, sem backend e com carregamento leve.',
    solution:
      'Site estático com CSS em camadas (settings, base, layout, components, pages, utilities) e JavaScript em módulos. O mapa do território só carrega quando a seção é aberta, e as animações de rolagem respeitam a preferência de movimento reduzido.',
    result:
      'Território, saberes, galeria, produção acadêmica, equipe e instituições reunidos numa página responsiva que dá visibilidade ao projeto de extensão.',
    features: [
      {
        title: 'Conteúdo',
        items: [
          'Saberes em acordeão: Toré, jogos, futebol e rituais',
          'Território com mapa do Google',
          'Galeria com lightbox',
          'Produção acadêmica, equipe e instituições',
        ],
      },
      {
        title: 'Experiência',
        items: [
          'Preloader com barra de progresso e citações',
          'Menu responsivo',
          'Animações de rolagem (GSAP + ScrollTrigger)',
          'Movimento reduzido quando o sistema pede',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Página', detail: 'HTML5 semântico + Bootstrap 5' },
        { icon: 'api', label: 'Scripts', detail: 'ES Modules iniciados por main.js' },
        { icon: 'integration', label: 'Mapa', detail: 'Google Maps carregado sob demanda' },
      ],
      highlights: [
        'Sem backend: publicação estática, sem servidor para manter.',
        'CSS dividido em settings, base, layout, components, pages e utilities.',
        'O iframe do mapa é injetado via JavaScript só quando a seção é acessada.',
      ],
    },
    decisions: [
      {
        topic: 'Hospedagem',
        choice: 'Site estático',
        why: 'O conteúdo muda pouco; sem servidor, o projeto de extensão não herda custo nem manutenção.',
      },
      {
        topic: 'CSS',
        choice: 'Camadas por responsabilidade',
        why: 'Cada regra tem lugar previsível, o que facilita manter e crescer o site.',
      },
      {
        topic: 'Mapa',
        choice: 'Carregamento sob demanda',
        why: 'O iframe do Google Maps é pesado; só entra quando a seção é usada.',
      },
      {
        topic: 'Movimento',
        choice: 'Respeito a prefers-reduced-motion',
        why: 'Quem configura o sistema para menos movimento navega sem as animações de rolagem.',
      },
    ],
    stack: [
      { name: 'HTML5', role: 'Estrutura semântica' },
      { name: 'CSS3', role: 'Estilos em camadas' },
      { name: 'JavaScript', role: 'Interações em ES Modules' },
      { name: 'Bootstrap', role: 'Grid e componentes (5.3)' },
      { name: 'GSAP', role: 'Animações de rolagem com ScrollTrigger' },
      { name: 'Lucide', role: 'Ícones' },
    ],
  },
};
