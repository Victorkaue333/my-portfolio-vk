# ARCHITECTURE

Arquitetura e decisões estruturais. Decisões detalhadas em [DECISIONS.md](DECISIONS.md).

## Visão geral

Aplicação **front-end estática (SPA)**, sem banco e sem backend de aplicação.
Todo o conteúdo é compilado a partir de dados TypeScript versionados no
repositório e servido como arquivos estáticos pela Vercel. Em runtime há só
leituras pontuais: a API pública do GitHub (anônima) e uma função serverless
opcional, `api/spotify/now-playing.js`, que guarda as credenciais do Spotify
no servidor (ADR-0013).

## Diagrama de componentes

```
┌──────────────────────────────────────────────────────────────┐
│                        Navegador (cliente)                     │
│                                                                │
│   index.html ──▶ main.tsx ──▶ App.tsx (BrowserRouter)          │
│                                   │                            │
│        ┌──────────────────────────┼───────────────────────┐   │
│        │ Layout persistente        │  Rotas (lazy)          │   │
│        │ Navbar / Footer /         │  /          Home       │   │
│        │ MobileNavbar / BackToTop  │  /sobre     Sobre      │   │
│        │ ScrollReveal/ScrollToTop  │  /projetos  Projetos   │   │
│        └──────────────────────────┤  /projetos/:id Detalhe │   │
│                                    │  /servicos  Servicos   │   │
│   ThemeProvider (claro/escuro)     │  /certificados         │   │
│   i18next (4 idiomas)              │  /contato   Contato    │   │
│        ◀── localStorage            │  /uses  ·  * (404)     │   │
│                                    └───────────────────────┘   │
│                                                                │
│   Fonte de dados: src/data/*.ts  (import estático, bundled)    │
└──────┬──────────────────┬──────────────────┬──────────────────┘
       │ deep-link        │ fetch anônimo    │ fetch
       ▼                  ▼                  ▼
 WhatsApp (wa.me)    API do GitHub     /api/spotify/now-playing
 GitHub / LinkedIn                     (serverless) ──▶ API do Spotify
```

## Camadas e responsabilidades

### Apresentação (`src/pages/`, `src/components/`)
- `pages/` — uma pasta por rota; cada página monta seções e consome dados.
- `components/Layout/` — chrome persistente (Navbar, Footer, BackToTop, scroll).
- `components/ui/` — blocos reutilizáveis (Button, PageHero, ProjectCard,
  ProjectCarousel, TechMarquee, TechIcon, Counter, Reveal, FloatingLines,
  Terminal, Spotify, GithubActivity, LanguageSwitcher…).
- `FloatingLines` — background animado do Hero em Canvas 2D (three.js/R3F
  foi removido para cortar ~1 MB de bundle WebGL).
- Ícones de tecnologia: resolvidos por nome via `TECH_ICONS` em
  `components/ui/TechIcon/TechIcon.tsx` (react-icons — Simple Icons/Feather).
  O font-icon devicon foi removido (~1,5 MB).
- Estilo: Tailwind 4 + CSS por componente + tokens em `styles/variables.css`
  (+ `light-overrides.css` para o tema claro).

### Estado / infraestrutura de cliente
- Roteamento SPA com `react-router-dom` (lazy loading + `Suspense` por rota).
  Fonte única das páginas: `src/config/pages.ts` — alimenta `<Routes>`, menus,
  `usePageSeo`, prerender de `<head>` e `sitemap.xml` (ver ADR-0009).
- Tema claro/escuro em `src/theme/ThemeProvider.tsx` (contexto React,
  persistido em `localStorage`; tokens do tema claro em
  `styles/light-overrides.css`).
- i18n com `i18next` + `react-i18next` em pt-BR, pt-PT, EN e ES; textos em
  `src/locales/<idioma>/<tela>.ts`; idioma persiste em `localStorage`
  (`portfolio-lang`). Cobre a UI; o conteúdo de `src/data/` é PT-BR fixo
  (ver DECISIONS.md, ADR-0006 e ADR-0011).
- Transição de página em CSS (`page-enter`, troca de `key` no wrapper);
  `framer-motion` só nos componentes interativos, fora do bundle inicial.
- Integrações em runtime com fonte única em `src/utils/`: `github.ts` (API
  pública, cache em `sessionStorage`) e `spotify.ts` (nunca lança; sem a
  função, cai no Embed). Contratos em [API.md](API.md).
- Hooks locais em `src/hooks/` (ex.: `useScrollPosition`, `useLanguage`).
- Scroll reveal: basta a classe `reveal-on-scroll` (ou `<Reveal>` para
  delay/offset próprios); `components/Layout/ScrollReveal`, montado uma vez no
  `App`, observa o DOM inteiro — páginas não chamam hook.

### Dados (`src/data/`)
- Conteúdo como módulos TypeScript tipados (não há fetch em runtime).
- `projects.ts` agrega arquivos de `projects/pessoais/` e
  `projects/profissionais/`, normaliza e exporta `projects` e `featuredProjects`.
- Demais: `experiences.ts`, `education.ts`, `expertise.ts`, `services.ts`,
  `social.ts`, `certificates.ts`.
- Contratos em `src/types/index.ts`.

### Função serverless (`api/`)
- `api/spotify/now-playing.js` — única peça server-side. Stateless: troca o
  refresh token por access token a cada invocação e devolve só metadado
  público da faixa. Lê `SPOTIFY_*` de `process.env` (ver
  [ENVIRONMENT.md](ENVIRONMENT.md)); sem elas responde `501` e o front usa o
  Embed. Cache de 30 s na CDN.
- Não roda no `vite dev` (o cliente trata o 404 como "não configurado").
- Está em JS puro e fora do `tsc -b`.

### Infraestrutura
- Build: Vite 6 (`tsc -b` + `vite build`) + `scripts/prerender-meta.mjs`
  (`<head>` por rota e `sitemap.xml`), code-splitting por rota e
  `manualChunks` para vendors (react, motion, i18n; `react-icons` fica de fora
  para cada rota carregar só os seus ícones).
- Deploy: Vercel — estático + `api/`; rewrites SPA e headers de cache em
  `vercel.json`. Ver [DEPLOY.md](DEPLOY.md).
- Testes: smoke E2E com Playwright (`tests/e2e/`) contra `vite preview`;
  rotas lidas de `src/config/pages.ts`. `tsconfig.e2e.json` entra no `tsc -b`.
- Métricas: `@vercel/analytics` (`<Analytics />` no `App`, ADR-0010).

## Integrações externas

| Integração | Momento | Uso |
| --- | --- | --- |
| WhatsApp `wa.me` | Runtime | Deep-link do formulário de contato. |
| GitHub / LinkedIn / e-mail | Runtime | Links sociais e repositórios. |
| API pública do GitHub | Runtime | Atividade em `/sobre` e `/`, comando `github` do terminal. |
| Spotify (Embed + `/api/spotify/now-playing`) | Runtime | Bloco de Spotify em `/sobre` e comando `spotify`. |
| Vercel Analytics | Runtime (produção) | Visitas e páginas vistas. |

Ícones de tecnologia são bundlados via react-icons — não há mais CDN devicon
em runtime.

## Decisões-chave

- **Sem backend de aplicação**: portfólio é conteúdo estático → menor custo,
  superfície de ataque mínima, deploy trivial. A função do Spotify é a única
  exceção, opcional e sem estado (ADR-0013).
- **Conteúdo como código**: dados em `.ts` versionados dão type-safety e
  histórico via git, ao custo de exigir redeploy para editar conteúdo.
- **Contato via WhatsApp**: evita servidor de e-mail/anti-spam; canal direto.
- **SPA + lazy routes**: navegação fluida com bundle inicial enxuto.

Justificativas completas em [DECISIONS.md](DECISIONS.md).
