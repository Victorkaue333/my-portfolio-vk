import type { CSSProperties } from 'react';
import {
  FiArrowRight,
  FiMail,
  FiDatabase,
  FiCpu,
  FiActivity,
  FiZap,
  FiLayout,
  FiTrendingUp,
  FiBriefcase,
  FiUsers,
  FiClock,
} from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa6';
import { SiGithub } from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { homeMetrics } from '../../data/profile';
import { usePageSeo } from '../../hooks/useSeo';
import { Button } from '../../components/ui/Button/Button';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import { Counter } from '../../components/ui/Counter/Counter';
import { TechGlyph } from '../../components/ui/TechIcon/TechIcon';
import { TechMarquee } from '../../components/ui/TechMarquee/TechMarquee';
import { FloatingLines } from '../../components/ui/FloatingLines/FloatingLines';
import { GithubActivity } from '../../components/ui/GithubActivity/GithubActivity';
import { TextGenerate } from '../../components/ui/TextGenerate/TextGenerate';
import { Spotlight } from '../../components/ui/Spotlight/Spotlight';
import { GlowingEffect } from '../../components/ui/GlowingEffect/GlowingEffect';
import { GlareCard } from '../../components/ui/GlareCard/GlareCard';
import { srcFor, srcSetFor } from '../../utils/imageSrcSet';
import './Home.css';

export default function Home() {
  const { t } = useTranslation();
  usePageSeo('home');

  const services = [
    { id: 'backend', icon: <FiDatabase size={24} />, title: t('about.highlights.backend'), desc: t('about.highlights.backendDesc') },
    { id: 'api', icon: <FiCpu size={24} />, title: t('about.highlights.api'), desc: t('about.highlights.apiDesc') },
    { id: 'fullstack', icon: <FiLayout size={24} />, title: t('about.highlights.enterprise'), desc: t('about.highlights.enterpriseDesc') }
  ];

  return (
    <main className="home">

      {/* ========== HERO SECTION (PRO MAX) ========== */}
      <section id="inicio" className="hero">
        <FloatingLines />
        {/* Spotlight New — iluminação laranja discreta atrás do conteúdo, entre
            o canvas das linhas (z-index 0) e o texto (z-index 2). */}
        <Spotlight />
        <div className="container hero-container">
          <div className="hero-content">
            {/* Text Generate Effect: cada palavra sai do desfoque em sequência,
                ~600ms no total. Em CSS (ver TextGenerate) — era um motion.h1 e
                não valia arrastar o framer-motion inteiro para a rota de
                entrada por causa disso. */}
            <h1 className="hero-title-main">
              <TextGenerate as="span" className="title-white" text={t('hero.role')} />
              <TextGenerate
                as="span"
                className="title-gray"
                text={t('hero.tech')}
                // Continua a contagem da primeira linha para as duas lerem
                // como uma frase só, e não como dois blocos concorrentes.
                startIndex={t('hero.role').split(' ').length}
              />
            </h1>

            {/* Parágrafo = elemento LCP no mobile. Era um <Reveal>: esperava o
                IntersectionObserver, um re-render e mais 0,55s de atraso antes
                de ficar visível (~3,5s de "atraso de renderização" no PageSpeed).
                A entrada agora é só CSS e começa na primeira pintura. */}
            <p className="hero-description hero-enter">
              {t('hero.description')}
            </p>

            <div className="hero-actions">
              <div className="hero-enter" style={{ '--hero-enter-delay': '0.15s' } as CSSProperties}>
                <Button href="/sobre" variant="primary">
                  {t('hero.cta')}
                  <FiArrowRight size={18} />
                </Button>
              </div>
              <div className="hero-enter" style={{ '--hero-enter-delay': '0.25s' } as CSSProperties}>
                <Button href="/projetos" variant="outline">
                  {t('hero.cta2')}
                </Button>
              </div>
              <div className="hero-socials hero-enter" style={{ '--hero-enter-delay': '0.35s' } as CSSProperties}>
                <a href="https://github.com/Victorkaue333" target="_blank" rel="noopener noreferrer" className="social-icon github" aria-label="GitHub"><SiGithub size={20} aria-hidden="true" /></a>
                <a href="https://linkedin.com/in/victorkaue" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" aria-label="LinkedIn"><FaLinkedin size={20} aria-hidden="true" /></a>
                <a href="mailto:kaue.alves.pg@gmail.com" className="social-icon email" aria-label="Email"><FiMail size={20} /></a>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="photo-container hero-enter">
              <div className="photo-ring" />
              <div className="photo-ring inner" />
              <div className="glass-overlay" />
              {/* LCP no desktop: preload no <head> de index.html (bloco preload:home).
                  Manter src/srcSet/sizes em sincronia com imagesrcset/imagesizes de lá. */}
              <img
                src="/images/eu/victorkaue-450.webp"
                srcSet="/images/eu/victorkaue-280.webp 280w, /images/eu/victorkaue-450.webp 450w, /images/eu/victorkaue-560.webp 560w, /images/eu/victorkaue-900.webp 900w"
                sizes="(max-width: 480px) 65vw, (max-width: 768px) 70vw, 450px"
                alt="Victor Kauê"
                className="hero-image"
                width={900}
                height={900}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== NÚMEROS — derivados de data/ (profile.ts), cada um com contexto e link ========== */}
      <section className="results-strip" aria-labelledby="results-title">
        <div className="container">
          <div className="results-inner">
            <h2 id="results-title" className="results-badge">
              <FiTrendingUp size={16} aria-hidden="true" /> {t('home.impactTitle')}
            </h2>
            <ul className="results-grid">
              {homeMetrics.map((m, i) => (
                <li key={m.key}>
                  <Reveal delay={i * 0.1} yOffset={20}>
                    <Link to={m.href} className="result-item" title={t(`home.metrics.${m.key}Context`)}>
                      <span className="result-value">
                        <Counter value={m.value} suffix={m.suffix} />
                      </span>
                      <span className="result-label">{t(`home.metrics.${m.key}Label`)}</span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TechMarquee />

      {/* ========== SERVICES (PRO MAX) ========== */}
      <section id="servicos" className="home-services">
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <h2 className="section-title"><FiActivity /> {t('about.highlights.title')}</h2>
            <p className="section-subtitle">{t('home.servicesSubtitle')}</p>
          </div>

          <div className="services-grid">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.2} width="100%" height="100%">
                <div className="service-pro-card">
                  {/* Glowing Effect no lugar da luz que girava sozinha na borda
                      (keyframes `borderLight`): agora o anel só acende do lado
                      onde o cursor está. */}
                  <GlowingEffect spread={30} proximity={56} borderWidth={1.5} />
                  <div className="service-icon-box">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GITHUB ACTIVITY ========== */}
      <section id="github" className="home-github">
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <h2 className="section-title"><SiGithub aria-hidden="true" /> {t('github.title')}</h2>
          </div>
          <GithubActivity showRepos={false} />
        </div>
      </section>

      {/* ========== PROJECTS (PRO MAX) ========== */}
      <section id="projetos" className="home-projects">
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <div className="header-top">
              <h2 className="section-title"><FiZap /> {t('home.featuredTitle')}</h2>
              <Button href="/projetos" variant="ghost">{t('common.viewAll')} <FiArrowRight size={18} /></Button>
            </div>
            <p className="section-subtitle">{t('home.featuredSubtitle')}</p>
          </div>

          {/* Destaques fixos (featured: true nos dados). Era um carrossel
              automático — quem avalia prefere poucos projetos parados, com
              contexto, do que cards passando sozinhos. */}
          <div className="featured-grid">
            {featuredProjects.map((project, i) => {
              const techs = (project.technologies ?? []).slice(0, 4);
              const meta = [
                project.role?.title && { icon: <FiBriefcase size={13} />, text: project.role.title },
                project.teamSize && {
                  icon: <FiUsers size={13} />,
                  text: t('home.featuredTeam', { count: project.teamSize }),
                },
                project.duration && { icon: <FiClock size={13} />, text: project.duration },
              ].filter(Boolean) as { icon: React.ReactNode; text: string }[];

              return (
                <Reveal key={project.id} delay={i * 0.1} width="100%" height="100%">
                  {/* Glare Card só aqui: são os destaques da Home. Os cards de
                      /projetos seguem sem reflexo (regra 13/18). */}
                  <GlareCard radius="1.5rem">
                  <Link to={project.detailPath} className="featured-card">
                    <div className="featured-image">
                      <img
                        src={srcFor(project.image, 800)}
                        srcSet={srcSetFor(project.image)}
                        sizes="(max-width: 900px) calc(100vw - 2rem), 33vw"
                        alt=""
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="featured-body">
                      <span className="featured-kicker">
                        {project.category === 'real' ? t('projectDetail.categoryReal') : t('projectDetail.categoryPersonal')}
                      </span>
                      <h3 className="featured-title">{project.title}</h3>
                      <p className="featured-desc">{project.shortDescription || project.description}</p>

                      {project.metrics && project.metrics.length > 0 && (
                        <dl className="featured-metrics">
                          {project.metrics.slice(0, 3).map((metric) => (
                            <div key={metric.label}>
                              <dt>{metric.value}</dt>
                              <dd>{metric.label}</dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      {meta.length > 0 && (
                        <ul className="featured-meta">
                          {meta.map((m) => (
                            <li key={m.text}>{m.icon}<span>{m.text}</span></li>
                          ))}
                        </ul>
                      )}

                      <div className="featured-footer">
                        <span className="featured-techs" aria-label={techs.join(', ')}>
                          {techs.map((tech) => <TechGlyph key={tech} name={tech} size={18} />)}
                        </span>
                        <span className="featured-cta">
                          {t('home.featuredCta')} <FiArrowRight size={15} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                  </GlareCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
