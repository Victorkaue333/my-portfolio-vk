import type { CSSProperties, ElementType } from 'react';
import { cn } from '../../../utils/cn';
import './TextGenerate.css';

interface TextGenerateProps {
  /** Texto exibido; é dividido em palavras para o escalonamento. */
  text: string;
  className?: string;
  /** Elemento renderizado — o título do hero já vive dentro de um <h1>. */
  as?: ElementType;
  /** Deslocamento no escalonamento, para encadear duas linhas seguidas. */
  startIndex?: number;
  /** Segundos por palavra. */
  duration?: number;
  /** Segundos entre uma palavra e a seguinte. */
  stagger?: number;
}

/**
 * Text Generate Effect — https://ui.aceternity.com/components/text-generate-effect
 *
 * O texto aparece palavra a palavra saindo do desfoque. Duas mudanças em
 * relação ao original:
 *
 * 1. Em CSS, não com `useAnimate` do framer-motion. O hero é o primeiro
 *    conteúdo da rota `/` e a Home foi deliberadamente mantida fora do bundle
 *    de animação (ver comentários em Home.tsx); a animação é de opacity +
 *    filter, que o CSS resolve sem JS nenhum.
 * 2. Ritmo curto: `0.2s` de stagger no original faz um texto de 8 palavras
 *    levar quase 2s. Aqui o padrão fecha em ~600ms (regra 7 do briefing) e o
 *    texto já está no DOM desde a primeira pintura — quem lê rápido não
 *    espera nada, e o rastreador/leitor de tela nunca vê um elemento vazio.
 *
 * As palavras ficam `display: inline`: em `inline-block` elas viram caixas
 * indivisíveis e a quebra de linha do mobile (`word-break`) deixaria de
 * valer.
 *
 * A animação só reinicia se o nó for remontado — trocar de idioma recria o
 * texto (e aí reanimar é o certo); um re-render qualquer não mexe nela.
 */
export function TextGenerate({
  text,
  className,
  as: Tag = 'span',
  startIndex = 0,
  duration = 0.45,
  stagger = 0.07,
}: TextGenerateProps) {
  const words = text.split(' ');

  return (
    <Tag
      className={cn('text-generate', className)}
      style={
        {
          '--tg-duration': `${duration}s`,
          '--tg-stagger': `${stagger}s`,
        } as CSSProperties
      }
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="tg-word"
          style={{ '--tg-index': startIndex + i } as CSSProperties}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
