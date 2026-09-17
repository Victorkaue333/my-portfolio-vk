import { useEffect, useState } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

/**
 * `true` só em ponteiro preciso com hover real (mouse/trackpad).
 *
 * Efeitos que dependem de seguir o cursor — Lens, Glare, Card Spotlight —
 * não têm equivalente no toque: em `pointer: coarse` eles ou não disparam
 * ou roubam o tap. Em vez de tentar adaptar, o componente não monta a
 * camada interativa e o conteúdo fica exatamente como está.
 *
 * Começa em `false` para o primeiro render ser o estado sem efeito — se o
 * valor entrasse depois da montagem em telas de toque, haveria um quadro
 * com a camada montada.
 */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const update = () => setFine(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return fine;
}
