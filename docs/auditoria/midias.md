# Inventário de mídias — 23/10/2026

Onde ficam: `public/images/fotos-projetos-{pessoais,reais}/<slug>/` (convenção
já existente; mantida). Capa = `cover.webp` ou a imagem em `image`. Galeria com
alt/legenda = campo `media` do projeto (`ProjectMedia`); sem `media`, a
galeria usa `screenshots` com alt automático. OG = `public/images/og/<slug>.jpg`
(gerado por `npm run images:optimize`).

Nada de imagem inventada: o que não existe fica aqui como pendência, não como
placeholder na página.

Autorização: **livre** = repositório público ou material já público no site
do projeto · **confirmar** = repositório privado de instituição/cliente ·
**restrito** = código proprietário de empresa (só com autorização escrita).

| Projeto | Existentes | Pendentes (capturas) | Diagramas a produzir | Autorização |
| --- | --- | --- | --- | --- |
| Touch Speaker | capa (janela principal), histórico | pílula de gravação em uso (GIF curto), configurações | contexto, componentes, sequência ([spec](../diagramas/touch-speaker.md)) | livre |
| AgendeAqui | capa + 7 telas, **diagrama ER real** | calendário, aprovação com justificativa, dashboard por perfil (com legendas) | contexto, containers, sequência, CI ([spec](../diagramas/agendeaqui.md)) | livre |
| SuplaStock | capa + 3 telas | venda fiada, contas a receber, relatório PDF | módulos, fluxo do fiado, deploy ([spec](../diagramas/suplastock.md)) | livre (nome do cliente: confirmar) |
| Sertão Conecta | capa + 3 telas | minijogo, certificado com validação, ranking. Há figuras locais não versionadas em `docs/relatorio/figuras/` do repo (sistema, diagramas, CI) | contexto, containers, gamificação, CI/CD ([spec](../diagramas/sertao-conecta.md)) | confirmar |
| Mav Imob | capa | painel admin com dados fictícios (fixtures) | contexto, containers ([spec](../diagramas/mav-imob.md)) | restrito |
| MaratonaTech | logo | telas da votação e do pódio (só existe logo) | contexto, componentes, sequência ([spec](../diagramas/maratonatech.md)) | confirmar |
| Caji Agent | capa + 3 telas | — (não publicar telas do admin) | contexto e containers só com o que é público (ver auditoria §3.1) | restrito |
| Henrique Energia Solar | capa + 3 telas | simulador de economia em uso | — | confirmar com o cliente |
| SIGREF | logo | telas do sistema (anonimizadas) | — | confirmar com a GRE |
| NTIDI | 17 imagens | legendas para as 17 | — | confirmar |
| Saberes Interculturais | capa + 4 | — | — | livre |
| DataSertão | capa + 3 | — | — | livre (site público) |
| VK Software | 11 imagens | — | — | livre |
| VA Suplementos | logo | telas (se o cliente autorizar) | — | confirmar |
| Queelvra | 1 imagem | — | — | pendente (nome/escopo) |
| Transcritor de Entrevistas | capa | player sincronizado, exportação | sequência upload → Whisper → player | livre |
| Gerador de Certificados | capa | log da execução em lote | — | livre |
| Dev Job Automation | capa | painel Flask | — | livre |
| Portfólio | logo + foto | captura do próprio site (Home, case) | — | livre |
| PetShop, Pé na Estrada, VMED Pharma, Oliveira Kids, Site de 1 Ano | capas/telas existentes | — | — | livre |

Para adicionar uma mídia nova:

1. Salvar `.webp` em `public/images/fotos-projetos-*/<slug>/`.
2. Registrar em `media` do projeto: `src`, `type`, `alt` descritivo e `caption`.
3. Se for capa nova, incluir em `PROJECT_COVERS`/`PROJECT_COVER_SLUGS` de
   `scripts/optimize-images.mjs` e rodar `npm run images:optimize`.

## Logos criados para o portfólio (23/10/2026)

Projetos pessoais sem identidade visual própria (ou com logo raster substituído
a pedido do autor) ganharam um logo feito com o processo da skill
[logo-design](https://github.com/kaankiziltug/logo-design-skill): brief,
3 conceitos em cinza por projeto, auditoria de geometria (`svg_audit.py`) e
direção recomendada em cor. **Não fazem parte dos produtos originais** — são a
identidade usada nas capas deste portfólio.

| Projeto | Direção | Ideia |
| --- | --- | --- |
| Dev Job Automation | Maleta-terminal | A busca de emprego dentro de um terminal (`›_` vazado). |
| Gerador de Certificados | Lote selado | Pilha de certificados com selo: o lote sai de uma vez. |
| E-commerce PetShop | Sacola-pata | Sacola de compras com uma pata vazada. |
| Oliveira Kids | Luzes de largada | As três cores do painel do sistema: livre, rodando, encerrado. |
| Transcritor de Entrevistas | Onda vira linhas | A fala (onda) vira texto (linhas). |
| SuplaStock | Pote-gráfico | Pote de suplemento com o gráfico de gestão vazado. |
| Saberes Interculturais de Itaparica | Roda e rio | O arco da roda (o Toré, a coletividade) sobre as ondas do São Francisco (o território). |

Fontes em `docs/logos/` (`<slug>-symbol.svg`, `-lockup-dark-bg.svg`,
`-lockup-light-bg.svg`). O nome nos lockups usa `<text>` com Segoe UI: serve
para gerar a capa (raster); para uso fora do portfólio, converter em contorno.
Marcas reais de terceiros (Caji, Henrique Energia Solar, Sertão Conecta)
**não** receberam logo inventado. O Saberes Interculturais não tinha marca (o
site usa um ícone genérico) e ganhou um logo a pedido do autor: o desenho evita
grafismos e símbolos indígenas (cocar, penas, padrões) e se apoia no que o
projeto documenta — a roda do Toré e o território às margens do São Francisco.
Antes de usar fora do portfólio, vale validar com a coordenação da pesquisa e
com a comunidade.

## Faixa "Quem confiou no meu trabalho" (`data/partners.ts`)

Logos **oficiais** das organizações com projeto real no portfólio, convertidas
em silhueta branca com transparência (`public/images/parceiros/`; o tema claro
inverte por CSS). Fonte de cada uma:

| Organização | Arquivo de origem |
| --- | --- |
| Caji Solutions | `CajiAgent/frontend/public/brand/caji-logo-light-bg.svg` |
| AEX Hub | `aex-engineering/assets/logo.png` |
| Mavis OS | `mavis-os/public/brand/mavis-os-full.png` |
| Glipy Travel | `GlipyTravel/assets/imgs/marca/logo-escura.png` |
| IF Sertão-PE — Campus Floresta | `sertao-conecta/frontend/public/logos/logotipo-campus-floresta.png` |
| Sertão Conecta | `sertao-conecta/frontend/public/logos/logo-sertaoconecta-semfundo.webp` |
| Maratona IFSertãoTech | `public/images/fotos-projetos-reais/maratonatech/MaratonaTech.webp` (máscara por saturação, para o foguete não virar bloco) |
| NTIDI | `public/images/fotos-projetos-reais/ntidi/NTIDI.webp` |
| CNPq | Wikipédia, `Ficheiro:Cnpq-logo.jpg` (símbolo + sigla; nome por extenso cortado para ler a 40 px) |
| GRE (provisório: SIGREF) | `public/images/fotos-projetos-reais/sigref/sigrefsemfundo.webp` |
| Henrique Energia Solar | `henrique-solar/apps/frontend/public/logo/logotipo-henrique-energia-solar.webp` |
| VA Suplementos | `public/images/fotos-projetos-reais/va_suplementos/va_suplementos.webp` (sem a linha do @) |

Pendentes: **Ye Vida** e a logo própria da **GRE** (o autor enviou as imagens
no chat, mas é preciso o arquivo em `public/images/parceiros/originais/`).

Usar logo de cliente em portfólio costuma ser aceito, mas vale confirmar com cada organização — principalmente com empresas sob
contrato de confidencialidade.
