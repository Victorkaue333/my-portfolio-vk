import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiArrowRight, FiBookOpen, FiBriefcase, FiCalendar, FiChevronRight, FiCode, FiCompass, FiDownload,
  FiLayers, FiMail, FiMapPin, FiMessageCircle, FiStar, FiTarget, FiUser,
} from 'react-icons/fi';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa6';
import { SiGithub } from 'react-icons/si';
import { Button } from '../../components/ui/Button/Button';
import { CodeWindow } from '../../components/ui/CodeWindow/CodeWindow';
import { GithubActivity } from '../../components/ui/GithubActivity/GithubActivity';
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher/LanguageSwitcher';
import { TechGlyph } from '../../components/ui/TechIcon/TechIcon';
import { TechMarquee } from '../../components/ui/TechMarquee/TechMarquee';
import { Timeline } from '../../components/ui/Timeline/Timeline';
import { Spotify } from '../../components/ui/Spotify/Spotify';
import { Terminal } from '../../components/ui/Terminal/Terminal';
import { createTerminalResolver } from '../../components/ui/Terminal/commands';
import { cvFor } from '../../config/cv';
import { education } from '../../data/education';
import { experiences } from '../../data/experiences';
import { expertise } from '../../data/expertise';
import { projects, projectsByExperience } from '../../data/projects';
import { socialLinks } from '../../data/social';
import { useLanguage } from '../../hooks/useLanguage';
import { usePageSeo } from '../../hooks/useSeo';
import type { ExperienceGroup, ExperienceRole, Project } from '../../types';
import { formatDuration, formatParsed, formatPeriod, formatStart, parsePeriod, periodMonths, spanOf } from '../../utils/period';
import './Sobre.css';

/**
 * Linha `stack` do terminal: os primeiros itens de backend e frontend de
 * `data/expertise.ts`, na ordem em que estão lá. Derivado dos dados de
 * propósito — nada de lista escrita à mão que possa divergir da página.
 */
const terminalStack = [
  ...(expertise[0]?.items ?? []).slice(0, 4),
  ...(expertise[1]?.items ?? []).slice(0, 3),
]
  .map((item) => item.name)
  .join(' · ');

/** Experiências de maior peso técnico (ids de data/experiences.ts → chave `about.featured.*`). */
const FEATURED = [
  { id: 'caji-solutions', key: 'caji' },
  { id: 'if-sertao', key: 'ifSertao' },
  { id: 'ntidi', key: 'ntidi' },
  { id: 'gre-estagio', key: 'gre' },
] as const;

/** "Como trabalho": cada etapa aponta para o case em que ela aparece de forma concreta. */
const APPROACH = [
  { key: 'requirements', project: 'agendeaqui' },
  { key: 'design', project: 'mav-imob' },
  { key: 'build', project: 'caji-agent' },
  { key: 'test', project: 'touch-speaker' },
  { key: 'ship', project: 'sertao-conecta' },
  { key: 'evolve', project: 'suplastock' },
] as const;

/** Projetos acadêmicos, de extensão e pesquisa — o rótulo diz a natureza do vínculo. */
const ACADEMIC = [
  { project: 'sertao-conecta', kind: 'extension' },
  { project: 'maratonatech', kind: 'extension' },
  { project: 'sigref', kind: 'internship' },
  { project: 'saberes-interculturais', kind: 'research' },
  { project: 'agendeaqui', kind: 'course' },
] as const;

/** Valores em pt-BR nos dados → chave do i18n. Valor desconhecido aparece como está. */
const EMPLOYMENT_KEYS: Record<string, string> = {
  'Tempo integral': 'fullTime',
  Freelance: 'freelance',
  'Autônomo': 'selfEmployed',
  'Estágio': 'internship',
  'Temporário': 'temporary',
};
const WORK_MODE_KEYS: Record<string, string> = {
  Remoto: 'remote',
  'Híbrido': 'hybrid',
  Presencial: 'onSite',
};

const projectById = (id: string): Project | undefined => projects.find((p) => p.id === id);

/** Monograma (iniciais) para empresas sem logo. Ignora conectivos e sufixos após "—" ou parênteses. */
function companyInitials(name: string): string {
  const stop = new Set(['do', 'de', 'da', 'dos', 'das', 'e']);
  const clean = name.replace(/[—–-].*$/, '').replace(/\(.*?\)/g, '').trim();
  const words = clean.split(/\s+/).filter((w) => w && !stop.has(w.toLowerCase()));
  return (words.slice(0, 2).map((w) => w[0]).join('') || name[0] || '?').toUpperCase();
}

/** Período no idioma da página + duração calculada até hoje. */
function usePeriodLabel() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  return (period: string) => {
    const parsed = parsePeriod(period);
    const duration = parsed ? formatDuration(periodMonths(parsed), t) : '';
    return [formatPeriod(period, lang, t), duration].filter(Boolean).join(' · ');
  };
}

function useMetaLabels() {
  const { t } = useTranslation();
  return {
    employment: (v?: string) => (v && EMPLOYMENT_KEYS[v] ? t(`about.employment.${EMPLOYMENT_KEYS[v]}`) : v),
    workMode: (v?: string) => (v && WORK_MODE_KEYS[v] ? t(`about.workMode.${WORK_MODE_KEYS[v]}`) : v),
  };
}

/** Links para os estudos de caso ligados a uma experiência (via `Project.experienceId`). */
function RelatedProjects({ items }: { items: Project[] }) {
  const { t } = useTranslation();
  if (items.length === 0) return null;
  return (
    <div className="li-exp-related">
      <p className="li-exp-stack-label">{t('about.relatedProjects')}</p>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            <Link to={p.detailPath}>
              {p.title}
              <FiArrowRight size={13} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Corpo de um cargo: descrição + atividades + stacks utilizadas. */
function ExperienceBody({ role }: { role: ExperienceRole }) {
  const { t } = useTranslation();

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
        <div className="li-exp-stack">
          <p className="li-exp-stack-label">{t('about.skillsLabel')}</p>
          <div className="li-exp-skills">
            {role.skills.map((s) => (
              <span className="li-exp-skill" key={s}>
                <TechGlyph name={s} size={13} className="li-exp-skill-icon" />
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/** Card de uma empresa na linha do tempo — um ou vários cargos (modelo LinkedIn). */
function ExperienceCard({ group }: { group: ExperienceGroup }) {
  const { t } = useTranslation();
  const periodLabel = usePeriodLabel();
  const meta = useMetaLabels();
  const multi = group.roles.length > 1;
  const primary = group.roles[0]!;
  const related = projectsByExperience(group.id);

  const groupSpan = spanOf(group.roles.map((r) => r.period));
  const totalDuration = groupSpan ? formatDuration(periodMonths(groupSpan), t) : group.totalDuration;

  return (
    <article className="li-exp-item" id={`exp-${group.id}`}>
      <div className="li-exp-head">
        <div className="li-exp-logo">
          {group.logo ? (
            <img src={group.logo} alt={group.company} loading="lazy" decoding="async" />
          ) : (
            <span className="li-exp-monogram" aria-hidden="true">{companyInitials(group.company)}</span>
          )}
        </div>
        <div className="li-exp-head-text">
          {multi ? (
            <>
              <h3 className="li-exp-primary">{group.company}</h3>
              <p className="li-exp-secondary">
                {[meta.employment(group.employmentType), totalDuration].filter(Boolean).join(' · ')}
              </p>
              {group.location && <p className="li-exp-muted">{group.location}</p>}
            </>
          ) : (
            <>
              <h3 className="li-exp-primary">{primary.title}</h3>
              <p className="li-exp-secondary">
                {[group.company, meta.employment(primary.employmentType)].filter(Boolean).join(' · ')}
              </p>
              <p className="li-exp-muted">{periodLabel(primary.period)}</p>
              {(primary.location || primary.workMode) && (
                <p className="li-exp-muted">
                  {[primary.location, meta.workMode(primary.workMode)].filter(Boolean).join(' · ')}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {multi ? (
        <div className="li-exp-roles">
          {group.roles.map((r, ri) => (
            <div className="li-exp-role" key={ri}>
              <span className="li-exp-role-dot" />
              <h4 className="li-exp-role-title">{r.title}</h4>
              <p className="li-exp-muted">{periodLabel(r.period)}</p>
              <ExperienceBody role={r} />
            </div>
          ))}
        </div>
      ) : (
        <div className="li-exp-body">
          <ExperienceBody role={primary} />
        </div>
      )}

      <RelatedProjects items={related} />
    </article>
  );
}

export default function Sobre() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const [activeSection, setActiveSection] = useState('intro');
  const periodLabel = usePeriodLabel();
  usePageSeo('about');

  // O interpretador do terminal: lista fechada de comandos sobre os dados que
  // a página já publica (ver Terminal/commands.tsx). Memoizado porque Sobre
  // re-renderiza a cada passo do scroll-spy.
  const resolveCommand = useMemo(
    () => createTerminalResolver({ t, navigate, pathname }),
    [t, navigate, pathname],
  );

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
    { id: 'intro', label: t('about.nav.intro'), icon: <FiUser size={16} /> },
    { id: 'experience', label: t('about.nav.trajectory'), icon: <FiBriefcase size={16} /> },
    { id: 'featured', label: t('about.nav.featured'), icon: <FiStar size={16} /> },
    { id: 'expertise', label: t('about.nav.specialties'), icon: <FiCode size={16} /> },
    { id: 'approach', label: t('about.nav.approach'), icon: <FiCompass size={16} /> },
    { id: 'education', label: t('about.nav.education'), icon: <FiBookOpen size={16} /> },
    { id: 'github', label: t('about.nav.github'), icon: <SiGithub size={16} aria-hidden="true" /> },
    { id: 'contact', label: t('about.nav.contact'), icon: <FiMessageCircle size={16} /> },
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

  const scrollToSection = (id: string, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior });
    }
  };

  // Links vindos do detalhe de projeto (`/sobre#exp-<id>`): a página é lazy,
  // então o ScrollToTop global não encontra o alvo — rola aqui, já montado.
  useEffect(() => {
    if (hash) scrollToSection(hash.slice(1), 'auto');
  }, [hash]);

  const cv = cvFor(lang);
  const social = (name: string) => socialLinks.find((s) => s.name === name);
  const linkedin = social('LinkedIn');
  const github = social('GitHub');
  const email = social('Email');
  const whatsapp = social('WhatsApp');

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
                <p className="sidebar-role">{t('about.role')}</p>

                <div className="sidebar-pills">
                  <div className="sidebar-pill">
                    <FiMapPin size={14} aria-hidden="true" />
                    <span>Itacuruba, PE - Brasil</span>
                  </div>
                </div>

                <LanguageSwitcher variant="segmented" />

                <nav className="sidebar-nav" aria-label={t('about.title')}>
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                      aria-current={activeSection === item.id ? 'location' : undefined}
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
              {whatsapp && (
                <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="header-cta hbg">
                  <FiCalendar size={16} aria-hidden="true" />
                  {t('about.scheduleCall')}
                  <FiChevronRight size={16} aria-hidden="true" />
                </a>
              )}
              <h2 className="main-title">Victor Kauê</h2>
              <p className="main-subtitle">{t('about.role')}</p>

              <div className="socials-list">
                {[github, linkedin, email].filter(Boolean).map((link) => (
                  <a key={link!.name} href={link!.url} target="_blank" rel="noopener noreferrer" className="social-btn hbg">
                    {link!.name === 'GitHub' && <SiGithub size={16} aria-hidden="true" />}
                    {link!.name === 'LinkedIn' && <FaLinkedin size={16} aria-hidden="true" />}
                    {link!.name === 'Email' && <FiMail size={16} aria-hidden="true" />}
                    {link!.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 1 — Apresentação */}
            <section id="intro" className="about-content-section reveal-on-scroll" aria-labelledby="intro-title">
              <h2 id="intro-title" className="sr-only">{t('about.nav.intro')}</h2>
              <p className="intro-text">{t('about.intro')}</p>
              <p className="intro-text">{t('about.intro2')}</p>
              {/* developer.ts — o mesmo perfil escrito como código. Os valores
                  saem de data/expertise.ts, data/projects.ts e
                  data/experiences.ts; nada é digitado à mão. */}
              <CodeWindow className="intro-code" />
            </section>

            {/* 2 — Trajetória: linha do tempo alimentada por data/experiences.ts.
                Duração calculada a partir do período; projetos relacionados
                saem de `Project.experienceId`. */}
            <section id="experience" className="about-content-section" aria-labelledby="experience-title">
              <h2 id="experience-title" className="section-title reveal-on-scroll">
                <FiBriefcase size={24} aria-hidden="true" />
                {t('about.trajectoryTitle')}
              </h2>
              <p className="about-lead">{t('about.trajectoryLead')}</p>
              <Timeline
                className="exp-timeline"
                data={experiences.flatMap((group) => {
                  const primary = group.roles[0];
                  if (!primary) return [];
                  return [{
                    id: group.id,
                    title: formatStart(primary.period, lang),
                    content: <ExperienceCard group={group} />,
                  }];
                })}
              />
            </section>

            {/* 3 — Experiências em destaque */}
            <section id="featured" className="about-content-section reveal-on-scroll" aria-labelledby="featured-title">
              <h2 id="featured-title" className="section-title">
                <FiStar size={24} aria-hidden="true" />
                {t('about.featuredTitle')}
              </h2>
              <p className="about-lead">{t('about.featuredLead')}</p>
              <div className="about-featured-grid">
                {FEATURED.map(({ id, key }) => {
                  const group = experiences.find((e) => e.id === id);
                  const role = group?.roles[0];
                  if (!group || !role) return null;
                  // Vários cargos: do início do mais antigo até o fim do mais recente.
                  const span = spanOf(group.roles.map((r) => r.period));
                  const period = span
                    ? [formatParsed(span, lang, t), formatDuration(periodMonths(span), t)].filter(Boolean).join(' · ')
                    : periodLabel(role.period);
                  const related = projectsByExperience(id);
                  const skills = Array.from(new Set(group.roles.flatMap((r) => r.skills ?? []))).slice(0, 6);
                  return (
                    <article key={id} className="about-featured-card">
                      <header>
                        <h3>{group.company}</h3>
                        <p className="about-featured-role">{role.title}</p>
                        <p className="about-featured-period">{period}</p>
                      </header>
                      <p className="about-featured-scope">{t(`about.featured.${key}`)}</p>
                      <div className="li-exp-skills">
                        {skills.map((s) => (
                          <span className="li-exp-skill" key={s}>
                            <TechGlyph name={s} size={13} className="li-exp-skill-icon" />
                            {s}
                          </span>
                        ))}
                      </div>
                      {related.length > 0 && (
                        <div className="about-featured-cases">
                          {related.map((p) => (
                            <Link key={p.id} to={p.detailPath} className="about-featured-case">
                              {t('about.viewCase')}: {p.title}
                              <FiArrowRight size={14} aria-hidden="true" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>

            {/* 4 — Especialidades técnicas por domínio (data/expertise.ts) */}
            <section id="expertise" className="about-content-section reveal-on-scroll" aria-labelledby="expertise-title">
              <h2 id="expertise-title" className="section-title">
                <FiCode size={24} aria-hidden="true" />
                {t('about.specialtiesTitle')}
              </h2>
              <p className="about-lead">{t('about.specialtiesLead')}</p>
              <div className="domain-grid">
                {expertise.map((cat) => (
                  <div key={cat.id} className={`domain-card${cat.id === 'history' || cat.id === 'tools' ? ' is-muted' : ''}`}>
                    <h3>{t(`about.domains.${cat.id}.title`)}</h3>
                    <p>{t(`about.domains.${cat.id}.desc`)}</p>
                    <div className="li-exp-skills">
                      {cat.items.map((item) => (
                        <span className="li-exp-skill" key={item.name}>
                          <TechGlyph name={item.name} size={13} className="li-exp-skill-icon" />
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Terminal — tudo que ele imprime sai de dados que já existem. */}
              <div className="expertise-terminal">
                <Terminal
                  label={t('about.terminalLabel')}
                  commands={terminalCommands}
                  outputs={terminalOutputs}
                  interactive
                  resolve={resolveCommand}
                  hint={t('terminal.hint')}
                  inputLabel={t('terminal.inputLabel')}
                  busyLabel={t('terminal.busy')}
                />
              </div>
              <TechMarquee />
            </section>

            {/* 5 — Como trabalho: cada etapa com um case de evidência */}
            <section id="approach" className="about-content-section reveal-on-scroll" aria-labelledby="approach-title">
              <h2 id="approach-title" className="section-title">
                <FiCompass size={24} aria-hidden="true" />
                {t('about.approachTitle')}
              </h2>
              <p className="about-lead">{t('about.approachLead')}</p>
              <ol className="approach-list">
                {APPROACH.map(({ key, project }, i) => {
                  const p = projectById(project);
                  return (
                    <li key={key} className="approach-item">
                      <span className="approach-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h3>{t(`about.approach.${key}.title`)}</h3>
                        <p>{t(`about.approach.${key}.desc`)}</p>
                        {p && (
                          <Link to={p.detailPath} className="approach-evidence">
                            {t('about.evidence')}: {p.title}
                            <FiArrowRight size={13} aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* 6 — Formação e experiência acadêmica */}
            <section id="education" className="about-content-section" aria-labelledby="education-title">
              <h2 id="education-title" className="section-title reveal-on-scroll">
                <FiBookOpen size={24} aria-hidden="true" />
                {t('about.educationTitle')}
              </h2>
              <Timeline
                className="edu-timeline"
                data={education.map((edu) => ({
                  id: edu.id,
                  title: formatStart(edu.period, lang),
                  content: (
                    <div className="education-item-row">
                      <div className="edu-icon"><FiBookOpen size={20} aria-hidden="true" /></div>
                      <div className="edu-info">
                        <h3>{edu.course}</h3>
                        <p>{edu.institution} · {formatPeriod(edu.period, lang, t)}</p>
                      </div>
                    </div>
                  ),
                }))}
              />
              <h3 className="about-subtitle">
                <FiLayers size={18} aria-hidden="true" />
                {t('about.academicTitle')}
              </h3>
              <ul className="academic-list">
                {ACADEMIC.map(({ project, kind }) => {
                  const p = projectById(project);
                  if (!p) return null;
                  return (
                    <li key={project}>
                      <Link to={p.detailPath} className="academic-item">
                        <span className="academic-kind">{t(`about.academicKinds.${kind}`)}</span>
                        <strong>{p.title}</strong>
                        <span className="academic-desc">{p.shortDescription}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section id="github" className="about-content-section reveal-on-scroll" aria-labelledby="github-title">
              <h2 id="github-title" className="section-title">
                <SiGithub size={24} aria-hidden="true" />
                {t('github.title')}
              </h2>
              <GithubActivity />
            </section>

            {/* 7 — Links e contato */}
            <section id="contact" className="about-content-section reveal-on-scroll" aria-labelledby="contact-title">
              <h2 id="contact-title" className="section-title">
                <FiTarget size={24} aria-hidden="true" />
                {t('about.contactTitle')}
              </h2>
              <p className="about-lead">{t('about.contactLead')}</p>
              <div className="contact-links">
                <a href={cv.href} download className="social-btn hbg">
                  <FiDownload size={16} aria-hidden="true" />
                  {t('about.cv')}
                </a>
                {github && (
                  <a href={github.url} target="_blank" rel="noopener noreferrer" className="social-btn hbg">
                    <SiGithub size={16} aria-hidden="true" />
                    GitHub
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="social-btn hbg">
                    <FaLinkedin size={16} aria-hidden="true" />
                    LinkedIn
                  </a>
                )}
                {email && (
                  <a href={email.url} className="social-btn hbg">
                    <FiMail size={16} aria-hidden="true" />
                    {email.detail}
                  </a>
                )}
                {whatsapp && (
                  <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="social-btn hbg">
                    <FaWhatsapp size={16} aria-hidden="true" />
                    WhatsApp
                  </a>
                )}
                <Link to="/contato" className="social-btn hbg">
                  <FiMessageCircle size={16} aria-hidden="true" />
                  {t('about.contactPage')}
                </Link>
              </div>
            </section>

            {/* Spotify — o detalhe pessoal, em um card. Sem seção própria no
                menu: ele não é conteúdo de portfólio, é um rodapé humano da
                página. Some sozinho se não houver playlist configurada nem
                integração ativa. */}
            <div className="about-content-section reveal-on-scroll">
              <Spotify />
            </div>

            <div className="view-more-action">
              <Button href="/projetos" variant="primary">
                {t('about.viewProjects')}
                <FiChevronRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
