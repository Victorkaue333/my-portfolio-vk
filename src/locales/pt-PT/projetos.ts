/* Lista de projetos (/projetos) e cards. */
import type base from '../pt-BR/projetos';

const projetos: typeof base = {
  projects: {
    heroMain: 'Projetos &',
    heroAccent: 'Estudos de caso',
    heroSubtitle:
      'Sistemas pessoais e profissionais apresentados como estudo de caso: problema, solução, o meu contributo, arquitetura e decisões técnicas.',
    card: {
      details: 'Ver detalhes',
      live: 'Ver projeto',
      repo: 'Repositório no GitHub',
      private: 'Código privado',
    },
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
    categoryFilter: 'Filtrar por categoria',
    techFilter: 'Filtrar por tecnologia',
    clearTech: 'Limpar tecnologia',
    lastViewed: 'Visto por último',
  },
};

export default projetos;
