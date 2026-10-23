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
