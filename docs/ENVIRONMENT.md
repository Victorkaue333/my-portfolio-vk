# ENVIRONMENT

Configuração de ambiente. Espelha o `.env.example`. **Nunca contém segredos reais.**

## Resumo

**Nenhuma variável é obrigatória.** O bundle do front não lê
`import.meta.env.VITE_*` — todo o conteúdo é estático e compilado. Para rodar,
buildar e publicar o portfólio, **nada precisa ser configurado.**

As únicas variáveis que existem são as três opcionais do Spotify (seção
abaixo), lidas só pela função serverless `api/spotify/now-playing.js`, no
servidor.

## Variáveis do front-end (bundle)

| Nome | Descrição | Obrigatória | Onde obter |
| --- | --- | --- | --- |
| — | O bundle não consome variáveis de ambiente. | Não | — |

Valores hoje "configuráveis" estão hard-coded como constantes de código, não como env:

| Constante | Local | Valor |
| --- | --- | --- |
| Telefone do WhatsApp | `src/pages/Contato/Contato.tsx` | `5587981774951` |
| Perfil GitHub padrão | `src/data/projects.ts` | `https://github.com/Victorkaue333` |
| Porta do dev server | `vite.config.ts` | `5173` |

Se no futuro algum valor precisar variar por ambiente, expor via
`import.meta.env.VITE_*` (Vite só injeta variáveis com prefixo `VITE_`) e
documentar aqui.


## Variáveis do Spotify (opcionais)

Ativam o "Now Playing" do bloco de Spotify em `/sobre` e do comando `spotify`
do terminal. **Não são obrigatórias:** sem elas o endpoint
`/api/spotify/now-playing` responde `501 { configured:false }` e o site usa o
Spotify Embed configurado em `src/config/spotify.ts`.

| Nome | Descrição | Obrigatória | Onde obter |
| --- | --- | --- | --- |
| `SPOTIFY_CLIENT_ID` | Client ID do app no Spotify Developer Dashboard. | Não | https://developer.spotify.com/dashboard |
| `SPOTIFY_CLIENT_SECRET` | Client secret do mesmo app. **Segredo.** | Não | idem |
| `SPOTIFY_REFRESH_TOKEN` | Refresh token da minha conta, com escopo `user-read-currently-playing user-read-recently-played`. **Segredo.** | Não | fluxo de autorização — passo a passo no `.env.example` |

Regras específicas:

- As três são lidas **somente** por `api/spotify/now-playing.js`, no servidor.
  Não têm prefixo `VITE_` de propósito: o Vite só injeta `VITE_*` no bundle,
  então elas nunca chegam ao navegador.
- Cadastrar na Vercel em *Project → Settings → Environment Variables* e
  refazer o deploy. Localmente, `vercel dev` lê o `.env` da raiz.
- O endpoint nunca devolve token: a resposta tem título, artista, álbum, capa
  e link público da faixa.
- Conteúdo do embed (playlist/álbum/faixa) **não** é variável de ambiente — é
  a constante `SPOTIFY_URL` em `src/config/spotify.ts`, porque é conteúdo
  público e versionado, como o resto de `src/data`.

## Arquivos `.env` / `.env.example`

- `.env.example` (versionado) é do próprio projeto: lista só os **nomes** das
  três variáveis do Spotify, sem valor, com o passo a passo para obter o
  refresh token. Substituiu o arquivo legado do instalador AIOX — a pendência
  do ADR-0002 foi fechada pelo ADR-0013 (ver [DECISIONS.md](DECISIONS.md)).
- `.env` (local) está no `.gitignore` e nunca é commitado. Dentro do projeto,
  quem o usa é o `vercel dev` (para a função de `api/`); o `vite dev` não
  executa a função.

## Regras

- Segredos reais **nunca** vão para o repositório nem para arquivos de dados
  (`src/data/*`), pois o bundle é público.
- Segredo só pode ser lido em função de `api/`, via `process.env`, e **sem**
  prefixo `VITE_`.
- `VITE_*` são embutidas no build → tratar como **públicas**, jamais colocar
  chave sensível ali.
- Configuração de deploy (build/output) fica na Vercel, não em env do app. Ver
  [DEPLOY.md](DEPLOY.md).
