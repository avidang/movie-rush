import { useCanGoBack, useRouter } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

const BackAction = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
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
  );
};

export { BackAction };
