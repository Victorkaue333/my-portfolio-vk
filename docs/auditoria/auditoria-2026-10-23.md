# Auditoria do portfólio — 23/10/2026

Inventário e divergências levantados antes da refatoração de Projetos, Sobre e
Serviços. Fontes, na ordem de prioridade: código dos repositórios (locais e
públicos), README/ADRs de cada projeto, dados em `src/data/`, informações do
autor. Nada aqui é estimativa: o que não foi confirmado está marcado como
**pendente**.

Repositórios lidos (somente leitura): `touch-speaker`, `TeacherLog-Automation`,
`Maratona-IFSert-oTECH-Ano-IV`, `sertao-conecta`, `henrique-solar`,
`AexHub/{mavis-mob,mavis-os,GlipyTravel,Glipy-Business,GlipPay,LP-GlipyTravel}`,
`CajiSolutions/{CajiAgent,reinosolar}`, e clones de `AgendeAqui` e `SuplaStock`.

Legenda de confiança: **C** confirmado em arquivo/git · **P** parcial · **R**
refutado · **?** pendente de validação.

---

## 1. Estrutura do site (mapa)

| Página | Arquivo | Dados | Observações |
| --- | --- | --- | --- |
| `/sobre` | `src/pages/Sobre/Sobre.tsx` | `data/experiences.ts`, `education.ts`, `expertise.ts`, `social.ts` | Textos fixos em PT no JSX (menu, títulos, CTA) — violava a regra de i18n. Durações digitadas e já desatualizadas ("jun 2026 – o momento · 2 meses" em outubro). |
| `/projetos` | `src/pages/Projetos/Projetos.tsx` | `data/projects.ts` + `data/projects/**` | Hero com texto fixo em PT. Card com "Ver detalhes"/"Ver projeto" fixos. |
| `/projetos/:id` | `src/pages/ProjetoDetalhe/ProjetoDetalhe.tsx` | `Project.caseStudy` | Modelo de case já existia (visão geral → problema/solução/resultado → papel → funcionalidades → arquitetura → decisões → stack → próximos passos). |
| `/servicos` | `src/pages/Servicos/Servicos.tsx` | locale `servicos.ts` | 3 cards fixos; `data/services.ts` existia mas **não era usado**. "Consultoria Tech / Estratégia Digital" sem respaldo; FAQ dizia "principalmente Python/Django". |

Componentes compartilhados relevantes: `ProjectCard`, `ProjectCarousel` (+ `Lens`),
`Timeline`, `Terminal`, `CodeWindow`, `TechMarquee`, `TechIcon`, `PageHero`,
`CardSpotlight`, `Button`.

SEO: `useSeo`/`usePageSeo` em runtime, `config/prerender.ts` +
`scripts/prerender-meta.mjs` no build (title, description, OG por rota,
sitemap). Toda rota de projeto tem `public/images/og/<slug>.jpg`.

Todas as 23 páginas de projeto existem (rota dinâmica). Todas as imagens
referenciadas em `src/data` existem em `public/`. Todos os links `github`/`online`
responderam 200 em 23/10/2026.

Problema transversal: `normalizeProject` e `ProjectCard` usavam o perfil do
GitHub como `github` padrão — 11 projetos de cliente/empresa mostravam "Ver
código" apontando para o perfil. **Corrigido** (campo `privateCode`).

---

## 2. Inventário de projetos

Contribuição: **I** = individual (confirmado pelo histórico) · **E** = equipe ·
**D** = dupla. Mídia: nº de imagens existentes em `public/images`.

| Projeto | Slug | Cat. | Situação | Experiência vinculada | Contribuição | Mídias | Prioridade | Problemas |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Portfólio | meu-portfolio | pessoal | produção | — | I | 2 (logo + foto) | média | Sem screenshot real do site. |
| AgendeAqui | agendeaqui | pessoal | entregue (TCC FIC) | — | I (36/36 commits) | 8 + diagrama ER no repo | alta | Ver §3.8. |
| Oliveira Kids | oliveira-kids | pessoal | ? | — | I? | 9 | baixa | Não citado pelo autor; autoria não auditada. |
| Transcritor de Entrevistas | transcritor-de-entrevistas | pessoal | ? | — | I | 0 | média | Sem mídia. |
| SuplaStock | suplastock | pessoal | ? | VA Suplementos? | I (33/33 commits) | 4 | alta | Ver §3.9. |
| Gerador de Certificados | gerador-certificados | pessoal | entregue | — | D (Victor + Giselle) | 0 | média | Sem repo público; métricas (429 certificados, 1,5 s) sem fonte anexada. |
| Dev Job Automation | dev-job-automation | pessoal | ? | — | I | 0 | baixa | Sem mídia. |
| E-commerce PetShop | ecommerce-petshop | pessoal | estudo | — | I | 0 | baixa | Sem mídia. |
| Pé na Estrada | pe-na-estrada | pessoal | estudo | — | I | 0 | baixa | Sem mídia. |
| VMED Pharma | vmedpharma | pessoal | protótipo | — | I | 3 | baixa | — |
| Site de 1 Ano de Namoro | aniversario-namoro | pessoal | produção | — | I | 2 | baixa | Projeto pessoal-afetivo; avaliar se fica. |
| **Touch Speaker** (novo) | touch-speaker | pessoal | MVP v0.1.2 | — | I (38/38 commits) | 3 no repo | alta | Adicionado. Build macOS nunca rodado num Mac. |
| Caji Agent | caji-agent | real | produção | caji-solutions | E | 4 | alta | Ver §3.1. |
| Sertão Conecta | sertao-conecta | real | produção | if-sertao | E (Victor 94% dos commits, Giselle 6%) | 4 | alta | Ver §3.2. |
| SIGREF | sigref | real | ? | gre-estagio | E? | 1 (logo) | alta | Repo não auditado (não está local). |
| NTIDI | ntidi | real | produção | ntidi | E? | 17 | média | Repo não disponível localmente. |
| MaratonaTech | maratonatech | real | encerrado (edição 2025) | if-sertao | E (4 autores no histórico original) | 1 (logo) | alta | Ver §3.3. |
| Mav Imob | mav-imob | real | MVP sem deploy | **pendente** (AEX Hub/Mavis não está em experiences) | E (Victor líder técnico, ~96% dos commits) | 0 | alta | Ver §3.4. |
| Henrique Energia Solar | henrique-energia-solar | real | produção | henrique-energia-solar | I (663/663 commits) | 4 | média | Ver §3.10. |
| Saberes Interculturais | saberes-interculturais | real | produção | cnpq | I? | 5 | média | — |
| DataSertão | data-sertao | real | produção | **pendente** | ? | 4 | média | Projeto diz "bolsista"; experiência IFPE diz "monitor voluntário" e cita IFPE, não IF Sertão-PE. |
| VA Suplementos | va-suplementos | real | ? | **pendente** (VK Software ou Freelancer) | I | 1 (logo) | alta | Projeto diz "desenvolvido pela VK Software"; autor diz "freelance remunerado". |
| Queelvra | queelvra | real | ? | ntidi | ? | 1 | média | Ver §3.5. |
| VK Software | vksoftware | real | produção | vk-software | I | 11 | baixa | — |

Candidatos encontrados e **não** adicionados (precisam de decisão do autor):

| Candidato | Por quê não entrou |
| --- | --- |
| TeacherLog Automation | Coautoria não resolvida (identidade XL2N, 31 commits; README cita Giselle). **Credenciais reais no histórico do git** (ver §4). Repo privado. |
| Glipy Travel | Victor é autor de ~94% dos commits e líder técnico, mas é produto proprietário (licença "proprietary and confidential") — exige autorização. |
| GlipPay / Glipy Business / LP Glipy Travel | Protótipos/landing; mesmas restrições. |
| reinosolar (Caji) | Proposta comercial para cliente; o site é port de tema de terceiros e o código é quase todo de outro dev. Não apresentar como obra própria. |
| Leads-Pro (`leads-google-automation`) | Repo privado, não citado pelo autor. |

---

## 3. Divergências e correções

### 3.1 Caji Agent
| Afirmação no portfólio | Veredito | Ação |
| --- | --- | --- |
| Links de pagamento Stripe, Mercado Pago **e Cakto** | P — Cakto é o checkout da assinatura da plataforma, não do agente | Removido Cakto da lista do agente. |
| Motor de IA não acessa o banco | P — lê/escreve uma tabela de slots de agenda | Reescrito. |
| Fila e sessão no banco "permitem várias réplicas" | P — projetado para N réplicas; produção roda 1 instância por serviço | Reescrito como "projetado para escalar horizontalmente". |
| Decisão "Baileys em vez da API oficial" | C, mas publicar expõe risco de ToS do produto do cliente | Removida. |
| Contribuição: "Conexão do WhatsApp por QR Code ou código" | P — QR já existia; Victor adicionou o código numérico e unificou o fluxo | Reescrito. |
| Contribuição: "CI/CD do painel na Vercel" | P — pipeline de CI no GitHub Actions + smoke pós-deploy | Reescrito. |
| Ausente | C — planos de assinatura com mudança agendada (BILLING-01), medição de uso e cotas (USAGE-01), correções de confiabilidade no WhatsApp (imagem/PDF passaram a funcionar), correção de escopo por tenant, 52 arquivos de teste | Adicionado à contribuição. |
| Experiência "Prospect AI e Caji Assist" | "Caji Assist" = nome anterior do Caji Agent; "Prospect AI" não aparece no repositório | **Pendente**: confirmar Prospect AI. |

Confidencialidade: licença proprietária; não publicar código, prints do admin,
preços, hosts nem números internos.

### 3.2 Sertão Conecta
| Afirmação | Veredito | Ação |
| --- | --- | --- |
| 16 Edge Functions | C (contagem em 23/10/2026) | Mantido, com data. |
| 215 migrations | P — 212 versionadas no HEAD (3 não commitadas) | Corrigido para 212. |
| 109 arquivos de teste | P — 110 no HEAD (105 Vitest + 5 Playwright) | Corrigido para 110. |
| Giselle = front-end | P — README diz "ambos full stack, focos distintos"; Giselle escreveu 39 migrations, motores de minijogo, player de vídeo e parte do certificado | Divisão reescrita sem tirar crédito. |
| Vídeo "com trava contra pular" | P — liberação só com ≥98% assistido + telemetria de saltos; não bloqueia o seek | Reescrito. |
| "Tech lead" | ? — título não aparece no repo; autor afirma | Mantido (informação do autor), sem citar como documentado. |
| Uso: "300+ usuários" (ADR-001) / "230 usuários [CONFIRMAR]" (relatório) | ? | **Não publicado** até confirmação. |

### 3.3 MaratonaTech / Maratona Pitch
| Afirmação | Veredito | Ação |
| --- | --- | --- |
| Bootstrap | R | Removido. |
| Chart.js (django-chartjs) | R — dependência morta, nenhum template carrega | Removido. |
| 1 ou 2 votos por pessoa | R na prática — restrição única garante 1; o campo não é lido | Removido. |
| Top 3 "com desempate definido" | P — desempate só alfabético; regra configurável ignorada | Reescrito. |
| Auditoria de votos | P — auditoria das ações de sessão + IP/hora do voto | Reescrito. |
| SQLite | C como padrão; produção usou `DATABASE_URL` (provável PostgreSQL na Railway, não confirmado) | Reescrito. |
| "MySQL" (texto de experiência) | R — nenhuma referência no código | Removido da experiência. |
| Status | Sistema fechado no código desde dez/2025 ("Volte em 2026") | Status "entregue", texto no passado. |
| Nova geração (NestJS/Next.js) | Só planejamento (pastas vazias, ADRs) | Não mencionada como construída. |
| Maratona Tech × Maratona Pitch | ? — o próprio repo marca como pendente (Q-008): evento "Maratona IFSertãoTech", plataforma "Maratona Pitch – Votings" | Título mantido; nome da plataforma citado. **Pendente** confirmação. |
| ~160 participantes | ? — sem evidência | Não publicado. |
| Autoria | Histórico original (181 commits, nov/2025–abr/2026) citado em docs com 4 autores; não verificável aqui | Marcado como equipe. |

### 3.4 Mav Imob
| Afirmação | Veredito | Ação |
| --- | --- | --- |
| Nome | C — "Mav Imob" é o nome oficial (README, PROJECT_CONTEXT). "Mavis Imob/Mavis Mob" não tem respaldo | Mantido "Mav Imob". |
| Portal do parceiro usa dados simulados | R — desde ADR 0015 lê só a API real | Corrigido. |
| Recebe imóveis do Mavis OS por webhook HMAC | P — lado receptor pronto e testado contra simulador; o envio no Mavis OS ainda não existe | Reescrito. |
| Worker "publica" imóveis | P — sincroniza imóveis na vitrine; publicação de imóvel próprio é manual | Reescrito. |
| Papel "Líder técnico" | C (CLAUDE.md, SECURITY.md) | Mantido. |
| Papel "Partner" (informado pelo autor) | ? — nenhum documento | **Pendente**. |
| Experiência AEX Hub/Mavis | Ausente em `experiences.ts`, sem datas | **Pendente** (datas). |

Não publicar: percentuais de comissão, metas, nomes de parceiras/tenants, domínio, planos.

### 3.5 Queelvra × Qyruva
Três descrições diferentes: o projeto `queelvra.ts` é uma landing page HTML/CSS;
a experiência NTIDI descreve "Queelvra" como produto de cibersegurança/antifraude
com IA; o briefing chama de "Qyruva" (ecossistema Flutter, Java e Python).
Nenhum repositório local. **Pendente**: grafia oficial e qual parte é
publicável. Slug mantido.

### 3.6 Experiências (`data/experiences.ts`)
| Item | Situação |
| --- | --- |
| Cartório Único de Itacuruba, JL Imports | Citados pelo autor; **sem datas** → não adicionados. |
| AEX Hub / Mavis Imob, Grupo Glipy | Citados pelo autor com cargo; **sem datas** → não adicionados. |
| Ye Vida (Backend Júnior, jun 2026–atual) | Está nos dados, mas não aparece no briefing do autor → mantido, **pendente** confirmação. |
| IF Sertão (Maratona) | "MySQL" removido (refutado); restante mantido. |
| Durações | Agora calculadas a partir do período (`utils/period.ts`). |
| LinkedIn | Dados usam `linkedin.com/in/victor-kaue-419926364`; briefing cita `linkedin.com/in/victor-kauê` → **pendente** qual é o canônico. |

### 3.7 Tecnologias e posicionamento
- `expertise.ts` reorganizado por domínio (Backend e APIs, Frontend, Dados,
  Infraestrutura e qualidade, IA e automação, Experiência anterior, Ferramentas).
  Django/PHP/Laravel/MySQL/Bootstrap foram para "Experiência anterior".
- MongoDB saiu da lista: só aparecia nas skills da experiência "Freelancer", sem
  projeto que comprove.

### 3.8 AgendeAqui (clone completo, 36 commits, todos do autor, nov/2025–jan/2026)
| Afirmação | Veredito | Ação |
| --- | --- | --- |
| "Ninguém descobre um conflito de horário na porta da sala" / evitar reservas conflitantes | **R no branch padrão (`desenv`)** — a checagem existia em `main` e foi removida em 59ac7ee (12/12/2025); o teste que a cobre falharia | Texto corrigido; virou limitação conhecida. |
| Pipeline testa e audita **antes** de gerar a imagem | P — lint, Bandit e Safety estão com `continue-on-error`; não barram o build | Reescrito. |
| Log de auditoria das ações | P — só ações de gestão de usuários | Reescrito. |
| Lembrete 9h / limpeza 1h (Celery beat) | P — agendado no código, mas `django_celery_beat` está desabilitado nas settings | Marcado como limitação. |
| Docker Compose com Nginx + Certbot | P — serviços declarados; configs do Nginx/Certbot não estão no repo | Reescrito. |
| Cancelamento | P — exige 24 h de antecedência e grava como reprovado (sem status próprio) | Reescrito. |
| TCC do curso FIC | C (README) | Mantido. |
| Demais (3 perfis, FullCalendar, Top 5, CSV, Argon2, notificações) | C | Mantido. |

### 3.9 SuplaStock (clone completo, 33 commits do autor, código chegou num commit de 09/04/2026)
| Afirmação | Veredito | Ação |
| --- | --- | --- |
| Landing num app Django separado | **R** — servida pelo app `dashboard` | Decisão removida. |
| Solicitação de acesso | P — rota existe, só registra em log (não salva nem notifica) | Explicitado. |
| Estoque, vendas, fiado com pagamentos parciais, fluxo de caixa, PDF/Excel, Railway + `/healthz/` + comandos idempotentes | C | Mantido. |
| Testes | 0 testes; CI aponta para app inexistente | Limitação. |
| Mesmo código da VA Suplementos? | ? — o código foi renomeado de `va_suplementos` (README antigo, imagem Docker `va-suplementos`, guia de deploy apagado); nada diz se é o mesmo sistema entregue | **Pendente** (autor). |

### 3.10 Henrique Energia Solar (663 commits, todos do autor)
| Afirmação | Veredito | Ação |
| --- | --- | --- |
| Lighthouse SEO 100 / Boas práticas 100 / Acessibilidade 97 | P — relatório real (31/05/2026, mobile, **build local** `vite preview`, não produção), mas omitia **Performance 73** | Métricas passam a mostrar as 4 categorias, com data e contexto. |
| Sem back-end | C para o site; o branch `refactor/arquitetura` (não mergeado) cria monorepo com backend Fastify só com `/health` e Supabase placeholder | Mantido; monorepo não citado. |
| Blog com posts de reserva | P — só quando o Sanity não está configurado, não em falha de rede | Reescrito. |
| ADRs | C — 8 ADRs (registrados em 11/07/2026, retroativos) | Mantido. |
| Testes | 2 arquivos Vitest; ESLint com `--max-warnings 0`; sem CI | Adicionado em qualidade. |
| URL em produção | Domínio canônico do código é `henriqueenergiasolar.com.br`; o portfólio aponta para `henrique-energia-solar.vercel.app` (responde 200) | **Pendente**: qual é o oficial. |

---

## 4. Alerta de segurança (fora do escopo do portfólio)

`TeacherLog-Automation`: o arquivo `.env` foi commitado em 12/04/2026 (16db179,
5f508ef) e removido em 02/05/2026 (1cd6887). O histórico ainda contém uma
`GEMINI_API_KEY` com aparência de real e o usuário da plataforma escolar.
Recomendado: **revogar/rotacionar a chave e trocar a credencial**; reescrever o
histórico antes de tornar o repo público. Também há `data/teacherlog.db` e
`.claude/settings.local.json` versionados.

`Maratona` (docs do próprio repo): RISK-001 credenciais de superusuário fixas no
código; RISK-002 arquivo `env` versionado.

---

## 5. Pendências que dependem do autor
1. Grafia e escopo publicável de Queelvra/Qyruva.
2. Datas (mês/ano) de Cartório Único de Itacuruba, JL Imports, AEX Hub/Mavis, Grupo Glipy.
3. Ye Vida: continua? deve aparecer?
4. Mav Imob: papel "Partner" — há documento?
5. Autorização para publicar Glipy Travel (arquitetura genérica) e se TeacherLog entra (quem é XL2N?).
6. VA Suplementos/SuplaStock: vínculo (VK Software × freelance), período (~6 meses).
7. DataSertão: bolsista ou monitor voluntário? IFPE ou IF Sertão-PE?
8. Maratona Tech × Maratona Pitch; nº de participantes.
9. SIGREF: "mais de 200 usuários / mais de 100 escolas" — publicado com a redação do autor (nunca como simultâneos); confirmar a fonte.
10. Sertão Conecta: número de usuários.
11. Prospect AI (Caji).
12. LinkedIn canônico.
13. Currículo em EN/ES (só existe PT-BR).
