/* Tela inicial (/). */
import type base from '../pt-BR/home';

const home: typeof base = {
  hero: {
    role: 'Desarrollador',
    tech: 'Full Stack',
    description:
      'Enfoque en rendimiento y mantenimiento. Entrego software confiable para procesos críticos, desde la lógica de negocio hasta el despliegue en producción.',
    cta: 'Conoce mi trayectoria',
    cta2: 'Ver Proyectos',
  },
  home: {
    featuredTitle: 'Proyectos Destacados',
    impactTitle: 'En números',
    viewAllProjects: 'Ver todos los proyectos',
    metrics: {
      projectsLabel: 'Proyectos publicados',
      projectsContext: 'Cada uno con caso de estudio: desafío, solución y stack',
      realLabel: 'Proyectos profesionales',
      realContext: 'Hechos para empresas, organismos públicos y eventos',
      orgsLabel: 'Empresas e instituciones',
      orgsContext: 'Startups, sector público e investigación financiada',
    },
    servicesSubtitle: 'Donde la lógica se une al rendimiento para crear valor.',
    featuredSubtitle: 'Proyectos reales, con contexto, stack y resultado.',
    featuredCta: 'Ver caso de estudio',
    featuredTeam_one: 'En solitario',
    featuredTeam_other: 'Equipo de {{count}}',
  },
};

export default home;
