import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './InfiniteMovingCards.css';

export interface MovingItem {
  key: string;
  content: ReactNode;
}

interface InfiniteMovingCardsProps {
  items: MovingItem[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
  /** Rótulo da lista para leitores de tela. */
  label?: string;
}

const DURATION: Record<NonNullable<InfiniteMovingCardsProps['speed']>, string> = {
  fast: '24s',
  normal: '45s',
  slow: '75s',
};

/**
 * Infinite Moving Cards — https://ui.aceternity.com/components/infinite-moving-cards
 *
 * Faixa que desliza em loop contínuo. O truque é o do original: a lista é
 * duplicada e a animação desloca -50%, então o fim encontra o começo.
 *
 * Diferenças:
 *
 * - O original clona os `<li>` no DOM dentro de um `useEffect`. Aqui a segunda
 *   cópia é renderizada pelo React e marcada `aria-hidden` — o leitor de tela
 *   lê a lista uma vez só, e não há mutação de DOM fora do React.
 * - O conteúdo dos cards é livre (`items[].content`): o original é fechado em
 *   depoimentos (`quote`/`name`/`title`), e aqui a faixa mostra a stack real
 *   do portfólio (ver TechMarquee).
 *
 * `pauseOnHover` e `prefers-reduced-motion` estão no CSS ao lado.
 */
export function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className,
  label,
}: InfiniteMovingCardsProps) {
  if (items.length === 0) return null;

  const style = {
    '--moving-duration': DURATION[speed],
    '--moving-direction': direction === 'left' ? 'normal' : 'reverse',
  } as CSSProperties;

  return (
    <div
      className={cn('moving-row', pauseOnHover && 'pause-on-hover', className)}
      style={style}
    >
      {/* As duas listas lado a lado ocupam 200% do conteúdo; deslocar -50%
          avança exatamente o comprimento de uma delas, então o salto de volta
          cai no mesmo pixel. */}
      <div className="moving-marquee">
        <ul className="moving-track" aria-label={label}>
          {items.map((item) => (
            <li key={item.key} className="moving-item">
              {item.content}
            </li>
          ))}
        </ul>
        {/* Cópia que fecha o loop — invisível para tecnologia assistiva. */}
        <ul className="moving-track" aria-hidden="true">
          {items.map((item) => (
            <li key={`clone-${item.key}`} className="moving-item">
              {item.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
