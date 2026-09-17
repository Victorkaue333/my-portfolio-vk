/**
 * Registro único das páginas do site.
 *
 * Tudo que dependia de uma lista de rotas lê daqui: o <Routes> do App, a
 * Navbar, a MobileNavbar, o Footer, o SEO em runtime (usePageSeo) e, no build,
 * o prerender de <head> e o sitemap (scripts/prerender-meta.mjs).
 *
 * Dados puros — sem React nem ícones — para o script de build conseguir
 * importar este arquivo no Node. Ícones da navegação: src/config/navIcons.ts.
 */

/** Chave em `nav.*` do i18n. A ordem de `pages` é a ordem dos menus. */
export type NavKey = 'home' | 'about' | 'projects' | 'services' | 'certificates' | 'contact';

/** Prefixo das chaves `seo.<key>Title` / `seo.<key>Desc` do i18n. */
export type SeoKey = 'home' | 'about' | 'projects' | 'services' | 'certs' | 'contact' | 'uses' | 'notFound';

export interface PageDef {
  /** Padrão do react-router (`/projetos/:id`, `*`). */
  path: string;
  /** Módulo da página, relativo à raiz — mesma chave do manifest do Vite. */
  entry: `src/pages/${string}.tsx`;
  /** Presente = aparece nos menus. */
  navKey?: NavKey;
  /** Presente = título/descrição vêm de `seo.<key>*`. Ausente = a página define o próprio SEO. */
  seoKey?: SeoKey;
  /** Presente = entra no sitemap (só rotas estáticas). */
  sitemap?: { changefreq: 'weekly' | 'monthly' | 'yearly'; priority: number };
}

export const pages = [
  {
    path: '/',
    entry: 'src/pages/Home/Home.tsx',
    navKey: 'home',
    seoKey: 'home',
    sitemap: { changefreq: 'monthly', priority: 1.0 },
  },
  {
    path: '/sobre',
    entry: 'src/pages/Sobre/Sobre.tsx',
    navKey: 'about',
    seoKey: 'about',
    sitemap: { changefreq: 'monthly', priority: 0.8 },
  },
  {
    path: '/projetos',
    entry: 'src/pages/Projetos/Projetos.tsx',
    navKey: 'projects',
    seoKey: 'projects',
    sitemap: { changefreq: 'weekly', priority: 0.9 },
  },
  {
    path: '/projetos/:id',
    entry: 'src/pages/ProjetoDetalhe/ProjetoDetalhe.tsx',
  },
  {
    path: '/servicos',
    entry: 'src/pages/Servicos/Servicos.tsx',
    navKey: 'services',
    seoKey: 'services',
    sitemap: { changefreq: 'monthly', priority: 0.7 },
  },
  {
    path: '/certificados',
    entry: 'src/pages/Certificados/Certificados.tsx',
    navKey: 'certificates',
    seoKey: 'certs',
    sitemap: { changefreq: 'monthly', priority: 0.6 },
  },
  {
    path: '/contato',
    entry: 'src/pages/Contato/Contato.tsx',
    navKey: 'contact',
    seoKey: 'contact',
    sitemap: { changefreq: 'yearly', priority: 0.7 },
  },
  {
    // Fora dos menus principais (sem navKey) — link no Footer.
    path: '/uses',
    entry: 'src/pages/Uses/Uses.tsx',
    seoKey: 'uses',
    sitemap: { changefreq: 'yearly', priority: 0.4 },
  },
  {
    path: '*',
    entry: 'src/pages/NaoEncontrado/NaoEncontrado.tsx',
    seoKey: 'notFound',
  },
] as const satisfies readonly PageDef[];

export type Page = (typeof pages)[number];

export const navPages = pages.filter(
  (p): p is Extract<Page, { navKey: NavKey }> => 'navKey' in p,
);

export function pageBySeoKey(key: SeoKey): PageDef {
  const page = pages.find((p) => 'seoKey' in p && p.seoKey === key);
  if (!page) throw new Error(`[pages] nenhuma página com seoKey "${key}"`);
  return page;
}
