/**
 * Spotify — a única referência musical do portfólio.
 *
 * ## O que preencher
 *
 * Cole em `SPOTIFY_URL` o link normal de uma playlist, álbum, faixa ou artista
 * (o botão "Compartilhar → Copiar link" do Spotify). O `toEmbedUrl` abaixo
 * converte para a URL de incorporação — não é preciso colar o link do embed.
 *
 *     export const SPOTIFY_URL = 'https://open.spotify.com/playlist/37i9dQ...';
 *
 * Enquanto estiver vazio **e** o endpoint `/api/spotify/now-playing` não
 * estiver configurado, o bloco de Spotify simplesmente não aparece — nada de
 * card vazio ou placeholder inventado.
 *
 * ## Now Playing (opcional)
 *
 * Independente daqui. Basta configurar `SPOTIFY_CLIENT_ID`,
 * `SPOTIFY_CLIENT_SECRET` e `SPOTIFY_REFRESH_TOKEN` na Vercel (ver
 * `.env.example` e `docs/ENVIRONMENT.md`). Com isso o card mostra a faixa real;
 * sem isso, mostra o embed acima.
 */

/** Link público do Spotify — playlist, álbum, faixa ou artista. Vazio = sem embed. */
export const SPOTIFY_URL = '';

/** `true` quando `SPOTIFY_URL` está preenchido. */
export const hasSpotifyEmbed = (): boolean => toEmbedUrl(SPOTIFY_URL) !== null;

/**
 * `https://open.spotify.com/playlist/ID?si=...` →
 * `https://open.spotify.com/embed/playlist/ID?utm_source=generator`
 *
 * Só aceita `open.spotify.com` e os tipos que o player incorpora. Qualquer
 * outra coisa devolve `null` — um `src` de iframe vindo de string livre é
 * exatamente o tipo de coisa que não se valida "na confiança".
 */
export function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.hostname !== 'open.spotify.com') return null;

  const parts = parsed.pathname.split('/').filter(Boolean);
  // Links localizados vêm com prefixo de idioma: /intl-pt/track/ID
  if (parts[0]?.startsWith('intl-')) parts.shift();
  if (parts[0] === 'embed') parts.shift();

  const [kind, id] = parts;
  const allowed = ['track', 'album', 'playlist', 'artist', 'episode', 'show'];
  if (!kind || !id || !allowed.includes(kind) || !/^[A-Za-z0-9]+$/.test(id)) return null;

  return `https://open.spotify.com/embed/${kind}/${id}?utm_source=generator`;
}

/** Altura do iframe: faixa única é compacta, coleção precisa da lista. */
export function embedHeight(embedUrl: string): number {
  return /\/embed\/(track|episode)\//.test(embedUrl) ? 152 : 232;
}
