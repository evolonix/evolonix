import { inject } from '../di';
import { EventBus } from './eventbus';

export const useEventBus = () => {
  return inject<EventBus>(EventBus);
};
