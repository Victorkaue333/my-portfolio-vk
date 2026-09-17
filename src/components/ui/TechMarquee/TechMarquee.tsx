import { useTranslation } from 'react-i18next';
import { expertise } from '../../../data/expertise';
import { TechGlyph, hasTechIcon } from '../TechIcon/TechIcon';
import { InfiniteMovingCards } from '../InfiniteMovingCards/InfiniteMovingCards';
import './TechMarquee.css';

/**
 * Faixa de tecnologias do portfólio.
 *
 * O motor passou a ser o Infinite Moving Cards
 * (https://ui.aceternity.com/components/infinite-moving-cards). A faixa já
 * existia — em vez de acrescentar um segundo marquee ao projeto, este aqui
 * ganhou o mecanismo do componente: velocidade e sentido por variável CSS,
 * pausa no hover e no foco, e parada completa em `prefers-reduced-motion`.
 *
 * Os itens continuam vindo de `data/expertise.ts`, então a faixa só mostra
 * tecnologia que existe nos dados. O nome ao lado do ícone é novo: antes a
 * faixa inteira era `aria-hidden` e não entregava nada a quem usa leitor de
 * tela.
 */
export function TechMarquee() {
  const { t } = useTranslation();

  const allTech = expertise.flatMap((cat) => cat.items).filter((item) => hasTechIcon(item.name));

  // Duas linhas em sentidos opostos — mesma composição de antes.
  const half = Math.ceil(allTech.length / 2);
  const rowTop = allTech.slice(0, half);
  const rowBottom = allTech.slice(half);

  const toItems = (items: typeof allTech) =>
    items.map((tech) => ({
      key: tech.name,
      content: (
        <span className="tech-chip">
          <TechGlyph name={tech.name} size={22} className="tech-chip-icon" />
          <span className="tech-chip-name">{tech.name}</span>
        </span>
      ),
    }));

  return (
    <section className="tech-marquee-section" aria-label={t('common.techStack')}>
      <div className="marquee-container">
        <InfiniteMovingCards
          items={toItems(rowTop)}
          direction="left"
          speed="slow"
          label={t('common.techStack')}
        />
        <InfiniteMovingCards items={toItems(rowBottom)} direction="right" speed="slow" />
      </div>
    </section>
  );
}
