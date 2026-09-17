import { useEffect } from 'react';

const SELECTOR = '.reveal-on-scroll';
const STAGGER_MS = 70;

/**
 * Revela `.reveal-on-scroll` quando entra na tela — um observador só, montado
 * uma vez no App (CSS em styles/global.css).
 *
 * Substitui o hook `useScrollReveal`, que cada página chamava: ele fazia
 * `querySelectorAll` no documento inteiro só no mount (conteúdo que aparecia
 * depois — filtro, "ver mais" — dependia de `deps` manuais) e dava a cada
 * elemento um atraso pela posição na página, então o 10º item esperava 700 ms
 * mesmo aparecendo sozinho. Aqui um MutationObserver pega elementos novos e o
 * escalonamento conta só entre os que entram na tela juntos.
 *
 * Elemento com `--reveal-delay` inline (ex.: <Reveal delay>) mantém o próprio.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    root.classList.add('has-scroll-reveal');

    const io = new IntersectionObserver(
      (entries) => {
        let batch = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (!el.style.getPropertyValue('--reveal-delay')) {
            el.style.setProperty('--reveal-delay', `${batch * STAGGER_MS}ms`);
          }
          batch++;
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    const observeWithin = (node: Node) => {
      if (!(node instanceof Element)) return;
      if (node.matches(SELECTOR) && !node.classList.contains('is-visible')) io.observe(node);
      node.querySelectorAll(`${SELECTOR}:not(.is-visible)`).forEach((el) => io.observe(el));
    };

    observeWithin(document.body);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach(observeWithin);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      root.classList.remove('has-scroll-reveal');
    };
  }, []);

  return null;
}
