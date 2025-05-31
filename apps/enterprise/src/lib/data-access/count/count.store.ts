import { EventBus, InjectionToken, SetState } from "@evolonix/react";
import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { CountEvents } from "./count.event";
import { CountState, CountViewModel } from "./count.state";

export const CountStoreToken = new InjectionToken("Count Store");

export function buildCountStore(eventBus: EventBus) {
  const configureStore = (set: SetState<CountViewModel>) => ({
    // Initial state
    count: 0,

    // Actions
    increment: () => {
      set((state) => {
        state.count += 1;
        // Emit incremented count event
        eventBus.emit<CountState>(CountEvents.INCREMENT, {
          count: state.count,
        });
        return state;
      });
    },
  });

  const store = createStore<CountViewModel>()(
    devtools(
      immer(
        persist(configureStore, {
          name: "count-storage",
        }),
      ),
    ),
  );

  // Emit initial count event
  // NOTE: This could be different than initial state above,
  // if the perist middleware is used to get state from storage.
  eventBus.emit<CountState>(CountEvents.INCREMENT, {
    count: store.getState().count,
  });

  return store;
}
