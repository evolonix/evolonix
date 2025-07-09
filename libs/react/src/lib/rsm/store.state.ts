import { StoreApi } from 'zustand';

import { waitFor } from './store.utils';

// ****************************************************
// Store State
// ****************************************************

/**
 * Selector to quickly determine isLoading state
 */
export type StoreState = {
  requestStatus: StatusState;
  errors: Error[];

  // These are computed values based on request status
  showSkeleton: boolean; // if not initialized or transitioning to loading, state == 'initializing' or 'pending'
  isLoading: boolean; // if busy, state == 'pending'
  isReady: boolean; // state == 'success'
  hasErrors: boolean; // state == 'error'
  forceSkeleton: boolean; // if we want to force the skeleton to show
};

export const initStoreState = <T extends StoreState>(
  get: () => T,
  initialState?: Partial<T>,
  overrideState?: Partial<T>,
): T => {
  const defaultState = {
    requestStatus: { value: 'initializing' },
    errors: [],
    showSkeleton: true,
    isLoading: false,
    isReady: false,
    hasErrors: false,
    forceSkeleton: false,
  };

  return {
    ...defaultState,
    ...initialState,
    ...get(),
    ...overrideState,
  } as unknown as T;
};

// ****************************************************
// Status State
// ****************************************************

export declare type StatusState =
  | InitializingState
  | PendingState
  | SuccessState
  | ErrorState;
export interface SuccessState {
  value: 'success';
}
export interface PendingState {
  value: 'pending';
}
export interface InitializingState {
  value: 'initializing';
}
export interface ErrorState {
  value: 'error';
}

// ****************************************************
// Status Map Functions
// ****************************************************

/**
 * With 'ready' async action:
 *  -  update loading status
 *  -  trigger async action
 *  -  optionally wait for a specific id
 *  -  optionally wait for a minimum load time
 *  -  update with action data AND updated status
 */
export function trackStatusWith<T extends StoreState>({
  setState: set,
  getState: get,
}: StoreApi<T>) {
  return async (
    action: () => Promise<Partial<T>>,
    options: { waitForId?: string; minimumWaitTime?: number },
  ): Promise<T> => {
    const defaultOptions = {
      waitForId: 'default', // Default waitForId
      minimumWaitTime: 450, // Minimum load time
    };
    const { waitForId, minimumWaitTime } = {
      ...defaultOptions,
      ...options,
    };

    return waitFor(async () => {
      if (get().forceSkeleton) return get();

      // Track isLoading state
      set(updateRequestStatus<T>('pending'));

      // Introduce a delay for loading a minimum amount of time
      const delay = new Promise((resolve) =>
        setTimeout(resolve, minimumWaitTime),
      );

      try {
        // Trigger async action
        const [updates] = await Promise.all([action(), delay]);
        // Update status
        const hasErrors = updates.errors && updates.errors.length > 0;
        const withUpdatedRequestStatus = updateRequestStatus<T>(
          hasErrors ? 'error' : 'success',
        );
        // Update with action data AND updated status
        set((state: T) => withUpdatedRequestStatus({ ...state, ...updates }));
      } catch (e) {
        console.error(e);
        const error = e instanceof Error ? e : new Error(String(e));
        const withUpdatedRequestStatus = updateRequestStatus<T>('error');
        set((state: T) =>
          withUpdatedRequestStatus({
            ...state,
            errors: [...(state.errors ?? []), error],
          }),
        );
      }

      return get();
    }, waitForId);
  };
}

export const getRequestStatus = (state: StoreState) => {
  return state.requestStatus;
};

export const getIsInitializing = (s: StoreState) =>
  getRequestStatus(s).value === 'initializing';
export const getIsLoading = (s: StoreState) =>
  getRequestStatus(s).value === 'pending';
export const getIsReady = (s: StoreState) =>
  getRequestStatus(s).value === 'success';
export const getHasErrors = (s: StoreState) =>
  getRequestStatus(s).value === 'error';

export function updateRequestStatus<T extends StoreState>(
  flag: 'initializing' | 'pending' | 'success' | 'error',
): (state: T) => Partial<T> {
  return (state: T): T => {
    const wasInitializing = getIsInitializing(state);
    state = {
      ...state,
      requestStatus: resolveStatus(flag),
      errors: state.errors ?? [],
    };

    return {
      ...state,
      // Update raw values for view models
      showSkeleton:
        getIsInitializing(state) || (wasInitializing && getIsLoading(state)),
      isLoading: getIsLoading(state),
      isReady: getIsReady(state),
      hasErrors: getHasErrors(state),
    };
  };
}

// ****************************************************
// Internal Status Utils
// ****************************************************

function resolveStatus(flag: StatusState['value']) {
  const newStatus = {
    value: flag,
  } as StatusState;

  return newStatus;
}
