# CLAUDE.md

Regras para IA atuar neste repositório. Objetivo, conciso.

## Identidade do projeto

Portfólio pessoal de **Victor Kauê** — SPA front-end estática, sem banco e sem
backend de aplicação. Única exceção: uma função serverless opcional
(`api/spotify/now-playing.js`, ADR-0013) que guarda as credenciais do Spotify no
servidor. Conteúdo (projetos, experiências, certificados) vive como dados
TypeScript em `src/data/`. Idioma do produto: PT-BR (com PT-PT, EN e ES via i18n). Idioma dos docs: PT-BR.

## Stack

- React 19 + TypeScript (strict) + Vite 6
- Roteamento: react-router-dom 7 (`BrowserRouter`, SPA)
- Estilo: Tailwind CSS 4 + CSS por componente + design tokens em `src/styles/variables.css`
- Animação: framer-motion nos componentes interativos; transição de página em CSS (`page-enter`, sem framer-motion no bundle inicial); background do Hero é Canvas 2D (`FloatingLines`) — three.js/R3F foi removido
- Tema claro/escuro: `src/theme/ThemeProvider.tsx` (persistido em `localStorage`)
- i18n: i18next + react-i18next (`pt-BR`, `pt-PT`, `en`, `es`), detecção via `localStorage` (`portfolio-lang`). Idiomas em `src/locales/languages.ts`; textos por tela em `src/locales/<idioma>/<tela>.ts`; bandeiras via `country-flag-icons` no `LanguageSwitcher`
- Ícones: react-icons (Simple Icons + Feather), resolvidos por nome em `src/components/ui/TechIcon/TechIcon.tsx` (`TECH_ICONS`); devicon foi removido
- Analytics: `@vercel/analytics` (`<Analytics />` no `App`, ADR-0010)
- Testes: Playwright — smoke E2E em `tests/e2e/`, roda contra o build de produção (`vite preview`)
- Deploy: Vercel — estático + funções de `api/`; rewrites e headers de cache em `vercel.json`

## Estrutura

```
src/
  components/   Layout/ e ui/ (um componente por pasta, .tsx + .css)
  pages/        uma pasta por rota (Home, Sobre, Projetos, ...)
  config/       pages.ts (registro único de rotas), navIcons, site, spotify
  data/         conteúdo tipado (projects/, experiences, certificates, ...)
  locales/      textos i18n por idioma e tela
  hooks/        hooks reutilizáveis
  utils/        clientes de integração (github.ts, spotify.ts) e helpers
  styles/       variables, reset, global, animations
  theme/        ThemeProvider (claro/escuro)
  types/        interfaces compartilhadas (index.ts)
api/            funções serverless da Vercel (hoje só spotify/now-playing.js)
tests/e2e/      smoke Playwright (rotas saem de src/config/pages.ts)
scripts/        utilitários Node (prerender-meta.mjs, optimize-images.mjs)
docs/           documentação do projeto
```

## Comandos essenciais

- `npm run dev` — dev server em `http://localhost:5173` (sem `api/`: o Spotify cai no Embed)
- `npm run build` — checagem de tipos (`tsc -b`) + build Vite + prerender de `<head>`/sitemap
- `npm run preview` — serve o build de produção
- `npm run test:e2e` — build + smoke Playwright (`test:e2e:ui` abre o modo interativo). Primeira vez: `npx playwright install chromium`
- `npm run doctor` — diagnóstico do react-doctor
- `npm run images:optimize` — gera variantes responsivas `.webp` + `src/data/image-variants.json` (rodar ao adicionar/trocar capa de projeto; commitar o resultado)

"Testar" = `npm run build` sem erro de tipo + `npm run test:e2e` passando +
validação visual manual (`dev`/`preview`). O smoke cobre: cada rota do sitemap
responde 200 com `<title>` e sem erro de console, 404 do app, Manrope
self-hosted e tema persistido após reload. Não há testes unitários.

## Convenções

- Componentes: PascalCase, uma pasta por componente com `.tsx` + `.css` de mesmo nome.
- Nova página: pasta em `src/pages/` + entrada em `src/config/pages.ts` (rota, menu, SEO, sitemap saem daí). Se for de menu: ícone em `src/config/navIcons.ts` e chave `nav.*`; SEO em `src/locales/<idioma>/seo.ts`. Nunca repetir listas de rotas em componentes.
- Import alias: `@/` → `src/` (ver `vite.config.ts` e `tsconfig`). Prefira caminhos relativos existentes ao editar arquivos que já os usam.
- Novos projetos do portfólio: criar arquivo em `src/data/projects/{pessoais|profissionais}/` e registrar em `src/data/projects.ts`. Seguir a interface `Project` em `src/types/index.ts`.
- Textos visíveis: pt-BR é a base de tipos. Chave nova vai no arquivo da tela em `src/locales/pt-BR/` **e** nos mesmos arquivos de `pt-PT/`, `en/` e `es/` (o `tsc` falha se faltar). Tela nova = arquivo novo nas 4 pastas + spread no `index.ts` de cada idioma. Dados com texto por idioma usam `Record<Language, string>`.
- Imagens: `.webp` em `public/images/...`, referenciadas por caminho absoluto (`/images/...`).
- Currículo: PDF em `public/docs/Curriculo/` + linha em `CV_FILES` (`src/config/cv.ts`). Nunca apontar o botão direto para um arquivo.
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, ...).

## Guardrails — a IA NUNCA deve

- Adicionar backend, banco de dados ou dependência pesada sem pedido explícito. Este é um projeto front-end estático; `api/` existe só para a integração opcional do Spotify — não criar função nova ali sem pedido.
- Commitar segredos. `.env` está no `.gitignore`; `.env.example` lista só nomes. O bundle não lê variáveis de ambiente; segredo só em função de `api/` via `process.env`, nunca com prefixo `VITE_` (o Vite embute `VITE_*` no bundle público).
- Rodar `git push`, `git commit` ou abrir PR sem solicitação explícita do usuário.
- Rodar comandos destrutivos (`git reset --hard`, `rm -rf`, force push) sem confirmação.
- Substituir CSS/tokens globais em massa por causa de um ajuste local.
- Introduzir texto hard-coded onde já existe chave i18n.
- Alterar a interface `Project` sem atualizar todos os arquivos de dados que a consomem.

## Referências

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) · [docs/DATABASE.md](docs/DATABASE.md) · [docs/DEPLOY.md](docs/DEPLOY.md)
- [docs/API.md](docs/API.md) — contratos externos + endpoint `/api/spotify/now-playing` · [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md) — variáveis opcionais
- [docs/DECISIONS.md](docs/DECISIONS.md) — histórico de decisões técnicas.
