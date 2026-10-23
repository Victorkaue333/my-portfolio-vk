import type { Service, ServiceGroupId } from '../types';

/**
 * Serviços de /servicos, agrupados. Texto em `servicos.items.<id>` (i18n).
 *
 * `projects` é a evidência: só entra projeto deste portfólio em que o serviço
 * aparece de fato. Serviço sem projeto que o comprove não entra na lista —
 * por isso não há consultoria de segurança, cloud avançada ou treino de
 * modelos próprios.
 */
export const SERVICE_GROUPS: ServiceGroupId[] = ['build', 'automation', 'engineering'];

export const services: Service[] = [
  // Desenvolvimento
  {
    id: 'webSystems',
    group: 'build',
    icon: 'layout',
    tech: ['Python', 'Django', 'PostgreSQL', 'React'],
    projects: ['suplastock', 'va-suplementos', 'agendeaqui', 'sigref'],
  },
  {
    id: 'saas',
    group: 'build',
    icon: 'layers',
    tech: ['TypeScript', 'React', 'NestJS', 'Supabase'],
    projects: ['caji-agent', 'mav-imob', 'sertao-conecta'],
  },
  {
    id: 'sites',
    group: 'build',
    icon: 'globe',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    projects: ['henrique-energia-solar', 'saberes-interculturais', 'vksoftware', 'data-sertao'],
  },
  {
    id: 'backend',
    group: 'build',
    icon: 'server',
    tech: ['Python', 'FastAPI', 'NestJS', 'PostgreSQL'],
    projects: ['mav-imob', 'transcritor-de-entrevistas', 'caji-agent'],
  },
  // Automação e IA
  {
    id: 'automation',
    group: 'automation',
    icon: 'zap',
    tech: ['Python', 'pandas', 'Selenium', 'LibreOffice'],
    projects: ['gerador-certificados', 'dev-job-automation'],
  },
  {
    id: 'ai',
    group: 'automation',
    icon: 'cpu',
    tech: ['Whisper', 'Gemini', 'FastAPI', 'Python'],
    projects: ['transcritor-de-entrevistas', 'touch-speaker', 'caji-agent'],
  },
  {
    id: 'integrations',
    group: 'automation',
    icon: 'link',
    tech: ['Node.js', 'NestJS', 'Redis', 'Supabase'],
    projects: ['mav-imob', 'caji-agent'],
  },
  // Engenharia e evolução
  {
    id: 'modernization',
    group: 'engineering',
    icon: 'refresh',
    tech: ['Django', 'PHP', 'React', 'TypeScript'],
    projects: ['suplastock', 'pe-na-estrada'],
  },
  {
    id: 'dashboards',
    group: 'engineering',
    icon: 'bar-chart',
    tech: ['Chart.js', 'React', 'Django', 'PostgreSQL'],
    projects: ['agendeaqui', 'va-suplementos', 'mav-imob'],
  },
  {
    id: 'infra',
    group: 'engineering',
    icon: 'cloud',
    tech: ['Docker', 'Nginx', 'GitHub Actions', 'Linux'],
    projects: ['sertao-conecta', 'agendeaqui'],
  },
  {
    id: 'maintenance',
    group: 'engineering',
    icon: 'tool',
    tech: ['Git', 'GitHub Actions', 'Vitest', 'Playwright'],
    projects: ['caji-agent', 'sertao-conecta'],
  },
];
