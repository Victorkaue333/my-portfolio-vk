# CLAUDE.md

Regras para IA atuar neste repositório. Objetivo, conciso.

## Identidade do projeto

Portfólio pessoal de **Victor Kauê** — SPA front-end, sem backend. Conteúdo
(projetos, experiências, certificados) vive como dados TypeScript em
`src/data/`. Idioma do produto: PT-BR (com PT-PT, EN e ES via i18n). Idioma dos docs: PT-BR.

## Stack

- React 19 + TypeScript (strict) + Vite 6
- Roteamento: react-router-dom 7 (`BrowserRouter`, SPA)
- Estilo: Tailwind CSS 4 + CSS por componente + design tokens em `src/styles/variables.css`
- Animação: framer-motion (transições de página e reveals); background do Hero é Canvas 2D (`FloatingLines`) — three.js/R3F foi removido
- Tema claro/escuro: `src/theme/ThemeProvider.tsx` (persistido em `localStorage`)
- i18n: i18next + react-i18next (`pt-BR`, `pt-PT`, `en`, `es`), detecção via `localStorage` (`portfolio-lang`). Idiomas em `src/locales/languages.ts`; textos por tela em `src/locales/<idioma>/<tela>.ts`; bandeiras via `country-flag-icons` no `LanguageSwitcher`
- Ícones: react-icons (Simple Icons + Feather), resolvidos por nome em `src/components/ui/TechIcon/TechIcon.tsx` (`TECH_ICONS`); devicon foi removido
- Deploy: Vercel

## Estrutura

```
src/
  components/   Layout/ e ui/ (um componente por pasta, .tsx + .css)
  pages/        uma pasta por rota (Home, Sobre, Projetos, ...)
  data/         conteúdo tipado (projects/, experiences, certificates, ...)
  hooks/        hooks reutilizáveis
  styles/       variables, reset, global, animations
  types/        interfaces compartilhadas (index.ts)
scripts/        utilitários Node (prerender-meta.mjs, optimize-images.mjs)
docs/           documentação do projeto
```

## Comandos essenciais

- `npm run dev` — dev server em `http://localhost:3000`
- `npm run build` — checagem de tipos (`tsc -b`) + build Vite
- `npm run preview` — serve o build de produção
- `npm run images:optimize` — gera variantes responsivas `.webp` + `src/data/image-variants.json` (rodar ao adicionar/trocar capa de projeto; commitar o resultado)

Não há suíte de testes automatizados. "Testar" = `npm run build` passar sem
erro de tipo + validação visual manual (`dev`/`preview`).

## Convenções

- Componentes: PascalCase, uma pasta por componente com `.tsx` + `.css` de mesmo nome.
- Nova página: pasta em `src/pages/` + entrada em `src/config/pages.ts` (rota, menu, SEO, sitemap saem daí). Se for de menu: ícone em `src/config/navIcons.ts` e chave `nav.*`; SEO em `src/locales/<idioma>/seo.ts`. Nunca repetir listas de rotas em componentes.
- Import alias: `@/` → `src/` (ver `vite.config.ts` e `tsconfig`). Prefira caminhos relativos existentes ao editar arquivos que já os usam.
- Novos projetos do portfólio: criar arquivo em `src/data/projects/{pessoais|profissionais}/` e registrar em `src/data/projects.ts`. Seguir a interface `Project` em `src/types/index.ts`.
- Textos visíveis: pt-BR é a base de tipos. Chave nova vai no arquivo da tela em `src/locales/pt-BR/` **e** nos mesmos arquivos de `pt-PT/`, `en/` e `es/` (o `tsc` falha se faltar). Tela nova = arquivo novo nas 4 pastas + spread no `index.ts` de cada idioma. Dados com texto por idioma usam `Record<Language, string>`.
- Imagens: `.webp` em `public/images/...`, referenciadas por caminho absoluto (`/images/...`).
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, ...).

## Guardrails — a IA NUNCA deve

- Adicionar backend, banco de dados ou dependência pesada sem pedido explícito. Este é um projeto front-end estático.
- Commitar segredos. `.env` está no `.gitignore`; o app não usa variáveis de ambiente em runtime.
- Rodar `git push`, `git commit` ou abrir PR sem solicitação explícita do usuário.
- Rodar comandos destrutivos (`git reset --hard`, `rm -rf`, force push) sem confirmação.
- Substituir CSS/tokens globais em massa por causa de um ajuste local.
- Introduzir texto hard-coded onde já existe chave i18n.
- Alterar a interface `Project` sem atualizar todos os arquivos de dados que a consomem.

## Referências

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) · [docs/DATABASE.md](docs/DATABASE.md) · [docs/DEPLOY.md](docs/DEPLOY.md)
- [docs/DECISIONS.md](docs/DECISIONS.md) — histórico de decisões técnicas.
