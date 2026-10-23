# SuplaStock — diagramas

Fonte: `github.com/Victorkaue333/SuplaStock` (branch `main`, a5d4bf4).
Pendente: confirmar com o autor se é o mesmo sistema entregue à VA Suplementos
(o código foi renomeado de `va_suplementos`). Não nomear o cliente nos
diagramas até lá.

## 1. Contexto

```mermaid
flowchart LR
  V([Visitante]) -->|landing + pedido de acesso| APP[SuplaStock]
  U([Equipe da loja<br/>admin · vendedor · estoquista]) -->|estoque, vendas, fiado, financeiro| APP
  APP -->|PDF / Excel| DOC[Relatórios]
```

## 2. Módulos (apps Django)

```mermaid
flowchart TB
  subgraph django [Django 5.1 · Gunicorn · WhiteNoise]
    LAND[dashboard<br/>landing Tailwind + GSAP e painéis]
    USR[usuarios<br/>login, redefinição de senha, papéis]
    EST[estoque<br/>produto, validade, margem, alertas]
    VEN[vendas<br/>venda, pagamento, cliente]
    FIN[financeiro<br/>contas a receber/pagar, caixa, relatórios]
  end
  VEN --> EST
  FIN --> VEN
  django --> DB[(PostgreSQL via DATABASE_URL<br/>SQLite local)]
  FIN --> PDF[ReportLab]
  FIN --> XLS[openpyxl]
```

## 3. Fluxo — venda fiada

```mermaid
sequenceDiagram
  actor V as Vendedor
  participant F as financeiro
  participant E as estoque
  participant DB as Banco
  V->>F: carrinho → nova venda fiada
  F->>DB: Venda (Pendente) + ContaReceber (origem = fiado) + itens
  F->>E: baixa de estoque na hora da venda
  V->>F: registra recebimento (parcial ou total)
  F->>DB: RecebimentoConta com idempotency_key (trava de linha)
  F->>DB: atualiza status: Parcial → Pago
```

## 4. Deploy (Railway)

```mermaid
flowchart LR
  B[build: collectstatic] --> P[pré-deploy idempotente<br/>migrate · categorias · admin · papéis]
  P --> S[gunicorn]
  S --> H1[/healthz/ liveness — sem banco/]
  S --> H2[/health/ banco, cache, storage/]
```

Não incluir: Nginx (existe pasta, mas a Railway roda o Gunicorn direto) e DRF
(citado no README, não está nas dependências).
