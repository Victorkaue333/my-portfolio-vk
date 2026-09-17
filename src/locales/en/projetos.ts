/* Lista de projetos (/projetos) e cards. */
import type base from '../pt-BR/projetos';

const projetos: typeof base = {
  projects: {
    title: 'My Projects',
    subtitle: 'Personal and professional projects developed from scratch to deployment.',
    categories: {
      all: 'All',
      personal: 'Personal',
      real: 'Professional',
    },
    sections: {
      personal: 'Personal Projects',
      real: 'Professional Projects',
    },
    noFound: 'No projects found for this filter.',
    techFilter: 'Filter by technology',
    clearTech: 'Clear technology',
    lastViewed: 'Last viewed',
  },
};

export default projetos;
