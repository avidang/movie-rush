import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import type { MovieDetail } from '@/schemas/movie-detail';
import { FocusTrap } from '@/components/focus/FocusTrap';
import { Button } from '@/components/ui/Button';

interface MovieTrailerProps {
  title: string;
  videos: MovieDetail['videos'];
  isOpen: boolean;
  onClose: () => void;
}

export const MovieTrailer = ({
  title,
  videos,
  isOpen,
  onClose,
}: MovieTrailerProps) => {
  const trailer = videos.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  if (!trailer) return null;

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Trailer dialog"
      onMouseDown={onClose}
      onKeyDown={handleKeyDown}
    >
      <FocusTrap
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="border-primary flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-sm font-semibold text-white">Play trailer</h2>
          <Button
            aria-label="Close trailer"
            onClick={onClose}
            size="icon"
            variant="ghost"
            color="neutral"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="aspect-video w-full">
          <iframe
            title={trailer.name || `${title} trailer`}
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&modestbranding=1&autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </FocusTrap>
    </div>,
    document.body,
  );
};
