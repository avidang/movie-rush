import z from 'zod';

const nullableDate = z.preprocess((value) => {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  const date = new Date(value as string | number | Date);
  return Number.isNaN(date.getTime()) ? null : date;
}, z.date().nullable());

const videoSchema = z
  .object({
    key: z.string(),
    site: z.string(),
    type: z.string(),
    name: z.string().optional(),
  })
  .transform((item) => ({
    key: item.key,
    site: item.site,
    type: item.type,
    name: item.name ?? '',
  }));

const productionCompanySchema = z
  .object({
    id: z.number(),
    name: z.string(),
    logo_path: z.string().nullable().optional(),
  })
  .transform((item) => ({
    id: item.id,
    name: item.name,
    logoPath: item.logo_path ?? '',
  }));

const genereSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const spokenLanguageSchema = z
  .object({
    english_name: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
  })
  .transform((item) => item.name ?? item.english_name ?? '');

const movieDetailSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    overview: z.string().nullable().optional(),
    poster_path: z.string().nullable().optional(),
    backdrop_path: z.string().nullable().optional(),
    release_date: nullableDate.optional(),
    runtime: z.number().nullable().optional(),
    tagline: z.string().nullable().optional(),
    vote_average: z.number().nullable().optional(),
    vote_count: z.number().nullable().optional(),
    status: z.string().nullable().optional(),
    original_language: z.string().nullable().optional(),
    budget: z.number().nullable().optional(),
    revenue: z.number().nullable().optional(),
    homepage: z.string().nullable().optional(),
    genres: z.array(genereSchema).optional(),
    production_companies: z.array(productionCompanySchema).optional(),
    spoken_languages: z.array(spokenLanguageSchema).optional(),
    videos: z.object({ results: z.array(videoSchema) }).optional(),
  })
  .transform((item) => ({
    id: item.id,
    title: item.title,
    posterPath: item.poster_path ?? '',
    backdropPath: item.backdrop_path ?? '',
    overview: item.overview ?? '',
    releaseDate: item.release_date,
    runtime: item.runtime ?? null,
    tagline: item.tagline ?? '',
    rating: item.vote_average ?? null,
    votes: item.vote_count ?? null,
    status: item.status ?? '',
    originalLanguage: item.original_language ?? '',
    budget: item.budget ?? null,
    revenue: item.revenue ?? null,
    homepage: item.homepage ?? '',
    genres: item.genres ?? [],
    productionCompanies: item.production_companies ?? [],
    spokenLanguages: item.spoken_languages ?? [],
    videos: item.videos?.results ?? [],
  }));

export type MovieDetail = z.infer<typeof movieDetailSchema>;

export { movieDetailSchema };
