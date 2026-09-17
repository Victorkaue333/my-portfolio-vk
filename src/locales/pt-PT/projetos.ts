/* Lista de projetos (/projetos) e cards. */
import type base from '../pt-BR/projetos';

const projetos: typeof base = {
  projects: {
    title: 'Os Meus Projetos',
    subtitle: 'Projetos pessoais e profissionais desenvolvidos do zero ao deploy.',
    categories: {
      all: 'Todos',
      personal: 'Pessoais',
      real: 'Profissionais',
    },
    sections: {
      personal: 'Projetos Pessoais',
      real: 'Projetos Profissionais',
    },
    noFound: 'Nenhum projeto encontrado para este filtro.',
    techFilter: 'Filtrar por tecnologia',
    clearTech: 'Limpar tecnologia',
    lastViewed: 'Visto por último',
  },
};

export default projetos;
