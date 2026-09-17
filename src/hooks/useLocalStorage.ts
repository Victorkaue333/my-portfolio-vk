import { useEffect, useState } from 'react';

/** Id do último projeto aberto em /projetos/:id — destacado na listagem. */
export const LAST_PROJECT_KEY = 'vk_last_project';

/**
 * Leitura/escrita tolerantes: storage pode estar bloqueado (aba anônima,
 * cookies desativados) ou conter JSON corrompido. Nunca lança.
 */
export function readStorage<T>(key: string, storage: Storage | null = safeLocal()): T | null {
  try {
    const raw = storage?.getItem(key);
    return raw == null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: unknown, storage: Storage | null = safeLocal()): void {
  try { storage?.setItem(key, JSON.stringify(value)); } catch { /* storage bloqueado — ignora */ }
}

function safeLocal(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}

/**
 * `useState` persistido em localStorage. `isValid` descarta valores salvos
 * que não fazem mais sentido (ex.: categoria removida dos dados).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  isValid: (value: unknown) => value is T = (_v): _v is T => true,
) {
  const [value, setValue] = useState<T>(() => {
    const stored = readStorage<unknown>(key);
    return stored !== null && isValid(stored) ? stored : initialValue;
  });

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
