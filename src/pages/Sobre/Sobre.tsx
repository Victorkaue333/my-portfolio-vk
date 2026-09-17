import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiBookOpen, FiBriefcase, FiCalendar, FiChevronRight, FiCode, FiMail, FiMapPin, FiTarget } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa6';
import { SiGithub } from 'react-icons/si';
import { Button } from '../../components/ui/Button/Button';
import { GithubActivity } from '../../components/ui/GithubActivity/GithubActivity';
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher/LanguageSwitcher';
import { TechGlyph } from '../../components/ui/TechIcon/TechIcon';
import { TechMarquee } from '../../components/ui/TechMarquee/TechMarquee';
import { Timeline } from '../../components/ui/Timeline/Timeline';
import { Terminal } from '../../components/ui/Terminal/Terminal';
import { GlowingEffect } from '../../components/ui/GlowingEffect/GlowingEffect';
import { education } from '../../data/education';
import { experiences } from '../../data/experiences';
import { expertise } from '../../data/expertise';
import { socialLinks } from '../../data/social';
import { usePageSeo } from '../../hooks/useSeo';
import type { ExperienceRole } from '../../types';
import './Sobre.css';

/**
 * Rótulo curto da timeline: "jun 2026 - o momento" vira "jun 2026".
 * Sem inventar data — só corta o intervalo no primeiro separador.
 */
function shortPeriod(period: string): string {
  return period.split(/\s+[-–—]\s+/)[0]?.trim() || period;
}

/**
 * Linha `stack` do terminal: as primeiras linguagens e os primeiros
 * frameworks de `data/expertise.ts`, na ordem em que estão lá. Derivado dos
 * dados de propósito — nada de lista escrita à mão que possa divergir da
 * faixa de tecnologias logo abaixo.
 */
const terminalStack = [
  ...(expertise[0]?.items ?? []).slice(0, 4),
  ...(expertise[1]?.items ?? []).slice(0, 3),
]
  .map((item) => item.name)
  .join(' · ');

/** Monograma (iniciais) para empresas sem logo. Ignora conectivos e sufixos após "—" ou parênteses. */
function companyInitials(name: string): string {
  const stop = new Set(['do', 'de', 'da', 'dos', 'das', 'e']);
  const clean = name.replace(/[—–-].*$/, '').replace(/\(.*?\)/g, '').trim();
  const words = clean.split(/\s+/).filter((w) => w && !stop.has(w.toLowerCase()));
  return (words.slice(0, 2).map((w) => w[0]).join('') || name[0] || '?').toUpperCase();
}

/** Corpo de um cargo: descrição + atividades + chips de skills. */
function ExperienceBody({ role }: { role: ExperienceRole }) {
  return (
    <>
      {role.description && <p className="li-exp-desc">{role.description}</p>}
      {role.activities && role.activities.length > 0 && (
        <ul className="li-exp-acts">
          {role.activities.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      )}
      {role.skills && role.skills.length > 0 && (
        <div className="li-exp-skills">
          {role.skills.map((s) => (
            <span className="li-exp-skill" key={s}>
              <TechGlyph name={s} size={13} className="li-exp-skill-icon" />
              {s}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

export default function Sobre() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('intro');
  usePageSeo('about');

  // O scroll-spy desta página troca `activeSection` durante a rolagem, então
  // Sobre re-renderiza bastante. Sem memo, as saídas do terminal virariam um
  // objeto novo a cada quadro e o efeito que imprime as linhas reiniciaria o
  // próprio timer — a digitação travava enquanto a pessoa rolasse.
  const terminalOutputs = useMemo(
    () => ({
      0: ['Victor Kauê'],
      1: [`${t('hero.role')} ${t('hero.tech')}`],
      2: [
        [
          t('about.highlights.backend'),
          t('about.highlights.api'),
          t('about.highlights.enterprise'),
        ].join(' · '),
      ],
      3: [terminalStack],
    }),
    [t],
  );
  const terminalCommands = useMemo(() => ['whoami', 'role', 'focus', 'stack'], []);

  const menuItems = [
    { id: 'intro', label: t('about.title'), icon: <FiTarget size={16} /> },
    { id: 'role', label: t('about.highlights.title'), icon: <FiBriefcase size={16} /> },
    { id: 'experience', label: 'Experiência', icon: <FiBriefcase size={16} /> },
    { id: 'education', label: 'Formação', icon: <FiBookOpen size={16} /> },
    { id: 'expertise', label: 'Expertise técnica', icon: <FiCode size={16} /> },
    { id: 'github', label: 'GitHub', icon: <SiGithub size={16} aria-hidden="true" /> },
  ];

  // Scroll-spy: ativa a última seção cujo topo já passou da linha de leitura
  // (35% da viewport). No fim da página força a última, que pode ser curta
  // demais para alcançar a linha.
  useEffect(() => {
    const ids = menuItems.map((item) => item.id);
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = ids[0] ?? 'intro';
      if (atBottom) {
        current = ids[ids.length - 1] ?? current;
      } else {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="page-sobre">
      <div className="container">
        <div className="about-layout">
          <aside className="about-sidebar">
            <div className="sidebar-sticky">
              <div className="profile-card reveal-on-scroll">
                <div className="profile-image-container">
                  <div className="profile-glow" aria-hidden="true" />
                  <img src="/images/eu/victor.webp" alt="Victor Kauê" className="profile-photo" />
                </div>

                <h1 className="sidebar-name">Victor Kauê</h1>
                <h2 className="sidebar-role">Desenvolvedor Full Stack</h2>

                <div className="sidebar-pills">
                  <div className="sidebar-pill">
                    <FiMapPin size={14} />
                    <span>Itacuruba, PE - Brasil</span>
                  </div>
                </div>

                <LanguageSwitcher variant="segmented" />

                <nav className="sidebar-nav">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <span className="nav-dot" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <div className="about-main-content">
            <div className="content-header reveal-on-scroll">
              <a href="https://wa.me/5587981774951" target="_blank" rel="noopener noreferrer" className="header-cta">
                <FiCalendar size={16} />
                Agendar uma chamada
                <FiChevronRight size={16} />
              </a>
              <h2 className="main-title">Victor Kauê</h2>
              <h3 className="main-subtitle">Desenvolvedor Full Stack</h3>

              <div className="socials-list">
                {socialLinks.filter((s) => ['GitHub', 'LinkedIn', 'Email'].includes(s.name)).map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="social-btn">
                    {link.name === 'GitHub' && <SiGithub size={16} aria-hidden="true" />}
                    {link.name === 'LinkedIn' && <FaLinkedin size={16} aria-hidden="true" />}
                    {link.name === 'Email' && <FiMail size={16} />}
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <section id="intro" className="about-content-section reveal-on-scroll">
              <p className="intro-text">{t('about.intro')}</p>
            </section>

            <section id="role" className="about-content-section reveal-on-scroll">
              <h2 className="section-title">
                <FiTarget size={24} />
                {t('about.highlights.title')}
              </h2>
              {/* Glowing Effect nos diferenciais — mesmo tratamento dos cards
                  equivalentes na Home. Conteúdo, tamanho e grade intactos. */}
              <div className="diferenciais-grid">
                {(['backend', 'api', 'enterprise'] as const).map((key) => (
                  <div className="diferencial-card" key={key}>
                    <GlowingEffect spread={30} proximity={56} borderWidth={1.5} />
                    <h3>{t(`about.highlights.${key}`)}</h3>
                    <p>{t(`about.highlights.${key}Desc`)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="experience" className="about-content-section">
              <h2 className="section-title reveal-on-scroll">
                <FiBriefcase size={24} />
                Experiência Profissional
              </h2>
              {/* Timeline (Aceternity) alimentada por data/experiences.ts —
                  nenhum texto, empresa ou data foi criado aqui; o rótulo da
                  linha é o início do período do cargo mais recente. O card de
                  cada empresa continua sendo o mesmo `.li-exp-item`. */}
              <Timeline
                className="exp-timeline"
                data={experiences.flatMap((group) => {
                  const multi = group.roles.length > 1;
                  const primary = group.roles[0];
                  if (!primary) return [];
                  return [{
                    id: group.id,
                    title: shortPeriod(primary.period),
                    content: (
                    <article className="li-exp-item" key={group.id}>
                      <div className="li-exp-head">
                        <div className="li-exp-logo">
                          {group.logo ? (
                            <img src={group.logo} alt={group.company} loading="lazy" decoding="async" />
                          ) : (
                            <span className="li-exp-monogram">{companyInitials(group.company)}</span>
                          )}
                        </div>
                        <div className="li-exp-head-text">
                          {multi ? (
                            <>
                              <h3 className="li-exp-primary">{group.company}</h3>
                              <p className="li-exp-secondary">
                                {[group.employmentType, group.totalDuration].filter(Boolean).join(' · ')}
                              </p>
                              {group.location && <p className="li-exp-muted">{group.location}</p>}
                            </>
                          ) : (
                            (() => {
                              const r = primary;
                              const locLine = [r.location, r.workMode].filter(Boolean).join(' · ');
                              return (
                                <>
                                  <h3 className="li-exp-primary">{r.title}</h3>
                                  <p className="li-exp-secondary">
                                    {[group.company, r.employmentType].filter(Boolean).join(' · ')}
                                  </p>
                                  <p className="li-exp-muted">
                                    {[r.period, r.duration].filter(Boolean).join(' · ')}
                                  </p>
                                  {locLine && <p className="li-exp-muted">{locLine}</p>}
                                </>
                              );
                            })()
                          )}
                        </div>
                      </div>

                      {multi ? (
                        <div className="li-exp-roles">
                          {group.roles.map((r, ri) => (
                            <div className="li-exp-role" key={ri}>
                              <span className="li-exp-role-dot" />
                              <h4 className="li-exp-role-title">{r.title}</h4>
                              <p className="li-exp-muted">
                                {[r.period, r.duration].filter(Boolean).join(' · ')}
                              </p>
                              <ExperienceBody role={r} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="li-exp-body">
                          <ExperienceBody role={primary} />
                        </div>
                      )}
                    </article>
                    ),
                  }];
                })}
              />
            </section>

            <section id="education" className="about-content-section">
              <h2 className="section-title reveal-on-scroll">
                <FiBookOpen size={24} />
                Formações
              </h2>
              <Timeline
                className="edu-timeline"
                data={education.map((edu) => ({
                  id: edu.id,
                  title: shortPeriod(edu.period),
                  content: (
                    <div className="education-item-row">
                      <div className="edu-icon"><FiBookOpen size={20} /></div>
                      <div className="edu-info">
                        <h3>{edu.course}</h3>
                        <p>{edu.institution} - {edu.period}</p>
                      </div>
                    </div>
                  ),
                }))}
              />
            </section>

            <section id="expertise" className="about-content-section reveal-on-scroll">
              <h2 className="section-title">
                <FiCode size={24} />
                Expertise técnica
              </h2>
              {/* Terminal (Aceternity) — tudo que ele imprime sai de dados que
                  já existem: nome da página, papel do hero, os três
                  diferenciais e a stack de data/expertise.ts. Sem som: o
                  `useAudio` do componente oficial foi removido. */}
              <div className="expertise-terminal">
                <Terminal
                  label={t('about.terminalLabel')}
                  commands={terminalCommands}
                  outputs={terminalOutputs}
                />
              </div>
              <TechMarquee />
            </section>

            <section id="github" className="about-content-section reveal-on-scroll">
              <h2 className="section-title">
                <SiGithub size={24} aria-hidden="true" />
                {t('github.title')}
              </h2>
              <GithubActivity />
            </section>

            <div className="view-more-action">
              <Button href="/projetos" variant="primary">
                Ver meus projetos
                <FiChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
