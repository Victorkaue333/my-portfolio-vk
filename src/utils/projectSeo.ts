import type { Project } from '../types';

/*
 * SEO das páginas de projeto. Usado em runtime (ProjetoDetalhe) e no build
 * (src/config/prerender.ts) — por isso fica fora do componente.
 */

const stripDot = (s: string) => s.trim().replace(/\.$/, '');

/** "SIGREF: Sistema de gestão educacional | Victor Kauê" */
export function projectSeoTitle(project: Project): string {
  return project.shortDescription
    ? `${project.title}: ${stripDot(project.shortDescription)} | Victor Kauê`
    : `${project.title} | Victor Kauê`;
}

/** Descrição completa + stack, para o preview de link ter mais contexto. */
export function projectSeoDescription(project: Project): string {
  const stack = project.stack?.length ? ` Stack: ${project.stack.join(', ')}.` : '';
  return `${stripDot(project.description)}.${stack}`;
}

/** og:image de um projeto (public/images/og/<slug>.jpg). */
export const projectOgImage = (slug: string) => `/images/og/${slug}.jpg`;
