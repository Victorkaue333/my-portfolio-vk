import { FiArrowRight, FiCompass } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import { PageHero } from '../../components/ui/PageHero/PageHero';
import { pages } from '../../config/pages';
import { projects } from '../../data/projects';
import { usePageSeo } from '../../hooks/useSeo';
import './NaoEncontrado.css';

/** Minúsculo, sem acento, só letras/números — "/Projétos/SIGREF/" e "projetos-sigref" viram o mesmo texto. */
const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

function levenshtein(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + cost);
    }
    prev = cur;
  }
  return prev[b.length]!;
}

/** Distância relativa (0 = igual). Comparação por inclusão conta como quase igual. */
function score(typed: string, candidate: string): number {
  // Pedaço curto ("a", "pt") estaria contido em quase tudo.
  if (typed.length < 3 || !candidate) return Infinity;
  if (candidate.includes(typed) || typed.includes(candidate)) return 0.1;
  return levenshtein(typed, candidate) / Math.max(typed.length, candidate.length);
}

const MAX_SUGGESTIONS = 3;
const MAX_DISTANCE = 0.45;

export default function NaoEncontrado() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  usePageSeo('notFound');

  const segments = pathname.split('/').filter(Boolean).map(normalize).filter(Boolean);
  const whole = normalize(pathname);

  const candidates = [
    ...pages
      .filter((p) => p.path !== '/' && !p.path.includes(':') && p.path !== '*')
      .map((p) => ({
        path: p.path,
        label:
          'navKey' in p
            ? t(`nav.${p.navKey}`)
            : 'seoKey' in p
              ? (t(`seo.${p.seoKey}Title`).split('|')[0] ?? p.path).trim()
              : p.path,
        keys: [normalize(p.path)],
      })),
    ...projects.map((p) => ({
      path: p.detailPath,
      label: p.title,
      keys: [normalize(p.slug ?? p.id), normalize(p.title)],
    })),
  ];

  // Menor distância entre qualquer pedaço da URL digitada e qualquer chave do candidato.
  const suggestions = candidates
    .map((c) => ({
      ...c,
      distance: Math.min(...c.keys.flatMap((k) => [whole, ...segments].map((typed) => score(typed, k)))),
    }))
    .filter((c) => c.distance <= MAX_DISTANCE)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, MAX_SUGGESTIONS);

  return (
    <main className="page-404">
      <section className="content-section">
        <div className="container">
          <PageHero
            titleMain={t('notFound.heroMain')}
            titleAccent={t('notFound.heroAccent')}
            subtitle={t('notFound.subtitle')}
            icon={<FiCompass size={22} />}
          />

          {suggestions.length > 0 && (
            <nav className="notfound-suggestions" aria-label={t('notFound.suggestions')}>
              <h2>{t('notFound.suggestions')}</h2>
              <ul>
                {suggestions.map((s) => (
                  <li key={s.path}>
                    <Link to={s.path}>
                      <span>
                        <strong>{s.label}</strong>
                        <small>{s.path}</small>
                      </span>
                      <FiArrowRight size={18} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="notfound-actions">
            <Button href="/" variant="primary">{t('notFound.home')}</Button>
            <Button href="/projetos" variant="outline">{t('notFound.projects')}</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
