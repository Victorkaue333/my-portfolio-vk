import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { readStorage, writeStorage } from '../../../hooks/useLocalStorage';

/** Tempo máximo esperando o chunk lazy da página crescer o documento. */
const RESTORE_TIMEOUT_MS = 1500;

function sessionStore(): Storage | null {
  try { return window.sessionStorage; } catch { return null; }
}

const scrollKey = (pathname: string) => `vk_scroll:${pathname}`;

/**
 * Link/navegação nova (PUSH/REPLACE) → topo.
 * Voltar/avançar/recarregar (POP) → posição salva da rota.
 *
 * Posição fica em sessionStorage, não localStorage: reabrir o site dias depois
 * no meio da página confunde; dentro da mesma aba é o comportamento esperado.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }

    const saved = navigationType === 'POP' ? readStorage<number>(scrollKey(pathname), sessionStore()) : null;
    if (!saved) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    // A página é lazy: o documento pode ainda não ter altura para `saved`.
    // Tenta a cada quadro até caber ou estourar o tempo.
    let frame = 0;
    const start = performance.now();
    const tryRestore = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll >= saved || performance.now() - start > RESTORE_TIMEOUT_MS) {
        window.scrollTo({ top: saved, left: 0, behavior: 'auto' });
        return;
      }
      frame = requestAnimationFrame(tryRestore);
    };
    tryRestore();
    return () => cancelAnimationFrame(frame);
  }, [pathname, search, hash, navigationType]);

  useEffect(() => {
    let frame = 0;
    const save = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        writeStorage(scrollKey(pathname), Math.round(window.scrollY), sessionStore());
      });
    };
    window.addEventListener('scroll', save, { passive: true });
    return () => {
      window.removeEventListener('scroll', save);
      // Quadro pendente leria o scrollY já da próxima rota.
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
