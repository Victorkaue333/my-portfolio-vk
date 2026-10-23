import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { partners } from '../../../data/partners';
import { projects } from '../../../data/projects';
import { InfiniteMovingCards } from '../InfiniteMovingCards/InfiniteMovingCards';
import './TrustedBy.css';

/**
 * Faixa "Quem confiou no meu trabalho": logos das organizações com projeto
 * real no portfólio (data/partners.ts), passando em loop.
 *
 * Silhuetas monocromáticas — a faixa fica com uma identidade só, sem cinco
 * paletas disputando atenção (regra 3 do DESIGN.md). Cada logo leva ao case
 * (ou à experiência em /sobre). Loop, pausa no hover/foco e movimento reduzido
 * vêm do InfiniteMovingCards.
 */
export function TrustedBy({ className }: { className?: string }) {
  const { t } = useTranslation();
  if (partners.length === 0) return null;

  const items = partners.map((partner) => {
    const project = partner.projectId ? projects.find((p) => p.id === partner.projectId) : undefined;
    const to = project?.detailPath ?? (partner.experienceId ? `/sobre#exp-${partner.experienceId}` : undefined);
    const logo = (
      <img
        src={partner.logo}
        alt={partner.name}
        width={partner.width}
        height={partner.height}
        className={`trusted-logo${partner.square ? ' is-square' : ''}`}
        loading="lazy"
        decoding="async"
      />
    );
    return {
      key: partner.id,
      content: to ? (
        <Link to={to} className="trusted-item" title={partner.name}>{logo}</Link>
      ) : (
        <span className="trusted-item">{logo}</span>
      ),
    };
  });

  return (
    <section className={`trusted-by${className ? ` ${className}` : ''}`} aria-labelledby="trusted-by-title">
      <div className="container trusted-head">
        <h2 id="trusted-by-title" className="trusted-title">{t('common.trustedBy.title')}</h2>
        <p className="trusted-subtitle">{t('common.trustedBy.subtitle')}</p>
      </div>
      <InfiniteMovingCards items={items} direction="left" speed="slow" label={t('common.trustedBy.title')} />
    </section>
  );
}
