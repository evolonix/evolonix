import { useEffect, useState } from 'react';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const useMediaMinWidth = (breakpoint: Breakpoint) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const breakpoints = {
      sm: styles.getPropertyValue('--breakpoint-sm'),
      md: styles.getPropertyValue('--breakpoint-md'),
      lg: styles.getPropertyValue('--breakpoint-lg'),
      xl: styles.getPropertyValue('--breakpoint-xl'),
      xxl: styles.getPropertyValue('--breakpoint-2xl'),
    } as Record<Breakpoint, string>;
    const mediaQueryList = window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set the initial state
    setMatches(mediaQueryList.matches);

    // Add the listener
    mediaQueryList.addEventListener('change', handleChange);

    // Cleanup function to remove the listener
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return matches;
};
