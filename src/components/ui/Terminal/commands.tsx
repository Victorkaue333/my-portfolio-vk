import type { ReactNode } from 'react';
import type { TFunction } from 'i18next';
import { Link } from 'react-router-dom';
import { SPOTIFY_URL, toEmbedUrl } from '../../../config/spotify';
import { navPages } from '../../../config/pages';
import { expertise } from '../../../data/expertise';
import { projects } from '../../../data/projects';
import { socialLinks } from '../../../data/social';
import {
  fetchContributions,
  fetchRepos,
  GITHUB_PROFILE_URL,
  GITHUB_USER,
  reposLanguages,
} from '../../../utils/github';
import { fetchSpotifyState } from '../../../utils/spotify';
import type { TerminalResolver, TerminalResponse } from './Terminal';

/**
 * Interpretador do terminal de /sobre.
 *
 * ## Segurança
 *
 * Isto **não é um shell**. O texto digitado nunca é executado: ele é
 * normalizado, comparado com uma lista fechada de nomes e, no máximo, escolhe
 * qual função deste arquivo roda. Não existe `eval`, `new Function`,
 * `child_process`, nem requisição que leve a entrada do usuário ao servidor.
 * Comando fora da lista responde `command not found` e para por aí.
 *
 * ## Dados
 *
 * Toda saída sai do que o portfólio já publica: `data/projects.ts`,
 * `data/expertise.ts`, `data/social.ts`, `config/pages.ts`, a API pública do
 * GitHub (`utils/github.ts`, a mesma que desenha a seção de atividade) e o
 * estado do Spotify (`utils/spotify.ts`, o mesmo do card). Nada é inventado e
 * nenhuma integração é duplicada.
 */

/** Os únicos nomes aceitos. Qualquer outra coisa é `command not found`. */
export const TERMINAL_COMMANDS = [
  'help',
  'about',
  'projects',
  'stack',
  'github',
  'spotify',
  'contact',
  'ls',
  'pwd',
  'whoami',
  'clear',
] as const;

export type TerminalCommand = (typeof TERMINAL_COMMANDS)[number];

export interface TerminalDeps {
  t: TFunction;
  /** Navegação SPA — usada só por `projects --open <n>`, com destino da lista. */
  navigate: (to: string) => void;
  /** Rota atual, para `pwd`. */
  pathname: string;
}

const out = (lines: ReactNode[]): TerminalResponse => ({ lines });

/** Link externo padrão das saídas. */
function ext(href: string, text: string): ReactNode {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text} ↗
    </a>
  );
}

/** "01", "02"… — alinhamento da lista de projetos sem tabela. */
const pad = (n: number) => String(n).padStart(2, '0');

function helpLines(t: TFunction): ReactNode[] {
  return [
    t('terminal.help.title'),
    '',
    ...TERMINAL_COMMANDS.map((name) => (
      <span key={name} className="terminal-out-group">
        <span className="terminal-out-key">{name.padEnd(10, ' ')}</span>
        {t(`terminal.help.${name}`)}
      </span>
    )),
  ];
}

function projectLines(t: TFunction): ReactNode[] {
  return [
    ...projects.map((p, i) => (
      <span key={p.id} className="terminal-out-group">
        <span className="terminal-out-index">{pad(i + 1)}  </span>
        <Link to={p.detailPath}>{p.title}</Link>
      </span>
    )),
    '',
    t('terminal.projects.hint'),
  ];
}

function stackLines(): ReactNode[] {
  return expertise.map((cat) => (
    <span key={cat.title} className="terminal-out-group">
      <span className="terminal-out-key">{cat.title}: </span>
      {cat.items.map((i) => i.name).join(', ')}
    </span>
  ));
}

function contactLines(t: TFunction): ReactNode[] {
  return [
    t('terminal.contact.title'),
    ...socialLinks.map((s) => (
      <span key={s.name} className="terminal-out-group">
        <span className="terminal-out-key">{s.name.padEnd(10, ' ')}</span>
        {ext(s.url, s.detail || s.name)}
      </span>
    )),
  ];
}

function lsLines(t: TFunction): ReactNode[] {
  return [
    t('terminal.ls.title'),
    ...navPages.map((p) => (
      <span key={p.path} className="terminal-out-group">
        <span className="terminal-out-index">{p.path.padEnd(16, ' ')}</span>
        <Link to={p.path}>{t(`nav.${p.navKey}`)}</Link>
      </span>
    )),
  ];
}

/** `github` — os mesmos números da seção de atividade; nenhum valor fixo. */
async function githubLines(t: TFunction): Promise<ReactNode[]> {
  const [repos, contrib] = await Promise.allSettled([fetchRepos(), fetchContributions()]);
  const lines: ReactNode[] = [`GitHub @${GITHUB_USER}`];

  if (contrib.status === 'fulfilled') {
    lines.push(t('terminal.github.contributions', { count: contrib.value.total }));
  }

  if (repos.status === 'fulfilled' && repos.value.length > 0) {
    lines.push(t('terminal.github.repos', { count: repos.value.length }));
    lines.push(
      ...repos.value.map((r) => (
        <span key={r.id} className="terminal-out-group">
          <span className="terminal-out-index">- </span>
          {ext(r.html_url, r.name)}
        </span>
      )),
    );
    const langs = reposLanguages(repos.value);
    if (langs.length > 0) lines.push(t('terminal.github.languages', { list: langs.join(', ') }));
  }

  // Limite de requisição da API pública, rede fora, formato inesperado: a
  // linha diz que não deu, sem número inventado no lugar.
  if (repos.status === 'rejected' && contrib.status === 'rejected') {
    lines.push(t('terminal.github.error'));
  }

  lines.push('', ext(GITHUB_PROFILE_URL, t('terminal.github.open')));
  return lines;
}

/** `spotify` — lê o mesmo estado do card de /sobre (regra 16 do briefing). */
async function spotifyLines(t: TFunction): Promise<ReactNode[]> {
  const state = await fetchSpotifyState();
  const embed = toEmbedUrl(SPOTIFY_URL);
  const playlist = embed ? [t('terminal.spotify.playlist'), ext(SPOTIFY_URL, t('terminal.spotify.open'))] : [];

  switch (state.status) {
    case 'playing':
    case 'recent': {
      const { track } = state;
      return [
        t(state.status === 'playing' ? 'terminal.spotify.playing' : 'terminal.spotify.last'),
        '',
        <span key="title" className="terminal-out-key">{track.title}</span>,
        track.artist,
        '',
        track.url ? ext(track.url, t('terminal.spotify.open')) : '',
      ].filter(Boolean);
    }
    case 'idle':
      return [t('terminal.spotify.idle'), '', ...playlist];
    case 'error':
      return [t('terminal.spotify.error'), '', ...playlist];
    case 'unconfigured':
    default:
      return playlist.length > 0 ? playlist : [t('terminal.spotify.none')];
  }
}

/**
 * Monta o resolvedor. Cada chamada devolve uma função pura sobre `deps` — o
 * `switch` abaixo é toda a "linguagem" do terminal.
 */
export function createTerminalResolver({ t, navigate, pathname }: TerminalDeps): TerminalResolver {
  return (input: string) => {
    const parts = input.trim().split(/\s+/);
    const name = (parts[0] ?? '').toLowerCase();
    const args = parts.slice(1);

    switch (name) {
      case 'help':
        return out(helpLines(t));

      case 'about':
        return out([t('about.intro'), '', `${t('hero.role')} ${t('hero.tech')}`]);

      case 'projects': {
        // Único "argumento" aceito, e mesmo ele só escolhe um item da lista
        // que já está na tela — nada de caminho livre.
        const flag = args[0]?.toLowerCase();
        if (flag === '--open' || flag === '-o') {
          const index = Number(args[1]);
          const project = Number.isInteger(index) ? projects[index - 1] : undefined;
          if (!project) return out([t('terminal.projects.notFound', { n: args[1] ?? '' })]);
          navigate(project.detailPath);
          return out([t('terminal.projects.opening', { title: project.title })]);
        }
        return out(projectLines(t));
      }

      case 'stack':
        return out([t('terminal.stack.title'), '', ...stackLines()]);

      case 'github':
        return githubLines(t).then(out);

      case 'spotify':
        return spotifyLines(t).then(out);

      case 'contact':
        return out(contactLines(t));

      case 'ls':
        return out(lsLines(t));

      case 'pwd':
        return out([pathname]);

      case 'whoami':
        return out(['Victor Kauê', `${t('hero.role')} ${t('hero.tech')}`]);

      case 'clear':
        return { clear: true };

      default:
        return out([
          <span key="nf" className="terminal-line is-error">
            {t('terminal.notFound', { cmd: parts[0] ?? '' })}
          </span>,
          t('terminal.notFoundHint'),
        ]);
    }
  };
}
