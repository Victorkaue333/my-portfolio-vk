import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './Timeline.css';

export interface TimelineEntry {
  id: string;
  /** Rótulo curto que fica grudado à esquerda enquanto o item passa. */
  title: string;
  content: ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  className?: string;
}

/**
 * Timeline — https://ui.aceternity.com/components/timeline
 *
 * Linha vertical com o preenchimento preso à rolagem: o traço avança conforme
 * a lista passa pela tela, e cada entrada tem o rótulo colado à esquerda.
 *
 * Diferenças em relação ao original:
 *
 * - O componente oficial embute título e parágrafo próprios ("Changelog from
 *   my journey"). Aqui ele é só a estrutura: o conteúdo vem de
 *   `data/experiences.ts` e `data/education.ts`, sem texto inventado.
 * - O traço do original vai de roxo a azul. Este sai do `--accent-color`.
 * - `useScroll`/`useTransform` do framer-motion viraram um listener passivo
 *   com `requestAnimationFrame`: /sobre não carrega o framer, e ler o
 *   progresso de um retângulo não justifica trazer o pacote para a rota.
 *
 * A entrada do conteúdo usa `.reveal-on-scroll`, o mesmo observador global do
 * resto do site (components/Layout/ScrollReveal) — nada de um segundo
 * mecanismo de revelação só aqui.
 */
export function Timeline({ data, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Sem movimento: a linha já nasce inteira. Ela é indicação de progresso,
    // não conteúdo — e nada pode depender dela para ser lido (regra 20).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.style.setProperty('--timeline-progress', '1');
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      // Mesma janela do original (`start 10%` → `end 50%`): o traço começa
      // quando o topo da lista chega a 10% da tela e fecha quando o fim dela
      // passa da metade.
      const span = rect.height - 0.4 * vh;
      const progress = span > 0 ? (0.1 * vh - rect.top) / span : 1;
      container.style.setProperty(
        '--timeline-progress',
        String(Math.min(1, Math.max(0, progress))),
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [data.length]);

  return (
    <div ref={containerRef} className={cn('timeline', className)}>
      <div className="timeline-track" aria-hidden="true">
        <span className="timeline-fill" />
      </div>

      {data.map((entry) => (
        <div key={entry.id} className="timeline-item">
          <div className="timeline-aside">
            <span className="timeline-dot" aria-hidden="true" />
            <span className="timeline-title">{entry.title}</span>
          </div>
          <div className="timeline-content reveal-on-scroll">{entry.content}</div>
        </div>
      ))}
    </div>
  );
}
