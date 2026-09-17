import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import es from './locales/es';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_CODES,
  LANGUAGE_STORAGE_KEY,
  normalizeLanguage,
  type Language,
} from './locales/languages';
import ptBR from './locales/pt-BR';
import ptPT from './locales/pt-PT';

// Textos organizados por tela em src/locales/<idioma>/<tela>.ts.
const resources: Record<Language, { translation: typeof ptBR }> = {
  'pt-BR': { translation: ptBR },
  'pt-PT': { translation: ptPT },
  en: { translation: en },
  es: { translation: es },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  supportedLngs: LANGUAGE_CODES,
  fallbackLng: DEFAULT_LANGUAGE,
  load: 'currentOnly',
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    caches: ['localStorage'],
    // `pt` salvo por versões antigas vira pt-BR; navegador `es-MX` vira es etc.
    convertDetectedLanguage: (lng) => normalizeLanguage(lng),
  },
});

// Mantém <html lang> sincronizado com o idioma ativo (SEO + acessibilidade)
function syncHtmlLang(lng?: string) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = normalizeLanguage(lng);
  }
}
syncHtmlLang(i18n.resolvedLanguage || i18n.language);
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
