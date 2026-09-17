import './Spotlight.css';

/**
 * Spotlight New — https://ui.aceternity.com/components/spotlight-new
 *
 * Dois feixes cônicos inclinados (-45° à esquerda, +45° à direita) que
 * respiram devagar para os lados. O original monta seis `motion.div` com os
 * gradientes escritos em `hsla(210, ...)` — azul — e recebe cada cor por
 * prop; aqui os feixes são camadas de CSS que derivam do `--accent-color` do
 * tema via `color-mix`, então claro e escuro saem do mesmo lugar e não existe
 * um segundo laranja escrito à mão (regra 3).
 *
 * Sem framer-motion de propósito: a oscilação é um `translateX` em loop, que
 * o CSS anima na GPU sem trazer o pacote de animação para a rota de entrada.
 *
 * Decorativo e `pointer-events: none` — fica atrás do conteúdo do hero
 * (z-index 1, entre o canvas do FloatingLines e o texto).
 */
export function Spotlight() {
  return (
    <div className="spotlight" aria-hidden="true">
      <div className="spotlight-side is-left">
        <span className="spotlight-beam is-main" />
        <span className="spotlight-beam is-mid" />
        <span className="spotlight-beam is-far" />
      </div>
      <div className="spotlight-side is-right">
        <span className="spotlight-beam is-main" />
        <span className="spotlight-beam is-mid" />
        <span className="spotlight-beam is-far" />
      </div>
    </div>
  );
}
