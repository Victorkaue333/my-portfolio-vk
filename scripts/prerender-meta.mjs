// Pós-build: gera dist/<rota>/index.html com <head> específico por rota.
// Scrapers sociais (LinkedIn/WhatsApp/Facebook) não rodam JS — leem só o HTML
// estático. Este script injeta title/description/canonical/OG/Twitter por rota
// para que cada URL compartilhe corretamente. Usuários e Google recebem a SPA
// normal (o hook useSeo mantém o head consistente em runtime).
//
// Rotas, títulos e sitemap vêm de src/config/prerender.ts — as mesmas fontes
// do app (registro de páginas, seo PT, dados de projetos). O `runnerImport`
// do Vite transforma o TS na hora, sem passo de compilação extra.

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runnerImport } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const {
  module: { prerenderRoutes: routes, sitemapEntries, SITE_URL: SITE },
} = await runnerImport(join(__dirname, '..', 'src', 'config', 'prerender.ts'), {
  configFile: false,
  logLevel: 'warn',
});

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Substitui o content de uma <meta name|property="key">. */
function setMetaContent(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}"[^>]*content=")[^"]*(")`, 'i');
  if (re.test(html)) return html.replace(re, `$1${escapeHtml(value)}$2`);
  // Não existe no index.html base — injeta antes de </head>.
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
  return html.replace('</head>', `    ${tag}\n</head>`);
}

/** Preload da imagem LCP: só faz sentido na Home; nas outras rotas é download morto. */
function stripHomePreload(html) {
  return html.replace(/[ \t]*<!-- preload:home -->[\s\S]*?<!-- \/preload:home -->\n?/, '');
}

/** Lê dist/.vite/manifest.json (build.manifest em vite.config.ts). */
function loadManifest() {
  const manifestPath = join(DIST, '.vite', 'manifest.json');
  if (!existsSync(manifestPath)) {
    console.warn('[prerender-meta] manifest ausente — modulepreload não será injetado.');
    return null;
  }
  try {
    return JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    console.warn(`[prerender-meta] manifest ilegível (${err.message}) — seguindo sem preload.`);
    return null;
  }
}

/**
 * Pré-carregamento do chunk da rota: o próprio chunk e os que ele importa
 * estaticamente (modulepreload) + o CSS dele (preload as=style). As páginas são
 * `lazy()` em src/routes.ts, então sem isto o browser só descobre esses arquivos
 * depois de baixar e executar index.js — o PageSpeed mostrava a cadeia parando
 * no index.js e ~3,5s de atraso até o elemento LCP.
 */
function routePreloadLinks(manifest, entry) {
  if (!manifest || !entry) return [];

  const seen = new Set();
  const scripts = [];
  const styles = new Set();

  const visit = (key) => {
    if (seen.has(key)) return;
    seen.add(key);
    const chunk = manifest[key];
    // O entry (index.html) já está no HTML: script próprio e CSS inline.
    if (!chunk || chunk.isEntry) return;
    if (chunk.file) scripts.push(chunk.file);
    for (const css of chunk.css ?? []) styles.add(css);
    for (const dep of chunk.imports ?? []) visit(dep);
  };
  visit(entry);

  if (scripts.length === 0) {
    console.warn(`[prerender-meta] entry "${entry}" não encontrado no manifest.`);
    return [];
  }

  return [
    ...scripts.map((file) => `<link rel="modulepreload" crossorigin href="/${file}" />`),
    ...[...styles].map((file) => `<link rel="preload" as="style" href="/${file}" />`),
  ];
}

function injectHeadLinks(html, links) {
  // O Vite já emite modulepreload dos chunks do entry — não repetir.
  const novos = links.filter((link) => {
    const href = link.match(/href="([^"]+)"/)?.[1];
    return href ? !html.includes(`"${href}"`) : true;
  });
  if (novos.length === 0) return html;
  return html.replace('</head>', `    ${novos.join('\n    ')}\n</head>`);
}

/**
 * CSS global (index-*.css) inline no <head>. Como <link rel=stylesheet> ele
 * bloqueava a renderização (~150ms no mobile) por ~9 KiB comprimidos. Numa SPA
 * o HTML é baixado uma vez só, então perder o cache separado do CSS custa pouco.
 */
function inlineEntryCss(html) {
  return html.replace(
    /<link rel="stylesheet"(?: crossorigin)? href="\/(assets\/index-[^"]+\.css)">/,
    (tag, file) => {
      const cssPath = join(DIST, file);
      if (!existsSync(cssPath)) return tag;
      // `</style` dentro do CSS fecharia a tag antes da hora.
      const css = readFileSync(cssPath, 'utf8').replace(/<\/style/gi, '<\\/style');
      return `<style>${css}</style>`;
    }
  );
}

/** sitemap.xml gerado a cada build — rota ou projeto novo entra sozinho. */
function sitemapXml(entries) {
  const urls = entries.map(({ loc, changefreq, priority }) =>
    [
      '  <url>',
      `    <loc>${escapeHtml(loc)}</loc>`,
      changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
      `    <priority>${priority.toFixed(1)}</priority>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- Gerado por scripts/prerender-meta.mjs a partir de src/config/prerender.ts. -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

function applyMeta(html, { path, title, description, entry, image }, manifest) {
  const url = `${SITE}${path === '/' ? '/' : path}`;
  let out = path === '/' ? html : stripHomePreload(html);

  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  out = setMetaContent(out, 'name', 'description', description);
  out = out.replace(/(<link rel="canonical"[^>]*href=")[^"]*(")/i, `$1${url}$2`);

  out = setMetaContent(out, 'property', 'og:title', title);
  out = setMetaContent(out, 'property', 'og:description', description);
  out = setMetaContent(out, 'property', 'og:url', url);
  out = setMetaContent(out, 'property', 'og:image', image);
  out = setMetaContent(out, 'property', 'og:image:alt', title);

  out = setMetaContent(out, 'name', 'twitter:title', title);
  out = setMetaContent(out, 'name', 'twitter:description', description);
  out = setMetaContent(out, 'name', 'twitter:url', url);
  out = setMetaContent(out, 'name', 'twitter:image', image);

  out = injectHeadLinks(out, routePreloadLinks(manifest, entry));

  return out;
}

function run() {
  const indexPath = join(DIST, 'index.html');
  let base;
  try {
    base = readFileSync(indexPath, 'utf8');
  } catch {
    console.error('[prerender-meta] dist/index.html não encontrado — rode o build antes.');
    process.exit(1);
  }

  // Base lida uma vez; rodar o script de novo sobre um dist/ já processado não
  // duplica nada (CSS já inline não casa o regex; links repetidos são filtrados).
  base = inlineEntryCss(base);
  const manifest = loadManifest();

  for (const route of routes) {
    const html = applyMeta(base, route, manifest);
    const outPath =
      route.path === '/' ? indexPath : join(DIST, route.path.replace(/^\//, ''), 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, 'utf8');
    console.log(`[prerender-meta] ${route.path} → ${outPath.replace(DIST, 'dist')}`);
  }

  console.log(`[prerender-meta] ${routes.length} rotas geradas.`);

  writeFileSync(join(DIST, 'sitemap.xml'), sitemapXml(sitemapEntries), 'utf8');
  console.log(`[prerender-meta] sitemap.xml com ${sitemapEntries.length} URLs.`);
}

run();
