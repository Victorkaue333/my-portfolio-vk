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
                       │ summary?      │
                       │ detailed_info?│
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
| `summary` | objeto? | `{ problema, solucao, stack }`. |
| `detailed_info` | objeto? | Desafio, solução, impacto, arquitetura, decisões, `tech_v2[]`. |
| `screenshots` | string[]? | Galeria do detalhe. |

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
