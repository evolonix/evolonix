import { waitFor } from '@evolonix/react';
import { StoreApi } from 'zustand';

export type RestErrorMessage = { memberNames?: string[]; errorMessage: string };
export type RestErrors = RestErrorMessage[];

// ****************************************************
// Store State
// ****************************************************

type Errors = { errors?: RestErrors };

/**
 * Selector to quickly determine isLoading state
 */
export type StoreState = {
  requestStatus: StatusState;

  // These are computed values based on request status
  showSkeleton?: boolean; // if not initialized or transitioning to loading
  isLoading?: boolean; // if busy
  isReady: boolean; // state == 'success'
  forceSkeleton?: boolean; // if we want to force the skeleton to show
};

// export type GetState<T> = StoreApi<T>['getState'];
export type SetState<T> = StoreApi<T>['setState'] & {
  <K extends keyof T>(partial: Pick<T, K> | ((state: T) => Pick<T, K> | void), replace?: boolean): void;
};

export function initStoreState(): StoreState {
  return {
    requestStatus: { value: 'initializing' },
    showSkeleton: true,
    isLoading: false,
    isReady: false,
    forceSkeleton: false,
  };
}

// ****************************************************
// Status State
// ****************************************************

export declare type StatusState = InitializingState | PendingState | SuccessState | ErrorState;
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
  errors: RestErrors;
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
export function trackStatusWith<T extends StoreState>({ setState: set, getState: get }: StoreApi<T>) {
  return async (action: () => Promise<Partial<T>>, options: { minimumWaitTime?: number; waitForId?: string }): Promise<T> => {
    const defaultOptions = {
      minimumWaitTime: 450, // Minimum load time
      waitForId: 'default', // Default waitForId
    };
    const { minimumWaitTime, waitForId } = {
      ...defaultOptions,
      ...options,
    };

    return waitFor(async () => {
      if (get().forceSkeleton) return get();

      // Track isLoading state
      set(updateRequestStatus<T>('pending'));

      // Introduce a delay for loading a minimum amount of time
      if (get().isLoading) await new Promise((resolve) => setTimeout(resolve, minimumWaitTime));

      try {
        // Trigger async action
        const updates = await action();
        // Update status
        const withUpdatedRequestStatus = updateRequestStatus<T>('success');
        // Update with action data AND updated status
        set((state: T) => withUpdatedRequestStatus({ ...state, ...updates }));
      } catch (error) {
        console.error(error);

        const withUpdatedRequestStatus = updateRequestStatus<T>('error');
        set((state: T) => withUpdatedRequestStatus({ ...state, errors: [`${error}`] }));
      }

      return get();
    }, waitForId);
  };
}

export const getRequestStatus = (state: StoreState) => {
  return state.requestStatus;
};

export const getErrorMessages = (state: StoreState): string[] => {
  const errors = (state.requestStatus as ErrorState).errors || [];
  return errors.map((it) => (it as RestErrorMessage).errorMessage);
};

export const getIsInitializing = (s: StoreState) => getRequestStatus(s).value === 'initializing';
export const getIsLoading = (s: StoreState) => getRequestStatus(s).value === 'pending';
export const getIsReady = (s: StoreState) => getRequestStatus(s).value === 'success';

export function updateRequestStatus<T extends StoreState>(
  flag: 'initializing' | 'pending' | 'success' | 'error',
  updates?: Partial<T> & Errors
): (state: T) => Partial<T> {
  return (state: T): T => {
    const wasInitializing = getIsInitializing(state);
    state = {
      ...state,
      requestStatus: resolveStatus(flag, updates?.errors),
    };

    return {
      ...state,
      // Update raw values for view models
      showSkeleton: getIsInitializing(state) || (wasInitializing && getIsLoading(state)),
      isLoading: getIsLoading(state),
      isReady: getIsReady(state),
    };
  };
}

// ****************************************************
// Internal Status Utils
// ****************************************************

function resolveStatus(flag: StatusState['value'], errors?: RestErrors) {
  const newStatus = {
    value: flag,
  } as StatusState;

  if (flag === 'error') {
    newStatus.value = 'error';
    (newStatus as ErrorState).errors = errors || [];

    // Debugging
    if (errors?.length) console.log(errors);
  }

  return newStatus;
}
