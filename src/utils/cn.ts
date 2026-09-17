/**
 * Junta classes ignorando `false`/`undefined`/`''`.
 *
 * Os componentes do Aceternity usam `cn()` de `@/lib/utils`, que lá é
 * clsx + tailwind-merge. Aqui o estilo mora em CSS por componente (ver
 * CLAUDE.md), então não há classes Tailwind conflitantes para resolver —
 * um join simples cobre o uso e evita duas dependências novas.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
