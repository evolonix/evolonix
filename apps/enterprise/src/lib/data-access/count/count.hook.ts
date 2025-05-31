import { inject } from "@evolonix/react";
import { StoreApi, useStore } from "zustand";

import { CountViewModel } from "./count.state";
import { CountStoreToken } from "./count.store";

export function useCount() {
  const store = inject<StoreApi<CountViewModel>>(CountStoreToken);

  return useStore(store);
}
