import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight } from 'react-icons/fi';
import { SiSpotify } from 'react-icons/si';
import { embedHeight, SPOTIFY_URL, toEmbedUrl } from '../../../config/spotify';
import { cachedSpotifyState, fetchSpotifyState, type SpotifyState } from '../../../utils/spotify';
import './Spotify.css';

/**
 * Bloco de Spotify — o detalhe pessoal do portfólio, em um card só.
 *
 * Duas camadas, na ordem de robustez:
 *
 * 1. **Embed oficial** (`config/spotify.ts` → `SPOTIFY_URL`). Não depende de
 *    credencial, funciona em host estático e o play é sempre do visitante —
 *    o iframe entra sem `autoplay`.
 * 2. **Now Playing** (`/api/spotify/now-playing`). Opcional: quando as
 *    variáveis estão na Vercel, o card mostra a faixa real. Sem elas, o
 *    endpoint responde 501 e esta camada some sem ruído.
 *
 * Se nenhuma das duas estiver disponível o componente devolve `null` — antes
 * uma seção a menos do que um card vazio.
 *
 * O dado vem de `utils/spotify.ts`, o mesmo módulo que o comando `spotify` do
 * terminal usa. Uma integração, dois consumidores.
 */
export function Spotify() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [state, setState] = useState<SpotifyState | null>(() => cachedSpotifyState());

  const embedUrl = toEmbedUrl(SPOTIFY_URL);

  // Só busca quando o bloco chega perto da tela — /sobre é longa e o card
  // fica no fim dela.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near || state) return;
    const controller = new AbortController();
    let alive = true;
    fetchSpotifyState(controller.signal).then((next) => {
      if (alive) setState(next);
    });
    return () => {
      alive = false;
      controller.abort();
    };
  }, [near, state]);

  const track = state && (state.status === 'playing' || state.status === 'recent') ? state.track : null;

  if (!embedUrl && !track) {
    // Sem embed configurado e sem resposta ainda: um nó vazio só para o
    // observer ter alvo. Já com a resposta (sem faixa, sem credencial ou com
    // erro) não há nada real a mostrar — o bloco some em vez de virar casca.
    return state ? null : <section className="spotify-block is-probing" ref={ref} aria-hidden="true" />;
  }

  const heading = track
    ? state?.status === 'playing'
      ? t('spotify.nowPlaying')
      : t('spotify.lastPlayed')
    : t('spotify.playlist');

  return (
    <section className="spotify-block" ref={ref} aria-label={t('spotify.title')}>
      <h3 className="spotify-heading">
        <SiSpotify size={16} aria-hidden="true" className="spotify-logo" />
        {heading}
      </h3>

      {track ? (
        <div className="spotify-card">
          {track.albumImage ? (
            <img
              className="spotify-cover"
              src={track.albumImage}
              alt=""
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="spotify-cover is-empty" aria-hidden="true">
              <SiSpotify size={22} />
            </span>
          )}

          <div className="spotify-meta">
            <p className="spotify-track">{track.title}</p>
            <p className="spotify-artist">{track.artist}</p>
          </div>

          {track.url && (
            <a className="spotify-open hbg" href={track.url} target="_blank" rel="noopener noreferrer">
              {t('spotify.open')}
              <FiArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      ) : (
        embedUrl && (
          <div className="spotify-embed">
            <iframe
              src={embedUrl}
              title={t('spotify.title')}
              height={embedHeight(embedUrl)}
              loading="lazy"
              frameBorder="0"
              // Sem `autoplay` de propósito: quem decide tocar é o visitante.
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        )
      )}

      {state?.status === 'error' && !track && <p className="spotify-note">{t('spotify.error')}</p>}
    </section>
  );
}
