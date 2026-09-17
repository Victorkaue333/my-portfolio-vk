/**
 * GET /api/spotify/now-playing — o que está tocando agora na minha conta.
 *
 * Função serverless da Vercel (Node). É o único lugar do projeto que toca em
 * credencial: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` e
 * `SPOTIFY_REFRESH_TOKEN` são lidas de `process.env`, ficam no servidor e
 * nunca entram no bundle — não têm prefixo `VITE_`, então o Vite nem as
 * enxerga. A resposta devolve só metadado público da faixa (título, artista,
 * capa, link); nenhum token sai daqui.
 *
 * Sem as variáveis configuradas o endpoint responde 501 `{ configured:false }`
 * e o front cai no Spotify Embed — a integração é opcional por desenho.
 *
 * Respostas:
 *   200 { configured:true, isPlaying:true,  track:{...} }   tocando agora
 *   200 { configured:true, isPlaying:false, track:{...} }   última faixa ouvida
 *   200 { configured:true, isPlaying:false }                nada tocando e sem histórico
 *   501 { configured:false }                                variáveis ausentes
 *   502 { error:'upstream' }                                Spotify fora do ar / token inválido
 *   429 { error:'rate_limit' }                              limite da API do Spotify
 */

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

/** Menor capa com pelo menos 200px — a arte no card é pequena. */
function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const ordered = [...images].sort((a, b) => (a.width || 0) - (b.width || 0));
  return (ordered.find((i) => (i.width || 0) >= 200) || ordered[ordered.length - 1]).url || null;
}

function toTrack(item) {
  if (!item || item.type !== 'track') return null;
  return {
    title: item.name,
    artist: (item.artists || []).map((a) => a.name).join(', '),
    album: item.album?.name ?? null,
    albumImage: pickImage(item.album?.images),
    url: item.external_urls?.spotify ?? null,
    durationMs: typeof item.duration_ms === 'number' ? item.duration_ms : null,
  };
}

/**
 * Troca o refresh token por um access token. O refresh token do Spotify não
 * expira, mas o access token dura 1h — como a função é stateless, cada
 * invocação (fora do cache da CDN) faz essa troca.
 */
async function getAccessToken(clientId, clientSecret, refreshToken) {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
  });
  if (!res.ok) {
    // 400/401 aqui = refresh token revogado ou credencial trocada.
    throw Object.assign(new Error(`token ${res.status}`), { status: res.status });
  }
  const json = await res.json();
  if (!json.access_token) throw new Error('token: resposta sem access_token');
  return json.access_token;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    // Sem cache: assim que as variáveis forem configuradas o front já vê.
    res.setHeader('Cache-Control', 'no-store');
    return res.status(501).json({ configured: false });
  }

  try {
    const token = await getAccessToken(clientId, clientSecret, refreshToken);
    const auth = { Authorization: `Bearer ${token}` };

    const now = await fetch(NOW_PLAYING_URL, { headers: auth });

    if (now.status === 429) {
      res.setHeader('Retry-After', now.headers.get('retry-after') || '30');
      res.setHeader('Cache-Control', 'no-store');
      return res.status(429).json({ error: 'rate_limit' });
    }

    // 30s na CDN: a faixa muda em minutos, não em segundos, e isso mantém a
    // chamada ao Spotify longe do limite mesmo com a página aberta em várias abas.
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');

    // 204 = player parado. 200 com `is_playing:false` = pausado.
    if (now.status === 200) {
      const data = await now.json();
      const track = toTrack(data?.item);
      if (track && data.is_playing) {
        return res.status(200).json({
          configured: true,
          isPlaying: true,
          progressMs: typeof data.progress_ms === 'number' ? data.progress_ms : null,
          track,
        });
      }
      if (track) return res.status(200).json({ configured: true, isPlaying: false, track });
    } else if (now.status !== 204) {
      throw Object.assign(new Error(`now-playing ${now.status}`), { status: now.status });
    }

    // Nada tocando — mostra a última faixa ouvida em vez de um card vazio.
    const recent = await fetch(RECENT_URL, { headers: auth });
    if (recent.ok) {
      const data = await recent.json();
      const track = toTrack(data?.items?.[0]?.track);
      if (track) return res.status(200).json({ configured: true, isPlaying: false, track });
    }

    return res.status(200).json({ configured: true, isPlaying: false });
  } catch (err) {
    // O detalhe fica no log da função; o cliente só sabe que o upstream falhou.
    console.error('[spotify/now-playing]', err?.message || err);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ error: 'upstream' });
  }
}
