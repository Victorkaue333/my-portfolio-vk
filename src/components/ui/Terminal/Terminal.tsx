import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './Terminal.css';

/** Uma linha impressa. `content` aceita nó React para caber link em saída. */
export interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: ReactNode;
}

/** O que um comando devolve: linhas para imprimir ou o pedido de limpar a tela. */
export type TerminalResponse = { clear: true } | { lines: ReactNode[] };

/**
 * Traduz o texto digitado em resposta. É **sempre** uma função local sobre uma
 * lista fechada de comandos (ver `commands.tsx`): nada aqui executa o que a
 * pessoa digitou. Sem `eval`, sem `Function`, sem shell, sem chamada ao
 * servidor com o texto de entrada.
 */
export type TerminalResolver = (input: string) => TerminalResponse | Promise<TerminalResponse>;

export interface TerminalProps {
  /** Comandos digitados sozinhos na abertura, na ordem. */
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
  /** Libera o campo de digitação quando a abertura termina. */
  interactive?: boolean;
  /** Obrigatório com `interactive`: resolve o texto digitado. */
  resolve?: TerminalResolver;
  /** Rótulo acessível do campo de digitação. */
  inputLabel?: string;
  /** Linha de dica impressa quando o campo abre (ex.: 'digite "help"'). */
  hint?: string;
  /** Texto da linha de espera enquanto um comando assíncrono responde. */
  busyLabel?: string;
}

type Phase = 'idle' | 'typing' | 'executing' | 'outputting' | 'pausing' | 'done';

/** Quantos comandos o histórico (↑/↓) guarda. */
const HISTORY_LIMIT = 30;

/**
 * Terminal — https://ui.aceternity.com/components/terminal
 *
 * Janela estilo macOS que digita uma abertura sozinha quando entra na tela e,
 * com `interactive`, entrega o prompt para quem está lendo.
 *
 * Mudanças em relação ao oficial:
 *
 * 1. **Sem áudio.** O original carrega `/sounds/sound.ogg` e toca um clique a
 *    cada tecla. O `useAudio` inteiro foi removido — não há arquivo de som no
 *    projeto e autoplay de áudio está proibido pelo briefing (regra 15).
 * 2. **Sem framer-motion.** O `useInView` virou um `IntersectionObserver`;
 *    /sobre não carrega o pacote de animação.
 * 3. **Cores do tema.** O prompt oficial é azul/verde/âmbar do Tailwind; aqui
 *    sai do accent e dos neutros do design system (CSS ao lado).
 * 4. **Interativo.** O componente oficial só reproduz uma sessão gravada.
 *    Aqui, terminada a abertura, aparece um campo real: Enter executa,
 *    ↑/↓ navegam o histórico, `clear` limpa. A interpretação é um `switch`
 *    sobre lista fechada (`commands.tsx`) — o terminal **não** é um shell.
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
  interactive = false,
  resolve,
  inputLabel,
  hint,
  busyLabel = '…',
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [commandIdx, setCommandIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [outputIdx, setOutputIdx] = useState(-1);
  const [phase, setPhase] = useState<Phase>('idle');

  // Estado do prompt interativo.
  const [draft, setDraft] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [busy, setBusy] = useState(false);

  const currentCommand = commands[commandIdx] ?? '';
  const currentOutputs = useMemo(() => outputs[commandIdx] ?? [], [outputs, commandIdx]);
  const isLastCommand = commandIdx === commands.length - 1;
  const live = interactive && phase === 'done';

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
      const all: TerminalLine[] = [];
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

  // A dica entra uma única vez, quando o prompt abre.
  const hintDone = useRef(false);
  useEffect(() => {
    if (!live || !hint || hintDone.current) return;
    hintDone.current = true;
    setLines((prev) => [...prev, { type: 'output', content: hint }]);
  }, [live, hint]);

  // Mantém a última linha à vista sem rolar a página.
  useEffect(() => {
    const el = contentRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, phase, busy]);

  const submit = useCallback(
    (raw: string) => {
      const value = raw.trim();
      setDraft('');
      setHistoryIdx(-1);
      if (!resolve) return;

      // Enter vazio só ecoa o prompt, como em um shell de verdade.
      setLines((prev) => [...prev, { type: 'command', content: value }]);
      if (!value) return;

      setHistory((prev) => [value, ...prev.filter((h) => h !== value)].slice(0, HISTORY_LIMIT));

      const apply = (res: TerminalResponse) => {
        if ('clear' in res) {
          setLines([]);
          return;
        }
        setLines((prev) => [...prev, ...res.lines.map((content) => ({ type: 'output' as const, content }))]);
      };

      const result = resolve(value);
      if (result instanceof Promise) {
        setBusy(true);
        result
          .then(apply)
          .catch(() => setLines((prev) => [...prev, { type: 'error', content: busyLabel }]))
          .finally(() => setBusy(false));
      } else {
        apply(result);
      }
    },
    [resolve, busyLabel],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      if (history.length === 0) return;
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setDraft(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < 0) return;
      e.preventDefault();
      const next = historyIdx - 1;
      setHistoryIdx(next);
      setDraft(next < 0 ? '' : history[next] ?? '');
    }
  };

  // Clique em qualquer lugar do corpo devolve o foco ao campo — menos quando a
  // pessoa está selecionando texto para copiar.
  const focusInput = () => {
    if (!live) return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

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
      className={cn('terminal', interactive && 'is-interactive', className)}
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

        <div
          ref={contentRef}
          className="terminal-body"
          onClick={focusInput}
          {...(live ? { role: 'log', 'aria-live': 'polite' as const } : {})}
        >
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

          {busy && <p className="terminal-line is-output terminal-busy">{busyLabel}</p>}

          {live && !busy && (
            <form
              className="terminal-line is-command terminal-form"
              onSubmit={(e) => {
                e.preventDefault();
                submit(draft);
              }}
            >
              {prompt}
              <input
                ref={inputRef}
                className="terminal-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label={inputLabel ?? label}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
              />
            </form>
          )}

          {!live && (phase === 'done' || phase === 'pausing' || phase === 'outputting') && (
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
