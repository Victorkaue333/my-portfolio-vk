import { useCallback, useEffect, useState } from 'react';

interface Options {
  /** Até esta altura a barra fica sempre visível (topo da página). */
  topOffset?: number;
  /** Rolagem mínima entre dois quadros para contar como mudança de sentido. */
  delta?: number;
}

/**
 * Comportamento da Floating Navbar do Aceternity, com o estado invertido:
 * lá o padrão é escondida e ela aparece ao subir; aqui a navbar do projeto
 * já existe e o que se importa é quando ela *recolhe*.
 *
 * - rolando para baixo, passado `topOffset` → `hidden` (recolhe);
 * - rolando para cima → visível;
 * - perto do topo → sempre visível.
 *
 * O original assina `scrollYProgress` do framer-motion, o que traria o pacote
 * inteiro para o bundle inicial (a navbar carrega em toda rota). Um listener
 * passivo com rAF dá o mesmo sinal sem nenhum kB extra.
 *
 * `reveal()` força a barra de volta — usado quando o foco do teclado entra
 * nela, para Tab nunca levar a um elemento fora da tela.
 */
export function useScrollDirection({ topOffset = 120, delta = 6 }: Options = {}) {
  const [hidden, setHidden] = useState(false);

  const reveal = useCallback(() => setHidden(false), []);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const diff = y - last;

      if (Math.abs(diff) < delta) return;
      last = y;

      if (y <= topOffset) {
        setHidden(false);
        return;
      }
      setHidden(diff > 0);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [topOffset, delta]);

  return { hidden, reveal };
}
