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
| `github` / `online` | string? | Links do repositório / site publicado. |
| `detailPath` | string | Default `/projetos/{slug}`. |
| `technologies` / `stack` | string[] | Fallback entre si na normalização. |
| `category` | `'pessoal' \| 'real'` | Filtro da página Projetos. |
| `status` | `'production' \| 'delivered' \| 'mvp' \| 'development'`? | Selo no hero do detalhe. Só com status confirmado. |
| `caseStudy` | `ProjectCaseStudy`? | Estudo de caso do detalhe (ver abaixo). |
| `metrics` / `role` / `teamSize` / `duration` | opcionais | Só com dado real (ADR-0010). |
| `featured` | boolean? | Destaque fixo na Home. |
| `screenshots` | string[]? | Galeria do detalhe. |

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
| `decisions` | `{ topic, choice, why }[]` | Decisões técnicas (escolha → porquê). |
| `stack` | `{ name, role }[]` | Tabela tecnologia → função. Ícone por `name` em `TECH_ICONS`. |
| `roadmap` | string[]? | Próximos passos. |

Quando `role` existe, a seção "Meu papel" entra entre o resultado e as
funcionalidades.

### Experience — `src/data/experiences.ts`
`id` (PK), `title`, `company`, `period`, `location`, `type` (`current`|`past`),
`icon`, `achievements[]`, `description?`.

### Education — `src/data/education.ts`
`id` (PK), `institution`, `course`, `period`, `icon`.

### ExpertiseCategory / ExpertiseItem — `src/data/expertise.ts`
Categoria: `title`, `items[]`. Item: `name`, `icon`, `iconType`
(`devicon`|`lucide`|`svg`).

### Certificate — `src/data/certificates.ts`
`id` (PK), `title`, `issuer`, `category`, `image?`, `pdf?`.

### Service — `src/data/services.ts`
`id` (PK), `title`, `description`, `icon`, `features[]`.

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
