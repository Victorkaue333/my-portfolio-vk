import { useRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { usePointerFine } from '../../../hooks/usePointerFine';
import './CardSpotlight.css';

interface CardSpotlightProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Raio do foco em px. */
  radius?: number;
  className?: string;
}

/**
 * Card Spotlight — https://ui.aceternity.com/components/card-spotlight
 *
 * Um foco radial acompanha o ponteiro por dentro do card.
 *
 * Duas decisões em relação ao original:
 *
 * 1. **Sem o Canvas Reveal Effect.** O registro oficial do card-spotlight
 *    depende de `canvas-reveal-effect`, que é WebGL: `three` +
 *    `@react-three/fiber`. O projeto tirou o three.js de propósito (ver
 *    CLAUDE.md) e o briefing descreve só o foco radial seguindo o cursor —
 *    a malha de pontos animada ficou de fora, com a dependência junto.
 * 2. **Sem `useMotionValue`.** O foco é uma variável CSS atualizada no
 *    `pointermove`; usar motion values renderizaria o mesmo resultado
 *    passando por mais uma camada.
 *
 * Em `pointer: coarse` nem o listener nem a camada existem (regra 21).
 */
export function CardSpotlight({
  children,
  radius = 300,
  className,
  ...props
}: CardSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = event.currentTarget.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      className={cn('card-spotlight', pointerFine && 'is-interactive', className)}
      style={{ '--spot-radius': `${radius}px` } as CSSProperties}
      onPointerMove={pointerFine ? handlePointerMove : undefined}
      {...props}
    >
      {pointerFine && <span className="card-spotlight-layer" aria-hidden="true" />}
      {children}
    </div>
  );
}
