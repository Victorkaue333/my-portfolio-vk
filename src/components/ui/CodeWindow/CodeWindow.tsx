import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { expertise } from '../../../data/expertise';
import { experiences } from '../../../data/experiences';
import { projects } from '../../../data/projects';
import './CodeWindow.css';

/**
 * `developer.ts` — a mesma informação da página, escrita como código.
 *
 * Nada aqui é digitado à mão: o papel vem do i18n (`hero.role`/`hero.tech`),
 * a stack sai de `data/expertise.ts`, e os dois números são contagens de
 * `data/projects.ts` e `data/experiences.ts`. Se um projeto entrar na pasta de
 * dados, o objeto muda junto — é por isso que ele pode ficar na página sem
 * virar mais um lugar para a informação envelhecer.
 *
 * O efeito é pequeno de propósito (regra 22): as linhas entram uma a uma na
 * primeira vez que o bloco aparece, e só. Com `prefers-reduced-motion` o
 * objeto já nasce inteiro.
 */

type Token = { text: string; kind?: 'key' | 'str' | 'num' | 'kw' | 'punct' };

function CodeLine({ tokens, indent = 0 }: { tokens: Token[]; indent?: number }) {
  return (
    <>
      {indent > 0 && <span className="code-indent">{'  '.repeat(indent)}</span>}
      {tokens.map((tk, i) => (
        <span key={i} className={tk.kind ? `code-${tk.kind}` : undefined}>
          {tk.text}
        </span>
      ))}
    </>
  );
}

export function CodeWindow({ className }: { className?: string }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Quatro linguagens/frameworks, na ordem em que estão nos dados.
  const stack = [
    ...(expertise[0]?.items ?? []).slice(0, 2),
    ...(expertise[1]?.items ?? []).slice(0, 2),
  ].map((i) => i.name);

  const str = (v: string): Token[] => [{ text: `"${v}"`, kind: 'str' }];

  const rows: ReactNode[] = [
    <CodeLine
      key="open"
      tokens={[
        { text: 'const ', kind: 'kw' },
        { text: 'developer' },
        { text: ' = {', kind: 'punct' },
      ]}
    />,
    <CodeLine key="name" indent={1} tokens={[{ text: 'name: ', kind: 'key' }, ...str('Victor Kauê'), { text: ',', kind: 'punct' }]} />,
    <CodeLine
      key="role"
      indent={1}
      tokens={[{ text: 'role: ', kind: 'key' }, ...str(`${t('hero.role')} ${t('hero.tech')}`.trim()), { text: ',', kind: 'punct' }]}
    />,
    <CodeLine
      key="stack"
      indent={1}
      tokens={[
        { text: 'stack: ', kind: 'key' },
        { text: '[', kind: 'punct' },
        ...stack.flatMap((s, i): Token[] => [
          { text: `"${s}"`, kind: 'str' },
          ...(i < stack.length - 1 ? [{ text: ', ', kind: 'punct' as const }] : []),
        ]),
        { text: '],', kind: 'punct' },
      ]}
    />,
    <CodeLine
      key="projects"
      indent={1}
      tokens={[
        { text: 'projects: ', kind: 'key' },
        { text: String(projects.length), kind: 'num' },
        { text: ',', kind: 'punct' },
      ]}
    />,
    <CodeLine
      key="orgs"
      indent={1}
      tokens={[
        { text: 'organizations: ', kind: 'key' },
        { text: String(experiences.length), kind: 'num' },
        { text: ',', kind: 'punct' },
      ]}
    />,
    <CodeLine key="close" tokens={[{ text: '};', kind: 'punct' }]} />,
  ];

  return (
    <div ref={ref} className={['code-window', className].filter(Boolean).join(' ')} aria-label={t('codeWindow.label')} role="group">
      <div className="code-bar">
        <span className="code-dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="code-file">developer.ts</span>
      </div>

      <pre className={`code-body${shown ? ' is-shown' : ''}`}>
        <code>
          {rows.map((row, i) => (
            <span
              className="code-row"
              key={i}
              style={{ '--code-row-delay': `${i * 60}ms` } as React.CSSProperties}
            >
              <span className="code-gutter" aria-hidden="true">{i + 1}</span>
              {row}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
