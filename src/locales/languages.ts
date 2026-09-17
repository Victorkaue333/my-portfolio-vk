/*
 * Idiomas suportados. Fonte única: i18n, seletor de idioma, <html lang> e
 * formatação (Intl) saem daqui. Sem dependência de navegador.
 */

export const LANGUAGES = [
  { code: 'pt-BR', short: 'PT-BR', label: 'Português (Brasil)', country: 'BR', intl: 'pt-BR' },
  { code: 'pt-PT', short: 'PT-PT', label: 'Português (Portugal)', country: 'PT', intl: 'pt-PT' },
  { code: 'en', short: 'EN', label: 'English', country: 'US', intl: 'en-US' },
  { code: 'es', short: 'ES', label: 'Español', country: 'ES', intl: 'es-ES' },
] as const;

export type Language = (typeof LANGUAGES)[number]['code'];
export type LanguageMeta = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'pt-BR';
export const LANGUAGE_CODES: Language[] = LANGUAGES.map((l) => l.code);
export const LANGUAGE_STORAGE_KEY = 'portfolio-lang';

/**
 * Converte qualquer código (navegador, localStorage antigo `pt`) para um
 * idioma suportado. Português sem região cai no pt-BR.
 */
export function normalizeLanguage(value: string | undefined | null): Language {
  const v = value?.toLowerCase().replace('_', '-') ?? '';
  if (v.startsWith('pt-pt')) return 'pt-PT';
  if (v.startsWith('pt')) return 'pt-BR';
  if (v.startsWith('en')) return 'en';
  if (v.startsWith('es')) return 'es';
  return DEFAULT_LANGUAGE;
}

export function languageMeta(code: Language): LanguageMeta {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
