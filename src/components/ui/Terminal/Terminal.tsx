import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import './Terminal.css';

export interface TerminalProps {
  /** Comandos digitados, na ordem. */
  commands: string[];
  /** Linhas impressas depois do comando de índice N. */
  outputs?: Record<number, string[]>;
  /** Texto antes do `:~$` — rótulo do prompt, não um host real. */
  username?: string;
  /** Milissegundos por caractere. */
  typingSpeed?: number;
  /** Pausa entre um comando e o próximo, em ms. */
  delayBetweenCommands?: number;
  /** Espera antes de começar a digitar, em ms. */
  initialDelay?: number;
  className?: string;
  /** Rótulo do bloco para leitores de tela. */
  label: string;
}

type Phase = 'idle' | 'typing' | 'executing' | 'outputting' | 'pausing' | 'done';

interface Line {
  type: 'command' | 'output';
  content: string;
}

/**
 * Terminal — https://ui.aceternity.com/components/terminal
 *
 * Janela estilo macOS que digita comandos sozinha quando entra na tela.
 *
 * Três mudanças em relação ao oficial:
 *
 * 1. **Sem áudio.** O original carrega `/sounds/sound.ogg` e toca um clique a
 *    cada tecla. O `useAudio` inteiro foi removido — não há arquivo de som no
 *    projeto e autoplay de áudio está proibido pelo briefing (regra 15).
 * 2. **Sem framer-motion.** O `useInView` virou um `IntersectionObserver`;
 *    /sobre não carrega o pacote de animação.
 * 3. **Cores do tema.** O prompt oficial é azul/verde/âmbar do Tailwind; aqui
 *    sai do accent e dos neutros do design system (CSS ao lado). O
 *    destacador de sintaxe por token também saiu: as saídas aqui são texto
 *    corrido, não comandos com flags e caminhos.
 *
 * O conteúdo completo já está no DOM ao fim da animação e, com movimento
 * reduzido, aparece inteiro de uma vez — nunca depende da digitação.
 */
export function Terminal({
  commands,
  outputs = {},
  username = 'victor@portfolio',
  typingSpeed = 38,
  delayBetweenCommands = 600,
  initialDelay = 350,
  className,
  label,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [commandIdx, setCommandIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [outputIdx, setOutputIdx] = useState(-1);
  const [phase, setPhase] = useState<Phase>('idle');

  const currentCommand = commands[commandIdx] ?? '';
  const currentOutputs = useMemo(() => outputs[commandIdx] ?? [], [outputs, commandIdx]);
  const isLastCommand = commandIdx === commands.length - 1;

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Só digita quando o bloco está visível — e para de observar depois disso.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || phase !== 'idle') return;

    // Movimento reduzido: a sessão inteira aparece de uma vez.
    if (reduceMotion) {
      const all: Line[] = [];
      commands.forEach((command, i) => {
        all.push({ type: 'command', content: command });
        (outputs[i] ?? []).forEach((out) => all.push({ type: 'output', content: out }));
      });
      setLines(all);
      setPhase('done');
      return;
    }

    const t = setTimeout(() => setPhase('typing'), initialDelay);
    return () => clearTimeout(t);
  }, [inView, phase, reduceMotion, initialDelay, commands, outputs]);

  useEffect(() => {
    if (phase !== 'typing') return;

    if (charIdx < currentCommand.length) {
      const t = setTimeout(() => {
        setCurrentText(currentCommand.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setPhase('executing'), 90);
    return () => clearTimeout(t);
  }, [phase, charIdx, currentCommand, typingSpeed]);

  useEffect(() => {
    if (phase !== 'executing') return;
    setLines((prev) => [...prev, { type: 'command', content: currentCommand }]);
    setCurrentText('');

    if (currentOutputs.length > 0) {
      setOutputIdx(0);
      setPhase('outputting');
    } else {
      setPhase(isLastCommand ? 'done' : 'pausing');
    }
  }, [phase, currentCommand, currentOutputs.length, isLastCommand]);

  useEffect(() => {
    if (phase !== 'outputting') return;

    const next = outputIdx >= 0 ? currentOutputs[outputIdx] : undefined;
    if (next !== undefined) {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, { type: 'output', content: next }]);
        setOutputIdx((i) => i + 1);
      }, 120);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setPhase(isLastCommand ? 'done' : 'pausing'), 250);
    return () => clearTimeout(t);
  }, [phase, outputIdx, currentOutputs, isLastCommand]);

  useEffect(() => {
    if (phase !== 'pausing') return;
    const t = setTimeout(() => {
      setCharIdx(0);
      setOutputIdx(-1);
      setCommandIdx((c) => c + 1);
      setPhase('typing');
    }, delayBetweenCommands);
    return () => clearTimeout(t);
  }, [phase, delayBetweenCommands]);

  // Mantém a última linha à vista sem rolar a página.
  useEffect(() => {
    const el = contentRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, phase]);

  const prompt = (
    <span className="terminal-prompt" aria-hidden="true">
      <span className="terminal-user">{username}</span>
      <span className="terminal-path">:~</span>
      <span className="terminal-sigil">$</span>{' '}
    </span>
  );

  return (
    <div
      ref={containerRef}
      className={cn('terminal', className)}
      role="group"
      aria-label={label}
    >
      <div className="terminal-window">
        <div className="terminal-bar">
          <span className="terminal-dots" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="terminal-bar-title">{username} — bash</span>
        </div>

        <div ref={contentRef} className="terminal-body">
          {lines.map((line, i) => (
            <p key={i} className={`terminal-line is-${line.type}`}>
              {line.type === 'command' ? (
                <>
                  {prompt}
                  <span className="terminal-command">{line.content}</span>
                </>
              ) : (
                line.content
              )}
            </p>
          ))}

          {phase === 'typing' && (
            <p className="terminal-line is-command">
              {prompt}
              <span className="terminal-command">{currentText}</span>
              <span className="terminal-cursor is-typing" aria-hidden="true" />
            </p>
          )}

          {(phase === 'done' || phase === 'pausing' || phase === 'outputting') && (
            <p className="terminal-line is-command">
              {prompt}
              <span className="terminal-cursor" aria-hidden="true" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
