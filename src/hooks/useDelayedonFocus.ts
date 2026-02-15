import { useCallback, useEffect, useRef, useState } from 'react';

type UseDelayedOnFocusOptions = {
  delayMs?: number;
};

const DEFAULT_DELAY_MS = 2000;

export const useDelayedOnFocus = ({
  delayMs = DEFAULT_DELAY_MS,
}: UseDelayedOnFocusOptions = {}) => {
  const isKeydownLockedRef = useRef(false);
  const timeoutIdRef = useRef<number | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (isKeydownLockedRef.current) {
        return;
      }

      isKeydownLockedRef.current = true;
      setIsWaiting(true);
      const target = event.currentTarget;
      timeoutIdRef.current = window.setTimeout(() => {
        target.click();
        isKeydownLockedRef.current = false;
        setIsWaiting(false);
        timeoutIdRef.current = null;
      }, delayMs);
    },
    [delayMs],
  );

  const handleBlur = useCallback(() => {
    if (timeoutIdRef.current !== null) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    isKeydownLockedRef.current = false;
    setIsWaiting(false);
  }, []);

  return { isWaiting, handleFocus, handleBlur };
};
