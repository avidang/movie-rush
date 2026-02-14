import { Star } from 'lucide-react';
import type { MovieDetail } from '@/schemas/movie-detail';
import { Button } from '@/components/ui/Button';
import { favoritesAdded, favoritesRemoved } from '@/store/favorites/actions';
import { selectIsFavoriteById } from '@/store/favorites/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { cn } from '@/utils/cn';

interface FavoriteActionProps {
  movie: MovieDetail;
}

const FavoriteAction = ({ movie }: FavoriteActionProps) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    selectIsFavoriteById(state, movie.id),
  );

  return (
    <Button
      onClick={() => {
        if (isFavorite) {
          dispatch(favoritesRemoved(movie.id));
        } else {
          dispatch(favoritesAdded(movie));
        }
      }}
      color="primary"
    >
      <Star
        className={cn('h-4 w-4', isFavorite && 'fill-primary-text')}
        aria-hidden="true"
      />
      {isFavorite ? 'In Favorites' : 'Add to Favorites'}
    </Button>
  );
};

export { FavoriteAction };
