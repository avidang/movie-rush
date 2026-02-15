import type { KeyboardEvent, PropsWithChildren } from 'react';

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

const getWrappers = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[data-focus-wrapper]'));

interface FocusWrapperProps extends PropsWithChildren {
  className?: string;
  focusGrid?: boolean;
  gridColumns?: number;
}

export const FocusWrapper = ({
  children,
  className,
  focusGrid,
  gridColumns,
}: FocusWrapperProps) => {
  const handleKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      const currentTarget = event.currentTarget;
      const items = getFocusable(currentTarget);
      if (items.length) {
        items[0].focus();
        items[0].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
      return;
    }

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    event.preventDefault();
    event.stopPropagation();

    const currentTarget = event.currentTarget;
    const items = getFocusable(currentTarget);
    if (!items.length) return;

    const active = document.activeElement as HTMLElement | null;
    const currentIndex = active ? items.indexOf(active) : -1;
    const resolvedIndex = currentIndex === -1 ? 0 : currentIndex;
    if (event.key === 'ArrowRight') {
      const nextIndex = resolvedIndex + 1;
      if (nextIndex < items.length) {
        items[nextIndex].focus();
        items[nextIndex].scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
        return;
      }

      const wrappers = getWrappers();
      const wrapperIndex = wrappers.indexOf(currentTarget);
      for (let i = wrapperIndex + 1; i < wrappers.length; i += 1) {
        const nextItems = getFocusable(wrappers[i]);
        if (nextItems.length) {
          nextItems[0].focus();
          nextItems[0].scrollIntoView({ block: 'nearest', inline: 'nearest' });
          return;
        }
      }
      return;
    }

    const prevIndex = resolvedIndex - 1;
    if (prevIndex >= 0) {
      items[prevIndex].focus();
      items[prevIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      return;
    }

    const wrappers = getWrappers();
    const wrapperIndex = wrappers.indexOf(currentTarget);
    for (let i = wrapperIndex - 1; i >= 0; i -= 1) {
      const prevItems = getFocusable(wrappers[i]);
      if (prevItems.length) {
        const lastItem = prevItems[prevItems.length - 1];
        lastItem.focus();
        lastItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        return;
      }
    }
  };

  return (
    <div
      className={className}
      data-focus-wrapper
      data-focus-grid={focusGrid ? 'true' : undefined}
      data-grid-columns={
        focusGrid && gridColumns ? String(gridColumns) : undefined
      }
      onKeyDownCapture={handleKeyDownCapture}
    >
      {children}
    </div>
  );
};
