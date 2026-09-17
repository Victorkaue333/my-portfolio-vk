/**
 * Fonte única dos dados públicos do GitHub.
 *
 * Antes as duas chamadas (repositórios e contribuições) viviam dentro do
 * componente `GithubActivity`. Com o terminal interativo respondendo `github`,
 * o mesmo dado passou a ser pedido de dois lugares — e duas integrações
 * paralelas para a mesma API acabariam divergindo em cache, tratamento de erro
 * e limite de requisição. As funções abaixo são o único caminho até a API; o
 * componente e o terminal só consomem daqui.
 *
 * Tudo é anônimo: API pública, sem token, sem segredo. O limite de 60
 * requisições/hora por IP é real, então cada resposta fica no `sessionStorage`
 * e a mesma aba não volta à rede dentro do TTL.
 */

export const GITHUB_USER = 'Victorkaue333';
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`;
export const GITHUB_REPOS_URL = `${GITHUB_PROFILE_URL}?tab=repositories`;

const REPOS_ENDPOINT = `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=12`;
const CONTRIB_ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;

const REPOS_CACHE_KEY = 'vk_github_repos';
const REPOS_TTL_MS = 30 * 60 * 1000;
const CONTRIB_CACHE_KEY = 'vk_github_contributions';
const CONTRIB_TTL_MS = 60 * 60 * 1000;

/** Quantos repositórios a seção mostra (e quantos o terminal lista). */
export const REPO_LIMIT = 6;

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  total: number;
  days: ContributionDay[];
}

interface Cached<T> {
  ts: number;
  data: T;
}

function safeSession(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function readCache<T>(key: string, ttl: number): T | null {
  try {
    const raw = safeSession()?.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached<T>;
    return Date.now() - parsed.ts < ttl ? parsed.data : null;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    safeSession()?.setItem(key, JSON.stringify({ ts: Date.now(), data } satisfies Cached<T>));
  } catch {
    /* storage bloqueado (aba anônima, cota) — seguir sem cache */
  }
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

function pickContributions(raw: unknown): ContributionData | null {
  const r = raw as { total?: { lastYear?: unknown }; contributions?: unknown };
  if (!r || !Array.isArray(r.contributions) || typeof r.total?.lastYear !== 'number') return null;
  const days = (r.contributions as ContributionDay[]).filter(
    (d) => typeof d?.date === 'string' && typeof d.count === 'number',
  );
  return days.length > 0 ? { total: r.total.lastYear, days } : null;
}

/**
 * Repositórios recentes. Lança em qualquer resposta não-2xx — inclusive
 * 403/429, que é o limite da API pública — para quem chamou decidir o
 * fallback (o componente mostra o card de erro, o terminal mostra a linha
 * "não deu para carregar" + link do perfil).
 */
export async function fetchRepos(signal?: AbortSignal): Promise<Repo[]> {
  const cached = readCache<Repo[]>(REPOS_CACHE_KEY, REPOS_TTL_MS);
  if (cached) return cached;

  const res = await fetch(REPOS_ENDPOINT, { signal, headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const repos = pickRepos(await res.json());
  writeCache(REPOS_CACHE_KEY, repos);
  return repos;
}

/** Contribuições do último ano (mesmo total do perfil, `level` 0–4 como no GitHub). */
export async function fetchContributions(signal?: AbortSignal): Promise<ContributionData> {
  const cached = readCache<ContributionData>(CONTRIB_CACHE_KEY, CONTRIB_TTL_MS);
  if (cached) return cached;

  const res = await fetch(CONTRIB_ENDPOINT, { signal });
  if (!res.ok) throw new Error(`contributions API ${res.status}`);
  const data = pickContributions(await res.json());
  if (!data) throw new Error('contributions API: formato inesperado');
  writeCache(CONTRIB_CACHE_KEY, data);
  return data;
}

/** Lê o cache já preenchido sem ir à rede — usado por quem só quer o que existe. */
export const cachedRepos = () => readCache<Repo[]>(REPOS_CACHE_KEY, REPOS_TTL_MS);
export const cachedContributions = () => readCache<ContributionData>(CONTRIB_CACHE_KEY, CONTRIB_TTL_MS);

/** As linguagens dos repositórios recentes, sem repetir, na ordem de push. */
export function reposLanguages(repos: Repo[]): string[] {
  return [...new Set(repos.map((r) => r.language).filter((l): l is string => Boolean(l)))];
}
