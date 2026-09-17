# CHANGELOG

Histórico de mudanças por versão. Formato baseado em
[Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/); versionamento
[SemVer](https://semver.org/lang/pt-BR/). Mais recente no topo.

Tipos: **Adicionado**, **Alterado**, **Corrigido**, **Removido**.

---

## [Não lançado]

### Adicionado (camada de interação — parte 2)
- **Terminal interativo** em `/sobre`: depois da abertura animada, a sessão
  aceita digitação. Comandos: `help`, `about`, `projects`, `stack`, `github`,
  `spotify`, `contact`, `ls`, `pwd`, `whoami`, `clear`; histórico com ↑/↓;
  `projects --open <n>` navega para o projeto. Interpretação por whitelist
  (`components/ui/Terminal/commands.tsx`) — não é um shell (ADR-0013).
- **Bloco de Spotify** em `/sobre`: Spotify Embed oficial (`SPOTIFY_URL` em
  `src/config/spotify.ts`) e, opcionalmente, "Now Playing" real pela função
  serverless `api/spotify/now-playing.js`. Sem autoplay. Some da página quando
  não há nem embed configurado nem integração ativa.
- **`developer.ts`** (`components/ui/CodeWindow`): janela de editor com o
  perfil escrito como código, derivada de `data/expertise.ts`,
  `data/projects.ts` e `data/experiences.ts`.
- `.env.example` com os nomes das variáveis do Spotify (nenhuma obrigatória).

### Alterado (camada de interação — parte 2)
- `GithubActivity` passou a ler de `src/utils/github.ts`, a fonte única das
  chamadas e do cache — o mesmo módulo que o comando `github` do terminal usa.
  Sem mudança visual.

### Adicionado
- Documentação padrão do projeto: `PROJECT_CONTEXT.md`, `CLAUDE.md` (raiz) e
  `docs/` com `PRD`, `ARCHITECTURE`, `API`, `DATABASE`, `DEPLOY`,
  `ENVIRONMENT`, `DECISIONS` e `CHANGELOG`.
- Índice de documentação e README no estilo do padrão AEX.
- SEO: `public/robots.txt`, `public/sitemap.xml`, `vercel.json` (rewrite SPA +
  cache de assets), `<link rel="canonical">`, JSON-LD `Person`, Open Graph
  completo e Twitter Card corrigido (`name=`).
- Rota 404 (`*`) com página `NaoEncontrado` (evita soft-404).
- Internacionalização (PT/EN) das páginas Serviços, Certificados, Contato,
  Detalhe do Projeto e lacunas da Home; `<html lang>` sincronizado ao idioma.

### Alterado
- **Arquitetura:** registro único de páginas em `src/config/pages.ts` substitui as
  listas de rotas duplicadas (App, Navbar, MobileNavbar, Footer, `navLinks`,
  prerender). `sitemap.xml` passa a ser gerado no build; `public/sitemap.xml`
  removido. SEO do prerender usa as mesmas fontes do runtime (ADR-0009).
- **Scroll reveal:** um observador global (`components/Layout/ScrollReveal`) no
  lugar do hook `useScrollReveal` chamado por página e do IntersectionObserver
  por instância do `<Reveal>`. Pega conteúdo que aparece depois (filtros, seções
  recolhidas) sem `deps` manuais e escalona o atraso só entre elementos que
  entram na tela juntos. Classe `.reveal-on-scroll` e API do `<Reveal>` mantidas.
- **Performance:** `FloatingLines` reescrito de three.js/R3F para Canvas 2D
  (chunk 1.006 kB → 2,3 kB) e removidas as deps `three`, `@react-three/fiber`,
  `@react-three/drei`; ícones migrados de devicon (fonte ~1,5 MB + 140 kB de CSS)
  para react-icons/Simple Icons; loader de primeira visita 2 s → 0,8 s.
- `Button` passa a renderizar `<Link>` para rotas internas (sem full reload).
- Transição de página usa `location.pathname` (não remonta ao reclicar a rota).

### Corrigido
- `ProjectCarousel`: hook condicional (risco de crash) e navegação por teclado.
- `FirstVisitLoader`/`useLanguage`: acesso a `localStorage` com guarda
  (evita crash com cookies bloqueados).
- Contato: `setTimeout` sem cleanup; deep-link `#hash` agora rola até a âncora;
  badge de categoria em Certificados exibe o rótulo (não o id).

### Removido
- `~12,9 MB` de assets: galeria morta (`Serra_do_Arapua`, 8,3 MB) e fontes
  devicon (11,2 MB não copiadas ao build); deps mortas `axios`, `lucide-react`,
  `radix-ui`, `class-variance-authority`, `@fontsource/orbitron`, `devicon`.
- Script `projects:enrich` (`scripts/enrich-projects.mjs`) e
  `src/data/projects.enrichment.json`: o JSON não era lido por nenhum código e o
  script já não achava URLs desde que os projetos saíram de `projects.ts` para
  arquivos próprios.

## [2.0.0] — 2026

Versão atual do `package.json`. Reescrita do portfólio como SPA moderna.

### Adicionado
- SPA em React 19 + TypeScript + Vite 6 com roteamento (react-router-dom 7) e
  lazy loading por rota.
- Páginas: Home, Sobre, Projetos, Detalhe de Projeto, Serviços, Certificados,
  Contato.
- Internacionalização PT/EN (i18next) com persistência em `localStorage`.
- Animações com framer-motion e elementos 3D (three / @react-three/fiber).
- Conteúdo tipado em `src/data/` (projetos pessoais e profissionais,
  experiências, formação, certificados, serviços, links sociais).
- Formulário de contato via deep-link de WhatsApp.
- Script `projects:enrich` para enriquecer projetos a partir de READMEs do GitHub.
- SEO básico com Open Graph e Twitter Card; tema dark premium com design tokens.
- Deploy estático na Vercel.

---

## Como manter

A cada release, criar uma seção `## [X.Y.Z] — AAAA-MM-DD` acima da anterior,
mover os itens de **[Não lançado]** para ela e alinhar a versão do
`package.json`. Agrupar por tipo de mudança.

> Entradas anteriores à v2.0.0 não foram registradas neste changelog.
