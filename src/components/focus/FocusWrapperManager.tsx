import { useCanGoBack, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

const focusableSelector =
  'button, a[href], input, textarea, select, [data-focus-item], [tabindex]';

export const FocusWrapperManager = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  useEffect(() => {
    const handleKeyDownWrapper = (event: KeyboardEvent) =>
      handleKeyDown(event, router, canGoBack);
    window.addEventListener('keydown', handleKeyDownWrapper, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDownWrapper, true);
    };
  }, [router, canGoBack]);

  return null;
};

const getFocusable = (root?: ParentNode) =>
  Array.from(
    (root ?? document).querySelectorAll<HTMLElement>(focusableSelector),
  ).filter((element) => {
    if (element.hasAttribute('disabled')) return false;
    if (element.getAttribute('aria-hidden') === 'true') return false;
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    return element.getClientRects().length > 0;
  });

const getWrappers = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[data-focus-wrapper]'));

const focusItem = (item: HTMLElement) => {
  item.focus();
  item.scrollIntoView({ block: 'nearest', inline: 'nearest' });
};

const focusFirstInWrapper = (wrapper: HTMLElement | null) => {
  if (!wrapper) return false;
  const items = getFocusable(wrapper);
  if (!items.length) return false;
  focusItem(items[0]);
  return true;
};

const focusClosestInWrapper = (
  wrapper: HTMLElement | null,
  reference: HTMLElement | null,
) => {
  if (!wrapper) return false;

  const items = getFocusable(wrapper);
  if (!items.length) return false;

  if (!reference) {
    focusItem(items[0]);
    return true;
  }

  const referenceRect = reference.getBoundingClientRect();
  const referenceCenterX = referenceRect.left + referenceRect.width / 2;
  const referenceCenterY = referenceRect.top + referenceRect.height / 2;

  let closest = items[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(
      centerX - referenceCenterX,
      centerY - referenceCenterY,
    );

    if (distance < closestDistance) {
      closest = item;
      closestDistance = distance;
    }
  });

  focusItem(closest);
  return true;
};

const isGridWrapper = (wrapper: HTMLElement | null) =>
  wrapper?.dataset.focusGrid === 'true';

const getGridColumns = (wrapper: HTMLElement | null) => {
  if (!wrapper) return 1;
  const raw = wrapper.dataset.gridColumns;
  const parsed = raw ? Number.parseInt(raw, 10) : 1;
  return Number.isNaN(parsed) || parsed <= 0 ? 1 : parsed;
};

const findWrapperWithItems = (
  wrappers: Array<HTMLElement>,
  startIndex: number,
  direction: -1 | 1,
) => {
  for (
    let i = startIndex + direction;
    i >= 0 && i < wrappers.length;
    i += direction
  ) {
    if (getFocusable(wrappers[i]).length) return wrappers[i];
  }
  return null;
};

const handleKeyDown = (
  event: KeyboardEvent,
  router: ReturnType<typeof useRouter>,
  canGoBack: boolean,
) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  if (event.key === 'Escape') {
    console.log('Escape key pressed. Can go back:', canGoBack);

    if (canGoBack) {
      router.history.back();
      return;
    }
  }

  const active = document.activeElement as HTMLElement | null;

  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

  event.preventDefault();
  event.stopPropagation();

  const wrappers = getWrappers();
  if (!wrappers.length) return;

  const activeWrapper = active
    ? (active.closest('[data-focus-wrapper]') as HTMLElement)
    : null;
  const activeIndex = activeWrapper ? wrappers.indexOf(activeWrapper) : -1;

  if (!activeWrapper) {
    for (const wrapper of wrappers) {
      if (focusFirstInWrapper(wrapper)) break;
    }
    return;
  }

  if (isGridWrapper(activeWrapper)) {
    const items = getFocusable(activeWrapper);
    if (items.length) {
      const currentIndex = active ? items.indexOf(active) : -1;
      const resolvedIndex = currentIndex === -1 ? 0 : currentIndex;
      const columns = getGridColumns(activeWrapper);
      const delta = event.key === 'ArrowDown' ? columns : -columns;
      const nextIndex = resolvedIndex + delta;

      if (nextIndex >= 0 && nextIndex < items.length) {
        focusItem(items[nextIndex]);
        return;
      }
    }
  }

  const direction = event.key === 'ArrowDown' ? 1 : -1;
  const nextWrapper = findWrapperWithItems(wrappers, activeIndex, direction);
  if (nextWrapper) focusClosestInWrapper(nextWrapper, active);
};
