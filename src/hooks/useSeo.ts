import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { pageBySeoKey, type SeoKey } from '../config/pages';
import { DEFAULT_OG_IMAGE as DEFAULT_IMAGE, SITE_URL } from '../config/site';

export interface SeoOptions {
  /** Título completo da aba/SERP. */
  title: string;
  /** Meta description (~150-160 chars ideal). */
  description: string;
  /** Caminho da rota, ex.: '/sobre'. Vira canonical + og:url absolutos. */
  path: string;
  /** Imagem absoluta para OG/Twitter. Default: foto do Victor. */
  image?: string;
  /** true em páginas que não devem ser indexadas (ex.: 404). */
  noindex?: boolean;
}

/** Garante uma <meta>/<link> no head e devolve o elemento para setar atributos. */
function upsert<T extends HTMLElement>(selector: string, create: () => T): T {
  let el = document.head.querySelector<T>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  const el = upsert<HTMLMetaElement>(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute('content', content);
}

/**
 * SEO por rota numa SPA: atualiza title, description, canonical e tags
 * Open Graph / Twitter no <head> a cada mudança de página.
 */
export function useSeo({ title, description, path, image = DEFAULT_IMAGE, noindex = false }: SeoOptions): void {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    // Absolutiza imagem relativa (/images/...) — OG exige URL completa.
    const absImage = image.startsWith('/') ? `${SITE_URL}${image}` : image;

    document.title = title;
    setMeta('name', 'description', description);

    // Canonical
    const canonical = upsert<HTMLLinkElement>('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    });
    canonical.setAttribute('href', url);

    // robots
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', absImage);
    setMeta('property', 'og:image:alt', title);

    // Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:url', url);
    setMeta('name', 'twitter:image', absImage);
  }, [title, description, path, image, noindex]);
}

/**
 * SEO de uma página do registro (src/config/pages.ts): título e descrição de
 * `seo.<key>Title` / `seo.<key>Desc`, caminho da própria entrada. A 404 (`*`)
 * usa `/404` como canonical e não é indexada.
 */
export function usePageSeo(key: SeoKey): void {
  const { t } = useTranslation();
  const page = pageBySeoKey(key);
  const isFallback = page.path === '*';

  useSeo({
    title: t(`seo.${key}Title`),
    description: t(`seo.${key}Desc`),
    path: isFallback ? '/404' : page.path,
    noindex: isFallback,
  });
}
