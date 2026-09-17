import React, { type CSSProperties } from 'react';

interface Props {
  children: React.ReactElement;
  width?: "fit-content" | "100%";
  height?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  yOffset?: number;
}

/**
 * Entrada em fade + slide quando o elemento aparece na tela.
 *
 * Era `useInView` + `useAnimation` do framer-motion, depois um
 * IntersectionObserver por instância. Agora só marca `.reveal-on-scroll` com
 * delay/offset próprios — quem observa é o ScrollReveal global
 * (components/Layout/ScrollReveal), o mesmo das seções das páginas. Mesma API.
 */
export const Reveal = ({ children, width = "fit-content", height = "fit-content", className = "", delay = 0, yOffset = 75 }: Props) => {
  const style = {
    height,
    '--reveal-delay': `${0.25 + delay}s`,
    '--reveal-offset': `${yOffset}px`,
    '--reveal-duration': '0.5s',
  } as CSSProperties;

  return (
    <div className={className} style={{ position: "relative", width, height, overflow: "visible" }}>
      <div className="reveal-on-scroll" style={style}>
        {children}
      </div>
    </div>
  );
};
