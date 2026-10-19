# PRD — Portfólio Victor Kauê

Requisitos do produto. Complementa [PROJECT_CONTEXT.md](../PROJECT_CONTEXT.md).

## Visão

Uma SPA de portfólio que apresenta trajetória, projetos, serviços e
certificações de forma premium, em 4 idiomas (pt-BR, pt-PT, EN, ES) e responsiva, convertendo
visitantes em contatos.

## Personas

- **Recrutador Técnico** — chega via LinkedIn/currículo, quer avaliar stack e
  projetos em < 2 min e encontrar contato/CV rapidamente.
- **Cliente Potencial** — busca alguém para construir um sistema/site, quer ver
  provas de entrega real e iniciar conversa (WhatsApp).
- **Par/Comunidade** — curioso técnico, navega projetos e detalhes de
  arquitetura.

## Requisitos funcionais

| ID | Requisito |
| --- | --- |
| RF-01 | Home com hero, destaques e chamada para projetos/contato. |
| RF-02 | Página **Sobre** com trajetória, experiências e formação. |
| RF-03 | Página **Projetos** com filtro por categoria (Todos/Pessoais/Profissionais). |
| RF-04 | Página de **detalhe do projeto** (`/projetos/:id`) com desafio, solução, impacto, arquitetura e stack. |
| RF-05 | Página **Serviços** listando ofertas. |
| RF-06 | Página **Certificados** com visualização/links de PDF. |
| RF-07 | Página **Contato** com formulário que encaminha via WhatsApp + links sociais. |
| RF-08 | Seletor de idioma **pt-BR / pt-PT / EN / ES** com persistência local. |
| RF-09 | Download do currículo em PDF. |
| RF-10 | Navegação com transições animadas e scroll gerenciado (topo ao trocar de rota, botão "voltar ao topo"). |

## Requisitos não-funcionais

| ID | Requisito |
| --- | --- |
| RNF-01 | Responsivo: mobile, tablet e desktop. |
| RNF-02 | Performance: build com code-splitting por rota; alvo Lighthouse ≥ 90. |
| RNF-03 | SEO básico: meta tags, Open Graph e Twitter Card (ver `index.html`). |
| RNF-04 | Acessibilidade: navegação por teclado, `aria-*` em ícones/controles, contraste nos temas claro e escuro. |
| RNF-05 | Sem backend de aplicação: hospedagem estática (Vercel), sem dados sensíveis no bundle. Exceção: função serverless opcional do Spotify, com credenciais só no servidor (ADR-0013). |
| RNF-06 | Código tipado (TypeScript strict) e organizado por camadas. |
| RNF-07 | Conteúdo editável via arquivos de dados, sem redeploy manual de código externo. |
| RNF-08 | Smoke E2E (Playwright) passando: rotas do sitemap sem erro de console, 404 do app, fonte self-hosted e tema persistido. |

## Fluxos principais

1. **Descoberta → Projeto → Contato**: Home → Projetos → detalhe → Contato (WhatsApp).
2. **Avaliação de recrutador**: Home → Sobre → download CV → Contato.
3. **Troca de idioma**: qualquer página → seletor de idioma → preferência persiste em `localStorage`.

## Critérios de aceite (amostra)

- **RF-03**: ao selecionar uma categoria, apenas projetos daquela categoria são
  exibidos; "Todos" mostra tudo; estado vazio exibe mensagem de "nenhum
  projeto".
- **RF-07**: ao submeter o formulário preenchido, abre o WhatsApp em nova aba
  com nome, e-mail, assunto e mensagem pré-formatados; exibe confirmação visual.
- **RF-08**: idioma selecionado permanece após recarregar a página.
- **RF-10**: ao navegar entre rotas, a página inicia no topo e a transição é animada.

## Fora de escopo

- Autenticação, área logada, CMS, blog dinâmico, e-commerce, analytics
  server-side, envio de e-mail transacional. Ver [PROJECT_CONTEXT.md](../PROJECT_CONTEXT.md#escopo).
