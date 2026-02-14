interface DetailsGenresProps {
  genres: Array<{ id: number; name: string }>;
}

export const DetailsGenres = ({ genres }: DetailsGenresProps) => {
  if (!genres.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="rounded-full border border-primary-text px-3 py-1 text-xs text-primary-text"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};
