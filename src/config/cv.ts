import type { Language } from '../locales/languages';

/**
 * Currículo em PDF por idioma (arquivos em public/docs/Curriculo/).
 *
 * Só entra aqui o idioma que tem arquivo. Para publicar uma versão nova,
 * coloque o PDF na pasta e acrescente a linha — o botão da navbar passa a
 * entregá-la sozinho para quem visita naquele idioma.
 */
const CV_FILES: Partial<Record<Language, string>> & { 'pt-BR': string } = {
  'pt-BR': '/docs/Curriculo/Curriculo_Victor_Kaue.pdf',
  // en: '/docs/Curriculo/CV_Victor_Kaue_EN.pdf',
  // es: '/docs/Curriculo/CV_Victor_Kaue_ES.pdf',
};

/**
 * Ordem de tentativa quando o idioma da página não tem arquivo próprio.
 * Espanhol tenta o inglês antes do português: para recrutador de fora, inglês
 * é a língua comum. Tudo termina no pt-BR, que sempre existe.
 */
const FALLBACK: Record<Language, Language[]> = {
  'pt-BR': [],
  'pt-PT': ['pt-BR'],
  en: ['pt-BR'],
  es: ['en', 'pt-BR'],
};

export interface CvFile {
  href: string;
  /** Idioma do arquivo entregue — pode diferir do idioma da página. */
  lang: Language;
}

export function cvFor(lang: Language): CvFile {
  for (const candidate of [lang, ...FALLBACK[lang]]) {
    const href = CV_FILES[candidate];
    if (href) return { href, lang: candidate };
  }
  return { href: CV_FILES['pt-BR'], lang: 'pt-BR' };
}

/** `pt-BR` e `pt-PT` são a mesma língua para quem lê o currículo. */
export const sameLanguage = (a: Language, b: Language) => a.slice(0, 2) === b.slice(0, 2);
