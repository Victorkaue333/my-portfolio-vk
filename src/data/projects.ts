import type { Project } from '../types';
import { agendeaqui } from './projects/pessoais/agendeaqui';
import { meuPortfolio } from './projects/pessoais/meu-portfolio';
import { oliveiraKids } from './projects/pessoais/oliveira-kids';
import { saberesInterculturais } from './projects/pessoais/saberes-interculturais';
import { transcritorEntrevistas } from './projects/pessoais/transcritor-entrevistas';
import { maratonatech } from './projects/profissionais/maratonatech';
import { ntidi } from './projects/profissionais/ntidi';
import { queelvra } from './projects/profissionais/queelvra';
import { sigref } from './projects/profissionais/sigref';
import { vaSuplementos } from './projects/profissionais/va-suplementos';
import { vksoftware } from './projects/profissionais/vksoftware';

const DEFAULT_GITHUB_PROFILE = 'https://github.com/Victorkaue333';
const DEFAULT_PROJECT_IMAGE = '/images/placeholders/project-placeholder.svg';

const rawProjects: Project[] = [
  meuPortfolio,
  agendeaqui,
  oliveiraKids,
  transcritorEntrevistas,
  saberesInterculturais,
  sigref,
  ntidi,
  maratonatech,
  vaSuplementos,
  queelvra,
  vksoftware,
];

function normalizeProject(project: Project): Project {
  const safeId = project.id || 'projeto-sem-id';
  const safeTitle = project.title?.trim() || 'Projeto em atualização';
  const safeDescription =
    project.description?.trim() ||
    project.shortDescription?.trim() ||
    'Descrição em atualização. Em breve mais detalhes deste projeto.';
  const safeTechnologies =
    Array.isArray(project.technologies) && project.technologies.length > 0
      ? project.technologies
      : project.stack && project.stack.length > 0
      ? project.stack
      : ['Stack em atualização'];
  const safeSlug = project.slug || safeId;

  return {
    ...project,
    id: safeId,
    slug: safeSlug,
    title: safeTitle,
    description: safeDescription,
    image: project.image || DEFAULT_PROJECT_IMAGE,
    github: project.github || DEFAULT_GITHUB_PROFILE,
    detailPath: project.detailPath || `/projetos/${safeSlug}`,
    technologies: safeTechnologies,
  };
}

export const projects: Project[] = rawProjects.map(normalizeProject);
/** Destaques fixos da Home: `featured: true` no arquivo do projeto (2–3). */
export const featuredProjects = (() => {
  const marked = projects.filter((p) => p.featured);
  return (marked.length > 0 ? marked : projects.filter((p) => p.category === 'real')).slice(0, 3);
})();

