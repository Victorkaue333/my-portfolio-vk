import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import './AnimatedTabs.css';

export interface AnimatedTab {
  /** Valor usado pela lógica de filtro de quem consome o componente. */
  value: string;
  /** Rótulo visível (já traduzido). */
  title: string;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AnimatedTabsProps {
  tabs: AnimatedTab[];
  /** Valor ativo — o estado continua morando na página. */
  active: string;
  onChange: (value: string) => void;
  /** Rótulo do grupo para leitores de tela. */
  label: string;
  className?: string;
}

/**
 * Animated Tabs — https://ui.aceternity.com/components/tabs
 *
 * O que interessa do componente oficial é o indicador que desliza por baixo do
 * rótulo ativo. Duas diferenças conscientes:
 *
 * 1. O original também traz um baralho de cards 3D (`FadeInDiv`) que empilha o
 *    conteúdo de cada aba. Ficou de fora: aqui as abas filtram uma grade que
 *    já existe, e o briefing pede que só a apresentação mude (regra 5).
 * 2. O deslize é feito com `layoutId` do framer-motion no original. A rota
 *    /projetos não carrega o framer hoje; medir o botão ativo e mover um
 *    `<span>` absoluto dá o mesmo resultado sem um chunk novo na rota.
 *
 * Semântica: são botões de filtro com `aria-pressed`, não abas ARIA — não há
 * `tabpanel` correspondente, e anunciar "aba" para um filtro de grade
 * confundiria quem navega por leitor de tela.
 */
export function AnimatedTabs({ tabs, active, onChange, label, className }: AnimatedTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<Rect | null>(null);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const current = list.querySelector<HTMLButtonElement>('[data-active="true"]');
    if (!current) return;
    // `offsetTop`/`offsetHeight` entram porque em 320px os rótulos quebram em
    // duas linhas — sem eles o indicador ficaria preso na primeira.
    setIndicator({
      x: current.offsetLeft,
      y: current.offsetTop,
      width: current.offsetWidth,
      height: current.offsetHeight,
    });
  }, []);

  // useLayoutEffect: posiciona antes da pintura, senão o indicador aparece na
  // origem e só depois salta para o botão certo.
  useLayoutEffect(() => {
    measure();
  }, [measure, active, tabs]);

  // Troca de idioma muda a largura dos rótulos; quebra de linha em telas
  // estreitas muda o `offsetLeft`. O observer cobre os dois casos.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <div ref={listRef} className={cn('animated-tabs', className)} role="group" aria-label={label}>
      {indicator && (
        <span
          className="animated-tabs-indicator"
          aria-hidden="true"
          style={{
            transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
            width: indicator.width,
            height: indicator.height,
          }}
        />
      )}
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className="animated-tab"
          data-active={tab.value === active}
          aria-pressed={tab.value === active}
          onClick={() => onChange(tab.value)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}
