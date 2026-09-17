import { useState } from 'react';
import { FiFolder, FiAlertCircle, FiUser, FiBriefcase, FiChevronDown, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { AnimatedTabs } from '../../components/ui/AnimatedTabs/AnimatedTabs';
import { ProjectCard } from '../../components/ui/ProjectCard/ProjectCard';
import { TechGlyph } from '../../components/ui/TechIcon/TechIcon';
import { PageHero } from '../../components/ui/PageHero/PageHero';
import { projects } from '../../data/projects';
import { LAST_PROJECT_KEY, readStorage, useLocalStorage } from '../../hooks/useLocalStorage';
import { usePageSeo } from '../../hooks/useSeo';
import type { Project } from '../../types';
import './Projetos.css';

type Filter = 'todos' | 'pessoal' | 'real';
type SectionKey = 'pessoal' | 'real';

const isFilter = (v: unknown): v is Filter => v === 'todos' || v === 'pessoal' || v === 'real';

/** Abas de categoria — mesma ordem e mesmos valores de antes. */
const FILTERS = [
  { value: 'todos', labelKey: 'projects.categories.all' },
  { value: 'pessoal', labelKey: 'projects.categories.personal' },
  { value: 'real', labelKey: 'projects.categories.real' },
] as const satisfies readonly { value: Filter; labelKey: string }[];

/** Tecnologias do projeto (technologies + stack, sem repetir). */
const techsOf = (p: Project) => new Set([...(p.technologies ?? []), ...(p.stack ?? [])]);

/** Tecnologias presentes em 2+ projetos, da mais usada para a menos. Uma só não vale filtro. */
const TECH_OPTIONS = (() => {
  const counts = new Map<string, number>();
  for (const p of projects) for (const tech of techsOf(p)) counts.set(tech, (counts.get(tech) ?? 0) + 1);
  return [...counts]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tech]) => tech);
})();

// '' = sem filtro. Tecnologia salva pode ter saído dos dados desde a última visita.
const isTechFilter = (v: unknown): v is string =>
  v === '' || (typeof v === 'string' && TECH_OPTIONS.includes(v));
const isSectionList = (v: unknown): v is SectionKey[] =>
  Array.isArray(v) && v.every((s) => s === 'pessoal' || s === 'real');

export default function Projetos() {
  const { t } = useTranslation();
  const [filter, setFilter] = useLocalStorage<Filter>('vk_projects_filter', 'todos', isFilter);
  const [collapsed, setCollapsed] = useLocalStorage<SectionKey[]>('vk_projects_collapsed', [], isSectionList);
  // Lido uma vez: o destaque não deve pular de card enquanto a página está aberta.
  const [lastViewed] = useState(() => readStorage<string>(LAST_PROJECT_KEY));
  usePageSeo('projects');

  const toggleSection = (key: SectionKey) =>
    setCollapsed((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const [tech, setTech] = useLocalStorage<string>('vk_projects_tech', '', isTechFilter);
  const byTech = tech ? projects.filter((p) => techsOf(p).has(tech)) : projects;

  const personal = byTech.filter((p) => p.category === 'pessoal');
  const real = byTech.filter((p) => p.category === 'real');

  const sections: { key: SectionKey; items: Project[]; icon: React.ReactNode }[] = [
    { key: 'pessoal', items: personal, icon: <FiUser size={20} /> },
    { key: 'real', items: real, icon: <FiBriefcase size={20} /> },
  ];

  const visible = sections.filter((s) => (filter === 'todos' || filter === s.key) && s.items.length > 0);

  return (
    <main className="page-projetos">
      <section className="content-section">
        <div className="container">
          <PageHero
            titleMain="Projetos &"
            titleAccent="Soluções Reais"
            subtitle="Cases pessoais e profissionais construídos com foco em arquitetura, performance e valor de negócio do briefing ao deploy."
            icon={<FiFolder size={22} />}
          />

          {/* Animated Tabs: só a apresentação mudou — o estado, o localStorage
              e a filtragem abaixo continuam os mesmos. */}
          <div className="projects-filter-container">
            <AnimatedTabs
              tabs={FILTERS.map((f) => ({ value: f.value, title: t(f.labelKey) }))}
              active={filter}
              onChange={(value) => setFilter(value as Filter)}
              label={t('projects.categoryFilter')}
            />
          </div>

          <div className="projects-tech-filter" role="group" aria-label={t('projects.techFilter')}>
            <span className="projects-tech-label">{t('projects.techFilter')}</span>
            <div className="projects-tech-options">
              {TECH_OPTIONS.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`tech-filter-chip ${tech === name ? 'active' : ''}`}
                  aria-pressed={tech === name}
                  onClick={() => setTech(tech === name ? '' : name)}
                >
                  <TechGlyph name={name} size={15} />
                  {name}
                </button>
              ))}
              {tech && (
                <button type="button" className="tech-filter-clear" onClick={() => setTech('')}>
                  <FiX size={14} aria-hidden="true" />
                  {t('projects.clearTech')}
                </button>
              )}
            </div>
          </div>

          {visible.map((s) => {
            const isCollapsed = collapsed.includes(s.key);
            const gridId = `projects-grid-${s.key}`;
            return (
              <section key={s.key} className={`projects-section ${isCollapsed ? 'is-collapsed' : ''}`}>
                <h2 className="projects-section-header">
                  <button
                    type="button"
                    className="projects-section-toggle"
                    onClick={() => toggleSection(s.key)}
                    aria-expanded={!isCollapsed}
                    aria-controls={gridId}
                  >
                    <span className="projects-section-icon">{s.icon}</span>
                    <span className="projects-section-title">
                      {t(`projects.sections.${s.key === 'pessoal' ? 'personal' : 'real'}`)}
                    </span>
                    <span className="projects-section-count">{s.items.length}</span>
                    <FiChevronDown size={20} className="projects-section-chevron" aria-hidden="true" />
                  </button>
                </h2>
                <div className="projects-grid" id={gridId} hidden={isCollapsed}>
                  {s.items.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      lastViewed={project.id === lastViewed}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {visible.length === 0 && (
            <div className="no-projects-found">
              <FiAlertCircle size={32} />
              <p>{t('projects.noFound')}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
