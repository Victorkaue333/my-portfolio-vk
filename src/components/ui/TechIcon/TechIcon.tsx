import React from 'react';
import type { IconType } from 'react-icons';
import {
  FiCpu, FiZap, FiSmartphone, FiCloud, FiSearch, FiCalendar,
  FiPackage, FiLayout, FiCode, FiTrendingUp, FiGlobe, FiLayers, FiBarChart2,
  FiPenTool, FiClipboard, FiMessageCircle, FiEdit3, FiDatabase, FiRefreshCw,
  FiShare2, FiBookOpen, FiPlayCircle,
} from 'react-icons/fi';
import { FaAws, FaWindows } from 'react-icons/fa';
import { VscTerminalPowershell } from 'react-icons/vsc';
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiVite, SiCss, SiHtml5,
  SiDjango, SiFastapi, SiPytorch, SiOpenai, SiPhp, SiLaravel, SiBootstrap,
  SiPostgresql, SiMysql, SiSqlite, SiMongodb, SiDocker, SiNginx, SiGit,
  SiGithub, SiGunicorn, SiNodedotjs, SiHtmx, SiDbeaver, SiBruno,
  SiNextdotjs, SiNestjs, SiTailwindcss, SiShadcnui, SiFramer, SiRedis,
  SiJest, SiSupabase, SiFlutter, SiLinux, SiSocketdotio,
  SiClaude, SiGooglechrome, SiVercel, SiObsidian, SiTrello, SiGnubash, SiNpm,
} from 'react-icons/si';

interface TechEntry {
  Icon: IconType;
  /** Cor de marca (dark-friendly). Ausente = herda currentColor. */
  color?: string;
}

/**
 * Fonte única de ícones de tecnologia — Simple Icons (react-icons) em vez do
 * font-icon devicon (removido: ~1,5 MB). Resolvido por nome da tecnologia.
 */
const TECH_ICONS: Record<string, TechEntry> = {
  // Linguagens / core
  Python: { Icon: SiPython, color: '#4B8BBE' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  PHP: { Icon: SiPhp, color: '#9CA3EB' },
  HTML5: { Icon: SiHtml5, color: '#E34F26' },
  HTML: { Icon: SiHtml5, color: '#E34F26' },
  HTMX: { Icon: SiHtmx, color: '#3D72D7' },
  CSS3: { Icon: SiCss, color: '#3D9CD8' },
  CSS: { Icon: SiCss, color: '#3D9CD8' },
  SQL: { Icon: SiPostgresql, color: '#7AA7E6' },

  // Frameworks / libs
  React: { Icon: SiReact, color: '#61DAFB' },
  'Next.js': { Icon: SiNextdotjs, color: '#FFFFFF' },
  'Nest.js': { Icon: SiNestjs, color: '#E0234E' },
  'NestJS': { Icon: SiNestjs, color: '#E0234E' },
  Vite: { Icon: SiVite, color: '#8B7BFF' },
  Django: { Icon: SiDjango, color: '#44B78B' },
  FastAPI: { Icon: SiFastapi, color: '#009688' },
  Laravel: { Icon: SiLaravel, color: '#FF2D20' },
  Bootstrap: { Icon: SiBootstrap, color: '#8B5CF6' },
  PyTorch: { Icon: SiPytorch, color: '#EE4C2C' },
  Whisper: { Icon: SiOpenai, color: '#FFFFFF' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#38BDF8' },
  Tailwind: { Icon: SiTailwindcss, color: '#38BDF8' },
  'Shadcn/UI': { Icon: SiShadcnui, color: '#FFFFFF' },
  'shadcn/ui': { Icon: SiShadcnui, color: '#FFFFFF' },
  'Framer Motion': { Icon: SiFramer, color: '#C77DFF' },
  Jest: { Icon: SiJest, color: '#E14C4C' },
  Playwright: { Icon: FiPlayCircle, color: '#2EAD33' },
  Flutter: { Icon: SiFlutter, color: '#47C5FB' },
  WebSockets: { Icon: SiSocketdotio, color: '#FFFFFF' },

  // Bancos de dados
  PostgreSQL: { Icon: SiPostgresql, color: '#4F86E6' },
  MySQL: { Icon: SiMysql, color: '#00758F' },
  SQLite: { Icon: SiSqlite, color: '#4FB8E8' },
  MongoDB: { Icon: SiMongodb, color: '#47A248' },
  Redis: { Icon: SiRedis, color: '#FF4438' },
  Supabase: { Icon: SiSupabase, color: '#3ECF8E' },

  // DevOps / ferramentas
  Docker: { Icon: SiDocker, color: '#2496ED' },
  Nginx: { Icon: SiNginx, color: '#009639' },
  Git: { Icon: SiGit, color: '#F05032' },
  GitHub: { Icon: SiGithub, color: '#FFFFFF' },
  'GitHub Actions': { Icon: SiGithub, color: '#FFFFFF' },
  Gunicorn: { Icon: SiGunicorn, color: '#5F9E52' },
  AWS: { Icon: FaAws, color: '#FF9900' },
  Linux: { Icon: SiLinux, color: '#FCC624' },
  'CI/CD': { Icon: FiRefreshCw, color: '#4F86E6' },
  Node: { Icon: SiNodedotjs, color: '#5FA04E' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  'VS Code': { Icon: FiCode, color: '#3B9EFF' },
  DBeaver: { Icon: SiDbeaver, color: '#C9A66B' },
  Bruno: { Icon: SiBruno, color: '#F4AA41' },
  SEO: { Icon: FiSearch, color: '#8B5CF6' },
  npm: { Icon: SiNpm, color: '#CB3837' },
  Vercel: { Icon: SiVercel },
  Claude: { Icon: SiClaude, color: '#D97757' },
  'Git Bash': { Icon: SiGnubash, color: '#4EAA25' },
  PowerShell: { Icon: VscTerminalPowershell, color: '#5391FE' },
  'Google Chrome': { Icon: SiGooglechrome, color: '#4285F4' },
  Obsidian: { Icon: SiObsidian, color: '#8B6CEF' },
  Trello: { Icon: SiTrello, color: '#2E8BDB' },
  Windows: { Icon: FaWindows, color: '#1E9BF0' },

  // Conceitos abstratos (herdam a cor do contexto)
  IA: { Icon: FiCpu },
  'Automação': { Icon: FiZap },
  Automacao: { Icon: FiZap },
  Responsivo: { Icon: FiSmartphone },
  SaaS: { Icon: FiCloud },
  Eventos: { Icon: FiCalendar },
  'Controle de Estoque': { Icon: FiPackage },
  'Landing Page': { Icon: FiLayout },
  'Front-end': { Icon: FiCode },
  'Conversão': { Icon: FiTrendingUp },
  Conversao: { Icon: FiTrendingUp },
  'Web App': { Icon: FiGlobe },
  'Sistema Web': { Icon: FiGlobe },
  'Design System': { Icon: FiLayers },
  Escalabilidade: { Icon: FiBarChart2 },
  'Machine Learning': { Icon: FiCpu },
  'Inteligência Artificial': { Icon: FiCpu },
  'UX/UI': { Icon: FiLayout },
  Branding: { Icon: FiPenTool },
  'Marketing Digital': { Icon: FiTrendingUp },
  'Gestão de Projetos': { Icon: FiClipboard },
  Pesquisa: { Icon: FiBookOpen },
  'Divulgação Científica': { Icon: FiShare2 },
  'Sistematização de Dados': { Icon: FiDatabase },
  'Banco de Dados': { Icon: FiDatabase },
  Comunicação: { Icon: FiMessageCircle },
  'Produção de Conteúdo': { Icon: FiEdit3 },
};

export function resolveTechIcon(name: string): TechEntry | undefined {
  return TECH_ICONS[name];
}

export function hasTechIcon(name: string): boolean {
  return name in TECH_ICONS;
}

interface GlyphProps {
  name: string;
  size?: number;
  className?: string;
}

/** Só o ícone (sem wrapper) — para drop-in onde antes havia `<i className="devicon-..." />`. */
export const TechGlyph: React.FC<GlyphProps> = ({ name, size = 20, className }) => {
  const entry = TECH_ICONS[name];
  if (!entry) return null;
  const { Icon, color } = entry;
  return <Icon size={size} color={color} className={className} title={name} aria-hidden="true" />;
};

interface TechIconProps {
  name: string;
  size?: number;
  showName?: boolean;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  size = 20,
  showName = false,
  className = '',
}) => {
  const entry = TECH_ICONS[name];

  if (!entry) {
    return <span className={`tech-tag-fallback ${className}`}>{name}</span>;
  }

  const { Icon, color } = entry;
  return (
    <div className={`tech-icon-wrapper ${className}`} title={name}>
      <Icon size={size} color={color} className="tech-icon-svg" aria-hidden="true" />
      {showName && <span className="tech-icon-name">{name}</span>}
    </div>
  );
};
