import { FocusWrapper } from '@/components/focus/FocusWrapper';

interface MoviesSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  inputId: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const MoviesSearchBar = ({
  value,
  onChange,
  inputId,
  label = 'Search movies',
  placeholder = 'Type at least 2 characters...',
  className,
}: MoviesSearchBarProps) => {
  return (
    <FocusWrapper className={className ?? 'flex flex-col gap-2'}>
      <label className="text-sm font-semibold text-secondary-text" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full max-w-md rounded-2xl border border-primary bg-secondary px-4 py-2 text-sm text-secondary-text shadow-sm outline-none focus:border-slate-400"
      />
    </FocusWrapper>
  );
};
