import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiAward, FiFilter, FiMaximize2, FiRotateCcw } from 'react-icons/fi';
import { CertificatePreview } from '../../components/ui/CertificatePreview/CertificatePreview';
import { PageHero } from '../../components/ui/PageHero/PageHero';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import { certificateCategories, certificates } from '../../data/certificates';
import { useSeo } from '../../hooks/useSeo';
import './Certificados.css';

export default function Certificados() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('todos');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const closePreview = useCallback(() => setPreviewIndex(null), []);

  useSeo({
    title: t('seo.certsTitle'),
    description: t('seo.certsDesc'),
    path: '/certificados',
  });

  const filtered = activeCategory === 'todos'
    ? certificates
    : certificates.filter((c) => c.category === activeCategory);

  const categoryLabel = (id: string) =>
    certificateCategories.find((c) => c.id === id)?.label ?? id;

  return (
    <main className="page-certificados">
      <section className="content-section">
        <div className="container">
          <PageHero
            titleMain={t('certsPage.heroMain')}
            titleAccent={t('certsPage.heroAccent')}
            subtitle={t('certsPage.heroSubtitle')}
            icon={<FiAward size={22} />}
          />

          <div className="cert-filters reveal-on-scroll">
            <div className="filter-icon"><FiFilter size={18} /></div>
            <div className="filter-options">
              {certificateCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <span className="cert-results-count">{filtered.length} {t('certsPage.results')}</span>
          </div>

          <div className="cert-grid">
            {filtered.map((cert, index) => (
              <Reveal key={cert.id} delay={0.1} width="100%" height="100%" className="cert-grid-item">
                <button
                  type="button"
                  className="cert-card"
                  onClick={() => setPreviewIndex(index)}
                  aria-haspopup="dialog"
                  aria-label={`${t('certsPage.preview')}: ${cert.title}`}
                >
                  <div className="cert-image">
                    <img src={cert.image} alt={cert.title} loading="lazy" />
                    <div className="cert-overlay">
                      <span>
                        {t('certsPage.preview')} <FiMaximize2 size={14} />
                      </span>
                    </div>
                  </div>
                  <div className="cert-info">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <h3 className="cert-title">{cert.title}</h3>
                    <div className="cert-badge">{categoryLabel(cert.category)}</div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="no-results">
              <p>{t('certsPage.empty')}</p>
              <button className="reset-filter-btn" onClick={() => setActiveCategory('todos')}>
                <FiRotateCcw size={15} />
                {t('certsPage.reset')}
              </button>
            </div>
          )}
        </div>
      </section>

      <CertificatePreview
        certificates={filtered}
        index={previewIndex}
        onClose={closePreview}
        onNavigate={setPreviewIndex}
        categoryLabel={categoryLabel}
      />
    </main>
  );
}
