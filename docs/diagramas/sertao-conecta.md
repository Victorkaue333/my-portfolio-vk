# Sertão Conecta — diagramas

Fonte: repositório privado `sertao-conecta` (HEAD de 26/09/2026). Publicação
depende de confirmação com o IF Sertão-PE. Não incluir: IP, especificação do
servidor, nomes de host internos, dados de alunos.

## 1. Contexto

```mermaid
flowchart LR
  AL([Aluno]) --> SC[Sertão Conecta<br/>PWA]
  PR([Professor]) --> SC
  AD([Administração]) --> SC
  CO([Coordenação · leitura]) --> SC
  SC -->|e-mail transacional| RS[Resend]
  SC -.->|erros, só com consentimento| SE[Sentry]
  GH[GitHub Actions] -->|deploy| SC
```

## 2. Containers (servidor do instituto)

```mermaid
flowchart TB
  B([Navegador · PWA React 19]) --> NX[Nginx do host · SSL]
  subgraph srv [Servidor do instituto · Docker]
    NX -->|/| WEB[web · build Vite]
    NX -->|/api · /auth| KG[Kong]
    KG --> AU[GoTrue · Auth]
    KG --> RE[PostgREST]
    KG --> RT[Realtime]
    KG --> SG[Storage]
    KG --> EF[Edge Runtime · Deno<br/>16 funções]
    AU & RE & RT & SG & EF --> PG[(PostgreSQL 16<br/>RLS · triggers · pg_cron)]
    OB[Prometheus + Grafana] -.-> PG
  end
  AU --> RS[Resend]
```

## 3. Gamificação (regras no banco)

```mermaid
flowchart LR
  MJ[Minijogo no app<br/>6 motores] -->|INSERT| PL[progresso_logs]
  PL -->|trigger| VAL[fn_validar_progresso_log]
  VAL -->|trigger| CRD[fn_creditar_xp_progresso]
  CRD --> LED[(xp_modulo_creditado<br/>impede ganho em dobro)]
  CRD --> XP[total de XP do usuário e do curso]
  XP -->|pg_cron| RK[refresh do ranking]
  RK -->|Realtime| UI[cabeçalho e ranking no app]
```

## 4. Certificado

```mermaid
sequenceDiagram
  actor A as Aluno
  participant DB as PostgreSQL
  participant EF as generate-certificate-pdf
  participant ST as Storage (bucket privado)
  A->>DB: conclui 100% dos módulos
  DB->>DB: matrícula CONCLUIDA (imutável por trigger)
  A->>EF: pede o certificado (JWT)
  EF->>DB: confere dono e conclusão
  EF->>ST: grava PDF
  EF-->>A: URL assinada
  Note over A,DB: validação pública em /validar-certificado/:codigo
```

## 5. CI/CD

```mermaid
flowchart LR
  PR[Pull request] --> FCI[frontend-ci<br/>lint · Vitest · build · Playwright]
  PR --> RLS[rls-pentest]
  PR --> SEC[security-review<br/>gitleaks · cobertura RLS]
  MAIN[Push na main] --> RUN[runner self-hosted no servidor]
  RUN --> D1[web: docker compose up --build]
  RUN --> D2[migrations]
  RUN --> D3[edge functions]
  RUN --> D4[observabilidade]
```

Crédito no diagrama de componentes do app (se for desenhado): motores de
minijogo e player de vídeo foram da Giselle Novaes.
