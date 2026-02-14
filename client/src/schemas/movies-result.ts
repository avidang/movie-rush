import z from 'zod';

const nullableDate = z.preprocess((value) => {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  const date = new Date(value as string | number | Date);
  return Number.isNaN(date.getTime()) ? null : date;
}, z.date().nullable());

const movieListItemSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string().nullable().default(''),
    overview: z.string().nullable().optional(),
    release_date: nullableDate.optional(),
  })
  .transform((item) => ({
    id: item.id,
    title: item.title,
    posterPath: item.poster_path,
    overview: item.overview,
    releaseDate: item.release_date,
  }));

const moviesResultSchema = z
  .object({
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
    results: z.array(movieListItemSchema),
  })
  .transform((result) => ({
    page: result.page,
    totalPages: result.total_pages,
    totalResults: result.total_results,
    results: result.results,
  }));

const favoritesStorageSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    posterPath: z.string().nullable().default(''),
    overview: z.string().nullable(),
    releaseDate: nullableDate,
  }),
);

export type MovieListItem = z.infer<typeof movieListItemSchema>;
export type MoviesResult = z.infer<typeof moviesResultSchema>;
export type FavoriteMovieItem = z.infer<typeof favoritesStorageSchema>[number];

export { movieListItemSchema, moviesResultSchema, favoritesStorageSchema };
