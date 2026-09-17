import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiArrowLeft, FiArrowRight, FiCheckCircle, FiClock, FiCpu, FiDatabase,
  FiExternalLink, FiGithub, FiLayout, FiUser, FiUsers,
} from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import { TechGlyph } from '../../components/ui/TechIcon/TechIcon';
import { projects } from '../../data/projects';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useSeo } from '../../hooks/useSeo';
import { ProjectCarousel } from '../../components/ui/ProjectCarousel/ProjectCarousel';
import './ProjetoDetalhe.css';

/** Iniciais do título para o monograma (fallback quando não há screenshot/logo). */
function projectInitials(title: string): string {
  const words = title.replace(/[—–-].*$/, '').trim().split(/\s+/).filter(Boolean);
  return (words.slice(0, 2).map((w) => w[0]).join('') || '?').toUpperCase();
}

export default function ProjetoDetalhe() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id || p.slug === id);
  useScrollReveal();

  useSeo({
    title: project ? `${project.title} — Victor Kauê` : t('seo.notFoundTitle'),
    description: project ? (project.shortDescription || project.description) : t('seo.notFoundDesc'),
    path: `/projetos/${id ?? ''}`,
    image: project?.image,
    noindex: !project,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  const detailed = project.detailed_info;
  const title = project.title || 'Projeto em atualização';
  const lead = project.shortDescription || project.description || 'Descrição em atualização.';
  const techs = project.technologies?.length ? project.technologies : project.stack ?? [];
  const heroTechs = techs.slice(0, 6);
  const extraTechs = Math.max(0, techs.length - heroTechs.length);
  const github = project.github || 'https://github.com/Victorkaue333';

  // Próximo projeto na ordem de data/projects.ts, dando a volta no fim.
  const index = projects.indexOf(project);
  const nextProject = projects[(index + 1) % projects.length];

  const metrics = project.metrics ?? [];
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

  const story = detailed
    ? [
        { key: 'challenge', label: t('projectDetail.challenge'), text: detailed.desafio },
        { key: 'solution', label: t('projectDetail.solution'), text: detailed.solucao },
        { key: 'impact', label: t('projectDetail.impact'), text: detailed.impacto },
      ]
    : [];

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
            <span className="project-category-badge">
              {project.category === 'pessoal'
                ? t('projectDetail.categoryPersonal')
                : t('projectDetail.categoryReal')}
            </span>
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

        {detailed && (
          <>
            {/* ===== HISTÓRIA (Desafio → Solução → Impacto) ===== */}
            <section className="pd-story reveal-on-scroll">
              {story.map((s) => (
                <article
                  key={s.key}
                  className={`pd-story-item ${s.key === 'impact' ? 'is-impact' : ''}`}
                >
                  <span className="pd-eyebrow">{s.label}</span>
                  <p className="pd-story-text">{s.text}</p>
                  {s.key === 'impact' && metrics.length > 0 && (
                    <dl className="pd-metrics">
                      {metrics.map((m) => (
                        <div key={m.label} className="pd-metric">
                          <dt>{m.value}</dt>
                          <dd>{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </article>
              ))}
            </section>

            {/* ===== MEU PAPEL (só com dado real em `role`) ===== */}
            {project.role && (
              <section className="pd-section pd-role reveal-on-scroll">
                <h2 className="pd-section-title">{t('projectDetail.myRole')}</h2>
                <div className="pd-role-grid">
                  <div className="pd-role-col is-mine">
                    <h3 className="pd-subtitle">{t('projectDetail.roleMine')}</h3>
                    <ul>
                      {project.role.mine.map((item) => (
                        <li key={item}><FiCheckCircle size={15} aria-hidden="true" />{item}</li>
                      ))}
                    </ul>
                  </div>
                  {project.role.team && project.role.team.length > 0 && (
                    <div className="pd-role-col">
                      <h3 className="pd-subtitle">{t('projectDetail.roleTeam')}</h3>
                      <ul>
                        {project.role.team.map((item) => (
                          <li key={item}><FiUsers size={15} aria-hidden="true" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ===== FEATURES ===== */}
            {project.features && project.features.length > 0 && (
              <section className="pd-section reveal-on-scroll">
                <h2 className="pd-section-title">{t('projectDetail.features')}</h2>
                <div className="features-list-grid">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="feature-item-detail">
                      <FiCheckCircle size={16} className="feature-check" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ===== SOB O CAPÔ (técnico, secundário) ===== */}
            <section className="pd-tech-block reveal-on-scroll">
              <h2 className="pd-section-title">{t('projectDetail.projectDetails')}</h2>

              <div className="pd-subsection">
                <h3 className="pd-subtitle">{t('projectDetail.architecture')}</h3>
                <div className="architecture-flow">
                  <div className="arch-node">
                    <div className="node-icon"><FiLayout size={24} /></div>
                    <span>{t('projectDetail.frontend')}</span>
                    <small>{detailed.arquitetura.frontend}</small>
                  </div>
                  <div className="arch-arrow"><FiArrowRight size={24} /></div>
                  <div className="arch-node">
                    <div className="node-icon"><FiCpu size={24} /></div>
                    <span>{t('projectDetail.apiBackend')}</span>
                    <small>{detailed.arquitetura.api}</small>
                  </div>
                  <div className="arch-arrow"><FiArrowRight size={24} /></div>
                  <div className="arch-node">
                    <div className="node-icon"><FiDatabase size={24} /></div>
                    <span>{t('projectDetail.database')}</span>
                    <small>{detailed.arquitetura.banco}</small>
                  </div>
                </div>
              </div>

              <div className="pd-subsection">
                <h3 className="pd-subtitle">{t('projectDetail.stackDecisions')}</h3>
                <div className="decisions-grid">
                  <div className="decision-item">
                    <span className="decision-label">{t('projectDetail.authLabel')}:</span> {detailed.decisoes.autenticacao}
                  </div>
                  <div className="decision-item">
                    <span className="decision-label">{t('projectDetail.backendLabel')}:</span> {detailed.decisoes.backend}
                  </div>
                  <div className="decision-item">
                    <span className="decision-label">{t('projectDetail.deployLabel')}:</span> {detailed.decisoes.deploy}
                  </div>
                  <div className="decision-item">
                    <span className="decision-label">{t('projectDetail.dbLabel')}:</span> {detailed.decisoes.banco}
                  </div>
                </div>
              </div>

              <div className="pd-subsection">
                <h3 className="pd-subtitle">{t('projectDetail.techUsed')}</h3>
                <div className="tech-v2-grid">
                  {detailed.tech_v2.map((tech) => (
                    <div className="tech-card-v2" key={tech.name}>
                      <TechGlyph name={tech.name} size={26} />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <div className="pd-final-cta">
          {project.online ? (
            <Button href={project.online} target="_blank" rel="noopener noreferrer" variant="primary">
              {t('projectDetail.accessFull')}
              <FiExternalLink size={20} />
            </Button>
          ) : (
            <Button href="/contato" variant="primary">
              {t('projectDetail.talkAbout')}
              <FiCheckCircle size={20} />
            </Button>
          )}
        </div>

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
