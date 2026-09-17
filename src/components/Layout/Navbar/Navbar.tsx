import { useTranslation } from 'react-i18next';
import {
    FiDownload,
    FiMoon,
    FiSun,
} from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { navIcons } from '../../../config/navIcons';
import { navPages } from '../../../config/pages';
import { prefetchRoute } from '../../../routes';
import { useScrollPosition } from '../../../hooks/useScrollPosition';
import { LanguageSwitcher } from '../../ui/LanguageSwitcher/LanguageSwitcher';
import { useTheme } from '../../../theme/ThemeProvider';
import './Navbar.css';

export function Navbar() {
  const { t } = useTranslation();
  const { scrolled } = useScrollPosition(60);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-navbar" aria-label="Navegação principal">
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
            href="/docs/Curriculo/Curriculo_Victor_Kaue.pdf"
            className="btn-cv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('nav.downloadCV')}
          >
            <FiDownload size={14} />
            {t('nav.downloadCV')}
          </a>
        </div>
      </div>
    </nav>
  );
}