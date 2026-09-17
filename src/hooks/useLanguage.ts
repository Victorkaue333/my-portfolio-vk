import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LANGUAGE_STORAGE_KEY,
  languageMeta,
  normalizeLanguage,
  type Language,
} from '../locales/languages';

export type { Language };

function persistLang(next: Language): void {
  try { localStorage.setItem(LANGUAGE_STORAGE_KEY, next); } catch { /* storage bloqueado — ignora */ }
}

export function useLanguage() {
  const { i18n } = useTranslation();

  const lang = useMemo(() => normalizeLanguage(i18n.resolvedLanguage || i18n.language), [i18n.language, i18n.resolvedLanguage]);
  const meta = languageMeta(lang);

  const setLanguage = useCallback(
    async (next: Language) => {
      if (next === lang) return;
      await i18n.changeLanguage(next);
      persistLang(next);
    },
    [i18n, lang]
  );

  return { lang, meta, setLanguage };
}
