import type { IconType } from 'react-icons';
import { FiAward, FiBriefcase, FiHome, FiLayers, FiMail, FiUser } from 'react-icons/fi';
import type { NavKey } from './pages';

/** Ícone de cada item de menu. `Record` obriga a cobrir toda NavKey nova. */
export const navIcons: Record<NavKey, IconType> = {
  home: FiHome,
  about: FiUser,
  projects: FiBriefcase,
  services: FiLayers,
  certificates: FiAward,
  contact: FiMail,
};
