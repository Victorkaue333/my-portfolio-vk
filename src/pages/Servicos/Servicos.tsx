import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import {
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayout,
  FiMessageCircle,
  FiPenTool,
  FiPlus,
  FiSearch,
  FiSend,
} from 'react-icons/fi';
import { Button } from '../../components/ui/Button/Button';
import { PageHero } from '../../components/ui/PageHero/PageHero';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import { CardSpotlight } from '../../components/ui/CardSpotlight/CardSpotlight';
import { TechMarquee } from '../../components/ui/TechMarquee/TechMarquee';
import { useLanguage } from '../../hooks/useLanguage';
import { usePageSeo } from '../../hooks/useSeo';
import { testimonials } from '../../data/testimonials';
import './Servicos.css';

/** Etapas do processo — o número casa com as chaves `servicos.stepNTitle` / `stepNDesc`. */
const APPROACH_STEPS = [
  { n: 1, Icon: FiSearch },
  { n: 2, Icon: FiPenTool },
  { n: 3, Icon: FiCode },
  { n: 4, Icon: FiSend },
];

/** Seção "Como eu trabalho" — os passos deslizam na horizontal conforme a página rola. */
function ApproachHorizontal() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Deslocamento do track que centraliza cada painel no viewport (um valor por etapa).
  const [centers, setCenters] = useState<number[]>([0]);
  const [active, setActive] = useState(0);

  const steps = APPROACH_STEPS.map(({ n, Icon }) => ({
    num: `0${n}`,
    Icon,
    title: t(`servicos.step${n}Title`),
    desc: t(`servicos.step${n}Desc`),
  }));

  // Mede, para cada painel, o `x` do track que põe o centro dele no centro do
  // viewport. A etapa em foco é sempre a centralizada — em qualquer largura,
  // inclusive quando todos os painéis caberiam lado a lado (antes o curso
  // dependia do "excesso" do track e sumia em telas largas).
  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;

    let raf = 0;

    const calc = () => {
      const padLeft = parseFloat(getComputedStyle(viewport).paddingLeft) || 0;
      // Centro do viewport no sistema de coordenadas do track (que começa após o padding).
      const focus = viewport.clientWidth / 2 - padLeft;
      const panels = Array.from(track.children) as HTMLElement[];
      setCenters(panels.map((p) => focus - (p.offsetLeft + p.offsetWidth / 2)));
    };

    // Ler `offsetLeft`/`offsetWidth` força um layout síncrono. O ResizeObserver dispara em
    // rajada durante o arrasto da janela, então junta tudo num quadro só.
    const scheduleCalc = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };

    calc();

    // O ResizeObserver já cobre resize de janela, troca de fonte e mudança de
    // idioma — os listeners de `resize`/`load` que existiam aqui só repetiam
    // o mesmo cálculo, sem throttle.
    const ro = new ResizeObserver(scheduleCalc);
    ro.observe(track);
    ro.observe(viewport);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [t]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  // Progresso i/(n-1) = painel i centralizado. Entre duas etapas o track
  // interpola, então o destaque (Math.round) troca quando o próximo painel
  // passa a estar mais perto do centro — posição e destaque vêm da mesma conta.
  const first = centers[0] ?? 0;
  const last = centers[centers.length - 1] ?? first;
  const multi = centers.length > 1;
  const x = useTransform(
    scrollYProgress,
    multi ? centers.map((_, i) => i / (centers.length - 1)) : [0, 1],
    multi ? centers : [first, first],
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  // Curso horizontal total (primeiro → último centralizado).
  const distance = Math.abs(first - last);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const index = Math.round(value * (steps.length - 1));
    setActive(Math.min(steps.length - 1, Math.max(0, index)));
  });

  return (
    <section
      ref={sectionRef}
      className="approach-pin"
      // Altura extra = curso horizontal, para o scroll vertical virar movimento lateral 1:1.
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="approach-sticky">
        <div className="container approach-head">
          <h2 className="section-title">{t('servicos.approachTitle')}</h2>
          <p className="section-subtitle">{t('servicos.approachSubtitle')}</p>

          <div className="approach-progress" aria-hidden="true">
            <span className="approach-progress-count">{steps[active]?.num ?? '01'}</span>
            <span className="approach-progress-rail">
              <motion.span className="approach-progress-fill" style={{ width: progressWidth }} />
            </span>
            <span className="approach-progress-total">{`0${steps.length}`}</span>
          </div>
        </div>

        <div className="approach-viewport">
          <motion.div ref={trackRef} style={{ x }} className="approach-track">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <article key={step.num} className={`approach-panel ${i === active ? 'is-active' : ''}`}>
                  <header className="approach-panel-head">
                    <span className="approach-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="approach-num" aria-hidden="true">{step.num}</span>
                  </header>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <span className="approach-rule" aria-hidden="true" />
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** FAQ com acordeão. */
function Faq() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);
  const items = [1, 2, 3, 4].map((n) => ({
    q: t(`servicos.faq${n}Q`),
    a: t(`servicos.faq${n}A`),
  }));

  return (
    <section className="services-faq content-section">
      <div className="container">
        <div className="section-header reveal-on-scroll">
          <h2 className="section-title">{t('servicos.faqTitle')}</h2>
        </div>
        <div className="faq-list">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <FiPlus className="faq-icon" aria-hidden="true" />
                </button>
                <div className="faq-answer" role="region">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Servicos() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  usePageSeo('services');

  return (
    <main className="page-servicos">
      <section className="services-hero content-section">
        <div className="container">
          <PageHero
            titleMain={t('servicos.heroMain')}
            titleAccent={t('servicos.heroAccent')}
            subtitle={t('servicos.heroSubtitle')}
            icon={<FiDatabase size={22} />}
          />
        </div>

        <div className="container">
          <div className="services-grid">
            <Reveal delay={0.1}>
              <CardSpotlight className="service-card" radius={300}>
                <div className="service-icon">
                  <FiDatabase />
                </div>
                <h3>{t('servicos.card1Title')}</h3>
                <p>{t('servicos.card1Desc')}</p>
                <ul>
                  <li><FiCheckCircle /> {t('servicos.card1Item1')}</li>
                  <li><FiCheckCircle /> {t('servicos.card1Item2')}</li>
                  <li><FiCheckCircle /> {t('servicos.card1Item3')}</li>
                </ul>
              </CardSpotlight>
            </Reveal>

            <Reveal delay={0.2}>
              <CardSpotlight className="service-card featured" radius={300}>
                <div className="service-icon">
                  <FiLayout />
                </div>
                <h3>{t('servicos.card2Title')}</h3>
                <p>{t('servicos.card2Desc')}</p>
                <ul>
                  <li><FiCheckCircle /> {t('servicos.card2Item1')}</li>
                  <li><FiCheckCircle /> {t('servicos.card2Item2')}</li>
                  <li><FiCheckCircle /> {t('servicos.card2Item3')}</li>
                </ul>
                <Button href="/contato" variant="primary">
                  {t('servicos.card2Cta')} <FiArrowRight />
                </Button>
              </CardSpotlight>
            </Reveal>

            <Reveal delay={0.3}>
              <CardSpotlight className="service-card" radius={300}>
                <div className="service-icon">
                  <FiCpu />
                </div>
                <h3>{t('servicos.card3Title')}</h3>
                <p>{t('servicos.card3Desc')}</p>
                <ul>
                  <li><FiCheckCircle /> {t('servicos.card3Item1')}</li>
                  <li><FiCheckCircle /> {t('servicos.card3Item2')}</li>
                  <li><FiCheckCircle /> {t('servicos.card3Item3')}</li>
                </ul>
              </CardSpotlight>
            </Reveal>
          </div>
        </div>
      </section>

      <ApproachHorizontal />

      {/* Faixa de tecnologias */}
      <section className="services-tech content-section">
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <h2 className="section-title">{t('servicos.techTitle')}</h2>
            <p className="section-subtitle">{t('servicos.techSubtitle')}</p>
          </div>
        </div>
        <TechMarquee />
      </section>

      {/* Depoimentos — só aparece com depoimento real cadastrado (data/testimonials.ts) */}
      {testimonials.length > 0 && (
        <section className="services-testimonials content-section">
          <div className="container">
            <div className="section-header reveal-on-scroll">
              <h2 className="section-title">{t('servicos.testimonialsTitle')}</h2>
              <p className="section-subtitle">{t('servicos.testimonialsSubtitle')}</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.12}>
                  <figure className="testimonial-card">
                    <blockquote>“{item.quote[lang]}”</blockquote>
                    <figcaption>
                      <span className="testimonial-avatar" aria-hidden="true">{item.initials}</span>
                      <span className="testimonial-meta">
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <strong>{item.name}</strong>
                          </a>
                        ) : (
                          <strong>{item.name}</strong>
                        )}
                        <small>{item.role[lang]}</small>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq />

      {/* CTA final */}
      <section className="services-cta content-section">
        <div className="container">
          <div className="cta-panel reveal-on-scroll">
            <div className="cta-copy">
              <h2>{t('servicos.ctaTitle')}</h2>
              <p>{t('servicos.ctaDesc')}</p>
            </div>
            <Button href="/contato" variant="primary">
              <FiMessageCircle /> {t('servicos.ctaButton')}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
