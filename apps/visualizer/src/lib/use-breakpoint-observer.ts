import { useEffect, useState } from 'react';

export const useBreakpointObserver = (width: number) => {
  const mediaQuery = window.matchMedia(`(min-width: ${width}px)`);
  const [isMatch, setIsMatch] = useState(mediaQuery.matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${width}px)`);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [width]);

  return isMatch;
};
