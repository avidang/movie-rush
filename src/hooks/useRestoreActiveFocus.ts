import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export const useRestoreActiveFocus = <T extends HTMLElement>(
  pathname: string,
  targetPath: string,
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (pathname !== targetPath) return;

    const element = ref.current;
    if (!element || document.activeElement === element) return;

    element.focus();
    element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [pathname, targetPath]);

  return ref;
};
