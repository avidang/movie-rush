import { House } from 'lucide-react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '../ui/Button';
import { useRestoreActiveFocus } from '@/hooks/useRestoreActiveFocus';

const HomeAction = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const homeRef = useRestoreActiveFocus<HTMLAnchorElement>(pathname, '/');
  return (
    <Button asChild color="primary">
      <Link to="/" ref={homeRef} className="flex items-center gap-2">
        <House />
        Home
      </Link>
    </Button>
  );
};

export { HomeAction };
