/* Lista de projetos (/projetos) e cards. */
import type base from '../pt-BR/projetos';

const projetos: typeof base = {
  projects: {
    heroMain: 'Projects &',
    heroAccent: 'Case studies',
    heroSubtitle:
      'Personal and professional systems presented as case studies: problem, solution, my contribution, architecture and technical decisions.',
    card: {
      details: 'View details',
      live: 'View project',
      repo: 'GitHub repository',
      private: 'Private code',
    },
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
    categoryFilter: 'Filter by category',
    techFilter: 'Filter by technology',
    clearTech: 'Clear technology',
    lastViewed: 'Last viewed',
  },
};

export default projetos;
