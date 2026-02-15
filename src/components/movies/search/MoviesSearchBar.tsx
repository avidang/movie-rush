import { FocusWrapper } from '@/components/focus/FocusWrapper';
import { searchQueryChanged, useAppDispatch, useAppSelector } from '@/store';
import { selectSearch } from '@/store/search/selectors';

interface MoviesSearchBarProps {
  inputId: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const MoviesSearchBar = ({
  inputId,
  label = 'Search movies',
  placeholder = 'Type at least 2 characters...',
  className,
}: MoviesSearchBarProps) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => selectSearch(state).query);
  return (
    <FocusWrapper className={className ?? 'flex flex-col gap-2'}>
      <label
        className="text-secondary-text text-sm font-semibold"
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => dispatch(searchQueryChanged(event.target.value))}
        placeholder={placeholder}
        className="border-primary bg-secondary text-secondary-text w-full max-w-md rounded-2xl border px-4 py-2 text-sm shadow-sm outline-none focus:border-slate-400"
      />
    </FocusWrapper>
  );
};
