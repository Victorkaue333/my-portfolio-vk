# PROJECT_CONTEXT

Contexto de negócio e do problema por trás do portfólio de Victor Kauê.

## Problema que resolve

Desenvolvedores em início/meio de carreira precisam de uma vitrine que prove
competência técnica real, não apenas liste tecnologias. Currículos em PDF e
perfis de GitHub isolados não contam a história de _como_ os projetos foram
pensados, construídos e entregues.

Este portfólio resolve isso: reúne, num só lugar navegável, a trajetória, os
projetos (pessoais e profissionais), certificações e formas de contato — com
uma experiência de navegação premium que já é, em si, uma demonstração de
capacidade em front-end.

## Para quem

- **Recrutadores e times técnicos** avaliando o candidato para vagas de
  backend / full stack.
- **Clientes potenciais** de freelancing / prestação de serviço.
- **Rede profissional** (LinkedIn, comunidades) que chega via link.

## Proposta de valor

- Mostrar domínio de **backend (Python/Django, APIs, dados)** aliado a
  **front-end premium (React/TypeScript)**.
- Transmitir maturidade de engenharia: arquitetura por camadas, código
  tipado, i18n, performance e deploy em produção.
- Converter visitantes em contatos qualificados (WhatsApp / e-mail / LinkedIn).

## Objetivos de negócio

1. Gerar oportunidades (entrevistas, propostas de projeto).
2. Servir como cartão de visita técnico atualizável sem retrabalho.
3. Reforçar marca pessoal "Victor Kauê / VK Software".

## Métricas de sucesso

| Métrica | Sinal de sucesso |
| --- | --- |
| Contatos iniciados via formulário/WhatsApp | Crescimento mês a mês |
| Cliques em "Ver projeto" / repositórios | Engajamento com o portfólio real |
| Downloads do currículo | Interesse de recrutadores |
| Tempo de navegação e páginas por sessão | Conteúdo prende atenção |
| Performance (Lighthouse / Core Web Vitals) | ≥ 90 em Performance e SEO |

> Visitas e páginas por sessão vêm do Vercel Analytics (`<Analytics />` no
> `App`, ADR-0010 em [DECISIONS.md](docs/DECISIONS.md)). Contatos, cliques e
> downloads ainda não têm evento instrumentado — seguem qualitativos.

## Escopo

**Dentro do escopo**

- Site institucional/portfólio estático (SPA) em pt-BR, pt-PT, EN e ES.
- Páginas: Home, Sobre, Projetos, Detalhe de projeto, Serviços,
  Certificados, Contato, Uses e 404.
- Conteúdo (projetos, experiências, certificados) versionado como dados no
  próprio repositório.
- Contato via deep-link de WhatsApp e links sociais.
- Integrações de leitura: atividade pública do GitHub e bloco de Spotify
  (Embed; "Now Playing" opcional via uma função serverless — ADR-0013).

**Fora do escopo (explicitamente)**

- Backend de aplicação, banco de dados ou autenticação. A função serverless
  do Spotify é a única exceção: opcional, sem estado, só lê a API do Spotify.
- CMS / painel administrativo para editar conteúdo em runtime.
- Envio de e-mail transacional server-side (o formulário abre o WhatsApp).
- Blog com publicação dinâmica, comentários ou área logada.
- Pagamentos, e-commerce ou qualquer fluxo transacional.

## Documentos relacionados

- [README.md](README.md) — como rodar.
- [docs/PRD.md](docs/PRD.md) — requisitos do produto.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — decisões estruturais.
