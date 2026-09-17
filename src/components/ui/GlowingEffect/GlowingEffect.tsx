import { memo, useCallback, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '../../../utils/cn';
import { usePointerFine } from '../../../hooks/usePointerFine';
import './GlowingEffect.css';

interface GlowingEffectProps {
  /** Desfoque do anel — 0 mantém a borda nítida. */
  blur?: number;
  /** Fração central do card que não acende (evita o brilho girando à toa). */
  inactiveZone?: number;
  /** Folga em px além da borda que ainda conta como "perto". */
  proximity?: number;
  /** Abertura do arco aceso, em graus. */
  spread?: number;
  /** Segundos que o arco leva para alcançar o cursor. */
  movementDuration?: number;
  /** Espessura do anel. */
  borderWidth?: number;
  className?: string;
}

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Glowing Effect — https://ui.aceternity.com/components/glowing-effect
 *
 * Um anel de luz na borda do card que aponta para onde o cursor está: quanto
 * mais perto, mais aceso; o arco persegue o ângulo do ponteiro.
 *
 * Duas adaptações em relação ao original:
 *
 * 1. O gradiente oficial é rosa, ocre, verde e azul. Aqui o anel sai do
 *    `--accent-color` do tema, definido no CSS ao lado (regra 3 do briefing —
 *    nada de segunda identidade visual).
 * 2. A interpolação do ângulo usa `animate()` do framer-motion no original.
 *    Home e Sobre não carregam o framer hoje (só Serviços, Certificados e o
 *    detalhe de projeto carregam) e um tween de um número não justifica
 *    puxar o pacote para essas rotas — aqui é um `requestAnimationFrame` com
 *    a mesma curva de desaceleração.
 *
 * Em toque (`pointer: coarse`) nenhum listener é montado: o card fica com o
 * anel apagado e o hover/foco do CSS continua respondendo (regra 21).
 */
const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.6,
    proximity = 48,
    spread = 28,
    movementDuration = 1.2,
    borderWidth = 1,
    className,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const frameRef = useRef(0);
    const tweenRef = useRef(0);
    const pointerFine = usePointerFine();

    /** Leva `--start` do ângulo atual até `target` pelo caminho mais curto. */
    const tweenAngle = useCallback(
      (element: HTMLElement, target: number) => {
        cancelAnimationFrame(tweenRef.current);
        const from = parseFloat(element.style.getPropertyValue('--start')) || 0;
        const diff = ((target - from + 180) % 360) - 180;
        const to = from + diff;
        const start = performance.now();
        const ms = movementDuration * 1000;

        const step = (now: number) => {
          const t = Math.min(1, (now - start) / ms);
          element.style.setProperty('--start', String(from + (to - from) * EASE_OUT(t)));
          if (t < 1) tweenRef.current = requestAnimationFrame(step);
        };
        tweenRef.current = requestAnimationFrame(step);
      },
      [movementDuration],
    );

    const handleMove = useCallback(
      (e?: PointerEvent) => {
        cancelAnimationFrame(frameRef.current);

        frameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const x = e?.clientX ?? lastPosition.current.x;
          const y = e?.clientY ?? lastPosition.current.y;
          if (e) lastPosition.current = { x, y };

          const centerX = left + width * 0.5;
          const centerY = top + height * 0.5;
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (Math.hypot(x - centerX, y - centerY) < inactiveRadius) {
            element.style.setProperty('--active', '0');
            return;
          }

          const isActive =
            x > left - proximity &&
            x < left + width + proximity &&
            y > top - proximity &&
            y < top + height + proximity;

          element.style.setProperty('--active', isActive ? '1' : '0');
          if (!isActive) return;

          tweenAngle(element, (180 * Math.atan2(y - centerY, x - centerX)) / Math.PI + 90);
        });
      },
      [inactiveZone, proximity, tweenAngle],
    );

    useEffect(() => {
      if (!pointerFine) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const onScroll = () => handleMove();
      const onPointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener('scroll', onScroll, { passive: true });
      document.body.addEventListener('pointermove', onPointerMove, { passive: true });

      return () => {
        cancelAnimationFrame(frameRef.current);
        cancelAnimationFrame(tweenRef.current);
        window.removeEventListener('scroll', onScroll);
        document.body.removeEventListener('pointermove', onPointerMove);
      };
    }, [handleMove, pointerFine]);

    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={cn('glowing-effect', className)}
        style={
          {
            '--spread': spread,
            '--start': '0',
            '--active': '0',
            '--glow-border-width': `${borderWidth}px`,
            '--glow-blur': `${blur}px`,
          } as CSSProperties
        }
      >
        <div className="glowing-effect-ring" />
      </div>
    );
  },
);

GlowingEffect.displayName = 'GlowingEffect';

export { GlowingEffect };
