import { useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { usePointerFine } from '../../../hooks/usePointerFine';
import './GlareCard.css';

interface GlareCardProps {
  children: ReactNode;
  className?: string;
  /** Raio da borda do card envolvido — o reflexo é recortado por ele. */
  radius?: string;
}

/**
 * Glare Card — https://ui.aceternity.com/components/glare-card
 *
 * O reflexo acompanha o cursor e o card inclina de leve, como nos cards do
 * Linear que inspiraram o componente oficial.
 *
 * O que mudou em relação ao original:
 *
 * - O oficial é um card fechado: `aspect-ratio 17/21`, `w-[320px]`,
 *   `rounded-[48px]` e fundo `bg-slate-950` próprios. Usar assim trocaria o
 *   layout dos destaques (proibido pelas regras 1 e 24). Aqui ele é só um
 *   invólucro: herda tamanho do grid e recebe o raio do card por prop.
 * - A folha holográfica do original tem um `--rainbow` de sete cores. Foi
 *   removida: sobrou o brilho neutro (`--shade`) e um véu laranja fraquíssimo
 *   derivado do accent (regra 13 — nada de reflexo branco estourado).
 *
 * Só monta os listeners em ponteiro fino. No toque o card fica exatamente
 * como é hoje e o tap continua abrindo o projeto (regra 21).
 */
export function GlareCard({ children, className, radius = '1.5rem' }: GlareCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (100 / rect.width) * (event.clientX - rect.left);
    const py = (100 / rect.height) * (event.clientY - rect.top);

    // Mesmos fatores do original, com a inclinação reduzida pela metade: os
    // destaques são cards altos com texto, e girar muito atrapalha a leitura.
    el.style.setProperty('--glare-x', `${px}%`);
    el.style.setProperty('--glare-y', `${py}%`);
    el.style.setProperty('--glare-rx', `${(-(px - 50) / 3.5) * 0.2}deg`);
    el.style.setProperty('--glare-ry', `${((py - 50) / 2) * 0.2}deg`);
  };

  const reset = () => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty('--glare-rx', '0deg');
    el.style.setProperty('--glare-ry', '0deg');
  };

  return (
    <div
      ref={rootRef}
      className={cn('glare-card', pointerFine && 'is-interactive', className)}
      style={{ '--glare-radius': radius } as CSSProperties}
      onPointerMove={pointerFine ? handlePointerMove : undefined}
      onPointerLeave={pointerFine ? reset : undefined}
    >
      <div className="glare-card-inner">
        {children}
        <span className="glare-card-sheen" aria-hidden="true" />
      </div>
    </div>
  );
}
