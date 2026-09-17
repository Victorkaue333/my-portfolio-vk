import { BR, ES, PT, US } from 'country-flag-icons/react/3x2';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheck, FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../../../hooks/useLanguage';
import { LANGUAGES, type LanguageMeta } from '../../../locales/languages';
import './LanguageSwitcher.css';

const FLAGS = { BR, PT, US, ES } as const;

function Flag({ lang }: { lang: LanguageMeta }) {
  const Icon = FLAGS[lang.country];
  return <Icon className="lang-flag" aria-hidden="true" />;
}

interface LanguageSwitcherProps {
  /** `dropdown`: botão + menu (navbar). `segmented`: todos os idiomas visíveis (sidebar do Sobre). */
  variant?: 'dropdown' | 'segmented';
  className?: string;
}

export function LanguageSwitcher({ variant = 'dropdown', className = '' }: LanguageSwitcherProps) {
  const { t } = useTranslation();
  const { lang, meta, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Fecha ao clicar fora.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Ao abrir, foca o idioma ativo.
  useEffect(() => {
    if (!open) return;
    const index = LANGUAGES.findIndex((l) => l.code === lang);
    optionRefs.current[index]?.focus();
  }, [open, lang]);

  if (variant === 'segmented') {
    return (
      <div className={`lang-segmented ${className}`} role="group" aria-label={t('language.label')}>
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            className={`lang-segmented-btn ${l.code === lang ? 'active' : ''}`}
            onClick={() => setLanguage(l.code)}
            aria-pressed={l.code === lang}
            title={l.label}
          >
            <Flag lang={l} />
            <span>{l.short}</span>
          </button>
        ))}
      </div>
    );
  }

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const items = optionRefs.current;
    const current = items.findIndex((el) => el === document.activeElement);
    if (e.key === 'Escape' || e.key === 'Tab') {
      if (e.key === 'Escape') e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      items[(current + step + items.length) % items.length]?.focus();
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      items[e.key === 'Home' ? 0 : items.length - 1]?.focus();
    }
  };

  return (
    <div className={`lang-switcher ${className}`} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="btn-lang"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t('language.change')}: ${meta.label}`}
      >
        <Flag lang={meta} />
        {meta.short}
        <FiChevronDown size={13} aria-hidden="true" className={`btn-lang-chevron ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <ul className="lang-menu" role="menu" aria-label={t('language.label')} onKeyDown={onMenuKeyDown}>
          {LANGUAGES.map((l, i) => (
            <li key={l.code} role="none">
              <button
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={l.code === lang}
                className={`lang-menu-item ${l.code === lang ? 'active' : ''}`}
                lang={l.code}
                onClick={() => {
                  void setLanguage(l.code);
                  close();
                }}
              >
                <Flag lang={l} />
                <span className="lang-menu-label">{l.label}</span>
                {l.code === lang && <FiCheck size={14} aria-hidden="true" className="lang-menu-check" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
