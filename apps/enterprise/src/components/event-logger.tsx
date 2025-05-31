import { useEffect } from 'react';

import { CountEvents, CountState, useEventBus } from '../lib';

interface EventLoggerProps {
  enabled?: boolean;
}

const production = import.meta.env.PROD;

export const EventLogger = ({ enabled = !production }: EventLoggerProps) => {
  const eventBus = useEventBus();

  useEffect(() => {
    const log = (...data: unknown[]) => {
      if (enabled) console.log(...data);
    };

    // Count events
    const unsubscribeCountIncrement = eventBus.on<CountState>(CountEvents.INCREMENT, ({ count }) => {
      log('Count incremented:', count);
    });

    return () => {
      unsubscribeCountIncrement();
    };
  }, [eventBus, enabled]);

  return null;
};
