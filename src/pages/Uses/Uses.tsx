import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiArrowUpRight, FiTool } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { PageHero } from '../../components/ui/PageHero/PageHero';
import { TechGlyph, hasTechIcon } from '../../components/ui/TechIcon/TechIcon';
import { usesCategories } from '../../data/uses';
import { useLanguage } from '../../hooks/useLanguage';
import { usePageSeo } from '../../hooks/useSeo';
import './Uses.css';

// Categoria vazia (ex.: hardware ainda sem itens) não aparece.
const visibleCategories = usesCategories.filter((c) => c.items.length > 0);

export default function Uses() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  usePageSeo('uses');

  return (
    <main className="page-uses">
      <section className="content-section">
        <div className="container">
          <PageHero
            titleMain={t('uses.heroMain')}
            titleAccent={t('uses.heroAccent')}
            subtitle={t('uses.heroSubtitle')}
            icon={<FiTool size={22} />}
          />

          <div className="uses-grid">
            {visibleCategories.map((category) => (
              <section key={category.id} className="uses-card reveal-on-scroll" aria-labelledby={`uses-${category.id}`}>
                <header className="uses-card-header">
                  <h2 id={`uses-${category.id}`} className="uses-card-title">{category.title[lang]}</h2>
                  <span className="uses-card-count">
                    {t('uses.itemsCount', { count: category.items.length })}
                  </span>
                </header>

                <ul className="uses-list">
                  {category.items.map((item) => (
                    <li key={item.name} className="uses-item">
                      <span className="uses-item-icon" aria-hidden="true">
                        {item.icon && hasTechIcon(item.icon) ? (
                          <TechGlyph name={item.icon} size={20} />
                        ) : (
                          <span className="uses-item-initial">{item.name.charAt(0)}</span>
                        )}
                      </span>
                      <div className="uses-item-body">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="uses-item-name uses-item-link"
                          >
                            {item.name}
                            <FiArrowUpRight size={14} aria-hidden="true" />
                            <span className="uses-sr-only"> ({t('uses.opensInNewTab')})</span>
                          </a>
                        ) : (
                          <span className="uses-item-name">{item.name}</span>
                        )}
                        <p className="uses-item-desc">{item.description[lang]}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="uses-cta reveal-on-scroll">
            <p>{t('uses.ctaText')}</p>
            <Link to="/projetos" className="uses-cta-btn">
              {t('uses.ctaButton')}
              <FiArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
