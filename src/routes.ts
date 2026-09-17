import { lazy, type ComponentType } from 'react';
import { matchPath } from 'react-router-dom';
import { pages } from './config/pages';

/**
 * Carregadores de rota derivados de src/config/pages.ts, para que `lazy()` e o
 * prefetch apontem para o mesmo `import()` — e, portanto, para o mesmo chunk.
 *
 * Sem prefetch, clicar num link começava a baixar o chunk da página só depois
 * do clique: o usuário via o spinner enquanto a rede trabalhava. Chamar o
 * mesmo `import()` no hover/foco antecipa isso; a segunda chamada resolve
 * pela cache de módulos, então repetir é de graça.
 *
 * `import.meta.glob` sem `eager` gera um `import()` por arquivo: cada página
 * continua num chunk próprio, com a mesma chave no manifest que `entry`.
 */
type PageModule = { default: ComponentType };

const modules = import.meta.glob<PageModule>('/src/pages/*/*.tsx');

const loaderFor = (entry: string) => {
  const load = modules[`/${entry}`];
  if (!load) throw new Error(`[routes] página não encontrada: ${entry}`);
  return load;
};

export const routes = pages.map((page) => {
  const load = loaderFor(page.entry);
  return { path: page.path, load, Component: lazy(load) };
});

/** Baixa o chunk da rota antes do clique. Erro de rede é ignorado de propósito:
 *  é só uma antecipação — a navegação de verdade tenta de novo. */
export function prefetchRoute(path: string): void {
  const route = routes.find((r) => r.path !== '*' && matchPath(r.path, path));
  if (route) void route.load().catch(() => {});
}
