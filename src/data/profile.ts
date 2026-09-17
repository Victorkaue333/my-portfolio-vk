import { experiences } from './experiences';
import { projects } from './projects';

/**
 * Dados derivados para a Home — calculados a partir de experiences.ts e
 * projects.ts, então nunca ficam desatualizados nem dizem algo que o resto do
 * site não comprova.
 */

export interface HomeMetric {
  value: number;
  suffix?: string;
  /** Sufixo das chaves `home.metrics.<key>Label` / `<key>Context`. */
  key: 'projects' | 'real' | 'orgs';
  href: string;
}

export const homeMetrics: HomeMetric[] = [
  { key: 'projects', value: projects.length, href: '/projetos' },
  { key: 'real', value: projects.filter((p) => p.category === 'real').length, href: '/projetos' },
  { key: 'orgs', value: experiences.length, href: '/sobre' },
];
