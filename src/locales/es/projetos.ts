/* Lista de projetos (/projetos) e cards. */
import type base from '../pt-BR/projetos';

const projetos: typeof base = {
  projects: {
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
    techFilter: 'Filtrar por tecnología',
    clearTech: 'Quitar tecnología',
    lastViewed: 'Visto por última vez',
  },
};

export default projetos;
