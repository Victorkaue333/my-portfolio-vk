/* Lista de projetos (/projetos) e cards. */
import type base from '../pt-BR/projetos';

const projetos: typeof base = {
  projects: {
    heroMain: 'Proyectos &',
    heroAccent: 'Casos de estudio',
    heroSubtitle:
      'Sistemas personales y profesionales presentados como casos de estudio: problema, solución, mi contribución, arquitectura y decisiones técnicas.',
    card: {
      details: 'Ver detalles',
      live: 'Ver proyecto',
      repo: 'Repositorio en GitHub',
      private: 'Código privado',
    },
    title: 'Mis Proyectos',
    subtitle: 'Proyectos personales y profesionales desarrollados desde cero hasta el despliegue.',
    categories: {
      all: 'Todos',
      personal: 'Personales',
      real: 'Profesionales',
    },
    sections: {
      personal: 'Proyectos Personales',
      real: 'Proyectos Profesionales',
    },
    noFound: 'No se encontraron proyectos para este filtro.',
    categoryFilter: 'Filtrar por categoría',
    techFilter: 'Filtrar por tecnología',
    clearTech: 'Quitar tecnología',
    lastViewed: 'Visto por última vez',
  },
};

export default projetos;
