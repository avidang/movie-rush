import { BackAction } from './BackAction';
import { HomeAction } from './HomeAction';
import { ThemeToggle } from './ThemeToggle';
import { FocusWrapper } from '@/components/focus/FocusWrapper';

export const TopBar = () => {
  return (
    <header className="bg-background border-secondary sticky top-0 z-40 w-full border-b backdrop-blur">
      <FocusWrapper className="flex w-full items-center justify-between gap-3 px-4 py-3">
        <BackAction />
        <HomeAction />
        <ThemeToggle />
        <span className="text-secondary-text text-sm font-semibold">
          Movie Rush
        </span>
      </FocusWrapper>
    </header>
  );
};
