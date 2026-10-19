import { useTranslation } from 'react-i18next';
import {
    FiDownload,
    FiMoon,
    FiSun,
} from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { cvFor, sameLanguage } from '../../../config/cv';
import { navIcons } from '../../../config/navIcons';
import { navPages } from '../../../config/pages';
import { prefetchRoute } from '../../../routes';
import { useLanguage } from '../../../hooks/useLanguage';
import { useScrollPosition } from '../../../hooks/useScrollPosition';
import { useScrollDirection } from '../../../hooks/useScrollDirection';
import { LanguageSwitcher } from '../../ui/LanguageSwitcher/LanguageSwitcher';
import { languageMeta } from '../../../locales/languages';
import { useTheme } from '../../../theme/ThemeProvider';
import './Navbar.css';

export function Navbar() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const cv = cvFor(lang);
  // Página em inglês entregando PDF em português: o botão avisa antes do clique.
  const cvForeign = !sameLanguage(cv.lang, lang);
  const { scrolled } = useScrollPosition(60);
  // Floating Navbar (https://ui.aceternity.com/components/floating-navbar):
  // só o COMPORTAMENTO foi trazido — recolher ao descer, reaparecer ao subir,
  // fixa perto do topo. O JSX abaixo continua sendo a navbar do projeto.
  const { hidden, reveal } = useScrollDirection({ topOffset: 120 });
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}
      id="main-navbar"
      aria-label="Navegação principal"
      // Tab nunca pode levar o foco para uma barra fora da tela: qualquer
      // foco aqui dentro traz a navbar de volta (regra 23).
      onFocusCapture={reveal}
      onPointerEnter={reveal}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="Victor Kauê - Página inicial">
          <span className="logo-white">Victor</span>
          <span className="logo-orange"> Kauê</span>
        </Link>

        <div className="nav-menu-wrapper">
          <ul className="nav-menu">
            {navPages.map((link) => {
              const Icon = navIcons[link.navKey];
              const label = t(`nav.${link.navKey}`);

              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    // Começa a baixar o chunk da rota no hover/foco, antes do
                    // clique — senão a espera pela rede vira tela de loader.
                    onMouseEnter={() => prefetchRoute(link.path)}
                    onFocus={() => prefetchRoute(link.path)}
                  >
                    <Icon size={15} aria-hidden="true" />
                    <span>{label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-actions">
          <LanguageSwitcher />

          <button
            className="btn-theme"
            onClick={(e) => toggleTheme(e.currentTarget)}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {theme === 'dark' ? <FiSun size={16} aria-hidden="true" /> : <FiMoon size={16} aria-hidden="true" />}
          </button>

          <a
            href={cv.href}
            hrefLang={cv.lang}
            className="btn-cv"
            target="_blank"
            rel="noopener noreferrer"
            // Nome acessível começa pelo texto visível (label-in-name) e, quando
            // o PDF é de outra língua, diz qual — o selo "PT" é aria-hidden.
            aria-label={cvForeign ? `${t('nav.downloadCV')} – ${languageMeta(cv.lang).label}` : undefined}
            title={cvForeign ? languageMeta(cv.lang).label : undefined}
          >
            <FiDownload size={14} aria-hidden="true" />
            {t('nav.downloadCV')}
            {cvForeign && (
              <span className="btn-cv-lang" aria-hidden="true">
                {cv.lang.slice(0, 2).toUpperCase()}
              </span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
}