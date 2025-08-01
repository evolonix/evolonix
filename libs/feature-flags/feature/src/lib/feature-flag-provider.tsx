import flagsmith from 'flagsmith';
import type { IFlagsmithFeature } from 'flagsmith/types';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useRouteLoaderData } from 'react-router';

// === Types ===

export type FeatureFlags = Record<string, boolean>;

export const LOCAL_STORAGE_KEY = 'featureFlags';

// === Context ===

interface FeatureFlagContextType {
  flags: FeatureFlags;
  setFlags: (newFlags: FeatureFlags) => void;
  resetFlags: () => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(
  undefined,
);

// === Hooks ===

export function useFeatureFlags(): FeatureFlagContextType {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error(
      'useFeatureFlags must be used within a FeatureFlagProvider',
    );
  }
  return context;
}

export function useFeatureFlag(key: string): boolean {
  const { flags } = useFeatureFlags();
  return Boolean(flags[key]);
}

// === Utilities ===

function getStoredFlags(key = LOCAL_STORAGE_KEY): FeatureFlags {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function storeFlags(flags: FeatureFlags, key = LOCAL_STORAGE_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify(flags));
  } catch {
    // Ignore storage errors
  }
}

function clearStoredFlags(key = LOCAL_STORAGE_KEY) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}

function clearFlagsInUrl(search: string, pathname: string) {
  const queryParams = new URLSearchParams(search);
  queryParams.delete('feature');
  queryParams.delete('disable');
  const newUrl = `${pathname}?${queryParams.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

function extractFlagsFromFlagsmith(
  remoteFlags: Record<
    string,
    IFlagsmithFeature<string | number | boolean | null>
  >,
): FeatureFlags {
  const result: FeatureFlags = {};
  for (const key in remoteFlags) {
    result[key] = !!remoteFlags[key]?.enabled;
  }
  return result;
}

// === Provider ===

interface FeatureFlagProviderProps {
  children: ReactNode;
  initialFlags?: FeatureFlags;
  flagsmithEnvironmentId?: string;
  identity?: string;
  storageKey?: string;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({
  children,
  initialFlags,
  flagsmithEnvironmentId,
  identity,
  storageKey = LOCAL_STORAGE_KEY,
}) => {
  const { pathname, search } = useLocation();
  const routeData = useRouteLoaderData('root') as
    | { featureFlags?: FeatureFlags }
    | undefined;

  const loaderFlags = useMemo(() => routeData?.featureFlags ?? {}, [routeData]);

  const ssrSafeFlags = {
    ...loaderFlags,
    ...initialFlags,
  };

  // ✅ Initial SSR-safe render
  const [flags, setFlagsInternal] = useState<FeatureFlags>(ssrSafeFlags);

  const setFlags = (newFlags: FeatureFlags) => {
    setFlagsInternal(newFlags);
    storeFlags(newFlags, storageKey);
  };

  const resetFlags = () => {
    clearStoredFlags(storageKey);
    clearFlagsInUrl(search, pathname);
    setFlagsInternal(ssrSafeFlags);
    storeFlags(ssrSafeFlags, storageKey);
  };

  const setAndStoreFlags = useCallback(() => {
    const storedFlags = getStoredFlags(storageKey);

    const queryParams = new URLSearchParams(search);
    const enabled =
      queryParams.get('feature')?.split(',').filter(Boolean) ?? [];
    const disabled =
      queryParams.get('disable')?.split(',').filter(Boolean) ?? [];

    const urlFlags: FeatureFlags = {
      ...Object.fromEntries(enabled.map((key) => [key, true])),
      ...Object.fromEntries(disabled.map((key) => [key, false])),
    };

    const flagsmithFlags = extractFlagsFromFlagsmith(flagsmith.getAllFlags());

    const merged: FeatureFlags = {
      ...ssrSafeFlags,
      ...flagsmithFlags,
      ...storedFlags,
      ...urlFlags,
    };

    setFlagsInternal(merged);
    storeFlags(merged, storageKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ✅ Apply client-only sources on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setAndStoreFlags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ✅ Initialize Flagsmith client-side only
  useEffect(() => {
    if (!flagsmithEnvironmentId || typeof window === 'undefined') return;

    flagsmith.init({
      environmentID: flagsmithEnvironmentId,
      identity,
      onChange: setAndStoreFlags,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagsmithEnvironmentId, identity]);

  return (
    <FeatureFlagContext.Provider value={{ flags, setFlags, resetFlags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
