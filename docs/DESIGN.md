# DESIGN

Design system do portfólio: identidade, tokens, tipografia, movimento,
componentes e as regras de interação que valem para toda tela nova.

**Fontes da verdade** — este documento descreve; se divergir do código, o
código vence e o documento é corrigido:

| O quê | Onde |
| --- | --- |
| Tokens (cor, espaço, raio, sombra, z-index, transição) | `src/styles/variables.css` |
| Tokens de movimento para JS (framer-motion) | `src/config/motion.ts` |
| Base, tipografia, utilitários, reveal | `src/styles/reset.css` · `src/styles/global.css` |
| Hover Border Gradient (`.hbg`) | `src/styles/interactions.css` |
| Ajustes do tema claro | `src/styles/light-overrides.css` |
| Componentes | `src/components/ui/<Nome>/` (`.tsx` + `.css`) |
| Ícones de tecnologia | `TECH_ICONS` em `src/components/ui/TechIcon/TechIcon.tsx` |

---

## 1. Identidade

- **Dark premium com uma única cor de marca: laranja** (`#ff7a00` no escuro,
  `#f97316` no claro). Tudo o mais é neutro.
- **Tema escuro é o padrão.** O claro (branco + slate + laranja) é
  alternativa, escolhida pelo visitante e persistida.
- **Uma identidade só.** Efeitos trazidos de bibliotecas (Aceternity, ver
  ADR-0012) são portados para os tokens do projeto — nunca entram com a paleta
  azul/roxo/rosa das demos.
- Textura: grão de ruído fixo sobre a página (`body::after`, opacidade 1,8%),
  parado com `prefers-reduced-motion`.

---

## 2. Princípios de interação

Regras do briefing da camada de interação (ADR-0012), citadas pelo número nos
comentários do código. Toda UI nova segue as mesmas.

| Regra | Princípio | Exemplo no código |
| --- | --- | --- |
| 3 | Cor só dos tokens. Nenhum segundo laranja escrito à mão, nenhuma segunda identidade visual. | `Spotlight`, `GlowingEffect` derivam do `--accent-color` |
| 4 | Ampliar (lupa) só onde tem função: screenshots. Nunca em logo, avatar ou ícone. | `Lens` no `ProjectCarousel` |
| 5 | O efeito muda a apresentação, não o comportamento: estado, dados e filtros ficam como estavam. | `AnimatedTabs` sobre o filtro de Projetos |
| 7 | Ritmo curto: texto animado fecha em ~600 ms e já está no DOM desde a primeira pintura. | `TextGenerate` |
| 8 | Efeito entra por classe sobre o componente que já existe — sem trocar o JSX. Borda animada só em botão sem preenchimento sólido. | `.hbg` nos botões não `primary` |
| 11 | Teto de intensidade para foco/desfoque: direciona a atenção, não esconde (ex.: opacidade 0,65, blur 1,5px). | Grade de certificados |
| 13 | Nada de reflexo branco estourado. Brilho só nos destaques da Home. | `GlareCard` |
| 15 | Sem autoplay de áudio. | `Terminal` |
| 16 | Uma integração, uma fonte: card e terminal leem o mesmo módulo. | `utils/spotify.ts`, `utils/github.ts` |
| 17 | Acento em opacidade baixa: acende a região, não tinge o card. | `CardSpotlight` |
| 18 | **Um efeito por hover.** Duas animações disputando o mesmo elemento é proibido. | `.btn.hbg` desliga o shimmer |
| 19 | Sem bounce nem mola elástica. Única mola: o indicador das abas, contida. | `EASE`, `SPRING_TAB` |
| 20 | Nada depende da animação para ser lido. Com movimento reduzido, o conteúdo aparece pronto. | `Timeline`, `TextGenerate` |
| 21 | Toque (`pointer: coarse`) não monta listeners de ponteiro. Nenhuma rolagem horizontal em nenhuma largura. | `GlowingEffect`, `GlareCard`, `Terminal` |
| 22 | Efeito pequeno, uma vez: entra na primeira aparição e para. | `CodeWindow` |
| 23 | Foco de teclado nunca vai para elemento fora da tela. | Navbar volta ao receber foco |
| 24 | Não quebrar layout, foco nem as classes do design system. Campo de texto com ≥16px (senão o iOS dá zoom). | `.terminal-input` |
| 28 | Realce de código derivado do accent e dos neutros. | `CodeWindow` |

---

## 3. Cor

### Tokens semânticos

Use sempre o token semântico, não a escala `--color-*`.

| Token | Escuro | Claro | Uso |
| --- | --- | --- | --- |
| `--bg-color` | `#050505` | `#f8fafc` | Fundo da página |
| `--bg-alt` | `#0a0a0a` | `#f1f5f9` | Fundo alternativo de faixa |
| `--surface-color` | `#1a1a1a` | `#ffffff` | Superfície sólida |
| `--text-color` | `#ffffff` | `#0f172a` | Títulos e texto forte |
| `--text-muted-color` | `#cccccc` | `#334155` | Corpo |
| `--text-dim-color` | `#808080` | `#64748b` | Metadado, legenda, rótulo |
| `--border-color` | `#222222` | `#e2e8f0` | Borda visível |
| `--border-subtle` | `rgba(255,255,255,.05)` | `#e2e8f0` | Borda discreta de card |
| `--accent-color` | `#ff7a00` | `#f97316` | Marca: CTA, estado ativo, marcador |
| `--accent-hover` | `#e66e00` | `#ea580c` | Hover do accent; laranja em texto grande no claro |
| `--success-color` | `#10B981` | `#16a34a` | Status positivo (ex.: "Em produção") |

**Só no tema claro** (não existem no `:root`): `--accent-text` (`#c2410c`,
laranja como texto pequeno, AA 5.2:1 no branco), `--accent-soft`,
`--accent-border`, `--surface-soft-color`, `--border-strong`,
`--text-subtle-color`, `--warning-color`, `--error-color`, `--info-color`.
Para usá-los fora de `html.light`, dê fallback:
`color: var(--accent-text, var(--accent-color));`.

### Gradientes

| Token | Uso |
| --- | --- |
| `--gradient-primary` | Barras de acento, hover do botão secundário |
| `--gradient-orange-soft` | Fundo de destaque (badge, bloco de resultado) |
| `--gradient-surface` | Fundo de card |
| `--gradient-glow` | Brilho que segue o cursor (`--mouse-x/y`) |

### Regras

- **Laranja marca, não titula.** Eyebrow, número de seção, CTA, item ativo e
  ícone de acento são laranja; títulos ficam em `--text-color`.
- **Superfícies derivadas do texto invertem sozinhas.**
  `color-mix(in srgb, var(--text-color) 3%, transparent)` é branco translúcido
  no escuro e slate translúcido no claro — sem override de tema.
- Cor de marca de tecnologia (azul do Python, verde do Django…) só nos ícones
  do `TECH_ICONS`.

---

## 4. Tipografia

- **Família única: Manrope** variável (eixo `wght` 400–600), self-hosted em
  `/fonts` (subsets latin e latin-ext), com `preload` e `@font-face` inline no
  `index.html` e `font-display: swap`. `--font-primary` e `--font-secondary`
  apontam para ela.
- **Pesos: 400, 500 e 600.** Sem 700+ (a fonte servida não tem).

| Elemento | Tamanho | Detalhe |
| --- | --- | --- |
| `h1` | `clamp(2.5rem, 5vw, 3.5rem)` | 600, line-height 1.15, tracking −0.02em |
| `h1` do detalhe de projeto | `clamp(2.5rem, 5vw, 4rem)` | line-height 1.05 |
| `h2` | `clamp(1.75rem, 3.5vw, 2.4rem)` | tracking −0.03em |
| `h3` | `clamp(1.15rem, 2vw, 1.5rem)` | — |
| Corpo (`p`) | `1rem` | line-height 1.7, `--text-muted-color`, máx. 72ch |
| Lead do detalhe de projeto | `1.25rem` | máx. 60ch |
| Eyebrow / rótulo | `0.72–0.78rem` | 600, maiúsculas, tracking 0.12–0.14em |

Corpo nunca abaixo de 16px; campos de formulário com ≥16px.

---

## 5. Espaço, raio, sombra e camadas

| Espaço | Valor | | Raio | Valor |
| --- | --- | --- | --- | --- |
| `--spacing-xs` | 0.5rem | | `--radius-sm` | 0.5rem |
| `--spacing-sm` | 1rem | | `--radius-md` | 0.75rem |
| `--spacing-md` | 1.5rem | | `--radius-lg` | 1rem |
| `--spacing-lg` | 2rem | | `--radius-xl` | 1.5rem |
| `--spacing-xl` | 3.5rem | | `--radius-full` | 9999px |
| `--spacing-2xl` | 5rem | | | |

- **Sombras:** `--shadow-sm` → `--shadow-xl` (preto no escuro, slate no
  claro) e `--shadow-glow` (halo laranja).
- **z-index:** `--z-base` 1 · `--z-dropdown` 10 · `--z-sticky` 20 ·
  `--z-overlay` 30 · `--z-modal` 40 · `--z-toast` 50 · `--z-preloader` 9999.
  Nada de z-index solto fora da escala.

---

## 6. Layout e breakpoints

- **Container:** `.container` = `min(1200px, 100% − 2rem)` com 1rem de padding
  lateral (0.75rem em ≤768px).
- **Seção:** `.content-section` com `--spacing-2xl` no topo e
  `scroll-margin-top: 100px` (a navbar é fixa).
- **Navegação:** navbar flutuante no desktop; em **≤1024px** entra a
  MobileNavbar na base da tela, e o `body` reserva 7.5rem no rodapé.
- **Toque:** alvo mínimo de 44px (`button`); `.btn` tem 46px.

Breakpoints em uso (max-width, do mais para o menos frequente): **480px**,
**768px**, **1024px**, **640px**; pontuais em 900, 1280, 560 e 390. Layouts
de coluna lateral aparecem com min-width (ex.: sumário do detalhe de projeto
em ≥1100px). Testar sempre em 390px e 1440px — sem rolagem horizontal.

---

## 7. Movimento

| CSS (`variables.css`) | Valor | JS (`motion.ts`) | Valor |
| --- | --- | --- | --- |
| `--transition-fast` | 0.15s, curva padrão | `DURATION.fast` | 0.18s |
| `--transition-normal` | 0.25s, curva padrão | `DURATION.normal` | 0.3s |
| `--transition-slow` | 0.45s, desaceleração | `DURATION.slow` | 0.6s |

- Curvas: `EASE.standard` = `cubic-bezier(0.4, 0, 0.2, 1)`;
  `EASE.out` = `cubic-bezier(0.16, 1, 0.3, 1)` (entradas e trilhas).
- **Anime só `transform` e `opacity`.** Para hover, use os atalhos
  `--transition-ui-fast` / `--transition-ui-normal` em vez de `transition: all`.
- **Reveal ao rolar:** classe `.reveal-on-scroll`. Um único observador
  (`components/Layout/ScrollReveal`) revela o elemento com 28px de subida em
  0.7s; o escalonamento (70ms) conta só entre os que entram juntos. `<Reveal>`
  quando precisar de atraso próprio.
- **Framer-motion só onde já é carregado** (transições de página, `Lens`,
  `ProjectCarousel`). Efeito novo em CSS ou `requestAnimationFrame` — o pacote
  custa ~46 kB gzip na rota.
- **Troca de tema:** revelação circular com View Transitions a partir do botão
  (500ms). Sem a API, ou com movimento reduzido, a troca é direta.
- **Movimento reduzido:** o reset zera durações globalmente e cada componente
  mostra o estado final (regra 20).

---

## 8. Tema claro

- `html.light` sobrescreve os tokens em `variables.css`; a maior parte do site
  inverte sozinha. O tema fica em `localStorage` (`portfolio-theme`) e um script
  inline no `index.html` aplica a classe antes da primeira pintura (sem flash).
- `light-overrides.css` existe só para valores fixos pensados para o escuro, e
  **só mexe em cor** — nada de layout, espaço, tipografia ou animação.
- Especificidade: `html.light .x` (0,2,1) vence `.x:hover` (0,2,0). Ao
  sobrescrever o estado base, sobrescreva também os estados.
- Ordem de preferência para cor que funcione nos dois temas:
  1. token semântico;
  2. `color-mix()` sobre tokens;
  3. token só-claro com fallback (`var(--accent-text, var(--accent-color))`);
  4. só então uma regra em `light-overrides.css`.

---

## 9. Componentes

Um componente por pasta em `src/components/ui/`, `.tsx` + `.css` de mesmo nome.

| Componente | Papel |
| --- | --- |
| `Button` | Variantes `primary` (bloco laranja, com shimmer), `secondary`, `ghost` e `outline` (com `.hbg`). `href` interno vira `<Link>`; externo abre em nova aba com `noopener noreferrer`. |
| `PageHero` | Topo de página de menu: título em duas partes (`titleMain` + `titleAccent` laranja), subtítulo e ícone. |
| `ProjectCard` | Card do catálogo: capa 16:9 com `srcset`, até 5 ícones de tecnologia, links de projeto e código. |
| `ProjectCarousel` + `Lens` | Galeria do detalhe de projeto, com lupa só nas screenshots. |
| `TechIcon` / `TechGlyph` | Ícone de tecnologia por nome. Nome sem entrada no mapa vira texto (ou marcador neutro na tabela de stack). |
| `AnimatedTabs` | Abas com indicador deslizante (filtro de categoria). |
| `Reveal` | Revelação ao rolar com atraso próprio. |
| `CardSpotlight`, `GlowingEffect`, `GlareCard`, `Spotlight` | Efeitos de ponteiro — só em ponteiro fino, um por card. |
| `TextGenerate`, `Timeline`, `CodeWindow`, `Terminal` | Texto e sequência animados, dentro das regras 7, 20 e 22. |
| `FloatingLines` | Fundo animado do Hero em Canvas 2D (substituiu three.js, ADR-0005). |
| `LanguageSwitcher` | Seletor de idioma com bandeiras em SVG. |

---

## 10. Padrões de página

- **Página de menu:** `PageHero` → seções `.content-section` com
  `.section-title` (ícone laranja + título) e `.section-subtitle` (máx. 55ch).
- **Detalhe de projeto** (ADR-0014), nesta ordem:
  1. hero: selos de categoria e status, `h1`, lead, stack com nome, fatos
     (papel, time, duração), CTAs;
  2. vitrine (carrossel, logo ou monograma);
  3. sumário lateral fixo (≥1100px) + seções numeradas `01…07` separadas por
     filete: visão geral, do problema ao resultado, meu papel, funcionalidades,
     arquitetura, decisões técnicas, stack, próximos passos;
  4. CTA de fechamento e próximo projeto.
- **Hierarquia de rótulos:** número/eyebrow laranja = marcador; legenda
  cinza em maiúsculas = subtítulo; título de seção em `--text-color`.
- **Sem dado, sem bloco.** Seção ou métrica sem informação real não renderiza
  (ADR-0010) — nada de "Não aplicável" nem número de exemplo.

---

## 11. Imagens e ícones

- Imagens em `.webp` em `public/images/...`, referenciadas por caminho absoluto.
- **Capa de projeto:** origem 16:9 (1600×900). `npm run images:optimize` gera
  as variantes 480/640/800, o manifesto `src/data/image-variants.json` e o
  og:image quadrado (280px, JPEG) por slug. A capa precisa estar em
  `PROJECT_COVERS` no script.
- **Projeto sem screenshot:** logo sobre fundo escuro ou capa-título (nome +
  stack). Nunca uma tela simulada.
- **Ícones de interface:** Feather (`react-icons/fi`). **Ícones de tecnologia:**
  Simple Icons via `TECH_ICONS` — tecnologia nova exige uma entrada lá.

---

## 12. Acessibilidade

- Foco visível em tudo: `outline` 2px no accent, `offset` 3px (só para
  teclado, via `:focus-visible`).
- Contraste: laranja em texto pequeno no claro usa `--accent-text` (AA).
- Alvos de toque ≥44px; campos ≥16px.
- `prefers-reduced-motion` respeitado em todo efeito; nenhum conteúdo depende
  de animação.
- Efeitos de ponteiro não montam em telas de toque.
- Texto só para leitor de tela: classe `<prefixo>-sr-only` no CSS do próprio
  componente (ex.: `pd-sr-only`, `gh-sr-only`).

---

## 13. Checklist para UI nova

1. Cor, espaço, raio, sombra e z-index vêm de token.
2. Pasta própria em `src/components/ui/` (ou na página), `.tsx` + `.css`.
3. Texto visível via i18n, nos 4 idiomas.
4. Um efeito por hover; só `transform`/`opacity`; movimento reduzido e
   `pointer: coarse` tratados.
5. Conferido no escuro e no claro, em 390px e 1440px, sem rolagem horizontal.
6. `npm run build` e `npm run test:e2e` passando.

---

## 14. Pendências conhecidas

- `--radius-2xl` é usado em dois lugares (monograma e moldura de logo no
  detalhe de projeto) mas não está definido em `variables.css` — hoje cai em
  raio zero.
- `--transition-*` (CSS) e `DURATION` (JS) não batem exatamente (150/250/450ms
  × 180/300/600ms), apesar de o comentário dizer que se espelham.
- `::selection` e alguns estados de botão ainda usam `rgba(245, 158, 11, …)`
  (âmbar), resquício de uma paleta anterior; a marca é `#ff7a00`.
- `.decision-label` em `light-overrides.css` é seletor órfão (a classe saiu
  com o ADR-0014).
