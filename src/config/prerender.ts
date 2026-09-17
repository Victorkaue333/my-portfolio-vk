/**
 * Rotas para o prerender de <head> e o sitemap, montadas a partir das mesmas
 * fontes que o app usa em runtime. Carregado no build por
 * scripts/prerender-meta.mjs (via `runnerImport` do Vite) — só pode importar
 * módulos sem dependência de navegador.
 */
import { projects } from '../data/projects';
import ptBRSeo from '../locales/pt-BR/seo';
import { projectOgImage, projectSeoDescription, projectSeoTitle } from '../utils/projectSeo';
import { pages, type PageDef } from './pages';
import { DEFAULT_OG_IMAGE, SITE_URL } from './site';

export { SITE_URL };

export interface PrerenderRoute {
  path: string;
  /** Chave do manifest do Vite, para o modulepreload do chunk da rota. */
  entry: string;
  title: string;
  description: string;
  /** URL absoluta. */
  image: string;
}

export interface SitemapEntry {
  loc: string;
  changefreq?: string;
  priority: number;
}

const allPages: readonly PageDef[] = pages;
const seoPt = ptBRSeo.seo;

const detailEntry = allPages.find((p) => p.path === '/projetos/:id')!.entry;

/** Rotas estáticas com SEO do registro. PT: idioma padrão indexado. */
const staticPages = allPages.filter(
  (p): p is PageDef & { seoKey: NonNullable<PageDef['seoKey']> } =>
    p.seoKey !== undefined && !p.path.includes(':') && p.path !== '*',
);

export const prerenderRoutes: PrerenderRoute[] = [
  ...staticPages.map((page) => ({
    path: page.path,
    entry: page.entry,
    title: seoPt[`${page.seoKey}Title`],
    description: seoPt[`${page.seoKey}Desc`],
    image: DEFAULT_OG_IMAGE,
  })),
  ...projects.map((project) => {
    const slug = project.slug ?? project.id;
    return {
      path: `/projetos/${slug}`,
      entry: detailEntry,
      title: projectSeoTitle(project),
      description: projectSeoDescription(project),
      image: `${SITE_URL}${projectOgImage(slug)}`,
    };
  }),
];

export const sitemapEntries: SitemapEntry[] = [
  ...allPages.flatMap((page) =>
    page.sitemap ? [{ loc: `${SITE_URL}${page.path}`, ...page.sitemap }] : [],
  ),
  ...projects.map((project) => ({
    loc: `${SITE_URL}/projetos/${project.slug ?? project.id}`,
    priority: 0.6,
  })),
];
