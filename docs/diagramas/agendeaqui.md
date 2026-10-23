# AgendeAqui — diagramas

Fonte: `github.com/Victorkaue333/AgendeAqui`, branch padrão `desenv`
(último commit 18/01/2026). Já existe um diagrama ER conceitual no repositório,
publicado na galeria (`diagrama-er.webp`).

## 1. Contexto

```mermaid
flowchart LR
  PRO([Professor]) -->|solicita e cancela reservas| APP[AgendeAqui]
  COO([Coordenação]) -->|aprova / reprova com justificativa| APP
  ADM([Administração]) -->|cadastra blocos, salas, recursos e usuários| APP
  APP -->|e-mails| SMTP[Servidor SMTP]
  APP -.->|calendário via CDN| FC[FullCalendar]
```

## 2. Containers

```mermaid
flowchart TB
  U([Navegador]) --> NG[Nginx<br/>proxy reverso + HTTPS]
  CB[Certbot] -. certificados .-> NG
  NG --> WEB[Django 5.0 + Gunicorn<br/>templates + Bootstrap 5]
  WEB --> DB[(PostgreSQL 15<br/>SQLite em dev)]
  WEB -->|tarefas| R[(Redis<br/>broker, resultados, cache)]
  W[Celery worker] --> R
  B[Celery beat] --> R
  W -->|e-mails| SMTP[SMTP]
  subgraph apps [Apps Django]
    direction LR
    A1[agendamentos] --- A2[salas] --- A3[usuarios] --- A4[notificacoes]
    A5[dashboard] --- A6[relatorios] --- A7[administracao]
  end
  WEB --- apps
```

Nota: Nginx e Certbot estão declarados no `docker-compose.yml`, mas as
configurações montadas não estão no repositório — desenhar com borda tracejada.

## 3. Sequência — solicitação e aprovação

```mermaid
sequenceDiagram
  actor P as Professor
  actor C as Coordenação
  participant W as Django
  participant DB as Banco
  participant R as Redis
  participant WK as Celery worker
  P->>W: cria reserva (sala, data, horário)
  W->>DB: Agendamento status = Pendente
  C->>W: aprova ou reprova (justificativa obrigatória na reprovação)
  W->>DB: status = Aprovado | Reprovado
  W->>DB: Notificação no sistema
  W-)R: send_booking_notification_async.delay
  R-)WK: tarefa
  WK->>WK: envia e-mail (até 3 tentativas)
  P->>W: cancela (≥ 24 h antes)
  W->>DB: status = Reprovado
```

Não desenhar validação de conflito de horário: ela foi removida do branch
padrão (ver auditoria §3.8).

## 4. Deploy / CI

```mermaid
flowchart LR
  GH[Push no GitHub] --> CI[GitHub Actions]
  CI --> L[lint]
  CI --> T[pytest + cobertura]
  CI --> S[Bandit + Safety]
  L & T & S -.->|informativos| BLD[build da imagem Docker]
  BLD --> DEP[deploy por SSH]
```

Legenda: lint/Bandit/Safety estão com `continue-on-error` — não bloqueiam o
build (seta tracejada).
