import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { IconType } from 'react-icons';
import {
  FiArrowLeft, FiArrowRight, FiCheck, FiCircle, FiClock, FiCloud, FiCode, FiCpu,
  FiDatabase, FiExternalLink, FiGithub, FiHardDrive, FiLayers, FiLink, FiMessageCircle, FiMonitor, FiServer,
  FiTablet, FiUser, FiUsers,
} from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import { TechGlyph, hasTechIcon } from '../../components/ui/TechIcon/TechIcon';
import { projects } from '../../data/projects';
import { LAST_PROJECT_KEY, writeStorage } from '../../hooks/useLocalStorage';
import { useSeo } from '../../hooks/useSeo';
import type { ArchitectureIcon, Project } from '../../types';
import { projectOgImage, projectSeoDescription, projectSeoTitle } from '../../utils/projectSeo';
import { ProjectCarousel } from '../../components/ui/ProjectCarousel/ProjectCarousel';
import './ProjetoDetalhe.css';

const LAYER_ICONS: Record<ArchitectureIcon, IconType> = {
  client: FiMonitor,
  device: FiTablet,
  server: FiServer,
  api: FiCode,
  queue: FiLayers,
  ai: FiCpu,
  database: FiDatabase,
  storage: FiHardDrive,
  cloud: FiCloud,
  integration: FiLink,
};

/** Iniciais do título para o monograma (fallback quando não há screenshot/logo). */
function projectInitials(title: string): string {
  const words = title.replace(/[—–-].*$/, '').trim().split(/\s+/).filter(Boolean);
  return (words.slice(0, 2).map((w) => w[0]).join('') || '?').toUpperCase();
}

const sectionNumber = (i: number) => String(i + 1).padStart(2, '0');

/** Seção do sumário que cruza a faixa entre 20% e 30% da altura da tela. */
function useActiveSection(ids: string[]): string | undefined {
  const [active, setActive] = useState<string>();
  const key = ids.join('|');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    for (const id of key.split('|')) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [key]);

  return active;
}

interface CaseSection {
  id: string;
  label: string;
  body: ReactNode;
}

/** Corpo do detalhe na ordem do README: sumário lateral + seções numeradas. */
function CaseStudy({ project }: { project: Project }) {
  const { t } = useTranslation();
  const cs = project.caseStudy!;
  const metrics = project.metrics ?? [];
  const sections: CaseSection[] = [];

  sections.push({
    id: 'visao-geral',
    label: t('projectDetail.overview'),
    body: (
      <>
        <div className="pd-overview">
          {cs.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {cs.audiences && cs.audiences.length > 0 && (
          <div className="pd-block">
            <h3 className="pd-subtitle">{t('projectDetail.audiences')}</h3>
            <ul className="pd-audiences">
              {cs.audiences.map((a) => (
                <li key={a.who} className="pd-audience">
                  <strong>{a.who}</strong>
                  <span>{a.goal}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    ),
  });

  const steps = [
    { key: 'challenge', label: t('projectDetail.challenge'), text: cs.challenge },
    { key: 'solution', label: t('projectDetail.solution'), text: cs.solution },
    { key: 'result', label: t('projectDetail.result'), text: cs.result },
  ];
  sections.push({
    id: 'problema-resultado',
    label: t('projectDetail.story'),
    body: (
      <ol className="pd-steps">
        {steps.map((step, i) => (
          <li key={step.key} className={`pd-step${step.key === 'result' ? ' is-result' : ''}`}>
            <span className="pd-step-marker" aria-hidden="true">{i + 1}</span>
            <div className="pd-step-body">
              <h3 className="pd-eyebrow">{step.label}</h3>
              <p>{step.text}</p>
              {step.key === 'result' && metrics.length > 0 && (
                <dl className="pd-metrics">
                  {metrics.map((m) => (
                    <div key={m.label} className="pd-metric">
                      <dt>{m.value}</dt>
                      <dd>{m.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </li>
        ))}
      </ol>
    ),
  });

  if (project.role) {
    const { role } = project;
    sections.push({
      id: 'meu-papel',
      label: t('projectDetail.myRole'),
      body: (
        <div className="pd-role-grid">
          <div className="pd-card is-accent">
            <h3 className="pd-card-title">{t('projectDetail.roleMine')}</h3>
            <ul className="pd-checklist">
              {role.mine.map((item) => (
                <li key={item}><FiCheck size={16} aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
          {role.team && role.team.length > 0 && (
            <div className="pd-card">
              <h3 className="pd-card-title">{t('projectDetail.roleTeam')}</h3>
              <ul className="pd-checklist is-muted">
                {role.team.map((item) => (
                  <li key={item}><FiUsers size={15} aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    });
  }

  if (cs.features.length > 0) {
    sections.push({
      id: 'funcionalidades',
      label: t('projectDetail.features'),
      body: (
        <div className={`pd-feature-groups${cs.features.length % 2 === 0 ? ' is-pairs' : ''}`}>
          {cs.features.map((group, gi) => (
            <div key={group.title ?? gi} className="pd-card">
              {group.title && <h3 className="pd-card-title">{group.title}</h3>}
              <ul className="pd-checklist">
                {group.items.map((item) => (
                  <li key={item}><FiCheck size={16} aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    });
  }

  sections.push({
    id: 'arquitetura',
    label: t('projectDetail.architecture'),
    body: (
      <>
        <ol className="pd-arch" style={{ '--layers': cs.architecture.layers.length } as React.CSSProperties}>
          {cs.architecture.layers.map((layer) => {
            const Icon = LAYER_ICONS[layer.icon];
            return (
              <li key={layer.label} className="pd-arch-node">
                <span className="pd-arch-icon"><Icon size={20} aria-hidden="true" /></span>
                <strong>{layer.label}</strong>
                <small>{layer.detail}</small>
              </li>
            );
          })}
        </ol>
        {cs.architecture.highlights && cs.architecture.highlights.length > 0 && (
          <div className="pd-block">
            <h3 className="pd-subtitle">{t('projectDetail.highlights')}</h3>
            <ul className="pd-bullets">
              {cs.architecture.highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
      </>
    ),
  });

  if (cs.decisions.length > 0) {
    sections.push({
      id: 'decisoes',
      label: t('projectDetail.decisions'),
      body: (
        <dl className="pd-decisions">
          {cs.decisions.map((d) => (
            <div key={d.topic} className="pd-decision">
              <dt>{d.topic}</dt>
              <dd>
                <strong>{d.choice}</strong>
                <p><span className="pd-sr-only">{t('projectDetail.decisionWhy')}: </span>{d.why}</p>
              </dd>
            </div>
          ))}
        </dl>
      ),
    });
  }

  if (cs.stack.length > 0) {
    sections.push({
      id: 'stack',
      label: t('projectDetail.stack'),
      body: (
        <table className="pd-stack-table">
          <thead>
            <tr>
              <th scope="col">{t('projectDetail.stackTech')}</th>
              <th scope="col">{t('projectDetail.stackRole')}</th>
            </tr>
          </thead>
          <tbody>
            {cs.stack.map((s) => (
              <tr key={s.name}>
                <th scope="row">
                  <span className="pd-stack-name">
                    {hasTechIcon(s.name)
                      ? <TechGlyph name={s.name} size={18} />
                      : <span className="pd-stack-dot" aria-hidden="true" />}
                    {s.name}
                  </span>
                </th>
                <td>{s.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    });
  }

  if (cs.roadmap && cs.roadmap.length > 0) {
    sections.push({
      id: 'proximos-passos',
      label: t('projectDetail.roadmap'),
      body: (
        <ul className="pd-roadmap">
          {cs.roadmap.map((item) => (
            <li key={item}><FiCircle size={14} aria-hidden="true" />{item}</li>
          ))}
        </ul>
      ),
    });
  }

  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <div className="pd-body">
      <nav className="pd-toc" aria-label={t('projectDetail.toc')}>
        <span className="pd-toc-title">{t('projectDetail.toc')}</span>
        <ol>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={active === s.id ? 'is-active' : undefined}
                aria-current={active === s.id ? 'location' : undefined}
              >
                <span className="pd-toc-index">{sectionNumber(i)}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="pd-content">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="pd-section reveal-on-scroll" aria-labelledby={`${s.id}-title`}>
            <header className="pd-section-head">
              <span className="pd-section-index" aria-hidden="true">{sectionNumber(i)}</span>
              <h2 id={`${s.id}-title`}>{s.label}</h2>
            </header>
            {s.body}
          </section>
        ))}
      </div>
    </div>
  );
}

export default function ProjetoDetalhe() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id || p.slug === id);
  // Mesmas funções do prerender (src/config/prerender.ts).
  useSeo({
    title: project ? projectSeoTitle(project) : t('seo.notFoundTitle'),
    description: project ? projectSeoDescription(project) : t('seo.notFoundDesc'),
    path: `/projetos/${project?.slug ?? id ?? ''}`,
    image: project ? projectOgImage(project.slug ?? project.id) : undefined,
    noindex: !project,
  });

  // Rolagem ao trocar de projeto fica com o ScrollToTop (topo ou posição salva ao voltar).

  useEffect(() => {
    if (project) writeStorage(LAST_PROJECT_KEY, project.id);
  }, [project]);

  if (!project) {
    return (
      <main className="page-projeto-detalhe">
        <div className="container pd-notfound">
          <h1>{t('projectDetail.notFoundTitle')}</h1>
          <p>{t('projectDetail.notFoundText')}</p>
          <Button href="/projetos" variant="secondary">
            <FiArrowLeft size={18} />
            {t('projectDetail.back')}
          </Button>
        </div>
      </main>
    );
  }

  const title = project.title || 'Projeto em atualização';
  const lead = project.shortDescription || project.description || 'Descrição em atualização.';
  const techs = project.technologies?.length ? project.technologies : project.stack ?? [];
  const heroTechs = techs.slice(0, 6);
  const extraTechs = Math.max(0, techs.length - heroTechs.length);
  const github = project.github || 'https://github.com/Victorkaue333';

  // Próximo projeto na ordem de data/projects.ts, dando a volta no fim.
  const index = projects.indexOf(project);
  const nextProject = projects[(index + 1) % projects.length];

  const facts = [
    project.role && { key: 'role', icon: <FiUser size={15} />, label: t('projectDetail.myRole'), value: project.role.title },
    project.teamSize && {
      key: 'team',
      icon: <FiUsers size={15} />,
      label: t('projectDetail.team'),
      value: t('projectDetail.teamSize', { count: project.teamSize }),
    },
    project.duration && { key: 'duration', icon: <FiClock size={15} />, label: t('projectDetail.duration'), value: project.duration },
  ].filter(Boolean) as { key: string; icon: React.ReactNode; label: string; value: string }[];

  const hasShots = !!project.screenshots && project.screenshots.length > 0;
  const isPlaceholder = !project.image || project.image.includes('placeholder');

  return (
    <main className="page-projeto-detalhe">
      <div className="container">
        <Link to="/projetos" className="back-link">
          <FiArrowLeft size={18} />
          {t('projectDetail.back')}
        </Link>

        {/* ===== HERO ===== */}
        <section className="pd-hero">
          <div className="pd-hero-text">
            <div className="pd-badges">
              <span className="project-category-badge">
                {project.category === 'pessoal'
                  ? t('projectDetail.categoryPersonal')
                  : t('projectDetail.categoryReal')}
              </span>
              {project.status && (
                <span className={`pd-status is-${project.status}`}>
                  <span className="pd-status-dot" aria-hidden="true" />
                  {t(`projectDetail.status.${project.status}`)}
                </span>
              )}
            </div>
            <h1>{title}</h1>
            <p className="pd-lead">{lead}</p>

            <div className="pd-stack">
              {heroTechs.map((tech) => (
                <span className="pd-stack-chip" key={tech}>
                  <TechGlyph name={tech} size={18} />
                  <span>{tech}</span>
                </span>
              ))}
              {extraTechs > 0 && <span className="pd-stack-chip pd-stack-more">+{extraTechs}</span>}
            </div>

            {facts.length > 0 && (
              <dl className="pd-facts">
                {facts.map((f) => (
                  <div key={f.key} className="pd-fact">
                    <dt>{f.icon}{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="pd-actions">
              <Button href={github} target="_blank" rel="noopener noreferrer" variant="secondary">
                <FiGithub size={18} />
                {t('projectDetail.viewCode')}
              </Button>
              {project.online && (
                <Button href={project.online} target="_blank" rel="noopener noreferrer" variant="primary">
                  <FiExternalLink size={18} />
                  {t('projectDetail.viewOnline')}
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* ===== SHOWCASE (visual full-width, entre texto e história) ===== */}
        <section className="pd-showcase reveal-on-scroll">
          <div className="pd-showcase-inner">
            <div className="pd-visual-glow" aria-hidden="true" />
            {hasShots ? (
              <ProjectCarousel images={project.screenshots!} title={title} />
            ) : isPlaceholder ? (
              <div className="pd-monogram" aria-hidden="true">{projectInitials(title)}</div>
            ) : (
              <div className="pd-logo-frame">
                <img src={project.image} alt={title} loading="lazy" />
              </div>
            )}
          </div>
        </section>

        {project.caseStudy && <CaseStudy project={project} />}

        {/* ===== CTA DE FECHAMENTO ===== */}
        <section className="pd-cta reveal-on-scroll">
          <div className="pd-cta-text">
            <h2>{t('projectDetail.ctaTitle')}</h2>
            <p>{t('projectDetail.ctaText')}</p>
          </div>
          <div className="pd-cta-actions">
            <Button href="/contato" variant="primary">
              <FiMessageCircle size={18} />
              {t('projectDetail.talkAbout')}
            </Button>
            {project.online ? (
              <Button href={project.online} target="_blank" rel="noopener noreferrer" variant="secondary">
                <FiExternalLink size={18} />
                {t('projectDetail.viewOnline')}
              </Button>
            ) : (
              <Button href={github} target="_blank" rel="noopener noreferrer" variant="secondary">
                <FiGithub size={18} />
                {t('projectDetail.viewCode')}
              </Button>
            )}
          </div>
        </section>

        {nextProject && nextProject !== project && (
          <Link to={nextProject.detailPath} className="pd-next">
            <span className="pd-next-label">{t('projectDetail.nextProject')}</span>
            <span className="pd-next-title">
              {nextProject.title}
              <FiArrowRight size={22} aria-hidden="true" />
            </span>
            <span className="pd-next-desc">{nextProject.shortDescription || nextProject.description}</span>
          </Link>
        )}
      </div>
    </main>
  );
}
