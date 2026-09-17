import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navIcons } from '../../../config/navIcons';
import { navPages } from '../../../config/pages';
import { prefetchRoute } from '../../../routes';
import './MobileNavbar.css';

export function MobileNavbar() {
  const { t } = useTranslation();

  const navItems = navPages.map((page) => {
    const Icon = navIcons[page.navKey];
    return { path: page.path, icon: <Icon />, label: t(`nav.${page.navKey}`) };
  });

  return (
    <nav className="mobile-navbar" aria-label="Navegação mobile">
      <div className="mobile-nav-container">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
            // Em toque, `pointerdown` chega antes do clique: adianta o download
            // do chunk pelo tempo que o dedo leva para levantar.
            onPointerDown={() => prefetchRoute(item.path)}
            onFocus={() => prefetchRoute(item.path)}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}