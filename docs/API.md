# API

> **Este projeto não tem backend de aplicação.** É uma SPA front-end estática
> que expõe **um único endpoint próprio** — a função serverless opcional
> `/api/spotify/now-playing` (Contrato 4) — e consome serviços externos
> públicos. Este documento registra esses contratos para que o comportamento
> fique explícito.

## Convenções gerais

- Não há servidor de aplicação, autenticação de usuário nem endpoints
  versionados.
- Integrações do front: deep-link/navegação (WhatsApp, links sociais) e
  leitura anônima de recursos públicos (GitHub). Fonte única de cada uma em
  `src/utils/`.
- O navegador nunca recebe segredo. As credenciais do Spotify ficam só na
  função de `api/` (ver [ENVIRONMENT.md](ENVIRONMENT.md)).

## Contrato 1 — Deep-link de contato (WhatsApp)

Runtime. Disparado ao enviar o formulário de contato.

- **Origem:** `src/pages/Contato/Contato.tsx`
- **Método:** navegação `window.open(url, '_blank')`
- **Destino:** `https://wa.me/{PHONE}?text={mensagem}`
- **Telefone:** `558798774951`
- **Parâmetros (query):**

  | Param | Origem | Descrição |
  | --- | --- | --- |
  | `text` | Formulário | Mensagem URL-encoded com nome, e-mail, assunto e mensagem. |

**Payload (antes de encode):**

```
Nova mensagem do Portfólio

Nome: {nome}
Email: {email}
Assunto: {assunto}

Mensagem:
{mensagem}
```

**Exemplo:**

```
https://wa.me/5587981774951?text=Nova%20mensagem%20do%20Portf%C3%B3lio%0A%0ANome%3A%20...
```

Não há resposta programática — abre o WhatsApp do usuário.

## Contrato 2 — Links sociais e recursos

Runtime. Navegação direta (`<a target="_blank" rel="noopener noreferrer">`).

- Definidos em `src/data/social.ts` (`SocialLink`): e-mail, LinkedIn, GitHub, WhatsApp.
- Repositórios de projeto: campos `github` / `online` de cada `Project`.
- Currículo: `public/docs/Curriculo/Curriculo_Victor_Kaue.pdf`.
- Certificados: PDFs em `public/Certificados/pdfs/`.

## Contrato 3 — GitHub público (leitura anônima)

Runtime. Alimenta a seção "Atividade no GitHub" (`/sobre`, `/`) e o comando
`github` do terminal. Origem única: `src/utils/github.ts`.

| Endpoint | Uso | Cache |
| --- | --- | --- |
| `GET https://api.github.com/users/Victorkaue333/repos?sort=pushed&per_page=12` | repositórios recentes (6 primeiros, sem forks) | `sessionStorage`, 30 min |
| `GET https://github-contributions-api.jogruber.de/v4/Victorkaue333?y=last` | total e grade de contribuições do último ano | `sessionStorage`, 60 min |

- Sem autenticação e sem segredo. O limite da API pública do GitHub é de 60
  requisições/hora por IP; o cache de sessão existe para não encostar nele.
- Qualquer resposta não-2xx (inclusive **403/429** de rate limit) lança e o
  consumidor mostra o fallback: card "ver no GitHub" na seção, linha
  "não deu para carregar" no terminal. Nenhum número é estimado.

## Contrato 4 — `/api/spotify/now-playing` (função serverless própria)

Runtime, **opcional**. Única função de servidor do projeto
(`api/spotify/now-playing.js`, Vercel). Consumida por `src/utils/spotify.ts`,
que abastece tanto o card de Spotify quanto o comando `spotify` do terminal.

- **Método:** `GET`. Sem parâmetros, sem corpo. O endpoint **não** recebe nada
  do usuário — nem o texto digitado no terminal.
- **Credenciais:** `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`,
  `SPOTIFY_REFRESH_TOKEN`, só em `process.env`. Ver `docs/ENVIRONMENT.md`.
- **Upstream:** `POST https://accounts.spotify.com/api/token`
  (`grant_type=refresh_token`), depois
  `GET https://api.spotify.com/v1/me/player/currently-playing` e, se nada
  estiver tocando, `GET .../me/player/recently-played?limit=1`.

| Status | Corpo | Significado |
| --- | --- | --- |
| 200 | `{ configured:true, isPlaying:true, progressMs, track }` | tocando agora |
| 200 | `{ configured:true, isPlaying:false, track }` | parado; `track` é a última ouvida |
| 200 | `{ configured:true, isPlaying:false }` | parado e sem histórico |
| 501 | `{ configured:false }` | variáveis ausentes — o front usa o embed |
| 429 | `{ error:'rate_limit' }` + `Retry-After` | limite do Spotify |
| 502 | `{ error:'upstream' }` | Spotify fora do ar ou refresh token revogado |
| 405 | `{ error:'method_not_allowed' }` | método diferente de GET |

`track`: `{ title, artist, album, albumImage, url, durationMs }` — metadado
público, nada de token. Cache de CDN: `public, s-maxage=30,
stale-while-revalidate=60` nas respostas de sucesso; `no-store` nas de erro e
na 501.

**Cliente:** `utils/spotify.ts` nunca lança — 404 (sem função, como em
`vite dev`), 501 e resposta não-JSON viram `unconfigured`; 429/502/rede fora
viram `error`. Cache em memória de 30 s e uma única requisição em voo, para o
card e o terminal não duplicarem a chamada.

## Formato de erros

- **Endpoint próprio** (`/api/spotify/now-playing`): JSON `{ error:'<código>' }`
  com o status HTTP correspondente (tabela do Contrato 4); falta de
  configuração não é erro — `501 { configured:false }`. O detalhe fica no log
  da função; o cliente só recebe o código.
- **GitHub** (Contrato 3): qualquer não-2xx lança e o consumidor mostra o
  fallback.
- **Deep-link:** falha silenciosa se o dispositivo não tiver WhatsApp/handler.

## Roadmap (se novos endpoints forem adicionados)

Seguir o Contrato 4 como modelo: base URL, autenticação, cada endpoint (método,
rota, params, request, response), cache e o formato de erro acima. Registrar a
decisão em [DECISIONS.md](DECISIONS.md) — novo endpoint é exceção ao "sem
backend de aplicação", não regra.
