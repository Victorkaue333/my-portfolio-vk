import type { TFunction } from 'i18next';
import type { Language } from '../locales/languages';

/*
 * Períodos de experiência/formação são escritos em pt-BR, no formato do
 * LinkedIn ("jun 2026 - o momento", "mar 2022 - 2026"). Daqui sai a duração
 * calculada na hora — nada de "2 meses" digitado que envelhece — e o período
 * formatado no idioma da página.
 */

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const PRESENT = /^o momento$/i;

interface YearMonth {
  year: number;
  /** 0–11; ausente quando o período só tem o ano. */
  month?: number;
}

export interface ParsedPeriod {
  start: YearMonth;
  /** `undefined` = em andamento ("o momento"). */
  end?: YearMonth;
}

function parsePoint(text: string): YearMonth | null {
  const parts = text.trim().toLowerCase().split(/\s+/);
  if (parts.length === 1 && /^\d{4}$/.test(parts[0]!)) return { year: Number(parts[0]) };
  if (parts.length === 2) {
    const month = MONTHS.indexOf(parts[0]!.slice(0, 3));
    if (month >= 0 && /^\d{4}$/.test(parts[1]!)) return { year: Number(parts[1]), month };
  }
  return null;
}

export function parsePeriod(period: string): ParsedPeriod | null {
  const [from, to] = period.split(/\s+[-–—]\s+/);
  const start = from ? parsePoint(from) : null;
  if (!start) return null;
  if (!to || PRESENT.test(to.trim())) return { start };
  const end = parsePoint(to);
  return end ? { start, end } : null;
}

/**
 * Meses contados como o LinkedIn: o mês de início e o de fim entram
 * ("abr 2026 - jun 2026" = 3 meses). Sem mês, não há como contar: null.
 */
export function periodMonths(p: ParsedPeriod, now = new Date()): number | null {
  const end = p.end ?? { year: now.getFullYear(), month: now.getMonth() };
  if (p.start.month === undefined || end.month === undefined) return null;
  const months = (end.year - p.start.year) * 12 + (end.month - p.start.month) + 1;
  return months > 0 ? months : null;
}

/** Duração total de vários cargos: do início mais antigo ao fim mais recente. */
export function spanOf(periods: string[]): ParsedPeriod | null {
  const parsed = periods.map(parsePeriod).filter((p): p is ParsedPeriod => p !== null);
  if (parsed.length === 0) return null;
  const key = (ym: YearMonth) => ym.year * 12 + (ym.month ?? 0);
  const start = parsed.map((p) => p.start).sort((a, b) => key(a) - key(b))[0]!;
  const open = parsed.some((p) => !p.end);
  const end = open ? undefined : parsed.map((p) => p.end!).sort((a, b) => key(b) - key(a))[0];
  return { start, end };
}

/** "1 ano 3 meses" / "1 year 3 months" — vazio se não der para calcular. */
export function formatDuration(months: number | null, t: TFunction): string {
  if (!months) return '';
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [
    years > 0 ? t('about.duration.years', { count: years }) : '',
    rest > 0 ? t('about.duration.months', { count: rest }) : '',
  ].filter(Boolean).join(' ');
}

function formatPoint(ym: YearMonth, lang: Language): string {
  if (ym.month === undefined) return String(ym.year);
  return new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(ym.year, ym.month, 1)))
    .replace('.', '');
}

/** Período já interpretado, no idioma da página. */
export function formatParsed(p: ParsedPeriod, lang: Language, t: TFunction): string {
  return `${formatPoint(p.start, lang)} – ${p.end ? formatPoint(p.end, lang) : t('about.present')}`;
}

/** "jun 2026 – o momento" no idioma da página. Texto original se não reconhecer o formato. */
export function formatPeriod(period: string, lang: Language, t: TFunction): string {
  const p = parsePeriod(period);
  return p ? formatParsed(p, lang, t) : period;
}

/** Início do período, para o rótulo curto da timeline ("jun 2026"). */
export function formatStart(period: string, lang: Language): string {
  const p = parsePeriod(period);
  return p ? formatPoint(p.start, lang) : period.split(/\s+[-–—]\s+/)[0]?.trim() || period;
}
