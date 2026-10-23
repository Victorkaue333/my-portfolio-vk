# Mav Imob — diagramas

Fonte: repositório privado `aex-hub/mavis-mob` (branch `release`, 19/10/2026).
Código proprietário da AEX Hub Capital: **publicar só com autorização**.

Não incluir em hipótese alguma: percentuais de comissão, metas, nomes de
imobiliárias parceiras ou tenants, domínio, nomes de planos, hosts de deploy.

## 1. Contexto

```mermaid
flowchart LR
  EQ([Equipe da Mav]) --> MI[Mav Imob]
  CT([Corretores e captadores]) --> MI
  PC([Imobiliárias parceiras]) --> MI
  OS[Mavis OS<br/>SaaS irmão] -.->|webhook HMAC · lado do envio ainda não implementado| MI
```

## 2. Containers

```mermaid
flowchart TB
  ADM[Admin SPA<br/>React + Vite] -->|REST + JWT| API
  PAR[Portal do parceiro<br/>React + Vite] -->|REST + JWT| API
  ADM -.->|login| AUTH[Supabase Auth]
  ADM -.->|upload por URL assinada| STO[Supabase Storage]
  subgraph API [API NestJS 11]
    G[guards: rate limit → auth → escopo]
    INT[integração · webhook]
    DOM[vendas · comissão · repasses · DRE]
    WK[worker BullMQ]
  end
  API -->|JWKS| AUTH
  API -->|Prisma| PG[(PostgreSQL 17)]
  API <-->|filas · rate limit| RD[(Redis)]
  OS[Mavis OS] -.->|HMAC| INT
```

Acento laranja sugerido: `DOM` (função única de comissão com Decimal
half-even e teste-guardião no CI).
