/**
 * Tokens de movimento — a mesma linguagem para toda animação em JS.
 *
 * Espelham os tokens CSS de `styles/variables.css` (`--transition-fast`,
 * `--transition-normal`, `--transition-slow`): quem anima em CSS usa a
 * variável, quem anima com framer-motion importa daqui. Sem números soltos
 * espalhados pelos componentes.
 */

/** Segundos — a unidade que o framer-motion espera. */
export const DURATION = {
  /** 180ms — feedback imediato: hover, troca de estado, indicador de aba. */
  fast: 0.18,
  /** 300ms — entrada/saída de elemento, deslize do indicador. */
  normal: 0.3,
  /** 600ms — revelação de conteúdo, trilha de progresso. */
  slow: 0.6,
} as const;

/** Curvas — sem bounce, sem mola elástica (ver regra 19 do briefing). */
export const EASE = {
  /** cubic-bezier padrão da interface (mesma de --transition-fast/normal). */
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Desaceleração longa — entradas e trilhas (mesma de --transition-slow). */
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const;

/** Mola contida usada só no indicador deslizante das abas. */
export const SPRING_TAB = { type: 'spring' as const, stiffness: 420, damping: 38, mass: 0.7 };

/** Transição pronta para `transition={...}`. */
export const transition = (
  duration: number = DURATION.normal,
  ease: readonly number[] = EASE.standard,
) => ({ duration, ease: ease as [number, number, number, number] });
