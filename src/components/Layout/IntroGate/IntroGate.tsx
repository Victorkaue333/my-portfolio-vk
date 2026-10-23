import { useEffect, useState } from 'react';
import './IntroGate.css';

const SEEN_KEY = 'vk_intro_seen';

/** Mostra a abertura só na primeira visita da sessão, para gente, com movimento liberado. */
function shouldShow(): boolean {
  if (typeof window === 'undefined') return false;
  if (navigator.webdriver) return false; // robôs e testes E2E entram direto
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true; // storage bloqueado: mostra nesta carga
  }
}

/**
 * Porta de entrada do site: o logo VK se revela, uma barra laranja enche e a
 * tela se abre em duas portas. Tudo em CSS (IntroGate.css) — nada de
 * framer-motion no bundle inicial. ~1,6 s; clique ou qualquer tecla pulam.
 */
export function IntroGate() {
  const [visible, setVisible] = useState(shouldShow);
  const [skipping, setSkipping] = useState(false);

  // A marca de "já viu" é gravada aqui, não no inicializador: o StrictMode
  // chama o inicializador duas vezes em dev e a abertura nunca apareceria.
  useEffect(() => {
    if (!visible) return;
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* ignora */ }
    const skip = () => setSkipping(true);
    window.addEventListener('keydown', skip, { once: true });
    return () => window.removeEventListener('keydown', skip);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`intro-gate${skipping ? ' is-skipping' : ''}`}
      aria-hidden="true"
      onClick={() => setSkipping(true)}
    >
      <div className="intro-door is-left" />
      <div
        className="intro-door is-right"
        onAnimationEnd={(e) => {
          if (e.animationName === 'intro-door-right') setVisible(false);
        }}
      />
      <div className="intro-brand">
        <img
          src="/images/fotos-projetos-pessoais/vk-portifolio/logotipo-vk-480.webp"
          alt=""
          width={160}
          height={160}
          className="intro-logo"
          decoding="async"
          fetchPriority="high"
        />
        <span className="intro-bar" />
      </div>
    </div>
  );
}
