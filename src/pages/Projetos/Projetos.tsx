import { useState } from 'react';
import { FiFolder, FiAlertCircle, FiUser, FiBriefcase } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from '../../components/ui/ProjectCard/ProjectCard';
import { PageHero } from '../../components/ui/PageHero/PageHero';
import { projects } from '../../data/projects';
import { useSeo } from '../../hooks/useSeo';
import type { Project } from '../../types';
import './Projetos.css';

export default function Projetos() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'todos' | 'pessoal' | 'real'>('todos');

  useSeo({
    title: t('seo.projectsTitle'),
    description: t('seo.projectsDesc'),
    path: '/projetos',
  });

  const personal = projects.filter((p) => p.category === 'pessoal');
  const real = projects.filter((p) => p.category === 'real');

  const sections: { key: 'pessoal' | 'real'; items: Project[]; icon: React.ReactNode }[] = [
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

          <div className="projects-filter-container">
            {(['todos', 'pessoal', 'real'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
              >
                {t(`projects.categories.${f === 'todos' ? 'all' : f === 'pessoal' ? 'personal' : 'real'}`)}
              </button>
            ))}
          </div>

          {visible.map((s) => (
            <section key={s.key} className="projects-section">
              <div className="projects-section-header">
                <span className="projects-section-icon">{s.icon}</span>
                <h2 className="projects-section-title">
                  {t(`projects.sections.${s.key === 'pessoal' ? 'personal' : 'real'}`)}
                </h2>
                <span className="projects-section-count">{s.items.length}</span>
              </div>
              <div className="projects-grid">
                {s.items.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          ))}

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
