/**
 * Fonte única do Spotify — o card em /sobre e o comando `spotify` do terminal
 * leem daqui (regra 16 do briefing: uma integração, não duas).
 *
 * Nada é simulado: ou o endpoint `/api/spotify/now-playing` responde com uma
 * faixa real, ou o estado diz que não há nada para mostrar. Sem música
 * inventada, sem placeholder de "Artista — Faixa".
 */

export interface SpotifyTrack {
  title: string;
  artist: string;
  album: string | null;
  albumImage: string | null;
  url: string | null;
  durationMs: number | null;
}

export type SpotifyState =
  /** Tocando agora. */
  | { status: 'playing'; track: SpotifyTrack; progressMs: number | null }
  /** Nada tocando, mas o Spotify devolveu a última faixa ouvida. */
  | { status: 'recent'; track: SpotifyTrack }
  /** Integração ativa e sem nada a mostrar. */
  | { status: 'idle' }
  /** Variáveis de ambiente ausentes — o front usa o embed. */
  | { status: 'unconfigured' }
  /** 429, 502, rede fora. */
  | { status: 'error' };

const ENDPOINT = '/api/spotify/now-playing';
/** A faixa muda em minutos; 30s evita uma requisição por re-render. */
const TTL_MS = 30_000;

let cache: { ts: number; state: SpotifyState } | null = null;
let inFlight: Promise<SpotifyState> | null = null;

function parse(payload: unknown): SpotifyState {
  const p = payload as {
    configured?: boolean;
    isPlaying?: boolean;
    progressMs?: number | null;
    track?: Partial<SpotifyTrack> | null;
  };
  if (!p || p.configured === false) return { status: 'unconfigured' };

  const raw = p.track;
  if (!raw || typeof raw.title !== 'string' || typeof raw.artist !== 'string') {
    return { status: 'idle' };
  }
  const track: SpotifyTrack = {
    title: raw.title,
    artist: raw.artist,
    album: raw.album ?? null,
    albumImage: raw.albumImage ?? null,
    url: raw.url ?? null,
    durationMs: raw.durationMs ?? null,
  };
  return p.isPlaying
    ? { status: 'playing', track, progressMs: p.progressMs ?? null }
    : { status: 'recent', track };
}

/**
 * Estado atual. Resposta em cache dentro do TTL e uma única requisição em voo
 * — o card e o terminal podem pedir ao mesmo tempo sem duplicar a chamada.
 *
 * Nunca lança: erro de rede, 429 ou 502 viram `{ status: 'error' }`, e 501
 * (sem variáveis) vira `{ status: 'unconfigured' }`. Em `vite dev` não existe
 * função serverless, então o 404 do dev server também cai em `unconfigured`.
 */
export function fetchSpotifyState(signal?: AbortSignal): Promise<SpotifyState> {
  if (cache && Date.now() - cache.ts < TTL_MS) return Promise.resolve(cache.state);
  if (inFlight) return inFlight;

  inFlight = fetch(ENDPOINT, { signal, headers: { Accept: 'application/json' } })
    .then(async (res) => {
      // 501 = endpoint existe e disse que não está configurado.
      // 404 = não há função serverless (dev server do Vite, host estático).
      if (res.status === 501 || res.status === 404) return { status: 'unconfigured' } as SpotifyState;
      if (!res.ok) return { status: 'error' } as SpotifyState;
      const ct = res.headers.get('content-type') || '';
      // Sem função, o rewrite da SPA devolve o index.html com 200.
      if (!ct.includes('application/json')) return { status: 'unconfigured' } as SpotifyState;
      return parse(await res.json());
    })
    .catch((): SpotifyState => ({ status: 'error' }))
    .then((state) => {
      cache = { ts: Date.now(), state };
      inFlight = null;
      return state;
    });

  return inFlight;
}

/** O que já foi buscado nesta sessão, sem ir à rede. */
export const cachedSpotifyState = (): SpotifyState | null =>
  cache && Date.now() - cache.ts < TTL_MS ? cache.state : null;
