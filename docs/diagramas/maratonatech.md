# MaratonaTech (plataforma Maratona Pitch) — diagramas

Fonte: `Maratona-IFSert-oTECH-Ano-IV/MaratonaPitch/` (Django). O código da
aplicação não está versionado neste clone (pasta não rastreada); o histórico
original é citado na documentação. Sistema encerrado no código desde dez/2025.

Não incluir: a "nova geração" (Next.js/NestJS/Prisma) como se existisse — só
como planejado, tracejado, se for desenhada. Não incluir credenciais nem rotas
com risco documentado.

## 1. Contexto

```mermaid
flowchart LR
  ORG([Organização]) -->|startups, jurados, sessões| MP[Maratona Pitch]
  VOT([Público votante]) -->|voto pelo celular| MP
  VIS([Visitante]) -->|ranking| MP
```

## 2. Componentes

```mermaid
flowchart TB
  BR([Navegador · templates + JS]) -->|HTML + fetch JSON · sessão + CSRF| DJ
  subgraph DJ [Django 5.1 · Gunicorn · WhiteNoise · Docker]
    LAND[landing · como votar · /health/]
    ADMN[administracao<br/>cadastro de startups e jurados]
    VOTA[votacao<br/>sessões, votos, auditoria, vencedores, APIs JSON]
    RANK[rankings]
    DASH[dashboard]
  end
  ADMN -->|sincroniza por nome| VOTA
  DJ --> DB[(SQLite padrão<br/>DATABASE_URL em produção)]
```

## 3. Sequência — inscrição → votação → apuração

```mermaid
sequenceDiagram
  actor O as Organização
  actor V as Votante
  participant D as Django
  participant DB as Banco
  O->>D: criar sessão
  D->>DB: VotingSession (agendada) + VotingAudit
  O->>D: abrir sessão
  D->>DB: status aberta + VotingAudit
  V->>D: cadastro e login (sessão Django)
  V->>D: registrar voto (CSRF, botão desabilitado após o clique)
  D->>DB: transação + select_for_update + unique(usuário, sessão) + IP
  O->>D: encerrar sessão
  D->>DB: status encerrada + Top 3 (votos desc, nome asc)
```
