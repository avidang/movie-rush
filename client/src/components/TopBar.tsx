import {
  Link,
  useCanGoBack,
  useMatchRoute,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';

import { ArrowLeft, House, Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
import { FocusWrapper } from '@/components/focus/FocusWrapper';
import { useRestoreActiveFocus } from '@/hooks/useRestoreActiveFocus';
import { useThemePreference } from '@/hooks/useThemePreference';

export const TopBar = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const matchRoute = useMatchRoute();
  const isHome = matchRoute({ to: '/' });

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const homeRef = useRestoreActiveFocus<HTMLAnchorElement>(pathname, '/');
  const { isDark, toggleTheme } = useThemePreference();

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b border-secondary backdrop-blur">
      <FocusWrapper className="flex w-full items-center justify-between gap-3 px-4 py-3">
        {!isHome && (
          <Button
            type="button"
            size="icon"
            color="secondary"
            onClick={() => router.history.back()}
            disabled={!canGoBack}
            className="*:size-auto"
          >
            <ArrowLeft />
          </Button>
        )}
        <Button asChild color="primary">
          <Link to="/" ref={homeRef} className="flex items-center gap-2">
            <House />
            Home
          </Link>
        </Button>

        <Button
          type="button"
          size="icon"
          color="secondary"
          onClick={toggleTheme}
          className="ml-auto *:size-auto"
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>

        <span className="text-secondary-text text-sm font-semibold">
          Movie Rush
        </span>
      </FocusWrapper>
    </header>
  );
};
