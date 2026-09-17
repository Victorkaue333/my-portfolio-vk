// Gera variantes responsivas (.webp) das imagens servidas em `public/images/`.
//
// Motivo: o PageSpeed apontava ~341 KiB desperdiçados servindo originais de
// 1080x1920 / 1536x1024 em elementos de 24 px a 450 px. Este script cria
// `<nome>-<largura>.webp` ao lado do original; o código usa `srcset` e mantém o
// original como fallback.
//
// Uso: `npm run images:optimize`. As variantes são commitadas — o build da
// Vercel não roda este script.
//
// Idempotente: pula o destino se ele existe e é mais novo que a origem.
// Use `--force` para regerar tudo.

import { existsSync, mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const MANIFEST = join(__dirname, '..', 'src', 'data', 'image-variants.json');
const FORCE = process.argv.includes('--force');

/** Capas de projeto — espelha o campo `image:` de src/data/projects/. */
const PROJECT_COVERS = [
  'images/fotos-projetos-pessoais/agendeaqui/agendeaqui.webp',
  'images/fotos-projetos-pessoais/vk-portifolio/logotipo-vk.webp',
  'images/fotos-projetos-pessoais/oliveira-kids/oliveira-kids.webp',
  'images/fotos-projetos-pessoais/saberes-interculturais/saberes-interculturais.webp',
  'images/fotos-projetos-pessoais/transcritor-de-entrevistas/Transcritor_de_Entrevistas.webp',
  'images/fotos-projetos-reais/maratonatech/MaratonaTech.webp',
  'images/fotos-projetos-reais/ntidi/NTIDI.webp',
  'images/fotos-projetos-reais/queelvra/queelvra.webp',
  'images/fotos-projetos-reais/sigref/sigrefsemfundo.webp',
  'images/fotos-projetos-reais/va_suplementos/va_suplementos.webp',
  'images/fotos-projetos-reais/vksoftware/1.webp',
];

const TARGETS = [
  // Avatar do autor no ProjectCard — exibido 24x24 CSS (48/96 cobrem 2x/4x).
  { src: 'images/eu/victor.webp', widths: [48, 96], aspect: 1 },
  // Hero (elemento LCP) — container min(450px) desktop, min(220-280px) mobile, 1:1.
  { src: 'images/eu/victorkaue.webp', widths: [280, 450, 560, 900], aspect: 1 },
  // Capas de projeto — card ~380px, .project-image tem aspect-ratio 16/9.
  // 640 cobre o card mobile (~350px CSS) em telas ~1,75x sem saltar para 800.
  ...PROJECT_COVERS.map((src) => ({ src, widths: [480, 640, 800], aspect: 16 / 9 })),
];

/** Ícones do site: hoje o favicon baixa os 46 KiB de logotipo-vk.webp. */
const ICONS = [
  { out: 'favicon-32.webp', size: 32, format: 'webp' },
  { out: 'favicon-64.webp', size: 64, format: 'webp' },
  { out: 'apple-touch-icon-180.png', size: 180, format: 'png' },
];
const ICON_SOURCE = 'images/fotos-projetos-pessoais/vk-portifolio/logotipo-vk.webp';

// Imagens de preview de link (og:image) em `public/images/og/<nome>.jpg`.
// Quadradas e < 300px: o WhatsApp exibe miniatura compacta à esquerda do título
// (em vez de banner) e não aceita WebP de forma confiável — por isso JPEG.
// Nomes espelhados em scripts/prerender-meta.mjs e src/hooks/useSeo.ts.
const OG_SIZE = 280;
const OG_BACKGROUND = { r: 10, g: 10, b: 18 }; // #0a0a12 — theme-color do site
/** Slug de cada capa em PROJECT_COVERS (mesma ordem). */
const PROJECT_COVER_SLUGS = [
  'agendeaqui',
  'meu-portfolio',
  'oliveira-kids',
  'saberes-interculturais',
  'transcritor-de-entrevistas',
  'maratonatech',
  'ntidi',
  'queelvra',
  'sigref',
  'va-suplementos',
  'vksoftware',
];
const OG_IMAGES = [
  // Foto: `cover` ancorado no topo para manter o rosto no recorte quadrado.
  { out: 'home', src: 'images/eu/victorkaue.webp', fit: 'cover', position: 'north' },
  // Capas de projeto são 16:9 — `contain` evita cortar logo/screenshot.
  ...PROJECT_COVERS.map((src, i) => ({ out: PROJECT_COVER_SLUGS[i], src, fit: 'contain' })),
];

const kib = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

/** Registra no manifesto que `<src>-<width>.webp` existe em disco. */
function keep(variants, src, width) {
  const key = `/${src}`;
  (variants[key] ??= []).push(width);
}

/** Destino já existe e é mais novo que a origem? */
function isFresh(srcPath, outPath) {
  if (FORCE || !existsSync(outPath)) return false;
  return statSync(outPath).mtimeMs >= statSync(srcPath).mtimeMs;
}

async function buildVariant(srcPath, outPath, width, aspect) {
  const height = aspect ? Math.round(width / aspect) : null;
  await sharp(srcPath)
    .resize({
      width,
      height: height ?? undefined,
      fit: 'cover',
      // 'centre' reproduz o mesmo enquadramento do `object-fit: cover` do CSS.
      position: 'centre',
      withoutEnlargement: true,
    })
    .webp({ quality: 78, effort: 6 })
    .toFile(outPath);
}

async function run() {
  let generated = 0;
  let skipped = 0;
  let missing = 0;
  let savedFrom = 0;
  let savedTo = 0;
  /** { "/images/...webp": [480, 800] } — só larguras que existem em disco. */
  const variants = {};

  for (const target of TARGETS) {
    const srcPath = join(PUBLIC, target.src);
    if (!existsSync(srcPath)) {
      console.warn(`[optimize-images] origem ausente: ${target.src}`);
      missing++;
      continue;
    }

    const srcSize = statSync(srcPath).size;
    const meta = await sharp(srcPath).metadata();
    const ext = extname(target.src);
    const base = target.src.slice(0, -ext.length);

    for (const width of target.widths) {
      if (meta.width && width > meta.width) {
        console.warn(
          `[optimize-images] ${target.src}: pulando ${width}w (origem tem só ${meta.width}px)`
        );
        continue;
      }

      const outRel = `${base}-${width}.webp`;
      const outPath = join(PUBLIC, outRel);
      mkdirSync(dirname(outPath), { recursive: true });

      if (isFresh(srcPath, outPath)) {
        skipped++;
        keep(variants, target.src, width);
        continue;
      }

      await buildVariant(srcPath, outPath, width, target.aspect);
      const outSize = statSync(outPath).size;

      // Origem pequena demais: a variante recortada ficou maior que o original.
      // Descarta e deixa o `src` original responder por essa largura.
      if (outSize >= srcSize) {
        rmSync(outPath);
        console.warn(
          `[optimize-images] ${outRel} descartada — ${kib(outSize)} >= origem ${kib(srcSize)}`
        );
        continue;
      }

      keep(variants, target.src, width);
      generated++;
      savedFrom += srcSize;
      savedTo += outSize;
      console.log(`[optimize-images] ${outRel} — ${kib(outSize)} (origem ${kib(srcSize)})`);
    }
  }

  // Ícones do site (raiz de public/).
  const iconSrcPath = join(PUBLIC, ICON_SOURCE);
  if (existsSync(iconSrcPath)) {
    for (const icon of ICONS) {
      const outPath = join(PUBLIC, icon.out);
      if (isFresh(iconSrcPath, outPath)) {
        skipped++;
        continue;
      }
      const pipeline = sharp(iconSrcPath).resize({
        width: icon.size,
        height: icon.size,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      });
      await (icon.format === 'png'
        ? pipeline.png({ compressionLevel: 9 })
        : pipeline.webp({ quality: 90, effort: 6 })
      ).toFile(outPath);
      generated++;
      console.log(`[optimize-images] ${icon.out} — ${kib(statSync(outPath).size)}`);
    }
  } else {
    console.warn(`[optimize-images] origem de ícone ausente: ${ICON_SOURCE}`);
    missing++;
  }

  // Previews de link (og:image).
  for (const og of OG_IMAGES) {
    const srcPath = join(PUBLIC, og.src);
    if (!existsSync(srcPath)) {
      console.warn(`[optimize-images] origem de og:image ausente: ${og.src}`);
      missing++;
      continue;
    }
    const outRel = `images/og/${og.out}.jpg`;
    const outPath = join(PUBLIC, outRel);
    mkdirSync(dirname(outPath), { recursive: true });
    if (isFresh(srcPath, outPath)) {
      skipped++;
      continue;
    }
    await sharp(srcPath)
      .resize({
        width: OG_SIZE,
        height: OG_SIZE,
        fit: og.fit,
        position: og.position ?? 'centre',
        background: OG_BACKGROUND,
      })
      .flatten({ background: OG_BACKGROUND }) // JPEG não tem alpha
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(outPath);
    generated++;
    console.log(`[optimize-images] ${outRel} — ${kib(statSync(outPath).size)}`);
  }

  // Manifesto consumido por src/utils/imageSrcSet.ts — evita `srcset` apontando
  // para variante que foi descartada por ser maior que o original.
  const sorted = Object.fromEntries(
    Object.entries(variants)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, widths]) => [key, [...widths].sort((a, b) => a - b)])
  );
  mkdirSync(dirname(MANIFEST), { recursive: true });
  writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`, 'utf8');
  console.log(`[optimize-images] manifesto → src/data/image-variants.json`);

  console.log(
    `[optimize-images] ${generated} geradas, ${skipped} já atualizadas, ${missing} origens ausentes.`
  );
  if (generated > 0) {
    console.log(
      `[optimize-images] soma das origens processadas ${kib(savedFrom)} → variantes ${kib(savedTo)}.`
    );
  }
}

run().catch((err) => {
  console.error('[optimize-images] falhou:', err);
  process.exit(1);
});
