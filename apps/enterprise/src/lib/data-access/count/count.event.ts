import { EmitEvent } from '@evolonix/react';

import { CountState } from './count.state';

export enum CountEvents {
  INCREMENT = 'increment',
}

export class CountEvent<K = CountState> implements EmitEvent<K> {
  constructor(
    public type: string,
    public data: K
  ) {}
}

// export const countIncrement = (count: number) =>
//   new CountEvent(CountEvents.INCREMENT, {
//     count,
//   });
