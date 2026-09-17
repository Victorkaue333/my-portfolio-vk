# ENVIRONMENT

Configuração de ambiente. Espelha o `.env.example`. **Nunca contém segredos reais.**

## Resumo

**O aplicativo não usa variáveis de ambiente em runtime.** Não há nenhuma
referência a `import.meta.env.VITE_*` no código-fonte — todo o conteúdo é
estático e compilado no bundle. Para rodar, buildar e publicar o portfólio,
**nenhuma variável precisa ser configurada.**

## Variáveis do aplicativo

| Nome | Descrição | Obrigatória | Onde obter |
| --- | --- | --- | --- |
| — | O app não consome variáveis de ambiente. | Não | — |

Valores hoje "configuráveis" estão hard-coded como constantes de código, não como env:

| Constante | Local | Valor |
| --- | --- | --- |
| Telefone do WhatsApp | `src/pages/Contato/Contato.tsx` | `5587981774951` |
| Perfil GitHub padrão | `src/data/projects.ts` | `https://github.com/Victorkaue333` |
| Porta do dev server | `vite.config.ts` | `3000` |

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

## ⚠️ Sobre os arquivos `.env` / `.env.example` atuais

Os arquivos `.env` e `.env.example` presentes na raiz **não pertencem a este
projeto**. São resíduos do instalador "Synkra AIOX" (chaves de LLM, Supabase,
Railway, etc.) e **não são lidos pelo app**. O `.gitignore` já ignora `.env`
(o segredo não é commitado), mas o `.env.example` versionado é enganoso.

**Recomendação:** substituir o conteúdo do `.env.example` por um placeholder
honesto deste projeto, por exemplo:

```dotenv
# Este projeto é uma SPA estática e não requer variáveis de ambiente.
# Adicione variáveis VITE_* aqui apenas se/quando o código passar a consumi-las.
# Ex.:
# VITE_WHATSAPP_PHONE=5587981774951
```

> Não removi/reescrevi esses arquivos automaticamente para não alterar
> configuração de tooling externo sem sua confirmação. Decisão registrada em
> [DECISIONS.md](DECISIONS.md) (ADR-0002).

## Regras

- Segredos reais **nunca** vão para o repositório nem para arquivos de dados
  (`src/data/*`), pois o bundle é público.
- `VITE_*` são embutidas no build → tratar como **públicas**, jamais colocar
  chave sensível ali.
- Configuração de deploy (build/output) fica na Vercel, não em env do app. Ver
  [DEPLOY.md](DEPLOY.md).
