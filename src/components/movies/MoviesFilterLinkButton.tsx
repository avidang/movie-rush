import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '../ui/Button';
import { useRestoreActiveFocus } from '@/hooks/useRestoreActiveFocus';
import { cn } from '@/utils/cn';

interface MoviesFilterLinkButtonProps {
  to: string;
  title: string;
  isWaiting?: boolean;
  handleKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

const MoviesFilterLinkButton = ({
  to,
  title,
  isWaiting,
  handleKeyDown,
}: MoviesFilterLinkButtonProps) => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const buttonRef = useRestoreActiveFocus<HTMLButtonElement>(pathname, to);
  const isActive = isActivePath(pathname, to);

  return (
    <Button
      asChild
      className={cn(isWaiting && 'animate-pulse')}
      color={isActive ? 'primary' : 'secondary'}
      ref={buttonRef}
      onKeyDown={handleKeyDown}
    >
      <Link to={to}>{title}</Link>
    </Button>
  );
};

const isActivePath = (pathname: string, target: string) => {
  return pathname === target;
};

export { MoviesFilterLinkButton };
