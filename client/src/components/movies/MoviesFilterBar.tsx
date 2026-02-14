import { MoviesFilterLinkButton } from './MoviesFilterLinkButton';
import { FocusWrapper } from '@/components/focus/FocusWrapper';
import { useDelayedEnterClick } from '@/hooks/useDelayedEnterClick';

export const MoviesFilterBar = ({ title }: { title: string }) => {
  const {
    isWaiting: isWaitingAiringNow,
    handleKeyDown: handleKeyDownAiringNow,
  } = useDelayedEnterClick({ delayMs: 2000 });

  const { isWaiting: isWaitingPopular, handleKeyDown: handleKeyDownPopular } =
    useDelayedEnterClick({ delayMs: 2000 });

  return (
    <FocusWrapper className="flex flex-wrap items-center justify-between gap-4">
      <h3 className="text-primary-text text-xl font-semibold">{title}</h3>
      <div className="flex items-center gap-3">
        <MoviesFilterLinkButton
          to="/movie/popular"
          title="Popular"
          isWaiting={isWaitingPopular}
          handleKeyDown={handleKeyDownPopular}
        />
        <MoviesFilterLinkButton
          to="/movie/airing-now"
          title="Airing Now"
          isWaiting={isWaitingAiringNow}
          handleKeyDown={handleKeyDownAiringNow}
        />
        <MoviesFilterLinkButton to="/movie/favorite" title="My Favorites" />
      </div>
    </FocusWrapper>
  );
};
