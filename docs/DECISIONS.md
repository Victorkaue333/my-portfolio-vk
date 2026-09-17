# DECISIONS

Registro de decisões técnicas (ADRs). Decisões são **acrescentadas, não
apagadas** — o histórico é a memória do projeto. Mais recente no topo.

Formato de cada entrada: data · contexto · decisão · alternativas · consequências.

---

## ADR-0013 — Terminal interativo com whitelist e Spotify em duas camadas

- **Data:** 2026-09-17
- **Contexto:** O terminal do ADR-0012 só reproduzia uma sessão gravada. O
  pedido seguinte foi torná-lo uma experiência real — a pessoa digita e ele
  responde — e acrescentar um bloco de Spotify, a única referência musical do
  portfólio. Os dois tocam em assunto sensível: um terminal na web sugere
  execução de comando, e o Spotify sugere OAuth com segredo. Este projeto é uma
  SPA estática, sem backend (ADR-0002), publicada na Vercel.
- **Decisão:**
  1. **Terminal:** interpretação por lista fechada em
     `components/ui/Terminal/commands.tsx` — o texto digitado é normalizado e
     comparado com `TERMINAL_COMMANDS`; um `switch` escolhe qual função local
     roda. Não existe `eval`, `new Function`, `child_process`, shell, nem
     requisição que carregue a entrada do usuário. O único "argumento" aceito é
     `projects --open <n>`, e mesmo ele só indexa a lista de
     `data/projects.ts`. Entrada desconhecida responde
     `command not found: <x>`. Toda saída sai de dado que o site já publica.
  2. **Spotify em duas camadas:** o **Embed oficial** é o caminho padrão —
     `SPOTIFY_URL` em `src/config/spotify.ts`, sem credencial, sem servidor, com
     `toEmbedUrl()` validando host e tipo antes de virar `src` de iframe (e sem
     `autoplay`). O **Now Playing** é opcional e vive na única função serverless
     do projeto, `api/spotify/now-playing.js`: `SPOTIFY_CLIENT_ID`,
     `SPOTIFY_CLIENT_SECRET` e `SPOTIFY_REFRESH_TOKEN` ficam no servidor, sem
     prefixo `VITE_`, e a resposta devolve só metadado público da faixa. Sem as
     variáveis o endpoint responde `501 { configured: false }` e o front cai no
     embed — a integração é degradável por desenho.
  3. **Uma fonte por integração:** `utils/github.ts` e `utils/spotify.ts`
     concentram chamada, cache e tratamento de erro. O card e o comando do
     terminal consomem o mesmo módulo; `GithubActivity` foi refatorado para ler
     de lá em vez de ter o `fetch` embutido.
- **Alternativas consideradas:** um parser de linha de comando genérico com
  flags e caminhos (superfície maior, nenhum ganho — a lista de saídas é
  finita); pedir o token do Spotify no cliente com PKCE (exigiria login do
  visitante para ver o que *eu* estou ouvindo — inverte o sentido do
  componente); embutir o refresh token no bundle com `VITE_` (é público: está
  fora de questão); manter o `fetch` do GitHub dentro do componente e repetir a
  chamada no terminal (dois caches, dois tratamentos de 429, números que podem
  divergir na mesma tela).
- **Consequências:** O projeto passa a ter uma função serverless — a primeira.
  Ela é opcional: sem variáveis configuradas, `vercel dev`/`vite dev` e o host
  estático continuam funcionando, e o front trata 404, 501, 429 e 502 como
  "sem Now Playing". O `.env.example` volta a existir, agora com os nomes deste
  projeto (fecha a pendência apontada no ADR-0002 e em `docs/ENVIRONMENT.md`).
  Enquanto `SPOTIFY_URL` estiver vazio e o endpoint não estiver configurado, o
  bloco de Spotify não é renderizado — nenhum card vazio entra na página.
  **Macbook Scroll** segue de fora pelos motivos do ADR-0012 (dependência de
  `@tabler/icons-react`, ~160 nós só do teclado e `min-h-[200vh]` na rota);
  a lupa (Lens) nas screenshots do detalhe de projeto já cobre "ver a interface
  de perto" sem esse custo.

---

## ADR-0012 — Camada de interação Aceternity UI, portada em vez de instalada

- **Data:** 2026-09-17
- **Contexto:** Pedido de acrescentar animações e microinterações inspiradas no
  Aceternity UI **sobre** a interface existente — sem refatorar layout, sem
  trocar componentes por demos e sem introduzir uma segunda identidade visual.
  O caminho oficial (`npx shadcn@latest add @aceternity/<nome>`) assume Next.js
  com App Router, `components.json` do shadcn, `cn()` de `@/lib/utils`
  (clsx + tailwind-merge), `motion/react` e `next/image`. Este projeto é Vite +
  React 19 SPA, sem shadcn, com estilo em CSS por componente e tokens em
  `styles/variables.css`.
- **Decisão:** Baixar o código oficial de cada componente pelo registro do
  Aceternity (`https://ui.aceternity.com/registry/<nome>.json`, a mesma fonte
  que o CLI consome) e portar arquivo a arquivo para a convenção do projeto:
  uma pasta por componente em `src/components/ui/` com `.tsx` + `.css`, cores
  derivadas de `--accent-color`/neutros via `color-mix`, e `cn()` local
  (`src/utils/cn.ts`) — sem clsx nem tailwind-merge, porque não há sopa de
  classes Tailwind para desempatar. Zero dependência nova.
  Onde o original usa framer-motion só para interpolar um número ou ler o
  progresso da rolagem (Glowing Effect, Timeline, Text Generate, Spotlight,
  Floating Navbar, Animated Tabs, Terminal), o port usa CSS ou
  `requestAnimationFrame`: Home, Sobre e Projetos não carregam o pacote de
  animação hoje e um tween não justifica +46 kB gzip na rota. O framer é usado
  onde já estava carregado (Lens, no detalhe de projeto).
  Tokens de movimento em `src/config/motion.ts`, espelhando
  `--transition-fast/normal/slow`.
- **Alternativas consideradas:** rodar `shadcn init` + `add` (criaria
  `components.json`, reescreveria a configuração do Tailwind 4 e traria
  componentes em `.tsx` com Tailwind inline, quebrando a convenção de CSS por
  componente); copiar o JSX oficial como veio e sobrescrever cores por cima
  (o visual padrão — azul/roxo/rosa — continuaria vazando em estados não
  cobertos); manter os efeitos de borda animada que já existiam (mantê-los
  junto com os novos empilharia dois efeitos no mesmo card).
- **Consequências:** Os componentes não recebem atualização pelo CLI — são
  código do projeto, e cada um cita a URL de origem no topo do arquivo. Três
  itens do catálogo não entraram: **Canvas Reveal Effect** (dependência do
  Card Spotlight oficial) exigiria `three` + `@react-three/fiber`, retirados do
  projeto no ADR-0005; **Macbook Scroll** exigiria `@tabler/icons-react`, cerca
  de 160 nós de DOM só do teclado e `min-h-[200vh]` na página, e os projetos em
  destaque têm logotipo como capa, não screenshot de tela cheia — sem imagem
  real para a tela do MacBook, o componente seria enfeite caro; **Focus Cards**
  entrou como comportamento em CSS, porque o JSX oficial traz a própria grade e
  substituiria o card de certificado inteiro.
  As luzes de borda que giravam em loop (`borderLight`, 4s infinitos em
  `.service-pro-card`, `.diferencial-card` e `.service-card`) foram removidas:
  o Glowing Effect e o Card Spotlight cobrem o mesmo papel e só gastam quadro
  durante a interação.

---

## ADR-0011 — 4 idiomas e textos i18n organizados por tela

- **Data:** 2026-09-17
- **Contexto:** Todo o texto PT/EN vivia num único `src/i18n.ts` (~500 linhas),
  com alguns blocos soltos em `src/locales/{seo,github,uses}.ts`. O seletor da
  navbar só alternava PT ↔ EN. Pedido: suportar pt-BR, pt-PT, en e es, com
  bandeiras.
- **Decisão:** `src/locales/languages.ts` é a fonte única dos idiomas (código,
  rótulo, país da bandeira, locale do `Intl`) e do `normalizeLanguage` (`pt`
  antigo no `localStorage` → `pt-BR`). Textos em `src/locales/<idioma>/<tela>.ts`
  (layout, common, home, sobre, projetos, projetoDetalhe, servicos,
  certificados, contato, uses, naoEncontrado, seo), montados no `index.ts` de
  cada idioma. Os nomes das chaves não mudaram (`t('servicos.heroMain')`). Os
  arquivos pt-BR são a base de tipos: os outros são `typeof base`. Seletor em
  `components/ui/LanguageSwitcher` (dropdown na navbar, grade na sidebar do
  Sobre) com `country-flag-icons` (SVG, só as bandeiras importadas entram no
  bundle — o Windows não renderiza emoji de bandeira).
- **Alternativas consideradas:** namespaces do i18next por tela (exigiria trocar
  todos os `t()` e `useTranslation(ns)`); JSON por idioma (perde a checagem de
  chaves pelo `tsc`); `flag-icons` via CSS (carrega todas as bandeiras).
- **Consequências:** Chave faltando em qualquer idioma quebra o build. Dados com
  `Record<Language, string>` (`uses.ts`, `testimonials.ts`) precisam dos 4
  idiomas. O prerender continua indexando só pt-BR.

---

## ADR-0010 — Só dado verificável no portfólio + Vercel Analytics

- **Data:** 2026-09-17
- **Contexto:** A Home exibia contadores fixos (30%, 25+, 10+) sem origem, e
  Serviços mostrava três depoimentos placeholder. Para quem avalia, número sem
  contexto e depoimento inventado derrubam a credibilidade. Também não havia
  nenhuma medição de tráfego para orientar melhorias.
- **Decisão:** Números da Home passam a ser derivados de `src/data/` em
  `src/data/profile.ts` (total de projetos, projetos profissionais, empresas),
  cada um com legenda e link. Depoimentos: lista vazia esconde a seção. Campos
  de estudo de caso (`metrics`, `role`, `teamSize`, `duration`, `featured`) e de
  certificado (`verifyUrl`, `credentialId`) entram como **opcionais** — o bloco
  só renderiza com dado real. Adicionado `@vercel/analytics` (`<Analytics />` no
  `App`).
- **Alternativas consideradas:** manter os números com legenda genérica;
  Plausible/Umami (exigem conta/servidor externo); Google Analytics (pesado e
  exige banner de cookies).
- **Consequências:** Blocos novos ficam invisíveis até os dados serem
  preenchidos. Analytics precisa ser ativado no painel da Vercel e só coleta em
  produção.

---

## ADR-0009 — Registro único de páginas (`src/config/pages.ts`)

- **Data:** 2026-09-17
- **Contexto:** A lista de rotas estava repetida em ~8 lugares: `<Routes>` do
  `App`, `routes.ts`, `Navbar` (ícone + chave i18n), `MobileNavbar`, `Footer`,
  `data/social.ts` (`navLinks`), `prerender-meta.mjs` (títulos PT copiados do
  i18n + regex sobre os arquivos de projeto) e `public/sitemap.xml` manual.
  Página ou projeto novo exigia editar todos — e o SEO do prerender divergia do
  runtime sem aviso.
- **Decisão:** `src/config/pages.ts` (dados puros: `path`, `entry`, `navKey`,
  `seoKey`, `sitemap`) é a fonte única. `routes.ts` deriva `lazy()`/prefetch via
  `import.meta.glob`; menus usam `navPages` + `config/navIcons.ts`; páginas
  chamam `usePageSeo(key)`. Strings `seo.*` saíram para `src/locales/seo.ts` (hoje `src/locales/<idioma>/seo.ts`, ver ADR-0011) e
  as funções de SEO de projeto para `src/utils/projectSeo.ts`.
  `src/config/prerender.ts` monta rotas e sitemap a partir dessas fontes, e o
  `prerender-meta.mjs` o carrega com `runnerImport` do Vite. `sitemap.xml` passa
  a ser gerado em `dist/`.
- **Alternativas consideradas:** plugin Vite no `vite.config.ts` (importar dados
  do `src/` no config reiniciaria o dev server a cada edição de conteúdo); JSON
  compartilhado (perde tipagem e não cobre dados de projeto); manter as cópias.
- **Consequências:** Página nova = 1 entrada em `pages.ts` (+ ícone e chaves
  i18n, cobrados pelo `tsc`). O prerender depende de `vite` (já devDependency) e
  `src/config/prerender.ts` não pode importar nada que dependa do navegador.
  Saída verificada idêntica à anterior (17 rotas, 0 diferenças).

## ADR-0008 — CSS global inline e modulepreload da rota no HTML pós-build

- **Data:** 2026-09-17
- **Contexto:** PageSpeed mobile (96) apontou LCP de 4,5s com ~3,5s de atraso
  de renderização no `<p class="hero-description">`, CSS global bloqueando a
  renderização (~150ms) e cadeia de rede parando no `index.js` — o chunk lazy
  da Home só era descoberto após executar o JS. O preload da foto do Hero
  baixava o original, não a variante escolhida pelo `srcset`.
- **Decisão:** `scripts/prerender-meta.mjs` coloca o `index-*.css` inline num
  `<style>` e injeta `modulepreload` (+ `preload as=style`) do chunk de cada rota
  lido do manifest do Vite. Hero da Home entra só com CSS (`.hero-enter`), sem
  `Reveal`/IntersectionObserver. Preload da foto ganha `imagesrcset`/`imagesizes`.
- **Alternativas consideradas:** plugin Vite de critical CSS (dependência nova);
  import estático da Home (aumenta o JS das outras rotas); SSR/SSG.
- **Consequências:** HTML ~40 KB maior (sem cache separado do CSS — aceitável
  numa SPA que baixa o HTML uma vez). `imagesrcset` do `index.html` precisa
  acompanhar o `<img>` do Hero.

## ADR-0007 — Variantes de imagem geradas por `sharp` e commitadas

- **Data:** 2026-07-23
- **Contexto:** O PageSpeed (mobile) apontava **341 KiB** desperdiçados servindo
  originais em elementos muito menores — o pior caso era `images/eu/victor.webp`
  (193,7 KiB, 1080×1920) usado como avatar 28×28 em cada `ProjectCard`. O hero
  (elemento LCP) também só era descoberto depois de `index.js` → `Home.js`.
- **Decisão:** Adicionar `sharp` como **devDependency** e o script
  `scripts/optimize-images.mjs` (`npm run images:optimize`), que gera
  `<nome>-<largura>.webp` ao lado do original e grava
  `src/data/image-variants.json`. As variantes são **commitadas**; o build da
  Vercel não roda o script. `src/utils/imageSrcSet.ts` monta o `srcset` a partir
  do manifesto — nunca aponta para variante inexistente (o script descarta
  variantes que ficariam maiores que o original). O `prerender-meta.mjs` passou
  a injetar `preload` do hero (só em `/`) e `modulepreload` do chunk da rota,
  lendo `dist/.vite/manifest.json`.
- **Alternativas consideradas:** Vercel Image Optimization (`/_vercel/image`) —
  sem dependência nova, mas consome cota e não funciona em `dev`;
  `vite-imagetools`; redimensionar manualmente.
- **Consequências:** Repositório carrega ~470 KiB de variantes versionadas e é
  preciso rodar `npm run images:optimize` ao adicionar/trocar uma capa de
  projeto (senão ela é servida em tamanho original). Em troca: sem dependência
  em runtime, sem custo de build na Vercel e o mesmo enquadramento do
  `object-fit: cover` (crop `centre`).

## ADR-0006 — Conteúdo de `src/data/` em PT-BR fixo (i18n cobre só a UI)

- **Data:** 2026-07-12
- **Contexto:** O i18next traduz a UI (navegação, heros, formulários), mas o
  conteúdo em `src/data/` (experiências, expertise, descrições de projetos) é
  texto PT-BR hard-coded. Ao trocar para EN, esse conteúdo permanece em PT.
- **Decisão:** Manter o conteúdo de dados apenas em PT-BR. O público-alvo do
  portfólio é brasileiro; duplicar todo o conteúdo em EN custaria manutenção
  contínua sem retorno claro.
- **Alternativas consideradas:** campos `{ pt, en }` nos tipos de dados;
  arquivos de dados por idioma; mover conteúdo para chaves i18n.
- **Consequências:** Página em EN fica híbrida (chrome em EN, conteúdo em PT).
  Se o público internacional crescer, migrar os tipos de dados para campos
  bilíngues é o caminho.

## ADR-0005 — Canvas 2D + react-icons no lugar de three.js/R3F e devicon

- **Data:** 2026-07-12 (registro; decisão vigente no código)
- **Contexto:** O background 3D do Hero (three/@react-three/fiber/drei) pesava
  ~1 MB de bundle WebGL, e o font-icon devicon somava ~1,5 MB para exibir
  ícones de tecnologia.
- **Decisão:** Reescrever o background como Canvas 2D
  (`components/ui/FloatingLines`) com o mesmo visual, e resolver ícones de
  tecnologia por nome via react-icons (Simple Icons/Feather) no mapa
  `TECH_ICONS` (`components/ui/TechIcon`). Dependências three/R3F, devicon e
  lucide-react removidas do `package.json`.
- **Alternativas consideradas:** manter WebGL com lazy-load; sprite SVG próprio;
  CDN devicon (dependência externa em runtime).
- **Consequências:** ~2,5 MB a menos de bundle e zero CDN em runtime; novas
  tecnologias exigem registrar o ícone no mapa `TECH_ICONS`. Atualiza o stack
  descrito no ADR-0001.

## ADR-0004 — Contato via deep-link de WhatsApp (sem e-mail server-side)

- **Data:** 2026-07-11 (registro; decisão vigente no código)
- **Contexto:** O formulário de contato precisa entregar mensagens sem manter
  backend, servidor de e-mail ou proteção anti-spam.
- **Decisão:** Ao enviar, montar uma URL `wa.me` com os campos pré-formatados e
  abrir o WhatsApp em nova aba (`src/pages/Contato/Contato.tsx`).
- **Alternativas consideradas:** serviço de e-mail (EmailJS/Formspree);
  função serverless de envio; `mailto:`.
- **Consequências:** Zero backend e canal direto/imediato; porém depende de o
  usuário ter WhatsApp e não gera registro server-side das mensagens.

## ADR-0003 — Conteúdo como código TypeScript (sem CMS/banco)

- **Data:** 2026-07-11 (registro; decisão vigente no código)
- **Contexto:** Projetos, experiências e certificados precisam ser exibidos e
  atualizados com segurança de tipos.
- **Decisão:** Modelar o conteúdo como módulos `.ts` tipados em `src/data/`,
  agregados/normalizados em build (ver `projects.ts`).
- **Alternativas consideradas:** CMS headless (Contentful/Sanity); banco +
  API; arquivos Markdown/JSON.
- **Consequências:** Type-safety, histórico via git e deploy trivial; em troca,
  editar conteúdo exige alterar código e refazer o build (sem edição em runtime).

## ADR-0002 — Manter arquivos `.env`/`.env.example` do AIOX apenas documentados

- **Data:** 2026-07-11
- **Contexto:** A raiz contém `.env` e `.env.example` do instalador "Synkra
  AIOX" (chaves de LLM, Supabase, etc.) que **não são usados** pelo app. O
  `.env.example` versionado é enganoso.
- **Decisão:** Documentar a discrepância em [ENVIRONMENT.md](ENVIRONMENT.md) e
  **não** remover/reescrever os arquivos sem confirmação do autor, por serem
  tooling externo.
- **Alternativas consideradas:** apagar ambos; reescrever `.env.example` já.
- **Consequências:** Nenhum risco de quebrar tooling externo; pendência aberta
  para limpar o `.env.example` quando confirmado.

## ADR-0001 — Stack front-end: React 19 + TypeScript + Vite, SPA estática

- **Data:** 2026-07-11 (registro; decisão vigente no código)
- **Contexto:** Portfólio precisa de UI premium/animada, bilíngue e de fácil
  hospedagem, servindo também como prova de competência técnica.
- **Decisão:** SPA com React 19, TypeScript strict, Vite 6, react-router-dom 7,
  Tailwind 4, framer-motion, three/@react-three/fiber e i18next; deploy estático
  na Vercel.
- **Alternativas consideradas:** Next.js (SSR/SSG); Astro; site estático simples.
- **Consequências:** Navegação fluida e DX moderna; SEO limitado a meta tags
  estáticas (sem SSR) e conteúdo dependente de rebuild para atualizar.

---

## Como adicionar uma decisão

Copie o bloco abaixo no topo da lista, incremente o número e preencha:

```
## ADR-XXXX — <título curto>
- **Data:** AAAA-MM-DD
- **Contexto:** <por que a decisão foi necessária>
- **Decisão:** <o que foi decidido>
- **Alternativas consideradas:** <opções descartadas>
- **Consequências:** <trade-offs, impactos, dívidas>
```
