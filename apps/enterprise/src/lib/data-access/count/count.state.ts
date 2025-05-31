export interface CountState {
  count: number;
}

export interface CountActions {
  increment: () => void;
}

export type CountViewModel = CountState & CountActions;
