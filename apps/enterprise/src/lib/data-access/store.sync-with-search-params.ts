import { StateCreator, StoreMutatorIdentifier } from 'zustand';

type SyncConfig = {
  keys: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize?: Partial<Record<string, (value: any) => string | undefined>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize?: Partial<Record<string, (value: string) => any>>;
  replace?: boolean;
};

type SyncWithSearchParams = <T, Mps extends [StoreMutatorIdentifier, unknown][] = [], Mcs extends [StoreMutatorIdentifier, unknown][] = []>(
  config: SyncConfig,
  f: StateCreator<T, Mps, Mcs>
) => StateCreator<T, Mps, Mcs>;

type SyncWithSearchParamsImpl = <T>(config: SyncConfig, f: StateCreator<T, [], []>) => StateCreator<T, [], []>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string): any {
  return path.includes('.') ? path.split('.').reduce((o, p) => o?.[p], obj) : obj[path];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setNestedValue(obj: any, path: string, value: any): void {
  const parts = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const last = parts.pop()!;
  const target = parts.reduce((o, p) => (o[p] = o[p] || {}), obj);
  target[last] = value;
}

const syncWithSearchParamsImpl: SyncWithSearchParamsImpl = (config, f) => (set, get, store) => {
  const applyParamsToStore = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const state: Partial<ReturnType<typeof get>> = {};

    for (const key of config.keys) {
      const raw = searchParams.get(key);
      if (raw !== null) {
        const deserialize = config.deserialize?.[key];
        setNestedValue(state, key, deserialize ? deserialize(raw) : raw);
      }
    }

    set(state);
  };

  applyParamsToStore();

  const setWithSyncedSearchParams: typeof set = (...a) => {
    set(...(a as Parameters<typeof set>));

    const state = get();

    const searchParams = new URLSearchParams(window.location.search);
    for (const key of config.keys) {
      const value = getNestedValue(state, key);
      const serialize = config.serialize?.[key];
      const serializedValue = serialize?.(value);
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        serializedValue === undefined
      ) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, serializedValue ?? String(value));
      }
    }

    const newUrl = searchParams.size > 0 ? `${window.location.pathname}?${searchParams}` : window.location.pathname;
    if (config.replace) {
      window.history.replaceState({}, '', newUrl);
    } else {
      window.history.pushState({}, '', newUrl);
    }
  };

  store.setState = setWithSyncedSearchParams;

  const onPopState = () => applyParamsToStore();
  window.addEventListener('popstate', onPopState);

  // Support destroy (Zustand persist)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalDestroy = (store as any).destroy;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store as any).destroy = () => {
    window.removeEventListener('popstate', onPopState);
    originalDestroy?.();
  };

  return f(setWithSyncedSearchParams, get, store);
};

export const syncWithSearchParams = syncWithSearchParamsImpl as unknown as SyncWithSearchParams;
