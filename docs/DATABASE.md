# DATABASE

> **Não há banco de dados.** O projeto é uma SPA estática; o "modelo de dados"
> é um conjunto de módulos TypeScript tipados em `src/data/`, compilados no
> bundle. Não há SGBD, migrações, índices nem políticas de acesso (RLS).
> Este documento descreve o modelo de conteúdo e suas relações.

## Fonte da verdade

- **Contratos (tipos):** `src/types/index.ts`
- **Dados:** `src/data/*.ts` (+ `src/data/projects/{pessoais,profissionais}/*.ts`)

## Diagrama entidade-relacionamento (lógico)

```
                       ┌───────────────┐
                       │    Project    │  (pessoal | real)
                       ├───────────────┤
                       │ id (PK)       │
                       │ slug          │
                       │ title         │
                       │ category      │
                       │ technologies[]│
                       │ status?       │
                       │ caseStudy?    │
                       │ screenshots[] │
                       └──────┬────────┘
   agrega em projects.ts      │ 1..* referencia (nome)
        ┌────────────────┐    │        ┌────────────────┐
        │  Experience    │    │        │ ExpertiseItem  │
        │ id (PK)        │    │        │ name / icon    │
        └────────────────┘    │        └───────┬────────┘
        ┌────────────────┐    │         agrupado│por
        │  Education     │    │        ┌────────▼────────┐
        │ id (PK)        │    │        │ExpertiseCategory│
        └────────────────┘    │        └─────────────────┘
        ┌────────────────┐    │        ┌────────────────┐
        │  Certificate   │    │        │    Service     │
        │ id (PK)/pdf    │    │        │ id (PK)        │
        └────────────────┘    │        └────────────────┘
        ┌────────────────┐    │        ┌────────────────┐
        │  SocialLink    │    │        │  GalleryAlbum  │
        │ name (PK)/url  │    │        │ id / images[]  │
        └────────────────┘    │        └────────────────┘
```

As relações são por **convenção/valor** (não por FK): ex.: `Project.technologies`
usa nomes que também aparecem em `ExpertiseItem.name`.

## "Tabelas" (coleções) e colunas

### Project — `src/data/projects.ts` (+ `projects/`)
Chave: `id`. Normalizado por `normalizeProject` (defaults para campos vazios).

| Campo | Tipo | Notas |
| --- | --- | --- |
| `id` | string | Identificador único (PK). |
| `slug` | string? | Default = `id`; usado na rota `/projetos/:id`. |
| `title` | string | — |
| `description` | string | Resumo curto exibido nos cards. |
| `image` | string | Caminho em `/images/...` (default placeholder). |
| `github` / `online` | string? | Links do repositório / site publicado. Sem `github`, não há botão de código (nada de apontar para o perfil). |
| `privateCode` | boolean? | Código de cliente/empresa: mostra o selo "Código privado". |
| `detailPath` | string | Default `/projetos/{slug}`. |
| `technologies` / `stack` | string[] | Fallback entre si na normalização. |
| `category` | `'pessoal' \| 'real'` | Filtro da página Projetos. |
| `status` | `'production' \| 'delivered' \| 'mvp' \| 'development'`? | Selo no hero do detalhe. Só com status confirmado. |
| `caseStudy` | `ProjectCaseStudy`? | Estudo de caso do detalhe (ver abaixo). |
| `metrics` / `role` / `teamSize` / `duration` | opcionais | Só com dado real (ADR-0010). |
| `teamType` | `'solo' \| 'pair' \| 'team'`? | Composição do time; tem precedência sobre `teamSize` no rótulo. |
| `experienceId` | string? | `id` do grupo em `experiences.ts`. Alimenta "Experiência" no detalhe e "Projetos relacionados" no Sobre. |
| `featured` | boolean? | Destaque fixo na Home. |
| `screenshots` | string[]? | Galeria do detalhe (alt automático). |
| `media` | `{ src, type: 'screenshot' \| 'diagram', alt, caption? }[]`? | Galeria com alt/legenda; tem precedência sobre `screenshots`. Diagrama ganha moldura clara. Inventário em `docs/auditoria/midias.md`. |

#### `ProjectCaseStudy` — ordem das seções no detalhe

A página numera as seções na ordem abaixo e monta o sumário lateral a partir
delas; campo opcional vazio some da página e do sumário.

| Campo | Tipo | Seção |
| --- | --- | --- |
| `overview` | string[] | 01 Visão geral — 1º parágrafo é o destaque. |
| `audiences` | `{ who, goal }[]`? | "Para quem", dentro da visão geral. |
| `challenge` / `solution` / `result` | string | Do problema ao resultado (linha do tempo; `metrics` entram no resultado). |
| `features` | `{ title?, items[] }[]` | Funcionalidades agrupadas por tema. |
| `architecture` | `{ layers: { icon, label, detail }[], highlights?[] }` | Fluxo de camadas + pontos-chave. `icon`: `client`, `device`, `server`, `api`, `queue`, `ai`, `database`, `storage`, `cloud`, `integration`. |
| `decisions` | `{ topic, choice, why, tradeoff? }[]` | Decisões técnicas (escolha → porquê → custo aceito). `tradeoff` só quando estiver escrito no repositório do projeto. |
| `quality` | string[]? | Engenharia e qualidade: testes, CI, segurança, observabilidade. |
| `stack` | `{ name, role }[]` | Tabela tecnologia → função. Ícone por `name` em `TECH_ICONS`. |
| `limitations` | string[]? | Limitações e pendências conhecidas. |
| `roadmap` | string[]? | Próximos passos. |

Quando `role` existe, a seção "Minha contribuição" entra entre o resultado e
as funcionalidades.

### ExperienceGroup / ExperienceRole — `src/data/experiences.ts`
Grupo (empresa): `id` (PK, referenciado por `Project.experienceId`), `company`,
`logo?`, `employmentType?`, `location?`, `roles[]`. Cargo: `title`, `period`
(formato LinkedIn em pt-BR, ex.: `jun 2026 - o momento`), `employmentType?`,
`location?`, `workMode?`, `description?`, `activities[]?`, `skills[]?`.
A duração e o período no idioma da página são calculados em `utils/period.ts`
(`duration`/`totalDuration` digitados ficaram só como fallback).

### Education — `src/data/education.ts`
`id` (PK), `institution`, `course`, `period`, `icon`.

### ExpertiseCategory / ExpertiseItem — `src/data/expertise.ts`
Categoria: `id` (`backend` | `frontend` | `data` | `infra` | `ai` | `history` |
`tools`; título em `about.domains.<id>`), `items[]`. Item: `name` (ícone por
nome em `TECH_ICONS`). A ordem importa: CodeWindow e o terminal leem os
primeiros itens de `backend` e `frontend`.

### Certificate — `src/data/certificates.ts`
`id` (PK), `title`, `issuer`, `category`, `image?`, `pdf?`.

### Service — `src/data/services.ts`
`id` (PK; textos em `servicos.items.<id>`), `group` (`build` | `automation` |
`engineering`), `icon`, `tech[]` (nomes de `TECH_ICONS`), `projects[]` (`id` dos
projetos que comprovam o serviço — serviço sem evidência não entra).

### SocialLink — `src/data/social.ts`
`name` (PK), `url`, `icon`, `detail`, `iconType` (`react`|`lucide`|`bootstrap`).

## Índices e migrações

Não aplicável — dados em memória/bundle. "Migração" = editar os arquivos `.ts`
e refazer o build. O histórico de mudanças de dados é o próprio git.

## Políticas de acesso

Não aplicável — todo o conteúdo é público e estático. Não há RLS, roles nem
dados sensíveis. Nunca colocar segredos nos arquivos de dados (eles vão para o
bundle público).

## Como adicionar/editar conteúdo

1. Editar/criar o arquivo em `src/data/` (para projetos, em
   `projects/pessoais/` ou `projects/profissionais/` e registrar em
   `projects.ts`).
2. Respeitar a interface correspondente em `src/types/index.ts`.
3. `npm run build` para validar tipos; commit; deploy.
