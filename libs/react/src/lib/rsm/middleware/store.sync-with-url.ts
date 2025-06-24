/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator, StoreMutatorIdentifier } from 'zustand';

type StateKey = string;
type UrlKey = string;
type MappingKey = StateKey | { stateKey: StateKey; urlKey: UrlKey };

function assertUniqueKeys(items: MappingKey[]): void {
  const stateKeys = new Set<StateKey>();
  const urlKeys = new Set<UrlKey>();

  for (const item of items) {
    if (typeof item === 'object') {
      const { stateKey, urlKey } = item;

      if (stateKeys.has(stateKey)) {
        throw new Error(
          `syncWithUrl middleware options: duplicate stateKey found: '${stateKey}'`,
        );
      }
      if (urlKeys.has(urlKey)) {
        throw new Error(
          `syncWithUrl middleware options: duplicate urlKey found: '${urlKey}'`,
        );
      }

      stateKeys.add(stateKey);
      urlKeys.add(urlKey);
    } else {
      if (stateKeys.has(item)) {
        throw new Error(
          `syncWithUrl middleware options: duplicate key found: '${item}'`,
        );
      }

      stateKeys.add(item);
    }
  }
}

export type SyncOptions = {
  keys: MappingKey[];
  serialize?: Partial<Record<StateKey, (value: any) => string | undefined>>;
  deserialize?: Partial<Record<UrlKey, (value?: string) => any>>;
  replace?: boolean;
};

type SyncWithUrl = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  options: SyncOptions,
  f: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>;

type SyncWithUrlImpl = <T>(
  options: SyncOptions,
  f: StateCreator<T, [], []>,
) => StateCreator<T, [], []>;

function getNestedValue(obj: any, path: string): any {
  return path.includes('.')
    ? path.split('.').reduce((o, p) => o?.[p], obj)
    : obj[path];
}

function setNestedValue(obj: any, path: string, value: any): void {
  if (path.includes('.')) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const nestedObj = keys.reduce((o, key) => {
      if (!o[key]) o[key] = {};
      return o[key];
    }, obj);
    if (lastKey) {
      nestedObj[lastKey] = value;
    } else {
      throw new Error(`Invalid path: ${path}`);
    }
  } else {
    // If no nested path, just set the value directly
    obj[path] = value;
  }
}

function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  if (Array.isArray(target) && Array.isArray(source)) {
    // Optionally: override target array or merge uniquely
    return source as T;
  }

  if (isObject(target) && isObject(source)) {
    const result = { ...target } as any;
    for (const key in source) {
      if (source[key] === undefined) continue;

      if (isObject(source[key]) && isObject(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  return source as T;
}

const syncWithUrlImpl: SyncWithUrlImpl = (options, f) => (set, get, store) => {
  assertUniqueKeys(options.keys);

  const applyParamsToStore = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const state: Partial<ReturnType<typeof get>> = {};

    for (const key of options.keys) {
      const stateKey = typeof key === 'string' ? key : key.stateKey;
      const urlKey = typeof key === 'string' ? key : key.urlKey;
      const raw = searchParams.get(urlKey) ?? undefined;
      const deserialize = options.deserialize?.[urlKey];
      setNestedValue(state, stateKey, deserialize ? deserialize(raw) : raw);
    }

    set(deepMerge(get(), state));
  };

  applyParamsToStore();

  const setWithSyncedUrl: typeof set = (...a) => {
    set(...(a as Parameters<typeof set>));

    const state = get();
    const searchParams = new URLSearchParams(window.location.search);
    for (const key of options.keys) {
      const stateKey = typeof key === 'string' ? key : key.stateKey;
      const urlKey = typeof key === 'string' ? key : key.urlKey;
      const value = getNestedValue(state, stateKey);
      const serialize = options.serialize?.[stateKey];
      const serializedValue = serialize?.(value);
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        serializedValue === undefined
      ) {
        searchParams.delete(urlKey);
      } else {
        searchParams.set(urlKey, serializedValue ?? String(value));
      }
    }

    const newUrl =
      window.location.origin +
      (searchParams.size > 0
        ? `${window.location.pathname}?${searchParams}`
        : window.location.pathname);

    const currentUrl = window.location.href;
    if (newUrl !== currentUrl) {
      if (options.replace) window.history.replaceState({}, '', newUrl);
      else window.history.pushState({}, '', newUrl);
    }
  };

  store.setState = setWithSyncedUrl;

  const onPopState = () => applyParamsToStore();
  window.addEventListener('popstate', onPopState);

  // Support destroy (Zustand persist)
  const originalDestroy = (store as any).destroy;
  (store as any).destroy = () => {
    window.removeEventListener('popstate', onPopState);
    originalDestroy?.();
  };

  return f(setWithSyncedUrl, get, store);
};

export const syncWithUrl = syncWithUrlImpl as unknown as SyncWithUrl;
