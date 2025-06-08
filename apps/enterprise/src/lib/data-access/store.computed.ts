import { StateCreator, StoreApi } from 'zustand';

import { StoreState } from './store.state';

/**
 * Zustand middleware that injects “computed” (derived) values into your store.
 *
 * @template T  The “base” state shape (properties and actions you define) and the computed/derived state.
 *
 * @param compute  A function that takes the current store state (of type T)
 *                 and returns an object of type T containing derived fields.
 *
 * @returns A wrapper you can pass into `create(...)`. After wrapping, your final
 *          store type will be `T` (base fields + computed fields).
 */
export const computedWith =
  <T extends StoreState>(compute: (state: T) => Partial<T>) =>
  (config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) => {
    // Grab the latest state (which may already include some computed fields)
    const latest = get() as T;
    // Wrap the original `set` so that before every update, we recompute & merge.
    const setWithComputed: typeof set = (partial, replace) => {
      let updated: Partial<T> | undefined = undefined;

      const isFunction = typeof partial === 'function';
      if (isFunction) {
        try {
          updated = partial(latest);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // If the partial function failed to execute or returned undefined,
          // then it is most likely an immer-style mutation and needs to be executed inside the set function.
        }

        // Immer-style mutation
        if (updated === undefined) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (set as any)((draft: T) => {
            (partial as (state: T) => void)(draft);
            // Apply computed fields on the draft directly
            Object.assign(draft, compute(draft));
          });

          return;
        }
      } else {
        updated = partial;
        // Compute derived fields based on the latest state
        const computed = compute({ ...latest, ...updated });

        // Merge derived fields back into the store
        replace ? set({ ...latest, ...updated, ...computed } as T, true) : set({ ...updated, ...computed });
      }
    };

    // Build the “baseState” by calling the user’s config with our wrapped `set`.
    // We cast setWithComputed/get/api to match the expected types of StateCreator<T>.
    const baseState = config(setWithComputed as typeof set, get as () => T, api as StoreApi<T>) as T;

    // Compute the initial derived values from the freshly created baseState
    const initialComputed = compute(baseState);

    // Return the merged state: base fields + initial computed fields.
    return {
      ...baseState,
      ...initialComputed,
    } as T;
  };
