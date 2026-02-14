import { useEffect, useRef } from 'react';
import type { HTMLAttributes, PropsWithChildren } from 'react';

const focusableSelector =
  'button, a[href], input, textarea, select, [data-focus-item], [tabindex]';

const getFocusable = (root: ParentNode) =>
  Array.from(root.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => {
      if (element.hasAttribute('disabled')) return false;
      if (element.getAttribute('aria-hidden') === 'true') return false;
      const style = window.getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden')
        return false;
      return element.getClientRects().length > 0;
    },
  );

interface FocusTrapProps
  extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export const FocusTrap = ({
  active = true,
  children,
  ...rest
}: FocusTrapProps) => {
  const trapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active || !trapRef.current) return;

    const focusFirst = () => {
      const focusables = getFocusable(trapRef.current as HTMLElement);
      if (focusables.length) {
        focusables[0].focus();
        focusables[0].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || !trapRef.current) return;
      if (!trapRef.current.contains(target)) {
        focusFirst();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!trapRef.current) return;
      const activeElement = document.activeElement as HTMLElement | null;
      const isInside = activeElement && trapRef.current.contains(activeElement);
      const isNavKey =
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'Enter' ||
        event.key === 'Tab';

      if (isNavKey && !isInside) {
        event.preventDefault();
        event.stopPropagation();
        focusFirst();
      }
    };

    focusFirst();
    document.addEventListener('focusin', handleFocusIn);
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [active]);

  return (
    <div ref={trapRef} data-focus-trap={active ? 'true' : undefined} {...rest}>
      {children}
    </div>
  );
};
