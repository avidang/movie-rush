import { MoviesFilterLinkButton } from './MoviesFilterLinkButton';
import { FocusWrapper } from '@/components/focus/FocusWrapper';
import { useDelayedonFocus } from '@/hooks/useDelayedonFocus';

export const MoviesFilterBar = ({ title }: { title: string }) => {
  const { isWaiting: isWaitingAiringNow, handleFocus: handleFocusAiringNow } =
    useDelayedonFocus({ delayMs: 2000 });

  const { isWaiting: isWaitingPopular, handleFocus: handleFocusPopular } =
    useDelayedonFocus({ delayMs: 2000 });

  return (
    <FocusWrapper className="flex flex-wrap items-center justify-between gap-4">
      <h3 className="text-primary-text text-xl font-semibold">{title}</h3>
      <div className="flex items-center gap-3">
        <MoviesFilterLinkButton
          to="/movie/popular"
          title="Popular"
          isWaiting={isWaitingPopular}
          handleFocus={handleFocusPopular}
        />
        <MoviesFilterLinkButton
          to="/movie/airing-now"
          title="Airing Now"
          isWaiting={isWaitingAiringNow}
          handleFocus={handleFocusAiringNow}
        />
        <MoviesFilterLinkButton to="/movie/favorite" title="My Favorites" />
      </div>
    </FocusWrapper>
  );
};
