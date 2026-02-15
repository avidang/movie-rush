import { MoviesFilterLinkButton } from './MoviesFilterLinkButton';
import { FocusWrapper } from '@/components/focus/FocusWrapper';
import { useDelayedOnFocus } from '@/hooks/useDelayedOnFocus';

export const MoviesFilterBar = ({ title }: { title: string }) => {
  const {
    isWaiting: isWaitingAiringNow,
    handleFocus: handleFocusAiringNow,
    handleBlur: handleBlurAiringNow,
  } = useDelayedOnFocus({ delayMs: 2000 });

  const {
    isWaiting: isWaitingPopular,
    handleFocus: handleFocusPopular,
    handleBlur: handleBlurPopular,
  } = useDelayedOnFocus({ delayMs: 2000 });

  return (
    <FocusWrapper className="flex flex-wrap items-center justify-between gap-4">
      <h3 className="text-primary-text text-xl font-semibold">{title}</h3>
      <div className="flex items-center gap-3">
        <MoviesFilterLinkButton
          to="/movie/popular"
          title="Popular"
          isWaiting={isWaitingPopular}
          handleFocus={handleFocusPopular}
          handleBlur={handleBlurPopular}
        />
        <MoviesFilterLinkButton
          to="/movie/airing-now"
          title="Airing Now"
          isWaiting={isWaitingAiringNow}
          handleFocus={handleFocusAiringNow}
          handleBlur={handleBlurAiringNow}
        />
        <MoviesFilterLinkButton to="/movie/favorite" title="My Favorites" />
      </div>
    </FocusWrapper>
  );
};
