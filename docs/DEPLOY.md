# DEPLOY

Processo de publicação. O projeto é uma SPA estática + uma função serverless
opcional (`api/spotify/now-playing.js`), hospedados na **Vercel**.

## Ambientes

| Ambiente | Origem | URL |
| --- | --- | --- |
| Produção | branch `online` (deploy Vercel) | https://victor-kaue.vercel.app/ |
| Preview | qualquer branch / PR | URL de preview gerada pela Vercel |
| Local | `npm run dev` | http://localhost:5173 |

> Branch principal deste repositório para produção: `online`. Ajuste na Vercel
> se a convenção mudar.

## Pipeline

Deploy contínuo via integração GitHub ↔ Vercel:

```
git push (online) ──▶ Vercel detecta ──▶ npm install ──▶ npm run build ──▶ publica dist/
```

- **Build command:** `npm run build` (`tsc -b && vite build && node scripts/prerender-meta.mjs`)
- **Output directory:** `dist`
- **Install command:** `npm install`
- **Node:** compatível com Vite 6 (Node 18+; preferir LTS atual).
- **Funções:** a Vercel publica `api/` automaticamente, sem configuração extra.
- **Variáveis (opcionais):** `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`,
  `SPOTIFY_REFRESH_TOKEN` em *Project → Settings → Environment Variables*. Sem
  elas, o deploy funciona e o Spotify cai no Embed. Ver
  [ENVIRONMENT.md](ENVIRONMENT.md).

## Passo a passo — deploy

1. Garantir build local limpo e smoke passando: `npm run test:e2e` (já roda o
   `npm run build`).
2. (Opcional) `npm run preview` e validar visualmente.
3. Commit seguindo Conventional Commits.
4. Push para `online` → Vercel faz build e publica automaticamente.
5. Conferir a URL de produção e o log de build na Vercel.

Deploy manual alternativo (Vercel CLI): `vercel` (preview) / `vercel --prod`.

## Roteamento SPA — `vercel.json`

O app usa `BrowserRouter`. Sem rewrite, acessar/atualizar rotas profundas
(ex.: `/projetos/agendeaqui`) retorna 404. O [`vercel.json`](../vercel.json) da
raiz cuida disso:

- **Rewrite:** toda rota cai no `index.html`, **exceto** `api/`, `assets/`,
  `images/`, `fonts/`, `Certificados/`, `docs/`, favicons, `robots.txt`,
  `sitemap.xml` e `llms.txt`. Pasta pública nova precisa entrar nessa exceção,
  senão o arquivo passa a devolver o HTML da SPA.
- **Headers:** `Cache-Control` imutável de 1 ano em `/assets` e `/fonts`;
  `Content-Type: text/plain` em `robots.txt` e `llms.txt`.

## Rollback

1. **Via dashboard Vercel:** Deployments → selecionar um deploy anterior estável
   → **Promote to Production** (rollback instantâneo, sem rebuild).
2. **Via git:** reverter o commit problemático (`git revert <sha>`) e push para
   `online` → novo build limpo.

Preferir "Promote" para restauração imediata; usar `git revert` para corrigir a
história de forma definitiva.

## Checklist pós-deploy

- [ ] Home carrega e transições funcionam.
- [ ] Rota direta de detalhe de projeto abre sem 404.
- [ ] Idioma escolhido (pt-BR, pt-PT, EN, ES) persiste após reload.
- [ ] `/api/spotify/now-playing` responde `200` (variáveis configuradas) ou
      `501` (sem variáveis, bloco usa o Embed) — nunca `502` persistente.
- [ ] Formulário de contato abre o WhatsApp.
- [ ] Download do CV e PDFs de certificados acessíveis.
- [ ] Sem erros no console; Lighthouse dentro do alvo (≥ 90).

## Padrão

Segue o DEPLOY_STANDARD do time: build reprodutível, deploy automático por push,
rollback por promoção de deploy anterior, e verificação por checklist.
