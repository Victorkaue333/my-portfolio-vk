import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiStar } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { useLanguage, type Language } from '../../../hooks/useLanguage';
import { languageMeta } from '../../../locales/languages';
import { readStorage, writeStorage } from '../../../hooks/useLocalStorage';
import { Button } from '../Button/Button';
import { hasTechIcon, TechGlyph } from '../TechIcon/TechIcon';
import './GithubActivity.css';

const GITHUB_USER = 'Victorkaue333';
const PROFILE_URL = `https://github.com/${GITHUB_USER}`;
const CONTRIB_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;
const CONTRIB_CACHE_KEY = 'vk_github_contributions';
const CONTRIB_TTL_MS = 60 * 60 * 1000;
const REPOS_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=12`;
const CACHE_KEY = 'vk_github_repos';
const CACHE_TTL_MS = 30 * 60 * 1000;
const REPO_LIMIT = 6;

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
}

interface CachedRepos {
  ts: number;
  repos: Repo[];
}

type ReposState =
  | { status: 'idle' | 'loading' | 'error' }
  | { status: 'ready'; repos: Repo[] };

function safeSession(): Storage | null {
  try { return window.sessionStorage; } catch { return null; }
}

/** Mantém só os campos usados — cache menor e sem depender do shape completo da API. */
function pickRepos(raw: unknown): Repo[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((r) => r && !r.fork && r.name !== GITHUB_USER)
    .slice(0, REPO_LIMIT)
    .map((r) => ({
      id: r.id,
      name: r.name,
      html_url: r.html_url,
      description: r.description ?? null,
      language: r.language ?? null,
      stargazers_count: r.stargazers_count ?? 0,
      pushed_at: r.pushed_at,
    }));
}

/** Liga `true` (uma vez) quando o elemento chega perto da viewport. */
function useNearViewport<T extends Element>(rootMargin = '300px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (near) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
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
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, rootMargin]);

  return [ref, near] as const;
}

/** Busca os repositórios recentes só quando `enabled`; cache de 30 min no sessionStorage. */
function useRecentRepos(enabled: boolean): ReposState {
  const [state, setState] = useState<ReposState>(() => {
    const cached = readStorage<CachedRepos>(CACHE_KEY, safeSession());
    return cached && Date.now() - cached.ts < CACHE_TTL_MS && Array.isArray(cached.repos)
      ? { status: 'ready', repos: cached.repos }
      : { status: 'idle' };
  });

  // Veio do cache (ou já buscou com sucesso) — não volta à rede.
  const doneRef = useRef(state.status === 'ready');

  useEffect(() => {
    if (!enabled || doneRef.current) return;
    const controller = new AbortController();
    setState({ status: 'loading' });

    fetch(REPOS_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        // 403/429 = rate limit da API pública; qualquer não-2xx cai no fallback.
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((raw: unknown) => {
        const repos = pickRepos(raw);
        doneRef.current = true;
        writeStorage(CACHE_KEY, { ts: Date.now(), repos } satisfies CachedRepos, safeSession());
        setState({ status: 'ready', repos });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (import.meta.env.DEV) console.warn('[GithubActivity]', err);
        setState({ status: 'error' });
      });

    return () => controller.abort();
  }, [enabled]);

  return state;
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
];

function formatRelative(iso: string, lang: Language): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const rtf = new Intl.RelativeTimeFormat(languageMeta(lang).intl, { numeric: 'auto' });
  const diffSec = (date.getTime() - Date.now()) / 1000;
  for (const [unit, secs] of RELATIVE_UNITS) {
    if (Math.abs(diffSec) >= secs) return rtf.format(Math.round(diffSec / secs), unit);
  }
  return rtf.format(0, 'minute');
}

function FallbackCard() {
  const { t } = useTranslation();
  return (
    <div className="github-fallback-card">
      <p>{t('github.fallback.text')}</p>
      <Button href={PROFILE_URL} variant="outline" external>
        <SiGithub size={18} aria-hidden="true" />
        {t('github.fallback.cta')}
      </Button>
    </div>
  );
}

/* ---------- Gráfico de contribuições (desenhado aqui, estilo GitHub) ----------
 * Era uma imagem do ghchart: sem total, sem legenda, sem tooltip e com cores
 * "invertidas" por filtro no tema escuro. Agora os dados vêm da API pública
 * github-contributions-api (mesmo total do perfil, `level` 0–4 igual ao do
 * GitHub) e o grid é um SVG que segue o tema via CSS. */

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionData {
  total: number;
  days: ContributionDay[];
}

type ChartState =
  | { status: 'idle' | 'loading' | 'error' }
  | { status: 'ready'; data: ContributionData };

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 30; // coluna dos dias da semana
const TOP = 18; // linha dos meses

function pickContributions(raw: unknown): ContributionData | null {
  const r = raw as { total?: { lastYear?: unknown }; contributions?: unknown };
  if (!r || !Array.isArray(r.contributions) || typeof r.total?.lastYear !== 'number') return null;
  const days = (r.contributions as ContributionDay[]).filter(
    (d) => typeof d?.date === 'string' && typeof d.count === 'number',
  );
  return days.length > 0 ? { total: r.total.lastYear, days } : null;
}

function useContributions(enabled: boolean): ChartState {
  const [state, setState] = useState<ChartState>(() => {
    const cached = readStorage<{ ts: number; data: ContributionData }>(CONTRIB_CACHE_KEY, safeSession());
    return cached && Date.now() - cached.ts < CONTRIB_TTL_MS && Array.isArray(cached.data?.days)
      ? { status: 'ready', data: cached.data }
      : { status: 'idle' };
  });
  const doneRef = useRef(state.status === 'ready');

  useEffect(() => {
    if (!enabled || doneRef.current) return;
    const controller = new AbortController();
    setState({ status: 'loading' });

    fetch(CONTRIB_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`contributions API ${res.status}`);
        return res.json();
      })
      .then((raw: unknown) => {
        const data = pickContributions(raw);
        if (!data) throw new Error('contributions API: formato inesperado');
        doneRef.current = true;
        writeStorage(CONTRIB_CACHE_KEY, { ts: Date.now(), data }, safeSession());
        setState({ status: 'ready', data });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (import.meta.env.DEV) console.warn('[GithubActivity]', err);
        setState({ status: 'error' });
      });

    return () => controller.abort();
  }, [enabled]);

  return state;
}

/** Datas "AAAA-MM-DD" em UTC — evita o dia pular por fuso horário. */
const parseDay = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** Semanas começando no domingo, como no GitHub (primeira coluna pode vir incompleta). */
function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  const first = days[0];
  if (!first) return [];
  const cells: (ContributionDay | null)[] = [
    ...Array.from({ length: parseDay(first.date).getUTCDay() }, () => null),
    ...days,
  ];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

interface Tooltip {
  x: number;
  y: number;
  row: number;
  day: ContributionDay;
}

function ContributionChart({ enabled }: { enabled: boolean }) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const state = useContributions(enabled);
  const [tip, setTip] = useState<Tooltip | null>(null);
  const locale = languageMeta(lang).intl;

  if (state.status === 'error') {
    return (
      <p className="gh-chart-error">
        {t('github.contributions.error')}{' '}
        <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
          {t('github.contributions.errorLink')}
        </a>
      </p>
    );
  }

  const ready = state.status === 'ready';
  const weeks = ready ? toWeeks(state.data.days) : Array.from({ length: 53 }, () => Array(7).fill(null));
  const width = LEFT + weeks.length * STEP;
  const height = TOP + 7 * STEP;

  // Rótulo do mês na primeira semana em que ele aparece; pula se colar no anterior.
  const monthFmt = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  const months: { x: number; label: string }[] = [];
  if (ready) {
    let lastMonth = -1;
    weeks.forEach((week, w) => {
      const day = week.find(Boolean);
      if (!day) return;
      const m = parseDay(day.date).getUTCMonth();
      if (m === lastMonth) return;
      lastMonth = m;
      const x = LEFT + w * STEP;
      const prev = months[months.length - 1];
      if (prev && x - prev.x < STEP * 3) months.pop();
      months.push({ x, label: monthFmt.format(parseDay(day.date)).replace('.', '') });
    });
    // Primeiro rótulo espremido no começo some, como no GitHub.
    if (months.length > 1 && months[1]!.x - months[0]!.x < STEP * 3) months.shift();
  }

  // Seg, Qua, Sex — nomes localizados a partir de uma semana conhecida (4/jan/1970 = domingo).
  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
  const weekdays = [1, 3, 5].map((d) => ({
    row: d,
    label: weekdayFmt.format(new Date(Date.UTC(1970, 0, 4 + d))).replace('.', ''),
  }));

  const dateFmt = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', timeZone: 'UTC' });
  const tipText = (day: ContributionDay) =>
    t('github.contributions.tooltip', { count: day.count, date: dateFmt.format(parseDay(day.date)) });

  const title = ready
    ? t('github.contributions.total', {
        count: state.data.total,
        formatted: new Intl.NumberFormat(locale).format(state.data.total),
      })
    : t('github.contributions.title');

  return (
    <div className="gh-chart">
      <h3 className="gh-subtitle gh-chart-title" aria-live="polite">{title}</h3>

      <div className="gh-chart-card">
        <div className="gh-chart-scroll">
          <div className="gh-chart-plot" onMouseLeave={() => setTip(null)}>
          <svg
            className={`gh-chart-svg${ready ? '' : ' is-loading'}`}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={ready ? title : t('github.contributions.loading')}
          >
            {months.map((m) => (
              <text key={`${m.x}-${m.label}`} x={m.x} y={10} className="gh-chart-label">{m.label}</text>
            ))}
            {weekdays.map((d) => (
              <text key={d.row} x={0} y={TOP + d.row * STEP + CELL - 1} className="gh-chart-label">{d.label}</text>
            ))}
            {weeks.map((week, w) =>
              week.map((day, d) => {
                if (ready && !day) return null;
                const x = LEFT + w * STEP;
                const y = TOP + d * STEP;
                return (
                  <rect
                    key={`${w}-${d}`}
                    x={x}
                    y={y}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    className={`gh-cell gh-l${day?.level ?? 0}`}
                    onMouseEnter={day ? () => setTip({ x: x + CELL / 2, y, row: d, day }) : undefined}
                  />
                );
              }),
            )}
          </svg>

          {tip && (
            <div
              // Topo do grid: abre para baixo (acima seria cortado pelo scroll).
              // Perto das bordas: ancora no lado em vez de centralizar.
              className={[
                'gh-chart-tip',
                tip.row <= 1 ? 'is-below' : '',
                tip.x < 90 ? 'is-start' : tip.x > width - 90 ? 'is-end' : '',
              ].join(' ')}
              role="tooltip"
              style={{ left: tip.x, top: tip.row <= 1 ? tip.y + CELL : tip.y }}
            >
              {tipText(tip.day)}
            </div>
          )}
          </div>
        </div>

        <div className="gh-chart-footer">
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="gh-chart-profile">
            {t('github.contributions.errorLink')}
          </a>
          <span className="gh-chart-legend" aria-hidden="true">
            {t('github.contributions.less')}
            {[0, 1, 2, 3, 4].map((l) => (
              <svg key={l} width={CELL} height={CELL}><rect width={CELL} height={CELL} rx={2} className={`gh-cell gh-l${l}`} /></svg>
            ))}
            {t('github.contributions.more')}
          </span>
        </div>
      </div>
    </div>
  );
}

function RepoSkeletons() {
  const { t } = useTranslation();
  return (
    <div className="gh-repos-grid" role="status" aria-live="polite">
      <span className="gh-sr-only">{t('github.repos.loading')}</span>
      {Array.from({ length: REPO_LIMIT }, (_, i) => (
        <div className="gh-repo-card gh-repo-skeleton" key={i} aria-hidden="true">
          <span className="gh-skel gh-skel-title" />
          <span className="gh-skel gh-skel-line" />
          <span className="gh-skel gh-skel-line short" />
          <span className="gh-skel gh-skel-meta" />
        </div>
      ))}
    </div>
  );
}

interface GithubActivityProps {
  /** Lista de repositórios recentes abaixo do gráfico. Sem ela, a API de repos nem é chamada. */
  showRepos?: boolean;
}

export function GithubActivity({ showRepos = true }: GithubActivityProps) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [ref, near] = useNearViewport<HTMLDivElement>('300px');
  const repos = useRecentRepos(near && showRepos);

  return (
    <div className="gh-activity" ref={ref}>
      <div className="gh-block">
        <ContributionChart enabled={near} />
      </div>

      {showRepos && (
      <div className="gh-block">
        <h3 className="gh-subtitle">{t('github.repos.title')}</h3>
        {repos.status === 'error' || (repos.status === 'ready' && repos.repos.length === 0) ? (
          <FallbackCard />
        ) : repos.status === 'ready' ? (
          <>
            <ul className="gh-repos-grid">
              {repos.repos.map((repo) => (
                <li className="gh-repo-card" key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="gh-repo-name">
                    {repo.name}
                  </a>
                  <p className={`gh-repo-desc${repo.description ? '' : ' is-empty'}`}>
                    {repo.description || t('github.repos.noDescription')}
                  </p>
                  <div className="gh-repo-meta">
                    {repo.language && (
                      <span className="gh-repo-lang">
                        {hasTechIcon(repo.language) ? (
                          <TechGlyph name={repo.language} size={13} className="gh-repo-lang-icon" />
                        ) : (
                          <span className="gh-repo-lang-dot" aria-hidden="true" />
                        )}
                        {repo.language}
                      </span>
                    )}
                    <span
                      className="gh-repo-stars"
                      aria-label={t('github.repos.stars', { count: repo.stargazers_count })}
                    >
                      <FiStar size={13} aria-hidden="true" />
                      {repo.stargazers_count}
                    </span>
                    <span className="gh-repo-date">
                      <time dateTime={repo.pushed_at}>
                        {t('github.repos.updated', { when: formatRelative(repo.pushed_at, lang) })}
                      </time>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <a href={`${PROFILE_URL}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="gh-view-all">
              <SiGithub size={14} aria-hidden="true" />
              {t('github.viewAll')}
            </a>
          </>
        ) : (
          <RepoSkeletons />
        )}
      </div>
      )}
    </div>
  );
}
