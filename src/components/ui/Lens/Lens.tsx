import { useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { usePointerFine } from '../../../hooks/usePointerFine';
import { DURATION, EASE } from '../../../config/motion';
import './Lens.css';

interface LensProps {
  /** Conteúdo normal — a lupa não interfere nele. */
  children: ReactNode;
  /**
   * Cópia estática que a lupa amplia. Sem isso, `children` é duplicado (é o
   * que o componente oficial faz). O carrossel passa um `<img>` simples aqui:
   * duplicar o `motion.img` com `drag` e `AnimatePresence` significaria dois
   * arrastes e duas animações rodando por cima do mesmo pixel.
   */
  zoomed?: ReactNode;
  zoomFactor?: number;
  /** Diâmetro da lupa em px. */
  lensSize?: number;
  className?: string;
}

/**
 * Lens — https://ui.aceternity.com/components/lens
 *
 * Uma lente redonda segue o cursor e amplia o pedaço da imagem embaixo dela.
 * Mesma técnica do original: uma cópia da imagem em escala, recortada por uma
 * `radial-gradient` em `mask-image` na posição do ponteiro.
 *
 * Diferenças:
 *
 * - A camada ampliada é `pointer-events: none`. No original ela cobre a área
 *   inteira e engole o clique; aqui a imagem precisa continuar abrindo o
 *   lightbox e respondendo ao arraste do carrossel (regras 4 e 24).
 * - Em `pointer: coarse` o componente não monta nada além de `children`: a
 *   lupa depende de hover e não tem equivalente no toque.
 */
export function Lens({
  children,
  zoomed,
  zoomFactor = 1.5,
  lensSize = 170,
  className,
}: LensProps) {
  const pointerFine = usePointerFine();
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (!pointerFine) return <div className={cn('lens', className)}>{children}</div>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const maskImage = `radial-gradient(circle ${lensSize / 2}px at ${position.x}px ${position.y}px, black 100%, transparent 100%)`;

  return (
    <div
      className={cn('lens', className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      <AnimatePresence>
        {hovering && (
          <motion.div
            className="lens-zoom"
            // Com movimento reduzido a lente aparece direto no tamanho final:
            // a lupa continua funcionando, some só a entrada em escala.
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: reduceMotion ? 0 : DURATION.normal, ease: EASE.standard }}
            style={{
              maskImage,
              WebkitMaskImage: maskImage,
              transformOrigin: `${position.x}px ${position.y}px`,
            }}
          >
            <div
              className="lens-zoom-inner"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${position.x}px ${position.y}px`,
              }}
            >
              {zoomed ?? children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
