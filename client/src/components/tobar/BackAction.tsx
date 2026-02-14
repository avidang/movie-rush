import { ArrowLeft } from 'lucide-react';
import { useCanGoBack, useMatchRoute, useRouter } from '@tanstack/react-router';
import { Button } from '../ui/Button';

const BackAction = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const matchRoute = useMatchRoute();
  const isHome = matchRoute({ to: '/' });
  return (
    <>
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
    </>
  );
};

export { BackAction };
