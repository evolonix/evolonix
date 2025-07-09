/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator, StoreMutatorIdentifier } from 'zustand';

type ComputeWith = <T, Mps extends [StoreMutatorIdentifier, unknown][] = [], Mcs extends [StoreMutatorIdentifier, unknown][] = []>(
  compute: (state: T) => Partial<T>,
  f: StateCreator<T, Mps, Mcs>
) => StateCreator<T, Mps, Mcs>;

type ComputeWithImpl = <T>(compute: (state: T) => Partial<T>, f: StateCreator<T, [], []>) => StateCreator<T, [], []>;

const computeWithImpl: ComputeWithImpl = (compute, f) => (set, get, store) => {
  const updateState = <S>(partial: S, replace?: boolean): void => {
    if (typeof partial === 'function') {
      // Check if partial is an immer-style mutation
      const updated = partial(get());
      if (updated === undefined) {
        (set as any)(
          (draft: any) => {
            partial(draft);
            const computed = compute(draft);
            Object.assign(draft, { ...draft, ...computed });
          },
          replace ? true : undefined
        );
      } else {
        const computed = compute({ ...get(), ...updated });
        const computedArgs = [{ ...updated, ...computed }, replace] as Parameters<typeof set>;
        set(...computedArgs);
      }
    } else {
      const computed = compute({ ...get(), ...partial });
      const args = [{ ...partial, ...computed }, replace] as Parameters<typeof set>;
      set(...args);
    }
  };

  const setWithComputedState: typeof set = (partial, replace) => {
    updateState(partial, replace);
  };

  store.setState = setWithComputedState;

  const baseState = f(setWithComputedState, get, store);
  const initialComputed = compute(baseState);

  return {
    ...baseState,
    ...initialComputed,
  };
};

export const computeWith = computeWithImpl as unknown as ComputeWith;
